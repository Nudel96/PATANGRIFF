import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ForumPostEditor } from './ForumPostEditor';
import { TradingChart } from './TradingChart';
import { UserProfile } from './UserProfile';
import { 
  ArrowLeft,
  LogOut,
  MessageCircle,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Users,
  Star,
  Award,
  Pin,
  Flag,
  Share,
  Bookmark,
  Reply,
  Quote,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Bell,
  Settings,
  Hash,
  Tag,
  Calendar,
  BarChart3,
  DollarSign,
  Globe,
  Activity,
  Target,
  Brain,
  Building2,
  Zap,
  Shield,
  Crown,
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  Image,
  Video,
  FileText,
  Link,
  Paperclip,
  Send,
  RefreshCw,
  SortDesc,
  Grid,
  List,
  Flame,
  TrendingDown,
  MessageSquare,
  UserPlus,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Verified
} from 'lucide-react';

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  postCount: number;
  memberCount: number;
  lastActivity: Date;
  subCategories: SubCategory[];
  moderators: string[];
  isPrivate: boolean;
  requiredLevel: string;
}

interface SubCategory {
  id: string;
  name: string;
  description: string;
  postCount: number;
  lastActivity: Date;
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: ForumUser;
  category: string;
  subCategory?: string;
  type: 'discussion' | 'question' | 'analysis' | 'news' | 'poll' | 'trade-idea';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
  upvotes: number;
  downvotes: number;
  replyCount: number;
  isPinned: boolean;
  isLocked: boolean;
  isFeatured: boolean;
  hasImages: boolean;
  hasCharts: boolean;
  tradingData?: TradingData;
  pollData?: PollData;
  status: 'active' | 'pending' | 'archived' | 'deleted';
  lastReply?: Date;
  lastReplyBy?: string;
}

interface ForumUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'moderator' | 'premium' | 'member' | 'guest';
  level: 'S-Tier' | 'A-Tier' | 'B-Tier' | 'C-Tier' | 'Unranked';
  reputation: number;
  postCount: number;
  joinDate: Date;
  lastActive: Date;
  badges: string[];
  specializations: string[];
  tradingExperience: number;
  isVerified: boolean;
  location?: string;
  website?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
}

interface TradingData {
  instrument: string;
  direction: 'long' | 'short';
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  riskReward: number;
  timeframe: string;
  analysis: string;
  chartUrl?: string;
}

interface PollData {
  question: string;
  options: PollOption[];
  totalVotes: number;
  expiresAt?: Date;
  allowMultiple: boolean;
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface ForumReply {
  id: string;
  postId: string;
  content: string;
  author: ForumUser;
  createdAt: Date;
  updatedAt: Date;
  upvotes: number;
  downvotes: number;
  parentReplyId?: string;
  isEdited: boolean;
  editedAt?: Date;
  replies: ForumReply[];
}

interface TradingForumProps {
  onBack: () => void;
  onLogout: () => void;
}

export const TradingForum: React.FC<TradingForumProps> = ({ onBack, onLogout }) => {
  const [activeView, setActiveView] = useState<'categories' | 'category' | 'post' | 'create' | 'profile'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory | null>(null);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [selectedUser, setSelectedUser] = useState<ForumUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Sample forum categories
  const forumCategories: ForumCategory[] = [
    {
      id: 'stocks',
      name: 'Stock Trading',
      description: 'Equity markets, stock analysis, and investment strategies',
      icon: TrendingUp,
      color: 'text-blue-500',
      postCount: 2847,
      memberCount: 1523,
      lastActivity: new Date(),
      moderators: ['StockMaster', 'EquityPro'],
      isPrivate: false,
      requiredLevel: 'C-Tier',
      subCategories: [
        { id: 'technical-analysis', name: 'Technical Analysis', description: 'Chart patterns, indicators, and technical strategies', postCount: 892, lastActivity: new Date() },
        { id: 'fundamental-analysis', name: 'Fundamental Analysis', description: 'Company financials, earnings, and valuation', postCount: 654, lastActivity: new Date() },
        { id: 'day-trading', name: 'Day Trading', description: 'Intraday strategies and scalping techniques', postCount: 743, lastActivity: new Date() },
        { id: 'swing-trading', name: 'Swing Trading', description: 'Multi-day position strategies', postCount: 558, lastActivity: new Date() }
      ]
    },
    {
      id: 'forex',
      name: 'Forex Trading',
      description: 'Currency markets, FX analysis, and international trading',
      icon: Globe,
      color: 'text-green-500',
      postCount: 3421,
      memberCount: 2156,
      lastActivity: new Date(),
      moderators: ['FXWarrior', 'CurrencyKing'],
      isPrivate: false,
      requiredLevel: 'C-Tier',
      subCategories: [
        { id: 'major-pairs', name: 'Major Pairs', description: 'EUR/USD, GBP/USD, USD/JPY analysis', postCount: 1234, lastActivity: new Date() },
        { id: 'exotic-pairs', name: 'Exotic Pairs', description: 'Emerging market currencies and exotic pairs', postCount: 567, lastActivity: new Date() },
        { id: 'central-banks', name: 'Central Bank Policy', description: 'Fed, ECB, BOJ policy analysis', postCount: 789, lastActivity: new Date() },
        { id: 'economic-data', name: 'Economic Data', description: 'NFP, CPI, GDP and economic indicators', postCount: 831, lastActivity: new Date() }
      ]
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Digital assets, blockchain technology, and crypto trading',
      icon: Zap,
      color: 'text-orange-500',
      postCount: 1892,
      memberCount: 1834,
      lastActivity: new Date(),
      moderators: ['CryptoSage', 'BlockchainPro'],
      isPrivate: false,
      requiredLevel: 'C-Tier',
      subCategories: [
        { id: 'bitcoin', name: 'Bitcoin', description: 'BTC analysis and trading strategies', postCount: 567, lastActivity: new Date() },
        { id: 'altcoins', name: 'Altcoins', description: 'Alternative cryptocurrency discussions', postCount: 423, lastActivity: new Date() },
        { id: 'defi', name: 'DeFi & Yield', description: 'Decentralized finance and yield strategies', postCount: 345, lastActivity: new Date() },
        { id: 'nft', name: 'NFTs & Gaming', description: 'Non-fungible tokens and gaming tokens', postCount: 557, lastActivity: new Date() }
      ]
    },
    {
      id: 'commodities',
      name: 'Commodities',
      description: 'Gold, oil, agricultural products, and commodity trading',
      icon: BarChart3,
      color: 'text-yellow-500',
      postCount: 1456,
      memberCount: 987,
      lastActivity: new Date(),
      moderators: ['GoldBull', 'OilAnalyst'],
      isPrivate: false,
      requiredLevel: 'C-Tier',
      subCategories: [
        { id: 'precious-metals', name: 'Precious Metals', description: 'Gold, silver, platinum trading', postCount: 678, lastActivity: new Date() },
        { id: 'energy', name: 'Energy', description: 'Oil, gas, and energy commodity analysis', postCount: 445, lastActivity: new Date() },
        { id: 'agriculture', name: 'Agriculture', description: 'Wheat, corn, soybeans, and agricultural futures', postCount: 333, lastActivity: new Date() }
      ]
    },
    {
      id: 'options',
      name: 'Options Trading',
      description: 'Options strategies, volatility trading, and derivatives',
      icon: Target,
      color: 'text-purple-500',
      postCount: 987,
      memberCount: 654,
      lastActivity: new Date(),
      moderators: ['OptionsGuru', 'VolatilityKing'],
      isPrivate: false,
      requiredLevel: 'B-Tier',
      subCategories: [
        { id: 'basic-strategies', name: 'Basic Strategies', description: 'Calls, puts, and simple strategies', postCount: 234, lastActivity: new Date() },
        { id: 'advanced-strategies', name: 'Advanced Strategies', description: 'Spreads, straddles, and complex strategies', postCount: 345, lastActivity: new Date() },
        { id: 'volatility', name: 'Volatility Trading', description: 'VIX, volatility strategies, and market timing', postCount: 408, lastActivity: new Date() }
      ]
    },
    {
      id: 'psychology',
      name: 'Trading Psychology',
      description: 'Mental game, discipline, and psychological aspects of trading',
      icon: Brain,
      color: 'text-pink-500',
      postCount: 1234,
      memberCount: 1876,
      lastActivity: new Date(),
      moderators: ['MindMaster', 'PsychTrader'],
      isPrivate: false,
      requiredLevel: 'C-Tier',
      subCategories: [
        { id: 'discipline', name: 'Discipline & Habits', description: 'Building trading discipline and good habits', postCount: 456, lastActivity: new Date() },
        { id: 'emotions', name: 'Emotional Control', description: 'Managing fear, greed, and trading emotions', postCount: 389, lastActivity: new Date() },
        { id: 'performance', name: 'Performance Optimization', description: 'Peak performance and mental edge', postCount: 389, lastActivity: new Date() }
      ]
    },
    {
      id: 'business',
      name: 'Trading Business',
      description: 'Professional trading, business development, and career growth',
      icon: Building2,
      color: 'text-indigo-500',
      postCount: 756,
      memberCount: 543,
      lastActivity: new Date(),
      moderators: ['BusinessPro', 'TradingCEO'],
      isPrivate: false,
      requiredLevel: 'B-Tier',
      subCategories: [
        { id: 'prop-trading', name: 'Prop Trading', description: 'Proprietary trading firms and funded accounts', postCount: 234, lastActivity: new Date() },
        { id: 'business-dev', name: 'Business Development', description: 'Building trading-related businesses', postCount: 189, lastActivity: new Date() },
        { id: 'career', name: 'Trading Careers', description: 'Career paths and professional development', postCount: 333, lastActivity: new Date() }
      ]
    },
    {
      id: 'elite',
      name: 'Elite Traders Only',
      description: 'Exclusive forum for verified professional traders',
      icon: Crown,
      color: 'text-gold-500',
      postCount: 234,
      memberCount: 89,
      lastActivity: new Date(),
      moderators: ['EliteAdmin', 'ProTrader'],
      isPrivate: true,
      requiredLevel: 'S-Tier',
      subCategories: [
        { id: 'institutional', name: 'Institutional Trading', description: 'Large-scale trading strategies and insights', postCount: 89, lastActivity: new Date() },
        { id: 'alpha-strategies', name: 'Alpha Strategies', description: 'Proprietary strategies and edge development', postCount: 67, lastActivity: new Date() },
        { id: 'market-making', name: 'Market Making', description: 'Liquidity provision and market structure', postCount: 78, lastActivity: new Date() }
      ]
    }
  ];

  // Sample posts data
  const samplePosts: ForumPost[] = [
    {
      id: '1',
      title: 'XAUUSD Technical Analysis - Bullish Breakout Setup',
      content: 'Gold has broken above the key resistance at 2020 with strong volume. Multiple timeframe confluence suggests continuation to 2045-2050 area. Risk management: Stop below 2015, targeting 3:1 R/R.',
      author: {
        id: '1',
        username: 'GoldMaster',
        displayName: 'Gold Master',
        email: 'gold@example.com',
        role: 'premium',
        level: 'A-Tier',
        reputation: 2847,
        postCount: 234,
        joinDate: new Date('2023-01-15'),
        lastActive: new Date(),
        badges: ['Gold Specialist', 'Technical Expert', 'Top Contributor'],
        specializations: ['Gold Trading', 'Technical Analysis'],
        tradingExperience: 8,
        isVerified: true,
        followersCount: 456,
        followingCount: 123
      },
      category: 'commodities',
      subCategory: 'precious-metals',
      type: 'analysis',
      tags: ['XAUUSD', 'gold', 'technical-analysis', 'breakout', 'bullish'],
      createdAt: new Date('2024-01-15T10:30:00'),
      updatedAt: new Date('2024-01-15T10:30:00'),
      views: 234,
      upvotes: 45,
      downvotes: 3,
      replyCount: 12,
      isPinned: false,
      isLocked: false,
      isFeatured: true,
      hasImages: true,
      hasCharts: true,
      tradingData: {
        instrument: 'XAUUSD',
        direction: 'long',
        entryPrice: 2022,
        stopLoss: 2015,
        takeProfit: 2045,
        riskReward: 3.0,
        timeframe: '4H',
        analysis: 'Bullish breakout with volume confirmation'
      },
      status: 'active',
      lastReply: new Date('2024-01-15T14:20:00'),
      lastReplyBy: 'TechnicalTrader'
    },
    {
      id: '2',
      title: 'Fed Rate Decision Impact on USD Pairs - Discussion',
      content: 'With the Fed meeting tomorrow, what are your thoughts on potential USD volatility? I\'m seeing mixed signals from the bond market and would love to hear different perspectives.',
      author: {
        id: '2',
        username: 'MacroAnalyst',
        displayName: 'Macro Analyst',
        email: 'macro@example.com',
        role: 'member',
        level: 'B-Tier',
        reputation: 1456,
        postCount: 89,
        joinDate: new Date('2023-06-20'),
        lastActive: new Date(),
        badges: ['Macro Expert', 'Discussion Leader'],
        specializations: ['Fundamental Analysis', 'Central Bank Policy'],
        tradingExperience: 5,
        isVerified: false,
        followersCount: 234,
        followingCount: 67
      },
      category: 'forex',
      subCategory: 'central-banks',
      type: 'discussion',
      tags: ['USD', 'fed', 'interest-rates', 'volatility', 'discussion'],
      createdAt: new Date('2024-01-15T08:15:00'),
      updatedAt: new Date('2024-01-15T08:15:00'),
      views: 156,
      upvotes: 23,
      downvotes: 1,
      replyCount: 18,
      isPinned: true,
      isLocked: false,
      isFeatured: false,
      hasImages: false,
      hasCharts: false,
      status: 'active',
      lastReply: new Date('2024-01-15T15:45:00'),
      lastReplyBy: 'FedWatcher'
    }
  ];

  const [posts, setPosts] = useState<ForumPost[]>(samplePosts);
  const [replies, setReplies] = useState<ForumReply[]>([]);

  const handleCategorySelect = (category: ForumCategory) => {
    setSelectedCategory(category);
    setActiveView('category');
  };

  const handlePostSelect = (post: ForumPost) => {
    setSelectedPost(post);
    setActiveView('post');
    // Increment view count
    setPosts(posts.map(p => p.id === post.id ? { ...p, views: p.views + 1 } : p));
  };

  const handleUserSelect = (user: ForumUser) => {
    setSelectedUser(user);
    setActiveView('profile');
  };

  const handleCreatePost = () => {
    setShowCreatePost(true);
    setActiveView('create');
  };

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          upvotes: voteType === 'up' ? post.upvotes + 1 : post.upvotes,
          downvotes: voteType === 'down' ? post.downvotes + 1 : post.downvotes
        };
      }
      return post;
    }));
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'question': return MessageSquare;
      case 'analysis': return BarChart3;
      case 'news': return Bell;
      case 'poll': return Target;
      case 'trade-idea': return TrendingUp;
      default: return MessageCircle;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'bg-blue-500/10 text-blue-500';
      case 'analysis': return 'bg-green-500/10 text-green-500';
      case 'news': return 'bg-red-500/10 text-red-500';
      case 'poll': return 'bg-purple-500/10 text-purple-500';
      case 'trade-idea': return 'bg-primary/10 text-primary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getUserLevelColor = (level: string) => {
    switch (level) {
      case 'S-Tier': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'A-Tier': return 'bg-primary/20 text-primary border-primary/30';
      case 'B-Tier': return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'C-Tier': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const renderCategoriesView = () => (
    <div className="space-y-6">
      {/* Forum Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Trading Forum
          <span className="block gradient-text">Professional Discussion Hub</span>
        </h2>
        <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
          Connect with professional traders, share insights, and learn from the community. 
          Choose your area of expertise and join the conversation.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="military-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">12,847</div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </CardContent>
        </Card>
        <Card className="military-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">5,234</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </CardContent>
        </Card>
        <Card className="military-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">234</div>
            <div className="text-sm text-muted-foreground">Today's Posts</div>
          </CardContent>
        </Card>
        <Card className="military-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">89</div>
            <div className="text-sm text-muted-foreground">Online Now</div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forumCategories.map((category) => (
          <Card 
            key={category.id} 
            className="military-card group cursor-pointer hover:border-primary/30 transition-all duration-300"
            onClick={() => handleCategorySelect(category)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                    {category.isPrivate && (
                      <Badge className="bg-yellow-500/10 text-yellow-500 text-xs mt-1">
                        <Crown className="w-3 h-3 mr-1" />
                        {category.requiredLevel}+ Only
                      </Badge>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posts:</span>
                  <span className="font-medium">{category.postCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Members:</span>
                  <span className="font-medium">{category.memberCount.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Popular Topics:</div>
                <div className="flex flex-wrap gap-1">
                  {category.subCategories.slice(0, 3).map((sub, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {sub.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Last activity: {category.lastActivity.toLocaleDateString()}</span>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{category.memberCount}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="military-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-secondary" />
            <span>Recent Forum Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <div 
                key={post.id} 
                className="flex items-center justify-between p-3 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
                onClick={() => handlePostSelect(post)}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      {post.author.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{post.title}</div>
                    <div className="text-xs text-muted-foreground">
                      by {post.author.displayName} • {post.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.replyCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCategoryView = () => {
    if (!selectedCategory) return null;

    const categoryPosts = posts.filter(post => post.category === selectedCategory.id);

    return (
      <div className="space-y-6">
        {/* Category Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setActiveView('categories')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-3 rounded-xl">
                <selectedCategory.icon className={`w-6 h-6 ${selectedCategory.color}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{selectedCategory.name}</h1>
                <p className="text-muted-foreground">{selectedCategory.description}</p>
              </div>
            </div>
          </div>
          <Button onClick={handleCreatePost} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Sub-categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedCategory.subCategories.map((sub) => (
            <Card key={sub.id} className="military-card cursor-pointer hover:border-primary/30">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{sub.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{sub.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{sub.postCount} posts</span>
                  <span className="text-muted-foreground">{sub.lastActivity.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="discussion">Discussion</SelectItem>
                <SelectItem value="question">Question</SelectItem>
                <SelectItem value="analysis">Analysis</SelectItem>
                <SelectItem value="trade-idea">Trade Ideas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="unanswered">Unanswered</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
            >
              {viewMode === 'list' ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {categoryPosts.map((post) => (
            <Card 
              key={post.id} 
              className="military-card cursor-pointer hover:border-primary/30 transition-all duration-300"
              onClick={() => handlePostSelect(post)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Author Avatar */}
                  <div className="flex-shrink-0">
                    <Avatar className="w-12 h-12 cursor-pointer" onClick={(e) => {
                      e.stopPropagation();
                      handleUserSelect(post.author);
                    }}>
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {post.author.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Post Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {post.isPinned && <Pin className="w-4 h-4 text-primary" />}
                        {post.isFeatured && <Star className="w-4 h-4 text-yellow-500" />}
                        <Badge className={getPostTypeColor(post.type)}>
                          {post.type.replace('-', ' ')}
                        </Badge>
                        <Badge className={getUserLevelColor(post.author.level)}>
                          {post.author.level}
                        </Badge>
                        {post.author.isVerified && (
                          <Verified className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {post.createdAt.toLocaleDateString()} • {post.createdAt.toLocaleTimeString()}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-foreground/70 mb-3 line-clamp-2">
                      {post.content}
                    </p>

                    {/* Trading Data */}
                    {post.tradingData && (
                      <div className="bg-muted/20 p-3 rounded-lg mb-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Instrument:</span>
                            <span className="ml-2 font-medium">{post.tradingData.instrument}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Direction:</span>
                            <span className={`ml-2 font-medium ${
                              post.tradingData.direction === 'long' ? 'text-primary' : 'text-destructive'
                            }`}>
                              {post.tradingData.direction.toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">R/R:</span>
                            <span className="ml-2 font-medium">{post.tradingData.riskReward}:1</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Timeframe:</span>
                            <span className="ml-2 font-medium">{post.tradingData.timeframe}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 5).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Post Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.replyCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{post.upvotes}</span>
                        </div>
                        {post.hasCharts && (
                          <div className="flex items-center space-x-1">
                            <BarChart3 className="w-4 h-4 text-primary" />
                            <span>Chart</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          by {post.author.displayName}
                        </span>
                        {post.lastReply && (
                          <span className="text-xs text-muted-foreground">
                            • Last reply {post.lastReply.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderPostView = () => {
    if (!selectedPost) return null;

    return (
      <div className="space-y-6">
        {/* Post Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setActiveView('category')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {selectedCategory?.name}
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Post */}
        <Card className="military-card">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12 cursor-pointer" onClick={() => handleUserSelect(selectedPost.author)}>
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                    {selectedPost.author.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{selectedPost.author.displayName}</span>
                    <Badge className={getUserLevelColor(selectedPost.author.level)}>
                      {selectedPost.author.level}
                    </Badge>
                    {selectedPost.author.isVerified && (
                      <Verified className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedPost.author.reputation.toLocaleString()} reputation • {selectedPost.author.postCount} posts
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedPost.createdAt.toLocaleDateString()} • {selectedPost.createdAt.toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              {selectedPost.isPinned && <Pin className="w-4 h-4 text-primary" />}
              {selectedPost.isFeatured && <Star className="w-4 h-4 text-yellow-500" />}
              <Badge className={getPostTypeColor(selectedPost.type)}>
                {selectedPost.type.replace('-', ' ')}
              </Badge>
              <h1 className="text-2xl font-bold">{selectedPost.title}</h1>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none mb-6">
              <p>{selectedPost.content}</p>
            </div>

            {/* Trading Data Display */}
            {selectedPost.tradingData && (
              <div className="bg-muted/20 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-3">Trade Setup Details</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Instrument:</span>
                    <div className="font-medium text-primary">{selectedPost.tradingData.instrument}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Direction:</span>
                    <div className={`font-medium ${
                      selectedPost.tradingData.direction === 'long' ? 'text-primary' : 'text-destructive'
                    }`}>
                      {selectedPost.tradingData.direction.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Entry:</span>
                    <div className="font-medium">{selectedPost.tradingData.entryPrice}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Stop Loss:</span>
                    <div className="font-medium text-destructive">{selectedPost.tradingData.stopLoss}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Take Profit:</span>
                    <div className="font-medium text-primary">{selectedPost.tradingData.takeProfit}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Risk/Reward:</span>
                    <div className="font-medium">{selectedPost.tradingData.riskReward}:1</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Timeframe:</span>
                    <div className="font-medium">{selectedPost.tradingData.timeframe}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Chart Placeholder */}
            {selectedPost.hasCharts && (
              <div className="bg-muted/10 p-6 rounded-lg mb-6 text-center">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Trading Chart</h4>
                <p className="text-sm text-muted-foreground">Chart visualization would be integrated here</p>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedPost.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary/10">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleVote(selectedPost.id, 'up')}
                  className="flex items-center space-x-2"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{selectedPost.upvotes}</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleVote(selectedPost.id, 'down')}
                  className="flex items-center space-x-2"
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>{selectedPost.downvotes}</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Reply className="w-4 h-4 mr-2" />
                  Reply
                </Button>
                <Button variant="outline" size="sm">
                  <Quote className="w-4 h-4 mr-2" />
                  Quote
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>{selectedPost.views} views</span>
                <MessageCircle className="w-4 h-4 ml-4" />
                <span>{selectedPost.replyCount} replies</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies Section */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-secondary" />
              <span>Replies ({selectedPost.replyCount})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Reply Form */}
              <div className="bg-muted/10 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-secondary/20 text-secondary">
                      YU
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your thoughts on this analysis..."
                      rows={3}
                      className="mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Image className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Link className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Send className="w-4 h-4 mr-2" />
                        Post Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Replies */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-muted/5 rounded-lg">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-secondary/20 text-secondary">
                      TA
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold">TechnicalAnalyst</span>
                      <Badge className="bg-secondary/20 text-secondary">A-Tier</Badge>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-foreground/80 mb-3">
                      Great analysis! I'm seeing similar confluence on the 1H chart. The volume profile also supports this breakout. 
                      What's your take on the potential pullback to 2018 before continuation?
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        12
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Reply className="w-3 h-3 mr-1" />
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Quote className="w-3 h-3 mr-1" />
                        Quote
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-muted/5 rounded-lg">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      RT
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold">RiskTrader</span>
                      <Badge className="bg-primary/20 text-primary">B-Tier</Badge>
                      <span className="text-xs text-muted-foreground">1 hour ago</span>
                    </div>
                    <p className="text-foreground/80 mb-3">
                      Solid setup but I'd be cautious about position sizing given the upcoming Fed meeting. 
                      Maybe consider reducing risk to 0.5% until after the announcement?
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        8
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Reply className="w-3 h-3 mr-1" />
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Quote className="w-3 h-3 mr-1" />
                        Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderCreatePostView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => setActiveView('category')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Forum
          </Button>
          <h1 className="text-2xl font-bold">Create New Post</h1>
        </div>
      </div>

      <ForumPostEditor 
        category={selectedCategory}
        onSave={(postData) => {
          // Handle post creation
          console.log('Creating post:', postData);
          setActiveView('category');
        }}
        onCancel={() => setActiveView('category')}
      />
    </div>
  );

  const renderUserProfileView = () => {
    if (!selectedUser) return null;

    return (
      <UserProfile 
        user={selectedUser}
        onBack={() => setActiveView('categories')}
        onLogout={onLogout}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container-max mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Community
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Trading Forum</h1>
                  <p className="text-sm text-foreground/70">Professional Discussion Hub</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Exit Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-max mx-auto px-6 py-8">
        {activeView === 'categories' && renderCategoriesView()}
        {activeView === 'category' && renderCategoryView()}
        {activeView === 'post' && renderPostView()}
        {activeView === 'create' && renderCreatePostView()}
        {activeView === 'profile' && renderUserProfileView()}
      </div>
    </div>
  );
};