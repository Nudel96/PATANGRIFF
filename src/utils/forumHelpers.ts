import { ForumPost, ForumUser, PostReply } from '../types/forum';

// Calculate user reputation based on various factors
export const calculateReputation = (user: ForumUser): number => {
  const baseReputation = user.stats.posts * 2 + user.stats.replies * 1;
  const likeBonus = user.stats.likes * 0.5;
  const helpfulBonus = user.stats.helpfulVotes * 3;
  const bestAnswerBonus = user.stats.bestAnswers * 10;
  
  return Math.floor(baseReputation + likeBonus + helpfulBonus + bestAnswerBonus);
};

// Calculate post quality score
export const calculateQualityScore = (post: ForumPost): number => {
  let score = 50; // Base score
  
  // Content length bonus
  if (post.content.length > 500) score += 10;
  if (post.content.length > 1000) score += 10;
  
  // Engagement bonus
  const engagementRatio = (post.likes + post.replies) / Math.max(post.views, 1);
  score += Math.min(engagementRatio * 100, 20);
  
  // Author reputation bonus
  const authorReputation = post.author.reputation;
  if (authorReputation > 1000) score += 5;
  if (authorReputation > 5000) score += 10;
  
  // Trading data bonus (for trade ideas)
  if (post.tradingData && post.postType === 'trade-idea') {
    if (post.tradingData.entryPrice && post.tradingData.stopLoss) score += 10;
    if (post.tradingData.confidence > 80) score += 5;
  }
  
  // Attachment bonus
  if (post.hasImages || post.hasCharts) score += 5;
  
  // Moderation penalty
  if (post.moderationFlags.length > 0) {
    score -= post.moderationFlags.length * 10;
  }
  
  return Math.max(0, Math.min(100, score));
};

// Format trading data for display
export const formatTradingData = (tradingData: any) => {
  if (!tradingData) return null;
  
  const risk = tradingData.entryPrice && tradingData.stopLoss 
    ? Math.abs(tradingData.entryPrice - tradingData.stopLoss)
    : null;
    
  const reward = tradingData.entryPrice && tradingData.targetPrice
    ? Math.abs(tradingData.targetPrice - tradingData.entryPrice)
    : null;
    
  const riskReward = risk && reward ? (reward / risk).toFixed(2) : null;
  
  return {
    ...tradingData,
    risk,
    reward,
    riskReward
  };
};

// Generate post excerpt
export const generateExcerpt = (content: string, maxLength = 200): string => {
  if (content.length <= maxLength) return content;
  
  const truncated = content.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
};

// Validate post content
export const validatePost = (post: Partial<ForumPost>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!post.title?.trim()) {
    errors.push('Title is required');
  } else if (post.title.length < 10) {
    errors.push('Title must be at least 10 characters');
  } else if (post.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }
  
  if (!post.content?.trim()) {
    errors.push('Content is required');
  } else if (post.content.length < 50) {
    errors.push('Content must be at least 50 characters');
  } else if (post.content.length > 10000) {
    errors.push('Content must be less than 10,000 characters');
  }
  
  if (!post.categoryId) {
    errors.push('Category is required');
  }
  
  if (post.postType === 'trade-idea' && post.tradingData) {
    if (!post.tradingData.asset) {
      errors.push('Asset is required for trade ideas');
    }
    if (!post.tradingData.direction) {
      errors.push('Direction is required for trade ideas');
    }
    if (post.tradingData.confidence && (post.tradingData.confidence < 0 || post.tradingData.confidence > 100)) {
      errors.push('Confidence must be between 0 and 100');
    }
  }
  
  if (post.tags && post.tags.length > 10) {
    errors.push('Maximum 10 tags allowed');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sort posts by various criteria
export const sortPosts = (posts: ForumPost[], sortBy: string): ForumPost[] => {
  const sorted = [...posts];
  
  switch (sortBy) {
    case 'recent':
      return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    case 'popular':
      return sorted.sort((a, b) => (b.likes + b.replies) - (a.likes + a.replies));
    case 'views':
      return sorted.sort((a, b) => b.views - a.views);
    case 'replies':
      return sorted.sort((a, b) => b.replies - a.replies);
    case 'quality':
      return sorted.sort((a, b) => b.qualityScore - a.qualityScore);
    default:
      return sorted;
  }
};

// Filter posts by various criteria
export const filterPosts = (posts: ForumPost[], filters: any): ForumPost[] => {
  return posts.filter(post => {
    // Category filter
    if (filters.category && post.categoryId !== filters.category) return false;
    
    // Subcategory filter
    if (filters.subcategory && post.subcategoryId !== filters.subcategory) return false;
    
    // Tag filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some((tag: string) => 
        post.tags.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }
    
    // Author filter
    if (filters.author && post.author.username !== filters.author) return false;
    
    // Post type filter
    if (filters.postType && post.postType !== filters.postType) return false;
    
    // Date range filter
    if (filters.dateRange) {
      if (filters.dateRange.start && post.createdAt < filters.dateRange.start) return false;
      if (filters.dateRange.end && post.createdAt > filters.dateRange.end) return false;
    }
    
    // Minimum reputation filter
    if (filters.minReputation && post.author.reputation < filters.minReputation) return false;
    
    // Has attachments filter
    if (filters.hasAttachments && !post.hasImages && !post.attachments.length) return false;
    
    // Verified users only
    if (filters.verifiedOnly && !post.author.tradingStats?.verified) return false;
    
    return true;
  });
};

// Search posts with relevance scoring
export const searchPosts = (posts: ForumPost[], query: string): ForumPost[] => {
  if (!query.trim()) return posts;
  
  const searchTerms = query.toLowerCase().split(' ');
  
  const scoredPosts = posts.map(post => {
    let score = 0;
    const titleLower = post.title.toLowerCase();
    const contentLower = post.content.toLowerCase();
    const tagsLower = post.tags.join(' ').toLowerCase();
    
    // Title matches (highest weight)
    searchTerms.forEach(term => {
      if (titleLower.includes(term)) score += 10;
    });
    
    // Content matches
    searchTerms.forEach(term => {
      const matches = (contentLower.match(new RegExp(term, 'g')) || []).length;
      score += matches * 2;
    });
    
    // Tag matches
    searchTerms.forEach(term => {
      if (tagsLower.includes(term)) score += 5;
    });
    
    // Author name matches
    searchTerms.forEach(term => {
      if (post.author.displayName.toLowerCase().includes(term)) score += 3;
    });
    
    return { post, score };
  });
  
  return scoredPosts
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.post);
};

// Generate SEO-friendly URL slug
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Format relative time
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};

// Check if user can perform action
export const canUserPerformAction = (
  user: ForumUser, 
  action: string, 
  target?: ForumPost | PostReply
): boolean => {
  // Admin can do everything
  if (user.roles.some(role => role.type === 'Admin')) return true;
  
  switch (action) {
    case 'create_post':
      return user.reputation >= 10;
    case 'reply':
      return user.reputation >= 5;
    case 'like':
      return user.reputation >= 1;
    case 'edit_own_post':
      return target && 'authorId' in target && target.authorId === user.id;
    case 'delete_own_post':
      return target && 'authorId' in target && target.authorId === user.id;
    case 'moderate':
      return user.roles.some(role => role.type === 'Moderator' || role.type === 'Admin');
    case 'feature_post':
      return user.roles.some(role => role.type === 'Admin');
    case 'ban_user':
      return user.roles.some(role => role.type === 'Admin');
    default:
      return false;
  }
};

// Sanitize HTML content
export const sanitizeContent = (content: string): string => {
  // Basic HTML sanitization (in production, use a proper library like DOMPurify)
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

// Extract mentions from content
export const extractMentions = (content: string): string[] => {
  const mentionRegex = /@(\w+)/g;
  const mentions: string[] = [];
  let match;
  
  while ((match = mentionRegex.exec(content)) !== null) {
    mentions.push(match[1]);
  }
  
  return [...new Set(mentions)]; // Remove duplicates
};

// Calculate engagement rate
export const calculateEngagementRate = (post: ForumPost): number => {
  if (post.views === 0) return 0;
  return ((post.likes + post.replies + post.shares) / post.views) * 100;
};

// Get trending tags
export const getTrendingTags = (posts: ForumPost[], days = 7): Array<{ tag: string; count: number; growth: number }> => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const recentPosts = posts.filter(post => post.createdAt >= cutoffDate);
  const tagCounts: Record<string, number> = {};
  
  recentPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count, growth: 0 })) // Growth calculation would need historical data
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
};

// Validate file upload
export const validateFileUpload = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 10MB' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'File type not supported' };
  }
  
  return { isValid: true };
};

// Generate post URL
export const generatePostUrl = (post: ForumPost): string => {
  const slug = generateSlug(post.title);
  return `/forum/${post.categoryId}/${post.id}/${slug}`;
};

// Generate user profile URL
export const generateUserUrl = (user: ForumUser): string => {
  return `/forum/users/${user.username}`;
};

// Check if content contains spam indicators
export const detectSpam = (content: string): { isSpam: boolean; confidence: number; reasons: string[] } => {
  const reasons: string[] = [];
  let spamScore = 0;
  
  // Check for excessive links
  const linkCount = (content.match(/https?:\/\/[^\s]+/g) || []).length;
  if (linkCount > 3) {
    spamScore += 30;
    reasons.push('Excessive external links');
  }
  
  // Check for promotional keywords
  const promoKeywords = ['buy now', 'limited time', 'act fast', 'guaranteed', 'risk-free', 'make money fast'];
  const promoMatches = promoKeywords.filter(keyword => 
    content.toLowerCase().includes(keyword)
  ).length;
  
  if (promoMatches > 0) {
    spamScore += promoMatches * 20;
    reasons.push('Promotional language detected');
  }
  
  // Check for excessive capitalization
  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
  if (capsRatio > 0.3) {
    spamScore += 25;
    reasons.push('Excessive capitalization');
  }
  
  // Check for repetitive content
  const words = content.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  const repetitionRatio = 1 - (uniqueWords.size / words.length);
  
  if (repetitionRatio > 0.5) {
    spamScore += 40;
    reasons.push('Repetitive content');
  }
  
  return {
    isSpam: spamScore > 50,
    confidence: Math.min(spamScore, 100),
    reasons
  };
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Generate color for user level
export const getUserLevelColor = (level: string): string => {
  switch (level) {
    case 'S-Tier': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    case 'A-Tier': return 'bg-primary/10 text-primary border-primary/20';
    case 'B-Tier': return 'bg-secondary/10 text-secondary border-secondary/20';
    case 'C-Tier': return 'bg-muted text-muted-foreground border-border';
    default: return 'bg-muted text-muted-foreground border-border';
  }
};

// Calculate reading time
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Generate post summary for notifications
export const generatePostSummary = (post: ForumPost): string => {
  const excerpt = generateExcerpt(post.content, 100);
  const readingTime = calculateReadingTime(post.content);
  
  return `${excerpt} • ${readingTime} min read • ${post.category}`;
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}