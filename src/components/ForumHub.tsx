import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ForumCategory } from './ForumCategory';
import { PostCreator } from './PostCreator';
import { PostDetail } from './PostDetail';
import { UserProfile } from './UserProfile';
import { AdminDashboard } from './AdminDashboard';
import { 
  MessageCircle, 
  TrendingUp, 
  Search, 
  Filter, 
  Plus, 
  Star,
  Eye,
  Clock,
  Users,
  BarChart3,
  Building2,
  Target,
  Globe,
  Zap,
  Award,
  Shield,
  Bell,
  Settings,
  Pin,
  Flag,
  ArrowRight,
  ChevronRight,
  Activity,
  FileText,
  Briefcase,
  GraduationCap,
  DollarSign,
  Brain,
  Lightbulb,
  Handshake,
  Calendar,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  Hash,
  Image,
  Link2,
  ThumbsUp,
  Reply,
  Share,
  Bookmark,
  MoreHorizontal
} from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    level: 'S-Tier' | 'A-Tier' | 'B-Tier' | 'C-Tier';
    reputation: number;
    badges: string[];
    tradingStats?: {
      winRate: number;
      totalTrades: number;
      avgReturn: number;
    };
  };
  category: string;
  subcategory?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  replies: number;
  isPinned: boolean;
  isLocked: boolean;
  isFeatured: boolean;
  hasImages: boolean;
  hasCharts: boolean;
  tradingData?: {
    asset: string;
    direction: 'long' | 'short';
    entryPrice?: number;
    targetPrice?: number;
    stopLoss?: number;
    timeframe: string;
    confidence: number;
  };
  businessData?: {
    type: 'opportunity' | 'partnership' | 'resource' | 'event';
    industry?: string;
    location?: string;
    budget?: string;
    timeline?: string;
  };
}

interface ForumCategoryData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  subcategories: Array<{
    id: string;
    name: string;
    description: string;
    postCount: number;
    lastActivity: Date;
  }>;
  postCount: number;
  todaysPosts: number;
  memberCount: number;
  moderators: string[];
  rules: string[];
  isRestricted: boolean;
}

interface ForumHubProps {
  onBack: () => void;
  onLogout: () => void;
}

export const ForumHub: React.FC<ForumHubProps> = ({ onBack, onLogout }) => {
  const [activeView, setActiveView] = useState<'categories' | 'category' | 'post' | 'create' | 'profile' | 'admin'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);

  // Forum categories with comprehensive trading/business focus
  const forumCategories: ForumCategoryData[] = [
    {
      id: 'trading-strategies',
      name: 'Trading Strategies & Systems',
      description: 'Share and discuss trading strategies, system development, and methodology',
      icon: Target,
      color: 'text-primary',
      subcategories: [
        { id: 'price-action', name: 'Price Action Trading', description: 'Pure price action strategies and setups', postCount: 234, lastActivity: new Date() },
        { id: 'technical-analysis', name: 'Technical Analysis', description: 'Indicators, patterns, and technical methods', postCount: 189, lastActivity: new Date() },
        { id: 'algorithmic', name: 'Algorithmic Trading', description: 'Automated systems and quantitative strategies', postCount: 156, lastActivity: new Date() },
        { id: 'scalping', name: 'Scalping & Day Trading', description: 'Short-term trading strategies and techniques', postCount: 298, lastActivity: new Date() },
        { id: 'swing-position', name: 'Swing & Position Trading', description: 'Medium to long-term trading approaches', postCount: 167, lastActivity: new Date() }
      ],
      postCount: 1044,
      todaysPosts: 23,
      memberCount: 2847,
      moderators: ['TradingMaster', 'StrategyExpert'],
      rules: ['Share complete strategy details', 'Include risk management', 'Provide backtesting results'],
      isRestricted: false
    },
    {
      id: 'market-analysis',
      name: 'Market Analysis & Research',
      description: 'Daily market analysis, economic research, and trading opportunities',
      icon: BarChart3,
      color: 'text-secondary',
      subcategories: [
        { id: 'daily-analysis', name: 'Daily Market Analysis', description: 'Daily market outlook and trading opportunities', postCount: 456, lastActivity: new Date() },
        { id: 'economic-calendar', name: 'Economic Calendar & News', description: 'Economic events and their market impact', postCount: 234, lastActivity: new Date() },
        { id: 'sector-analysis', name: 'Sector & Industry Analysis', description: 'Sector rotation and industry-specific insights', postCount: 189, lastActivity: new Date() },
        { id: 'crypto-analysis', name: 'Cryptocurrency Analysis', description: 'Digital asset analysis and opportunities', postCount: 298, lastActivity: new Date() },
        { id: 'commodities', name: 'Commodities & Futures', description: 'Commodity markets and futures trading', postCount: 167, lastActivity: new Date() }
      ],
      postCount: 1344,
      todaysPosts: 34,
      memberCount: 3156,
      moderators: ['MarketAnalyst', 'EconExpert'],
      rules: ['Provide data sources', 'Include timeframe context', 'Update with results'],
      isRestricted: false
    },
    {
      id: 'business-development',
      name: 'Business Development & Entrepreneurship',
      description: 'Building trading businesses, scaling operations, and entrepreneurship',
      icon: Building2,
      color: 'text-primary',
      subcategories: [
        { id: 'trading-business', name: 'Trading Business Setup', description: 'Starting and structuring trading businesses', postCount: 123, lastActivity: new Date() },
        { id: 'scaling-operations', name: 'Scaling Operations', description: 'Growing and systematizing trading operations', postCount: 89, lastActivity: new Date() },
        { id: 'partnerships', name: 'Partnerships & Collaborations', description: 'Finding partners and collaboration opportunities', postCount: 67, lastActivity: new Date() },
        { id: 'funding-capital', name: 'Funding & Capital Raising', description: 'Securing capital and investment opportunities', postCount: 45, lastActivity: new Date() },
        { id: 'legal-compliance', name: 'Legal & Compliance', description: 'Regulatory requirements and legal considerations', postCount: 78, lastActivity: new Date() }
      ],
      postCount: 402,
      todaysPosts: 8,
      memberCount: 1234,
      moderators: ['BusinessExpert', 'LegalAdvisor'],
      rules: ['Verify business claims', 'No direct solicitation', 'Include risk disclosures'],
      isRestricted: true
    },
    {
      id: 'portfolio-showcase',
      name: 'Portfolio Showcase & Performance',
      description: 'Share trading results, portfolio analysis, and performance reviews',
      icon: TrendingUp,
      color: 'text-secondary',
      subcategories: [
        { id: 'monthly-reviews', name: 'Monthly Performance Reviews', description: 'Monthly trading performance analysis', postCount: 167, lastActivity: new Date() },
        { id: 'portfolio-analysis', name: 'Portfolio Analysis', description: 'Portfolio construction and optimization', postCount: 134, lastActivity: new Date() },
        { id: 'risk-management', name: 'Risk Management Case Studies', description: 'Real-world risk management examples', postCount: 98, lastActivity: new Date() },
        { id: 'lessons-learned', name: 'Lessons Learned', description: 'Trading mistakes and learning experiences', postCount: 234, lastActivity: new Date() },
        { id: 'success-stories', name: 'Success Stories', description: 'Trading achievements and milestones', postCount: 89, lastActivity: new Date() }
      ],
      postCount: 722,
      todaysPosts: 15,
      memberCount: 1876,
      moderators: ['PerformanceExpert'],
      rules: ['Verify performance claims', 'Include risk metrics', 'Show complete picture'],
      isRestricted: true
    },
    {
      id: 'education-resources',
      name: 'Education & Resources',
      description: 'Learning materials, courses, books, and educational discussions',
      icon: GraduationCap,
      color: 'text-primary',
      subcategories: [
        { id: 'course-reviews', name: 'Course Reviews', description: 'Reviews of trading courses and education', postCount: 145, lastActivity: new Date() },
        { id: 'book-discussions', name: 'Book Discussions', description: 'Trading and business book discussions', postCount: 123, lastActivity: new Date() },
        { id: 'free-resources', name: 'Free Resources', description: 'Free educational materials and tools', postCount: 234, lastActivity: new Date() },
        { id: 'study-groups', name: 'Study Groups', description: 'Collaborative learning and study sessions', postCount: 89, lastActivity: new Date() },
        { id: 'mentorship', name: 'Mentorship Connections', description: 'Mentor-mentee matching and guidance', postCount: 67, lastActivity: new Date() }
      ],
      postCount: 658,
      todaysPosts: 12,
      memberCount: 2345,
      moderators: ['EducationExpert'],
      rules: ['Verify educational claims', 'No affiliate links without disclosure', 'Focus on learning value'],
      isRestricted: false
    },
    {
      id: 'technology-tools',
      name: 'Technology & Tools',
      description: 'Trading platforms, tools, software, and technology discussions',
      icon: Zap,
      color: 'text-secondary',
      subcategories: [
        { id: 'platform-reviews', name: 'Platform Reviews', description: 'Trading platform comparisons and reviews', postCount: 178, lastActivity: new Date() },
        { id: 'trading-tools', name: 'Trading Tools & Software', description: 'Tools, indicators, and software recommendations', postCount: 234, lastActivity: new Date() },
        { id: 'automation', name: 'Trading Automation', description: 'Automated trading systems and bots', postCount: 123, lastActivity: new Date() },
        { id: 'data-feeds', name: 'Data Feeds & APIs', description: 'Market data sources and API discussions', postCount: 89, lastActivity: new Date() },
        { id: 'mobile-trading', name: 'Mobile Trading', description: 'Mobile apps and on-the-go trading', postCount: 67, lastActivity: new Date() }
      ],
      postCount: 691,
      todaysPosts: 18,
      memberCount: 1567,
      moderators: ['TechExpert'],
      rules: ['No affiliate links without disclosure', 'Include honest pros/cons', 'Verify technical claims'],
      isRestricted: false
    },
    {
      id: 'psychology-mindset',
      name: 'Trading Psychology & Mindset',
      description: 'Mental aspects of trading, discipline, and psychological development',
      icon: Brain,
      color: 'text-primary',
      subcategories: [
        { id: 'discipline', name: 'Discipline & Consistency', description: 'Building trading discipline and consistency', postCount: 234, lastActivity: new Date() },
        { id: 'emotional-control', name: 'Emotional Control', description: 'Managing emotions and psychological pressure', postCount: 189, lastActivity: new Date() },
        { id: 'mindset-development', name: 'Mindset Development', description: 'Developing winning trader psychology', postCount: 156, lastActivity: new Date() },
        { id: 'stress-management', name: 'Stress Management', description: 'Handling trading stress and pressure', postCount: 123, lastActivity: new Date() },
        { id: 'motivation', name: 'Motivation & Goals', description: 'Setting and achieving trading goals', postCount: 98, lastActivity: new Date() }
      ],
      postCount: 800,
      todaysPosts: 16,
      memberCount: 2134,
      moderators: ['PsychologyExpert'],
      rules: ['Share personal experiences', 'Be supportive and constructive', 'No medical advice'],
      isRestricted: false
    },
    {
      id: 'networking-events',
      name: 'Networking & Events',
      description: 'Professional networking, events, meetups, and community building',
      icon: Users,
      color: 'text-secondary',
      subcategories: [
        { id: 'local-meetups', name: 'Local Meetups', description: 'Regional trading meetups and events', postCount: 89, lastActivity: new Date() },
        { id: 'virtual-events', name: 'Virtual Events', description: 'Online webinars and virtual meetups', postCount: 123, lastActivity: new Date() },
        { id: 'conferences', name: 'Conferences & Seminars', description: 'Trading conferences and educational events', postCount: 67, lastActivity: new Date() },
        { id: 'networking', name: 'Professional Networking', description: 'Building professional trading networks', postCount: 45, lastActivity: new Date() },
        { id: 'job-board', name: 'Job Board', description: 'Trading jobs and career opportunities', postCount: 78, lastActivity: new Date() }
      ],
      postCount: 402,
      todaysPosts: 6,
      memberCount: 987,
      moderators: ['NetworkingExpert'],
      rules: ['Verify event details', 'No spam or excessive promotion', 'Include location/timezone'],
      isRestricted: false
    }
  ];

  // Sample posts data
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'XAUUSD Breakout Strategy - 3R Setup with Volume Confirmation',
      content: 'Sharing my systematic approach to gold breakouts above key resistance levels. This strategy focuses on volume confirmation and multiple timeframe alignment for high-probability entries...',
      author: {
        id: 'user1',
        username: 'goldwarrior',
        displayName: 'Gold Warrior',
        avatar: 'GW',
        level: 'A-Tier',
        reputation: 2847,
        badges: ['Gold Specialist', 'Strategy Developer', 'Mentor'],
        tradingStats: {
          winRate: 73,
          totalTrades: 234,
          avgReturn: 2.4
        }
      },
      category: 'trading-strategies',
      subcategory: 'price-action',
      tags: ['gold', 'breakout', 'volume', 'strategy'],
      createdAt: new Date('2024-01-15T10:30:00'),
      updatedAt: new Date('2024-01-15T10:30:00'),
      views: 456,
      likes: 34,
      replies: 12,
      isPinned: false,
      isLocked: false,
      isFeatured: true,
      hasImages: true,
      hasCharts: true,
      tradingData: {
        asset: 'XAUUSD',
        direction: 'long',
        entryPrice: 2020,
        targetPrice: 2080,
        stopLoss: 2000,
        timeframe: '4H',
        confidence: 85
      }
    },
    {
      id: '2',
      title: 'Building a Trading Education Business - 6 Month Case Study',
      content: 'Documenting my journey from solo trader to education business owner. Sharing the complete process, challenges, and results from building a trading education platform...',
      author: {
        id: 'user2',
        username: 'edupreneur',
        displayName: 'Education Entrepreneur',
        avatar: 'EE',
        level: 'S-Tier',
        reputation: 4567,
        badges: ['Business Builder', 'Content Creator', 'Verified Entrepreneur'],
        tradingStats: {
          winRate: 68,
          totalTrades: 567,
          avgReturn: 1.8
        }
      },
      category: 'business-development',
      subcategory: 'trading-business',
      tags: ['business', 'education', 'case-study', 'entrepreneurship'],
      createdAt: new Date('2024-01-14T14:20:00'),
      updatedAt: new Date('2024-01-14T14:20:00'),
      views: 789,
      likes: 67,
      replies: 23,
      isPinned: true,
      isLocked: false,
      isFeatured: true,
      hasImages: true,
      hasCharts: false,
      businessData: {
        type: 'resource',
        industry: 'Education',
        timeline: '6 months',
        budget: '$50k initial investment'
      }
    }
  ]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveView('category');
  };

  const handlePostSelect = (postId: string) => {
    setSelectedPost(postId);
    setActiveView('post');
  };

  const handleCreatePost = () => {
    setActiveView('create');
  };

  const handleUserProfile = (userId: string) => {
    setSelectedUser(userId);
    setActiveView('profile');
  };

  const renderCategoriesView = () => (
    <div className="space-y-6">
      {/* Forum Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          Trading & Business
          <span className="block gradient-text">Discussion Forums</span>
        </h2>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
          Professional discussions on trading strategies, market analysis, business development, 
          and entrepreneurship. Share knowledge, build networks, and grow together.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="military-card text-center">
          <CardContent className="p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">4,847</div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </CardContent>
        </Card>
        
        <Card className="military-card text-center">
          <CardContent className="p-6">
            <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-secondary mb-1">12,456</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </CardContent>
        </Card>
        
        <Card className="military-card text-center">
          <CardContent className="p-6">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">132</div>
            <div className="text-sm text-muted-foreground">Posts Today</div>
          </CardContent>
        </Card>
        
        <Card className="military-card text-center">
          <CardContent className="p-6">
            <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-secondary mb-1">89%</div>
            <div className="text-sm text-muted-foreground">Quality Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search forums, posts, and discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="replies">Most Replies</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleCreatePost} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
          <Star className="w-5 h-5 text-primary" />
          <span>Featured Discussions</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.filter(post => post.isFeatured).slice(0, 2).map(post => (
            <Card key={post.id} className="military-card cursor-pointer hover:border-primary/30" onClick={() => handlePostSelect(post.id)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 line-clamp-2">{post.title}</CardTitle>
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">{post.author.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{post.author.displayName}</span>
                      <Badge className="text-xs">{post.author.level}</Badge>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary">Featured</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.content}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Reply className="w-3 h-3" />
                      <span>{post.replies}</span>
                    </span>
                  </div>
                  <span>{post.createdAt.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Forum Categories */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Forum Categories</h3>
        <div className="space-y-4">
          {forumCategories.map(category => (
            <Card key={category.id} className="military-card cursor-pointer hover:border-primary/30" onClick={() => handleCategorySelect(category.id)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-bold">{category.name}</h3>
                        {category.isRestricted && (
                          <Badge className="bg-secondary/10 text-secondary text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified Only
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{category.description}</p>
                      
                      {/* Subcategories Preview */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {category.subcategories.slice(0, 3).map(sub => (
                          <Badge key={sub.id} variant="outline" className="text-xs">
                            {sub.name}
                          </Badge>
                        ))}
                        {category.subcategories.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{category.subcategories.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{category.postCount} posts</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{category.memberCount.toLocaleString()} members</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Activity className="w-4 h-4" />
                          <span>{category.todaysPosts} today</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-secondary" />
              <span>Recent Posts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.slice(0, 5).map(post => (
                <div key={post.id} className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => handlePostSelect(post.id)}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">{post.author.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">{post.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{post.author.displayName}</span>
                      <span>•</span>
                      <span>{post.createdAt.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.replies} replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Top Contributors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Gold Warrior', reputation: 2847, posts: 234, level: 'A-Tier' },
                { name: 'Strategy Master', reputation: 3456, posts: 189, level: 'S-Tier' },
                { name: 'Risk Expert', reputation: 2134, posts: 156, level: 'A-Tier' },
                { name: 'Macro Analyst', reputation: 2789, posts: 198, level: 'A-Tier' },
                { name: 'Business Builder', reputation: 1987, posts: 123, level: 'B-Tier' }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => handleUserProfile(user.name)}>
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-bold text-primary">#{index + 1}</div>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.posts} posts</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="text-xs mb-1">{user.level}</Badge>
                    <div className="text-xs text-muted-foreground">{user.reputation} rep</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {activeView === 'categories' && renderCategoriesView()}
      {activeView === 'category' && (
        <ForumCategory
          categoryId={selectedCategory}
          onBack={() => setActiveView('categories')}
          onPostSelect={handlePostSelect}
          onCreatePost={handleCreatePost}
        />
      )}
      {activeView === 'post' && (
        <PostDetail
          postId={selectedPost}
          onBack={() => setActiveView('category')}
          onUserProfile={handleUserProfile}
        />
      )}
      {activeView === 'create' && (
        <PostCreator
          onBack={() => setActiveView('categories')}
          onPostCreated={(postId) => {
            setSelectedPost(postId);
            setActiveView('post');
          }}
        />
      )}
      {activeView === 'profile' && (
        <UserProfile
          userId={selectedUser}
          onBack={() => setActiveView('categories')}
        />
      )}
      {activeView === 'admin' && (
        <AdminDashboard
          onBack={() => setActiveView('categories')}
        />
      )}
    </div>
  );
};