import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Pin,
  Star,
  Eye,
  ThumbsUp,
  Reply,
  Clock,
  TrendingUp,
  MessageCircle,
  Users,
  BarChart3,
  Target,
  Shield,
  Flag,
  MoreHorizontal,
  ChevronRight,
  Activity,
  Calendar,
  Hash,
  Image,
  FileText,
  Link2,
  Award,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface ForumCategoryProps {
  categoryId: string;
  onBack: () => void;
  onPostSelect: (postId: string) => void;
  onCreatePost: () => void;
}

export const ForumCategory: React.FC<ForumCategoryProps> = ({
  categoryId,
  onBack,
  onPostSelect,
  onCreatePost
}) => {
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Category data (would come from props or API)
  const categoryData = {
    id: 'trading-strategies',
    name: 'Trading Strategies & Systems',
    description: 'Share and discuss trading strategies, system development, and methodology',
    icon: Target,
    color: 'text-primary',
    subcategories: [
      { 
        id: 'price-action', 
        name: 'Price Action Trading', 
        description: 'Pure price action strategies and setups', 
        postCount: 234, 
        lastActivity: new Date(),
        moderators: ['PriceActionExpert'],
        rules: ['Include chart analysis', 'Explain entry/exit criteria', 'Show risk management']
      },
      { 
        id: 'technical-analysis', 
        name: 'Technical Analysis', 
        description: 'Indicators, patterns, and technical methods', 
        postCount: 189, 
        lastActivity: new Date(),
        moderators: ['TechnicalAnalyst'],
        rules: ['Cite indicator settings', 'Include timeframe context', 'Show backtesting results']
      },
      { 
        id: 'algorithmic', 
        name: 'Algorithmic Trading', 
        description: 'Automated systems and quantitative strategies', 
        postCount: 156, 
        lastActivity: new Date(),
        moderators: ['AlgoExpert'],
        rules: ['Include code examples', 'Show performance metrics', 'Explain logic clearly']
      }
    ],
    moderators: ['TradingMaster', 'StrategyExpert'],
    rules: ['Share complete strategy details', 'Include risk management', 'Provide backtesting results'],
    memberCount: 2847,
    postCount: 1044,
    todaysPosts: 23
  };

  // Sample posts for this category
  const categoryPosts = [
    {
      id: '1',
      title: 'XAUUSD Breakout Strategy - 3R Setup with Volume Confirmation',
      content: 'Sharing my systematic approach to gold breakouts above key resistance levels...',
      author: {
        id: 'user1',
        username: 'goldwarrior',
        displayName: 'Gold Warrior',
        avatar: 'GW',
        level: 'A-Tier',
        reputation: 2847,
        badges: ['Gold Specialist', 'Strategy Developer']
      },
      subcategory: 'price-action',
      tags: ['gold', 'breakout', 'volume', 'strategy'],
      createdAt: new Date('2024-01-15T10:30:00'),
      views: 456,
      likes: 34,
      replies: 12,
      isPinned: false,
      isLocked: false,
      isFeatured: true,
      hasImages: true,
      hasCharts: true,
      lastReply: new Date('2024-01-15T15:45:00'),
      tradingData: {
        asset: 'XAUUSD',
        direction: 'long',
        confidence: 85,
        timeframe: '4H'
      }
    },
    {
      id: '2',
      title: 'RSI Divergence Strategy - Complete System with Entry Rules',
      content: 'After 2 years of development, sharing my complete RSI divergence system...',
      author: {
        id: 'user2',
        username: 'rsimaster',
        displayName: 'RSI Master',
        avatar: 'RM',
        level: 'A-Tier',
        reputation: 1987,
        badges: ['Technical Expert', 'System Developer']
      },
      subcategory: 'technical-analysis',
      tags: ['rsi', 'divergence', 'system', 'indicators'],
      createdAt: new Date('2024-01-14T09:15:00'),
      views: 789,
      likes: 56,
      replies: 28,
      isPinned: true,
      isLocked: false,
      isFeatured: false,
      hasImages: true,
      hasCharts: true,
      lastReply: new Date('2024-01-15T12:30:00'),
      tradingData: {
        asset: 'Multiple',
        direction: 'both',
        confidence: 78,
        timeframe: '1H-4H'
      }
    }
  ];

  const filteredPosts = categoryPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSubcategory = activeSubcategory === 'all' || post.subcategory === activeSubcategory;
    
    const matchesFilter = filterBy === 'all' ||
                         (filterBy === 'pinned' && post.isPinned) ||
                         (filterBy === 'featured' && post.isFeatured) ||
                         (filterBy === 'charts' && post.hasCharts) ||
                         (filterBy === 'images' && post.hasImages);
    
    return matchesSearch && matchesSubcategory && matchesFilter;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'popular':
        return (b.likes + b.replies) - (a.likes + a.replies);
      case 'views':
        return b.views - a.views;
      case 'replies':
        return b.replies - a.replies;
      default:
        return 0;
    }
  });

  const renderPostCard = (post: any) => (
    <Card key={post.id} className="military-card cursor-pointer hover:border-primary/30" onClick={() => onPostSelect(post.id)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {post.isPinned && <Pin className="w-4 h-4 text-primary" />}
              {post.isFeatured && <Star className="w-4 h-4 text-secondary" />}
              {post.isLocked && <Shield className="w-4 h-4 text-muted-foreground" />}
              <h3 className="font-bold text-lg line-clamp-2">{post.title}</h3>
            </div>
            
            <div className="flex items-center space-x-2 mb-3">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs">{post.author.avatar}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{post.author.displayName}</span>
              <Badge className="text-xs">{post.author.level}</Badge>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{post.createdAt.toLocaleDateString()}</span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.content}</p>
            
            {/* Trading Data */}
            {post.tradingData && (
              <div className="flex items-center space-x-4 mb-4 p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{post.tradingData.asset}</span>
                </div>
                <Badge className={`text-xs ${post.tradingData.direction === 'long' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                  {post.tradingData.direction.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">{post.tradingData.timeframe}</span>
                <div className="flex items-center space-x-1">
                  <Target className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium">{post.tradingData.confidence}% confidence</span>
                </div>
              </div>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {post.hasCharts && <BarChart3 className="w-4 h-4 text-primary" />}
            {post.hasImages && <Image className="w-4 h-4 text-secondary" />}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views}</span>
            </span>
            <span className="flex items-center space-x-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{post.likes}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Reply className="w-4 h-4" />
              <span>{post.replies}</span>
            </span>
          </div>
          <span>Last reply: {post.lastReply.toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Forums
          </Button>
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <categoryData.icon className={`w-6 h-6 ${categoryData.color}`} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{categoryData.name}</h1>
              <p className="text-sm text-muted-foreground">{categoryData.description}</p>
            </div>
          </div>
        </div>
        
        <Button onClick={onCreatePost} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="military-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{categoryData.postCount}</div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </CardContent>
        </Card>
        <Card className="military-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary mb-1">{categoryData.memberCount.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Members</div>
          </CardContent>
        </Card>
        <Card className="military-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{categoryData.todaysPosts}</div>
            <div className="text-sm text-muted-foreground">Posts Today</div>
          </CardContent>
        </Card>
        <Card className="military-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary mb-1">{categoryData.subcategories.length}</div>
            <div className="text-sm text-muted-foreground">Subcategories</div>
          </CardContent>
        </Card>
      </div>

      {/* Subcategory Navigation */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Subcategories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categoryData.subcategories.map(sub => (
            <Card 
              key={sub.id} 
              className={`military-card cursor-pointer transition-all ${
                activeSubcategory === sub.id ? 'border-primary/50 bg-primary/5' : 'hover:border-primary/30'
              }`}
              onClick={() => setActiveSubcategory(sub.id)}
            >
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">{sub.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{sub.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{sub.postCount} posts</span>
                  <span>{sub.lastActivity.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search posts in this category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Posts</SelectItem>
              <SelectItem value="pinned">Pinned</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="charts">With Charts</SelectItem>
              <SelectItem value="images">With Images</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
              <SelectItem value="replies">Most Replies</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">
            {activeSubcategory === 'all' ? 'All Posts' : 
             categoryData.subcategories.find(s => s.id === activeSubcategory)?.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{sortedPosts.length} posts</span>
            {activeSubcategory !== 'all' && (
              <Button variant="ghost" size="sm" onClick={() => setActiveSubcategory('all')}>
                Show All
              </Button>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          {sortedPosts.map(renderPostCard)}
          
          {sortedPosts.length === 0 && (
            <Card className="military-card">
              <CardContent className="p-12 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm ? 'Try adjusting your search terms or filters.' : 'Be the first to start a discussion in this category!'}
                </p>
                <Button onClick={onCreatePost} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Post
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Category Rules and Guidelines */}
      <Card className="military-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-secondary" />
            <span>Category Guidelines</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Posting Rules</h4>
              <ul className="space-y-2 text-sm">
                {categoryData.rules.map((rule, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Moderators</h4>
              <div className="space-y-2">
                {categoryData.moderators.map((mod, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{mod.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{mod}</span>
                    <Badge className="text-xs bg-secondary/10 text-secondary">Moderator</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};