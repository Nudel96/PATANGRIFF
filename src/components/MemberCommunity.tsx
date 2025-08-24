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
import { Users, MessageCircle, TrendingUp, Star, Award, Calendar, BookOpen, Target, Brain, Building2, Search, Filter, Plus, Eye, ThumbsUp, Clock, ArrowRight, Zap, Trophy, Shield, Globe, Activity, FileText, Camera, BarChart3, DollarSign, AlertTriangle, CheckCircle, Flame, TrendingDown, MapPin, Bell, Settings, HelpCircle, Flag, Edit, Share, Bookmark, Hash, ChevronRight, PlayCircle, Video, Mic, Image, Link, Quote, ArrowLeft, LogOut, Home, Upload, UserPlus, Coins, PieChart, LineChart, Briefcase, GraduationCap, Headphones, Download, RefreshCw, Send, Reply, Heart, MessageSquare, ExternalLink, Pin, Archive, MoreHorizontal, Filter as FilterIcon, SortDesc, Calendar as CalendarIcon, Users as UsersIcon, Lightbulb, Megaphone, HelpCircle as HelpIcon, ShieldCheck, UserCheck, UserX, Trash2, Edit3, Copy, Move, Tag, Layers, Grid, List, BarChart, PlusCircle, MinusCircle, CheckSquare, Square, Circle, Dot, ArrowUp, ArrowDown, RotateCcw, FastForward, Rewind, Pause, Play, Volume2, VolumeX, Maximize, Minimize, Fullscreen as FullScreen, Fullscreen as ExitFullScreen, ZoomIn, ZoomOut, RotateCw, FlipHorizontal, FlipVertical, Crop, Scissors, Palette, Type, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Strikethrough, Code, Link2, Unlink, List as ListIcon, ListOrdered, Quote as QuoteIcon, Heading, GitGraph as Paragraph, SeparatorVertical as Separator, Space, Indent, Outdent, WrapText, AlignJustify, Crown } from 'lucide-react';

interface Post {
  id: string;
  type: 'trade-idea' | 'trade-recap' | 'macro-thesis' | 'question' | 'resource' | 'mindset' | 'business' | 'showcase';
  title: string;
  author: {
    name: string;
    level: 'S-Tier' | 'A-Tier' | 'B-Tier' | 'C-Tier';
    avatar: string;
    badges: string[];
  };
  timestamp: string;
  content: string;
  asset?: string;
  direction?: 'long' | 'short';
  timeframe?: string;
  setupType?: string;
  rMultiple?: number;
  outcome?: 'win' | 'loss' | 'breakeven';
  tags: string[];
  likes: number;
  replies: number;
  views: number;
  hasImage: boolean;
  isQualityVerified: boolean;
  isWikiCandidate: boolean;
  isPinned: boolean;
  forum: string;
}

interface Squad {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  meetingCadence: string;
  tags: string[];
  isOpen: boolean;
  members: Array<{
    name: string;
    level: string;
    role: 'leader' | 'member';
  }>;
}

interface Event {
  id: string;
  title: string;
  type: 'ama' | 'workshop' | 'review' | 'market-prep' | 'office-hours';
  date: string;
  time: string;
  host: string;
  description: string;
  attendees: number;
  maxAttendees?: number;
  status: 'upcoming' | 'live' | 'completed';
  hasRecording?: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'consistency' | 'quality' | 'learning' | 'community';
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants?: number;
  reward: string;
  rules: string[];
  leaderboard: Array<{
    rank: number;
    name: string;
    score: number;
    badge?: string;
  }>;
}

interface MemberCommunityProps {
  onBack: () => void;
  onLogout: () => void;
}

export const MemberCommunity: React.FC<MemberCommunityProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedForum, setSelectedForum] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAsset, setFilterAsset] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample data
  const samplePosts: Post[] = [
    {
      id: '1',
      type: 'trade-idea',
      title: 'XAUUSD Long Setup - London Session Breakout Above 2020',
      author: {
        name: 'GoldWarrior',
        level: 'A-Tier',
        avatar: 'GW',
        badges: ['Gold Specialist', 'Mentor']
      },
      timestamp: '2 hours ago',
      content: 'Clean breakout above 2020 resistance with strong volume confluence. Multiple timeframe alignment with 4H trend. Risk 1.5% for 3R target at 2045. Key invalidation below 2015.',
      asset: 'XAUUSD',
      direction: 'long',
      timeframe: '4H',
      setupType: 'breakout',
      tags: ['gold', 'breakout', 'london-session', 'confluence'],
      likes: 24,
      replies: 8,
      views: 156,
      hasImage: true,
      isQualityVerified: true,
      isWikiCandidate: false,
      isPinned: false,
      forum: 'gold-desk'
    },
    {
      id: '2',
      type: 'trade-recap',
      title: 'EURUSD Short Recap - Stopped Out on NFP Spike',
      author: {
        name: 'FXAnalyst',
        level: 'B-Tier',
        avatar: 'FA',
        badges: ['Consistent Trader']
      },
      timestamp: '4 hours ago',
      content: 'Got stopped on EUR short. Plan was solid but missed the NFP volatility spike. Key lesson: check calendar before London close entries. Will adjust news filter protocol.',
      asset: 'EURUSD',
      direction: 'short',
      timeframe: '1H',
      setupType: 'retest',
      outcome: 'loss',
      rMultiple: -1,
      tags: ['eurusd', 'lesson-learned', 'news-impact', 'risk-management'],
      likes: 18,
      replies: 12,
      views: 89,
      hasImage: true,
      isQualityVerified: true,
      isWikiCandidate: false,
      isPinned: false,
      forum: 'fx-majors'
    },
    {
      id: '3',
      type: 'macro-thesis',
      title: 'USD Strength into Q1 2024 - Rate Differential Thesis',
      author: {
        name: 'MacroMind',
        level: 'S-Tier',
        avatar: 'MM',
        badges: ['Macro Expert', 'Wiki Contributor', 'Mentor']
      },
      timestamp: '6 hours ago',
      content: 'Fed hawkish pivot vs ECB dovish hold creates compelling USD strength narrative. Key levels and trade implications: EURUSD 1.05 target, USDJPY 155 extension. Risk: dovish Fed surprise.',
      tags: ['macro', 'usd', 'fed', 'rates', 'q1-outlook'],
      likes: 45,
      replies: 23,
      views: 234,
      hasImage: false,
      isQualityVerified: true,
      isWikiCandidate: true,
      isPinned: true,
      forum: 'macro-data'
    },
    {
      id: '4',
      type: 'mindset',
      title: 'Overcoming Revenge Trading After 3 Losses',
      author: {
        name: 'MindfulTrader',
        level: 'A-Tier',
        avatar: 'MT',
        badges: ['Psychology Specialist']
      },
      timestamp: '8 hours ago',
      content: 'Hit 3 stops in a row yesterday. Felt the urge to "get it back" but used the 5-minute rule instead. Walked away, reviewed plans, came back fresh today. Protocol works.',
      tags: ['psychology', 'revenge-trading', 'discipline', 'protocol'],
      likes: 32,
      replies: 15,
      views: 127,
      hasImage: false,
      isQualityVerified: true,
      isWikiCandidate: false,
      isPinned: false,
      forum: 'mindset-performance'
    },
    {
      id: '5',
      type: 'business',
      title: 'Building Trading Content: 6-Month Case Study',
      author: {
        name: 'ContentCreator',
        level: 'A-Tier',
        avatar: 'CC',
        badges: ['Business Builder']
      },
      timestamp: '12 hours ago',
      content: 'Grew from 0 to 5K followers in 6 months. Key: consistent daily market analysis + trade recaps. Revenue: $2K/month from course sales. Next: community launch.',
      tags: ['content-creation', 'business', 'case-study', 'growth'],
      likes: 28,
      replies: 19,
      views: 203,
      hasImage: true,
      isQualityVerified: true,
      isWikiCandidate: true,
      isPinned: false,
      forum: 'business-career'
    }
  ];

  const forums = [
    { 
      id: 'gold-desk', 
      name: 'Gold Desk (XAU)', 
      icon: Trophy, 
      color: 'text-yellow-500', 
      posts: 234,
      description: 'Daily gold analysis, setups, and session behavior',
      members: 1247,
      todaysPosts: 12
    },
    { 
      id: 'fx-majors', 
      name: 'FX Majors & Crosses', 
      icon: Globe, 
      color: 'text-blue-500', 
      posts: 456,
      description: 'EUR, GBP, JPY, and cross-pair discussions',
      members: 2134,
      todaysPosts: 18
    },
    { 
      id: 'indices', 
      name: 'Indices & Metals', 
      icon: BarChart3, 
      color: 'text-green-500', 
      posts: 189,
      description: 'US500, NAS100, DAX, silver, copper analysis',
      members: 892,
      todaysPosts: 7
    },
    { 
      id: 'macro-data', 
      name: 'Macro & Data', 
      icon: TrendingUp, 
      color: 'text-purple-500', 
      posts: 167,
      description: 'Economic calendar, regime analysis, policy debates',
      members: 1567,
      todaysPosts: 9
    },
    { 
      id: 'strategy', 
      name: 'Strategy & Playbooks', 
      icon: Target, 
      color: 'text-red-500', 
      posts: 298,
      description: 'System components, checklists, personal playbooks',
      members: 1834,
      todaysPosts: 15
    },
    { 
      id: 'research', 
      name: 'Backtesting & Research', 
      icon: Activity, 
      color: 'text-indigo-500', 
      posts: 123,
      description: 'Test reports, methodology, benchmark templates',
      members: 567,
      todaysPosts: 4
    },
    { 
      id: 'mindset-performance', 
      name: 'Mindset & Performance', 
      icon: Brain, 
      color: 'text-pink-500', 
      posts: 345,
      description: 'Mental models, emotional regulation, habit tracking',
      members: 1923,
      todaysPosts: 11
    },
    { 
      id: 'business-career', 
      name: 'Business & Career', 
      icon: Building2, 
      color: 'text-orange-500', 
      posts: 156,
      description: 'Brand building, partnerships, monetization strategies',
      members: 743,
      todaysPosts: 6
    }
  ];

  const sampleSquads: Squad[] = [
    {
      id: '1',
      name: 'Gold Desk Warriors',
      description: 'Daily gold analysis and trade reviews. Focus on London/NY sessions with systematic approach to XAU setups.',
      memberCount: 6,
      maxMembers: 8,
      meetingCadence: 'Daily 8AM EST',
      tags: ['gold', 'daily', 'active', 'london-ny'],
      isOpen: true,
      members: [
        { name: 'GoldWarrior', level: 'A-Tier', role: 'leader' },
        { name: 'XAUMaster', level: 'B-Tier', role: 'member' },
        { name: 'MetalTrader', level: 'A-Tier', role: 'member' }
      ]
    },
    {
      id: '2',
      name: 'Macro Minds',
      description: 'Weekly deep dives into economic data and policy implications. Research-focused group for fundamental analysis.',
      memberCount: 4,
      maxMembers: 6,
      meetingCadence: 'Weekly Sundays 2PM EST',
      tags: ['macro', 'research', 'weekly', 'fundamentals'],
      isOpen: true,
      members: [
        { name: 'MacroMind', level: 'S-Tier', role: 'leader' },
        { name: 'EconAnalyst', level: 'A-Tier', role: 'member' }
      ]
    },
    {
      id: '3',
      name: 'Psychology Focus Group',
      description: 'Mindset work, emotional regulation, and performance optimization. Bi-weekly accountability sessions.',
      memberCount: 5,
      maxMembers: 8,
      meetingCadence: 'Bi-weekly Thursdays 7PM EST',
      tags: ['psychology', 'mindset', 'accountability', 'performance'],
      isOpen: true,
      members: [
        { name: 'MindfulTrader', level: 'A-Tier', role: 'leader' },
        { name: 'ZenTrader', level: 'B-Tier', role: 'member' }
      ]
    }
  ];

  const sampleEvents: Event[] = [
    {
      id: '1',
      title: 'Weekly Gold Desk Review',
      type: 'review',
      date: 'Today',
      time: '2:00 PM EST',
      host: 'Senior Mentor',
      description: 'Review this week\'s gold trades and setups. Bring your charts and questions!',
      attendees: 23,
      maxAttendees: 50,
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Macro AMA with Chief Analyst',
      type: 'ama',
      date: 'Tomorrow',
      time: '4:00 PM EST',
      host: 'Chief Analyst',
      description: 'Q&A on current macro environment and Q1 2024 outlook. Submit questions in advance.',
      attendees: 67,
      maxAttendees: 100,
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Risk Management Workshop',
      type: 'workshop',
      date: 'Friday',
      time: '1:00 PM EST',
      host: 'Risk Specialist',
      description: 'Advanced position sizing and portfolio risk techniques. Interactive session with examples.',
      attendees: 34,
      maxAttendees: 75,
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'Monday Market Prep',
      type: 'market-prep',
      date: 'Monday',
      time: '7:00 AM EST',
      host: 'Market Analyst',
      description: 'Week ahead preview: key levels, events, and setups to watch.',
      attendees: 89,
      status: 'upcoming'
    }
  ];

  const sampleChallenges: Challenge[] = [
    {
      id: '1',
      title: '30-Day Consistency Challenge',
      description: 'Daily trade plans and recaps for 30 consecutive days. Focus on process over profits.',
      type: 'consistency',
      startDate: '2024-01-01',
      endDate: '2024-01-30',
      participants: 89,
      maxParticipants: 100,
      reward: '500 XP + Consistency Badge',
      rules: [
        'Post daily pre-market plan',
        'Submit end-of-day recap',
        'Use structured templates',
        'No P&L requirements'
      ],
      leaderboard: [
        { rank: 1, name: 'ConsistentTrader', score: 95, badge: '🥇' },
        { rank: 2, name: 'DisciplinedMind', score: 92, badge: '🥈' },
        { rank: 3, name: 'SystemFollower', score: 89, badge: '🥉' }
      ]
    },
    {
      id: '2',
      title: 'Gold Mastery Sprint',
      description: '2-week focused gold trading with mentor reviews and peer feedback.',
      type: 'learning',
      startDate: '2024-01-15',
      endDate: '2024-01-29',
      participants: 34,
      maxParticipants: 50,
      reward: '300 XP + Gold Specialist Badge',
      rules: [
        'Gold trades only',
        'Minimum 3 setups per week',
        'Detailed confluence analysis',
        'Mentor review required'
      ],
      leaderboard: [
        { rank: 1, name: 'GoldWarrior', score: 88, badge: '👑' },
        { rank: 2, name: 'XAUMaster', score: 85, badge: '⭐' },
        { rank: 3, name: 'MetalTrader', score: 82, badge: '🏆' }
      ]
    }
  ];

  const trendingTopics = [
    { tag: '#gold-breakout', posts: 23, trend: 'up' },
    { tag: '#fed-pivot', posts: 18, trend: 'up' },
    { tag: '#london-session', posts: 15, trend: 'stable' },
    { tag: '#risk-management', posts: 12, trend: 'up' },
    { tag: '#psychology', posts: 9, trend: 'down' }
  ];

  const renderPostCard = (post: Post) => (
    <Card key={post.id} className="military-card hover:border-primary/30 transition-all duration-300 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className={`font-semibold text-sm ${
                post.author.level === 'S-Tier' ? 'bg-purple-500/20 text-purple-500' :
                post.author.level === 'A-Tier' ? 'bg-primary/20 text-primary' :
                post.author.level === 'B-Tier' ? 'bg-secondary/20 text-secondary' :
                'bg-muted/20 text-muted-foreground'
              }`}>
                {post.author.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold">{post.author.name}</span>
                <Badge className={`text-xs ${
                  post.author.level === 'S-Tier' ? 'bg-purple-500/10 text-purple-500' :
                  post.author.level === 'A-Tier' ? 'bg-primary/10 text-primary' :
                  post.author.level === 'B-Tier' ? 'bg-secondary/10 text-secondary' :
                  'bg-muted/10 text-muted-foreground'
                }`}>
                  {post.author.level}
                </Badge>
                {post.author.badges.map(badge => (
                  <Badge key={badge} variant="outline" className="text-xs">
                    {badge}
                  </Badge>
                ))}
                <span className="text-xs text-muted-foreground">{post.timestamp}</span>
              </div>
              <h3 className="font-semibold text-sm leading-tight mb-1">{post.title}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs capitalize">
                  {post.type.replace('-', ' ')}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {forums.find(f => f.id === post.forum)?.name || 'General'}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {post.isPinned && (
              <Pin className="w-4 h-4 text-primary" title="Pinned" />
            )}
            {post.isQualityVerified && (
              <CheckCircle className="w-4 h-4 text-primary" title="Quality Verified" />
            )}
            {post.isWikiCandidate && (
              <BookOpen className="w-4 h-4 text-secondary" title="Wiki Candidate" />
            )}
            {post.hasImage && (
              <Image className="w-4 h-4 text-muted-foreground" title="Has Image" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-foreground/80 mb-3 line-clamp-2">{post.content}</p>
        
        {/* Trade-specific info */}
        {(post.type === 'trade-idea' || post.type === 'trade-recap') && (
          <div className="flex items-center space-x-4 mb-3 text-xs">
            {post.asset && (
              <Badge variant="outline" className="text-xs font-semibold">{post.asset}</Badge>
            )}
            {post.direction && (
              <Badge className={`text-xs ${
                post.direction === 'long' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
              }`}>
                {post.direction.toUpperCase()}
              </Badge>
            )}
            {post.timeframe && (
              <span className="text-muted-foreground">{post.timeframe}</span>
            )}
            {post.setupType && (
              <Badge variant="outline" className="text-xs capitalize">
                {post.setupType}
              </Badge>
            )}
            {post.rMultiple !== undefined && (
              <span className={`font-semibold ${
                post.rMultiple > 0 ? 'text-primary' : 'text-destructive'
              }`}>
                {post.rMultiple > 0 ? '+' : ''}{post.rMultiple}R
              </span>
            )}
            {post.outcome && (
              <Badge className={`text-xs ${
                post.outcome === 'win' ? 'bg-primary/10 text-primary' :
                post.outcome === 'loss' ? 'bg-destructive/10 text-destructive' :
                'bg-muted/10 text-muted-foreground'
              }`}>
                {post.outcome}
              </Badge>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 4).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {post.tags.length > 4 && (
            <span className="text-xs text-muted-foreground">+{post.tags.length - 4} more</span>
          )}
        </div>

        {/* Engagement stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-primary transition-colors">
              <ThumbsUp className="w-3 h-3" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-secondary transition-colors">
              <MessageCircle className="w-3 h-3" />
              <span>{post.replies}</span>
            </button>
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{post.views}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              Reply
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              View Thread
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderForumCard = (forum: any) => (
    <Card key={forum.id} className="military-card hover:border-primary/30 transition-all duration-300 cursor-pointer">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="bg-muted/20 p-3 rounded-xl">
            <forum.icon className={`w-6 h-6 ${forum.color}`} />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{forum.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{forum.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">{forum.posts}</div>
              <div className="text-xs text-muted-foreground">Total Posts</div>
            </div>
            <div>
              <div className="text-lg font-bold text-secondary">{forum.members}</div>
              <div className="text-xs text-muted-foreground">Members</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">{forum.todaysPosts}</div>
              <div className="text-xs text-muted-foreground">Today</div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Latest: "XAUUSD breakout analysis" • 2h ago
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <Avatar key={i} className="w-6 h-6 border-2 border-background">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      {String.fromCharCode(65 + i)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20) + 5} active</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container-max mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Community</h1>
                  <p className="text-sm text-foreground/70">Brotherhood of Warriors</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                </div>
              </Button>
              <Button variant="ghost" size="sm">
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

      <div className="container-max mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-8 bg-muted/20">
            <TabsTrigger value="home" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="forums" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Forums</span>
            </TabsTrigger>
            <TabsTrigger value="trades" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Trades</span>
            </TabsTrigger>
            <TabsTrigger value="squads" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Squads</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center space-x-2">
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Help</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Feed */}
          <TabsContent value="home" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                {/* Welcome Section */}
                <Card className="military-card bg-gradient-to-r from-primary/10 to-secondary/10">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 p-3 rounded-xl">
                        <Flame className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Welcome back, Warrior</h2>
                        <p className="text-foreground/70">
                          Ready to forge excellence? Check today's highlights and connect with your brotherhood.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-primary" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                        <Plus className="w-5 h-5 text-primary" />
                        <span className="text-sm">New Trade Idea</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                        <Upload className="w-5 h-5 text-secondary" />
                        <span className="text-sm">Upload Recap</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                        <UserPlus className="w-5 h-5 text-primary" />
                        <span className="text-sm">Join Squad</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                        <HelpCircle className="w-5 h-5 text-secondary" />
                        <span className="text-sm">Ask Question</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Today's Highlights */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-primary" />
                        <span>Today's Highlights</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recent">Most Recent</SelectItem>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="quality">Quality Verified</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          New Post
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {samplePosts.slice(0, 5).map(renderPostCard)}
                    
                    <div className="text-center pt-4">
                      <Button variant="outline">
                        Load More Posts
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Community Pulse */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-secondary" />
                      <span>Community Pulse</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Active Members:</span>
                      <span className="font-semibold text-secondary">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Posts Today:</span>
                      <span className="font-semibold text-primary">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Live Events:</span>
                      <span className="font-semibold text-secondary">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Unanswered:</span>
                      <span className="font-semibold text-orange-500">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Wiki Candidates:</span>
                      <span className="font-semibold text-purple-500">7</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>Trending Topics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {trendingTopics.map(topic => (
                        <div key={topic.tag} className="flex items-center justify-between p-2 bg-muted/10 rounded hover:bg-muted/20 cursor-pointer transition-colors">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{topic.tag}</span>
                            {topic.trend === 'up' && <TrendingUp className="w-3 h-3 text-primary" />}
                            {topic.trend === 'down' && <TrendingDown className="w-3 h-3 text-destructive" />}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {topic.posts}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <span>Next Events</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sampleEvents.slice(0, 3).map(event => (
                        <div key={event.id} className="p-3 bg-muted/10 rounded hover:bg-muted/20 cursor-pointer transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{event.title}</span>
                            <Badge className={`text-xs ${
                              event.type === 'ama' ? 'bg-primary/10 text-primary' :
                              event.type === 'workshop' ? 'bg-secondary/10 text-secondary' :
                              'bg-purple-500/10 text-purple-500'
                            }`}>
                              {event.date}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {event.time} • {event.attendees} attending
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full" size="sm">
                        View All Events
                        <Calendar className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Your Squads */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Your Squads</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-primary/10 rounded">
                        <div className="font-semibold text-primary mb-1">Gold Desk Warriors</div>
                        <div className="text-xs text-muted-foreground mb-2">Next meeting: Today 8AM EST</div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">6/8 members</Badge>
                          <Badge className="text-xs bg-primary/20 text-primary">Active</Badge>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full" size="sm">
                        Browse All Squads
                        <Users className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Forums */}
          <TabsContent value="forums" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Discussion Forums</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search forums..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  New Thread
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forums.map(renderForumCard)}
            </div>

            {/* Forum Rules */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                  <span>Forum Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Quality Standards</h4>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Use structured templates for trade posts</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Include clear invalidation levels</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Provide constructive feedback only</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-secondary">Community Values</h4>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Respect all skill levels</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Share knowledge generously</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Maintain professional discourse</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trade Gallery */}
          <TabsContent value="trades" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Trade Gallery</h3>
              <div className="flex items-center space-x-4">
                <Select value={filterAsset} onValueChange={setFilterAsset}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assets</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="forex">Forex</SelectItem>
                    <SelectItem value="indices">Indices</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="ideas">Ideas</SelectItem>
                    <SelectItem value="recaps">Recaps</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Camera className="w-4 h-4 mr-2" />
                  Upload Trade
                </Button>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                All Trades
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                Quality Verified
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                High R Multiple
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                London Session
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                Breakouts
              </Badge>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}>
              {samplePosts.filter(post => post.type === 'trade-idea' || post.type === 'trade-recap').map(renderPostCard)}
            </div>
          </TabsContent>

          {/* Squads & Accountability */}
          <TabsContent value="squads" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Squads & Accountability</h3>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Create Squad
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleSquads.map(squad => (
                <Card key={squad.id} className="military-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{squad.name}</CardTitle>
                      <Badge className={`${squad.isOpen ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {squad.isOpen ? 'Open' : 'Full'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{squad.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Members:</span>
                        <span className="font-medium">{squad.memberCount}/{squad.maxMembers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Meetings:</span>
                        <span className="font-medium">{squad.meetingCadence}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {squad.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Members:</div>
                        <div className="space-y-1">
                          {squad.members.slice(0, 3).map(member => (
                            <div key={member.name} className="flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-2">
                                <Avatar className="w-5 h-5">
                                  <AvatarFallback className="text-xs bg-primary/20 text-primary">
                                    {member.name.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{member.name}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Badge variant="outline" className="text-xs">{member.level}</Badge>
                                {member.role === 'leader' && <Crown className="w-3 h-3 text-primary" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant={squad.isOpen ? "default" : "outline"}
                        disabled={!squad.isOpen}
                      >
                        {squad.isOpen ? 'Join Squad' : 'Squad Full'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Accountability Partners */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-secondary" />
                  <span>Accountability Partners</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Looking for Partners</h4>
                    <div className="space-y-3">
                      {['TraderMike', 'FXNinja', 'GoldHunter'].map(name => (
                        <div key={name} className="flex items-center justify-between p-3 bg-muted/10 rounded">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-secondary/20 text-secondary text-xs">
                                {name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{name}</div>
                              <div className="text-xs text-muted-foreground">EST timezone • B-Tier</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Connect</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Success Stories</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-primary/10 rounded">
                        <div className="text-sm font-medium mb-1">Sarah & Mike</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          "45-day streak together! Accountability works."
                        </div>
                        <Badge className="text-xs bg-primary/20 text-primary">45 days</Badge>
                      </div>
                      <div className="p-3 bg-secondary/10 rounded">
                        <div className="text-sm font-medium mb-1">Alex & Jordan</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          "Improved win rate by 15% through daily check-ins."
                        </div>
                        <Badge className="text-xs bg-secondary/20 text-secondary">+15% WR</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events & AMAs */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Events & AMAs</h3>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Event
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upcoming Events */}
              <div className="lg:col-span-2">
                <h4 className="text-lg font-semibold mb-4">Upcoming Events</h4>
                <div className="space-y-4">
                  {sampleEvents.map(event => (
                    <Card key={event.id} className="military-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-xl ${
                              event.type === 'ama' ? 'bg-primary/10' :
                              event.type === 'workshop' ? 'bg-secondary/10' :
                              event.type === 'review' ? 'bg-purple-500/10' : 
                              event.type === 'office-hours' ? 'bg-orange-500/10' :
                              'bg-green-500/10'
                            }`}>
                              {event.type === 'ama' ? <Mic className="w-6 h-6 text-primary" /> :
                               event.type === 'workshop' ? <BookOpen className="w-6 h-6 text-secondary" /> :
                               event.type === 'review' ? <Eye className="w-6 h-6 text-purple-500" /> :
                               event.type === 'office-hours' ? <Clock className="w-6 h-6 text-orange-500" /> :
                               <Activity className="w-6 h-6 text-green-500" />}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold mb-1">{event.title}</h5>
                              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span>{event.date} at {event.time}</span>
                                <span>Host: {event.host}</span>
                                <span>{event.attendees} attending</span>
                                {event.maxAttendees && (
                                  <span>• {event.maxAttendees} max</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button size="sm">Join Event</Button>
                            <Badge className={`text-xs ${
                              event.status === 'upcoming' ? 'bg-primary/10 text-primary' :
                              event.status === 'live' ? 'bg-green-500/10 text-green-500' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {event.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Event Calendar & Archive */}
              <div className="space-y-6">
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="text-lg">This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                        <div key={day} className="flex items-center justify-between p-2 rounded hover:bg-muted/10">
                          <span className="text-sm font-medium">{day}</span>
                          <div className="flex space-x-1">
                            {index === 1 && <div className="w-2 h-2 bg-primary rounded-full" title="AMA" />}
                            {index === 3 && <div className="w-2 h-2 bg-secondary rounded-full" title="Workshop" />}
                            {index === 4 && <div className="w-2 h-2 bg-purple-500 rounded-full" title="Review" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Recordings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { title: 'Gold Market Review', duration: '45 min', views: 234 },
                        { title: 'Risk Management 101', duration: '32 min', views: 189 },
                        { title: 'Psychology Deep Dive', duration: '58 min', views: 156 }
                      ].map(recording => (
                        <div key={recording.title} className="flex items-center space-x-3 p-2 hover:bg-muted/10 rounded cursor-pointer">
                          <PlayCircle className="w-4 h-4 text-primary" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{recording.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {recording.duration} • {recording.views} views
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Event Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">This Month:</span>
                        <span className="font-semibold text-primary">12 events</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Avg Attendance:</span>
                        <span className="font-semibold text-secondary">67 members</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Recordings:</span>
                        <span className="font-semibold text-primary">45 available</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Challenges & Sprints */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Challenges & Sprints</h3>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Trophy className="w-4 h-4 mr-2" />
                Create Challenge
              </Button>
            </div>

            {/* Active Challenges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleChallenges.map(challenge => (
                <Card key={challenge.id} className="military-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <Badge className={`${
                        challenge.type === 'consistency' ? 'bg-primary/10 text-primary' :
                        challenge.type === 'quality' ? 'bg-secondary/10 text-secondary' :
                        challenge.type === 'learning' ? 'bg-purple-500/10 text-purple-500' :
                        'bg-orange-500/10 text-orange-500'
                      }`}>
                        {Math.ceil((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Participants:</span>
                        <span className="font-medium">{challenge.participants}{challenge.maxParticipants && `/${challenge.maxParticipants}`}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Reward:</span>
                        <span className="font-medium text-primary">{challenge.reward}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Rules:</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {challenge.rules.map((rule, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button className="w-full">Join Challenge</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Leaderboard */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span>Challenge Leaderboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleChallenges[0].leaderboard.map((leader, index) => (
                    <div key={leader.name} className="flex items-center justify-between p-3 bg-muted/10 rounded">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{leader.badge}</span>
                        <div>
                          <div className="font-medium">{leader.name}</div>
                          <div className="text-xs text-muted-foreground">Consistency Score</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{leader.score}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Challenge Archive */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Archive className="w-5 h-5 text-secondary" />
                  <span>Past Challenges</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'December Discipline Challenge', participants: 156, winner: 'ConsistentTrader' },
                    { name: 'November Quality Sprint', participants: 89, winner: 'QualityFirst' },
                    { name: 'October Learning Marathon', participants: 234, winner: 'KnowledgeSeeker' }
                  ].map(challenge => (
                    <div key={challenge.name} className="flex items-center justify-between p-3 bg-muted/10 rounded">
                      <div>
                        <div className="font-medium">{challenge.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {challenge.participants} participants • Winner: {challenge.winner}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources & Wiki */}
          <TabsContent value="resources" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Resources & Wiki</h3>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Contribute
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Resources */}
              <div className="lg:col-span-2 space-y-6">
                {/* Curated Guides */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span>Curated Guides</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: 'Gold Trading Essentials', posts: 23, updated: '2 days ago' },
                        { title: 'Macro Regimes Guide', posts: 18, updated: '1 week ago' },
                        { title: 'Risk Management Patterns', posts: 31, updated: '3 days ago' },
                        { title: 'Backtesting Standards', posts: 15, updated: '5 days ago' }
                      ].map(guide => (
                        <div key={guide.title} className="p-4 bg-muted/10 rounded-lg hover:bg-muted/20 cursor-pointer transition-colors">
                          <h4 className="font-semibold mb-2">{guide.title}</h4>
                          <div className="text-xs text-muted-foreground">
                            {guide.posts} articles • Updated {guide.updated}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Best Threads */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-secondary" />
                      <span>Best Threads</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {samplePosts.filter(post => post.isWikiCandidate).map(post => (
                        <div key={post.id} className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg">
                          <div className="bg-primary/20 p-2 rounded">
                            <BookOpen className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{post.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{post.content.slice(0, 100)}...</p>
                            <div className="flex items-center space-x-2 text-xs">
                              <Badge variant="outline">{post.author.name}</Badge>
                              <Badge variant="outline">{post.likes} likes</Badge>
                              <Badge variant="outline">{post.replies} replies</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Access */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Posting Templates
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Quality Rubrics
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Trophy className="w-4 h-4 mr-2" />
                        Challenge Rules
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Glossary
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Contribution Stats */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Wiki Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Articles:</span>
                        <span className="font-semibold text-primary">127</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Contributors:</span>
                        <span className="font-semibold text-secondary">34</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">This Month:</span>
                        <span className="font-semibold text-primary">12 new</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Pending Review:</span>
                        <span className="font-semibold text-orange-500">7</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Contributors */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Top Contributors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'MacroMind', articles: 23, badge: 'S-Tier' },
                        { name: 'GoldWarrior', articles: 18, badge: 'A-Tier' },
                        { name: 'RiskMaster', articles: 15, badge: 'A-Tier' }
                      ].map(contributor => (
                        <div key={contributor.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs bg-primary/20 text-primary">
                                {contributor.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{contributor.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">{contributor.badge}</Badge>
                            <span className="text-xs text-muted-foreground">{contributor.articles}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Help & Moderation */}
          <TabsContent value="help" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Help & Moderation</h3>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Flag className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Community Rules */}
              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span>Community Rules</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Quality Standards</h4>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Use structured templates for all trade posts</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Include clear invalidation levels and risk management</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Provide constructive feedback with specific reasoning</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-secondary">Behavior Guidelines</h4>
                      <ul className="space-y-2 text-sm text-foreground/80">
                        <li className="flex items-start space-x-2">
                          <Shield className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          <span>Respect all skill levels and learning journeys</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Shield className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          <span>Share knowledge generously without gatekeeping</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Shield className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          <span>Maintain professional discourse at all times</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reporting & Appeals */}
              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Flag className="w-5 h-5 text-secondary" />
                    <span>Reporting & Appeals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How to Report</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Use the report button on any post or message. Provide specific details about the violation.
                      </p>
                      <Button variant="outline" className="w-full">
                        <Flag className="w-4 h-4 mr-2" />
                        Report Content
                      </Button>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Appeal Process</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        If you believe a moderation action was incorrect, you can appeal within 7 days.
                      </p>
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Submit Appeal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    <span>Frequently Asked Questions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        question: "How do I get my posts quality verified?",
                        answer: "Follow the posting templates, include proper risk management, and provide clear analysis. Mentors review posts regularly."
                      },
                      {
                        question: "What's the difference between tiers?",
                        answer: "Tiers reflect contribution quality and community standing. Higher tiers get additional privileges like mentoring opportunities."
                      },
                      {
                        question: "How do I join a squad?",
                        answer: "Browse the Squads section, find one that matches your interests and schedule, then request to join if spots are available."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="p-3 bg-muted/10 rounded">
                        <h5 className="font-semibold mb-1 text-sm">{faq.question}</h5>
                        <p className="text-xs text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-secondary" />
                    <span>Contact Support</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Need help with something not covered in the FAQ? Our support team is here to help.
                    </p>
                    
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Live Chat Support
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Support
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Knowledge Base
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Average response time: 2-4 hours during business hours
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};