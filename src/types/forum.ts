export interface ForumUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  level: 'S-Tier' | 'A-Tier' | 'B-Tier' | 'C-Tier';
  reputation: number;
  joinDate: Date;
  lastActive: Date;
  location?: string;
  website?: string;
  bio?: string;
  badges: UserBadge[];
  stats: UserStats;
  tradingStats?: TradingStats;
  preferences: UserPreferences;
  status: 'Active' | 'Inactive' | 'Suspended' | 'Banned';
  roles: UserRole[];
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: Date;
  category: 'Trading' | 'Community' | 'Business' | 'Education' | 'Special';
}

export interface UserStats {
  posts: number;
  replies: number;
  likes: number;
  views: number;
  followers: number;
  following: number;
  squads: number;
  helpfulVotes: number;
  bestAnswers: number;
}

export interface TradingStats {
  winRate: number;
  totalTrades: number;
  avgReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  profitFactor: number;
  verified: boolean;
  verificationDate?: Date;
  specializations: string[];
}

export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  showTradingStats: boolean;
  showLocation: boolean;
  allowDirectMessages: boolean;
  profileVisibility: 'Public' | 'Members Only' | 'Private';
}

export interface UserRole {
  type: 'Member' | 'Moderator' | 'Admin' | 'Expert' | 'Mentor';
  scope: 'Global' | 'Category' | 'Squad';
  categoryId?: string;
  squadId?: string;
  assignedAt: Date;
  assignedBy: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: ForumUser;
  categoryId: string;
  subcategoryId?: string;
  tags: string[];
  postType: PostType;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  views: number;
  likes: number;
  dislikes: number;
  replies: number;
  shares: number;
  bookmarks: number;
  isPinned: boolean;
  isLocked: boolean;
  isFeatured: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  deletedBy?: string;
  deleteReason?: string;
  editHistory: PostEdit[];
  attachments: PostAttachment[];
  tradingData?: TradingPostData;
  businessData?: BusinessPostData;
  eventData?: EventPostData;
  moderationFlags: ModerationFlag[];
  qualityScore: number;
  engagementScore: number;
}

export type PostType = 
  | 'discussion' 
  | 'trade-idea' 
  | 'analysis' 
  | 'question' 
  | 'resource' 
  | 'business' 
  | 'event' 
  | 'announcement'
  | 'poll'
  | 'tutorial';

export interface PostEdit {
  id: string;
  editedAt: Date;
  editedBy: string;
  reason?: string;
  previousContent: string;
  changes: string[];
}

export interface PostAttachment {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
  uploadedBy: string;
  description?: string;
  isPublic: boolean;
}

export interface TradingPostData {
  asset: string;
  direction: 'long' | 'short' | 'neutral';
  entryPrice?: number;
  targetPrice?: number;
  stopLoss?: number;
  currentPrice?: number;
  timeframe: string;
  confidence: number;
  riskReward?: number;
  positionSize?: number;
  strategy: string;
  setup: string;
  confluence: string[];
  marketConditions: string;
  sessionTiming: string;
  economicEvents: string[];
  technicalLevels: TechnicalLevel[];
  status: 'idea' | 'active' | 'closed' | 'stopped';
  entryTime?: Date;
  exitTime?: Date;
  actualReturn?: number;
  maxDrawdown?: number;
  maxProfit?: number;
}

export interface TechnicalLevel {
  type: 'support' | 'resistance' | 'pivot' | 'fibonacci';
  price: number;
  strength: 'weak' | 'moderate' | 'strong';
  timeframe: string;
  description: string;
}

export interface BusinessPostData {
  type: 'opportunity' | 'partnership' | 'resource' | 'service' | 'job';
  industry?: string;
  location?: string;
  budget?: string;
  timeline?: string;
  requirements: string[];
  benefits: string[];
  contactMethod: string;
  companyName?: string;
  companySize?: string;
  experienceLevel?: string;
  isRemote: boolean;
  equity?: boolean;
  salary?: string;
  applicationDeadline?: Date;
}

export interface EventPostData {
  eventType: 'webinar' | 'meetup' | 'conference' | 'workshop' | 'ama';
  startDate: Date;
  endDate?: Date;
  timezone: string;
  location?: string;
  isVirtual: boolean;
  maxAttendees?: number;
  currentAttendees: number;
  registrationRequired: boolean;
  registrationUrl?: string;
  agenda: EventAgendaItem[];
  speakers: EventSpeaker[];
  cost?: number;
  currency?: string;
  prerequisites?: string[];
  materials?: string[];
}

export interface EventAgendaItem {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  duration: number;
  speaker?: string;
  type: 'presentation' | 'discussion' | 'qa' | 'break' | 'networking';
}

export interface EventSpeaker {
  id: string;
  name: string;
  title: string;
  company?: string;
  bio: string;
  avatar?: string;
  socialLinks: { platform: string; url: string }[];
}

export interface PostReply {
  id: string;
  postId: string;
  parentId?: string;
  content: string;
  authorId: string;
  author: ForumUser;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  dislikes: number;
  isDeleted: boolean;
  deletedAt?: Date;
  deletedBy?: string;
  deleteReason?: string;
  editHistory: PostEdit[];
  attachments: PostAttachment[];
  moderationFlags: ModerationFlag[];
  isBestAnswer: boolean;
  isModeratorReply: boolean;
  depth: number;
  replies: PostReply[];
}

export interface ModerationFlag {
  id: string;
  type: 'spam' | 'inappropriate' | 'harassment' | 'misinformation' | 'copyright' | 'other';
  reason: string;
  reportedBy: string;
  reportedAt: Date;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  reviewedBy?: string;
  reviewedAt?: Date;
  action?: ModerationAction;
  notes?: string;
}

export interface ModerationAction {
  type: 'none' | 'warning' | 'edit' | 'delete' | 'lock' | 'ban' | 'suspend';
  duration?: number;
  reason: string;
  executedBy: string;
  executedAt: Date;
  appealable: boolean;
  appealDeadline?: Date;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  parentId?: string;
  subcategories: ForumCategory[];
  postCount: number;
  memberCount: number;
  todaysPosts: number;
  lastActivity: Date;
  moderators: string[];
  rules: string[];
  isRestricted: boolean;
  requiredLevel?: string;
  requiredBadges?: string[];
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  settings: CategorySettings;
}

export interface CategorySettings {
  allowImages: boolean;
  allowAttachments: boolean;
  requireApproval: boolean;
  autoModeration: boolean;
  maxPostLength: number;
  maxAttachmentSize: number;
  allowedFileTypes: string[];
  postCooldown: number;
  reputationRequired: number;
  tagsRequired: boolean;
  maxTags: number;
}

export interface ForumSearch {
  query: string;
  categories: string[];
  tags: string[];
  authors: string[];
  dateRange: {
    start?: Date;
    end?: Date;
  };
  postTypes: PostType[];
  sortBy: 'relevance' | 'date' | 'popularity' | 'replies';
  sortOrder: 'asc' | 'desc';
  includeReplies: boolean;
  minReputation?: number;
  hasAttachments?: boolean;
  isVerified?: boolean;
}

export interface ForumNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data: any;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
  actionUrl?: string;
  actionText?: string;
}

export type NotificationType = 
  | 'post_reply'
  | 'post_like'
  | 'mention'
  | 'follow'
  | 'badge_earned'
  | 'moderation_action'
  | 'system_announcement'
  | 'squad_invitation'
  | 'event_reminder'
  | 'trading_alert';

export interface ReputationTransaction {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  sourceType: 'post' | 'reply' | 'like' | 'badge' | 'moderation' | 'manual';
  sourceId?: string;
  createdAt: Date;
  createdBy?: string;
  description: string;
}

export interface ForumAnalytics {
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  startDate: Date;
  endDate: Date;
  metrics: {
    totalPosts: number;
    totalReplies: number;
    totalViews: number;
    totalLikes: number;
    activeUsers: number;
    newUsers: number;
    engagementRate: number;
    qualityScore: number;
    moderationActions: number;
    reportRate: number;
  };
  categoryBreakdown: CategoryMetrics[];
  userEngagement: UserEngagementMetrics[];
  contentQuality: ContentQualityMetrics;
  trendingTopics: TrendingTopic[];
}

export interface CategoryMetrics {
  categoryId: string;
  categoryName: string;
  posts: number;
  replies: number;
  views: number;
  likes: number;
  activeUsers: number;
  engagementRate: number;
  qualityScore: number;
  growthRate: number;
}

export interface UserEngagementMetrics {
  userId: string;
  username: string;
  posts: number;
  replies: number;
  likes: number;
  views: number;
  engagementScore: number;
  qualityScore: number;
  helpfulnessScore: number;
}

export interface ContentQualityMetrics {
  averagePostLength: number;
  averageReplies: number;
  averageLikes: number;
  spamRate: number;
  reportRate: number;
  moderationRate: number;
  featuredRate: number;
  verifiedContentRate: number;
}

export interface TrendingTopic {
  tag: string;
  mentions: number;
  growth: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  relatedPosts: string[];
}