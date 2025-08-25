import React, { useState, useEffect } from 'react';
import { SquadsHub } from './SquadsHub';
import { CreateSquadModal } from './CreateSquadModal';
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
import { Users, MessageCircle, TrendingUp, Star, Award, Calendar, BookOpen, Target, Brain, Building2, Search, Filter, Plus, Eye, ThumbsUp, Clock, ArrowRight, Zap, Trophy, Shield, Globe, Activity, FileText, Camera, BarChart3, DollarSign, AlertTriangle, CheckCircle, Flame, TrendingDown, MapPin, Bell, Settings, HelpCircle, Flag, Edit, Share, Bookmark, Hash, ChevronRight, PlayCircle, Video, Mic, Image, Link, Quote, ArrowLeft, LogOut, Home, Upload, UserPlus, Coins, PieChart, LineChart, Briefcase, GraduationCap, Headphones, Download, RefreshCw, Send, Reply, Heart, MessageSquare, ExternalLink, Pin, Archive, MoreHorizontal, Filter as FilterIcon, SortDesc, Calendar as CalendarIcon, Users as UsersIcon, Lightbulb, Megaphone, HelpCircle as HelpIcon, ShieldCheck, UserCheck, UserX, Trash2, Edit3, Copy, Move, Tag, Layers, Grid, List, BarChart, PlusCircle, MinusCircle, CheckSquare, Square, Circle, Dot, ArrowUp, ArrowDown, RotateCcw, FastForward, Rewind, Pause, Play, Volume2, VolumeX, Maximize, Minimize, Fullscreen as FullScreen, Fullscreen as ExitFullScreen, ZoomIn, ZoomOut, RotateCw, FlipHorizontal, FlipVertical, Crop, Scissors, Palette, Type, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Strikethrough, Code, Link2, Unlink, List as ListIcon, ListOrdered, Quote as QuoteIcon, Heading, GitGraph as Paragraph, SeparatorVertical as Separator, Space, Indent, Outdent, WrapText, AlignJustify, Crown, Mail } from 'lucide-react';

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
  onNavigateToForum: () => void;
}

export const MemberCommunity: React.FC<MemberCommunityProps> = ({ onBack, onLogout, onNavigateToForum }) => {
  const [activeTab, setActiveTab] = useState('squads');
  const [selectedForum, setSelectedForum] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAsset, setFilterAsset] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [showCreateSquad, setShowCreateSquad] = useState(false);
  const [pastTasks, setPastTasks] = useState<Task[]>([]);

  // Interface for past tasks that can be included in new squads
  interface Task {
    id: string;
    title: string;
    description: string;
    category: 'trading' | 'business' | 'learning' | 'accountability';
    priority: 'low' | 'medium' | 'high';
    assignedDate: Date;
    dueDate?: Date;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    tags: string[];
    estimatedHours?: number;
  }

  // Load past tasks on component mount
  useEffect(() => {
    const loadPastTasks = () => {
      // Sample past tasks - in real implementation, this would come from API/database
      const sampleTasks: Task[] = [
        {
          id: '1',
          title: 'Complete Trading Psychology Module',
          description: 'Finish the advanced trading psychology course and submit reflection essay',
          category: 'learning',
          priority: 'high',
          assignedDate: new Date('2024-01-10'),
          dueDate: new Date('2024-01-25'),
          status: 'in-progress',
          tags: ['psychology', 'education', 'self-development'],
          estimatedHours: 8
        },
        {
          id: '2',
          title: 'Develop Risk Management SOP',
          description: 'Create standard operating procedure for position sizing and risk management',
          category: 'business',
          priority: 'high',
          assignedDate: new Date('2024-01-08'),
          dueDate: new Date('2024-01-30'),
          status: 'pending',
          tags: ['risk-management', 'sop', 'business-ops'],
          estimatedHours: 12
        },
        {
          id: '3',
          title: 'Backtest Breakout Strategy',
          description: 'Conduct comprehensive backtesting on breakout strategy across major pairs',
          category: 'trading',
          priority: 'medium',
          assignedDate: new Date('2024-01-12'),
          dueDate: new Date('2024-02-01'),
          status: 'pending',
          tags: ['backtesting', 'strategy', 'analysis'],
          estimatedHours: 16
        },
        {
          id: '4',
          title: 'Weekly Trading Journal Review',
          description: 'Analyze weekly trading performance and identify improvement areas',
          category: 'accountability',
          priority: 'medium',
          assignedDate: new Date('2024-01-15'),
          status: 'completed',
          tags: ['journal', 'review', 'performance'],
          estimatedHours: 2
        },
        {
          id: '5',
          title: 'Market Correlation Analysis',
          description: 'Study correlations between major currency pairs and commodities',
          category: 'learning',
          priority: 'low',
          assignedDate: new Date('2024-01-05'),
          dueDate: new Date('2024-02-15'),
          status: 'pending',
          tags: ['correlation', 'analysis', 'research'],
          estimatedHours: 6
        }
      ];
      setPastTasks(sampleTasks);
    };

    loadPastTasks();
  }, []);

  // Handler for the "Create Squad" button click
  const handleCreateSquadClick = () => {
    try {
      // Check if past tasks exist
      if (pastTasks.length === 0) {
        console.warn('No past tasks found for squad creation');
        // Still allow squad creation but show empty task list
      }
      
      // Open the squad creation modal
      setShowCreateSquad(true);
    } catch (error) {
      console.error('Error opening squad creation menu:', error);
      // Could show error toast here
    }
  };

  // Handler for successful squad creation
  const handleSquadCreated = (newSquad: any) => {
    setShowCreateSquad(false);
    setActiveTab('squads');
    console.log('New squad created:', newSquad);
  };


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

  const renderSquadsContent = () => (
    <div className="space-y-6">
      {/* Squads Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Squads Hub</h2>
          <p className="text-muted-foreground">Collaborative Learning & Accountability Groups</p>
        </div>
        <Button 
          onClick={handleCreateSquadClick}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Squad
        </Button>
      </div>

      {/* Squad Discovery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleSquads.map((squad) => (
          <Card key={squad.id} className="military-card group cursor-pointer hover:border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{squad.name}</CardTitle>
                <Badge className={squad.isOpen ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}>
                  {squad.isOpen ? 'Open' : 'Invite Only'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{squad.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Members:</span>
                  <span className="font-medium">{squad.memberCount}/{squad.maxMembers}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Meetings:</span>
                  <span className="font-medium">{squad.meetingCadence}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {squad.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                {squad.isOpen ? 'Join Squad' : 'Request to Join'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderForumsContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Discussion Forums</h2>
      
      {/* Forums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {forums.map((forum) => (
          <Card key={forum.id} className="military-card group cursor-pointer hover:border-primary/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <forum.icon className={`w-5 h-5 ${forum.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{forum.name}</h3>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{forum.description}</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posts:</span>
                  <span className="font-medium">{forum.posts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Members:</span>
                  <span className="font-medium">{forum.members.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Today:</span>
                  <span className="font-medium text-primary">{forum.todaysPosts} new</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

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
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container-max mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-xl font-bold">Community Hub</h1>
                  <p className="text-primary font-semibold">Professional Discussion Hub</p>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Active Categories</span>
              </div>
              <div className="text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full inline-block mr-2" />
                Stocks • Forex • Crypto • Commodities • Options • Psychology • Business Development
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                <div className="w-2 h-2 bg-primary rounded-full inline-block mr-2" />
                Access our comprehensive trading forum with specialized categories for stocks, forex, crypto, commodities, 
                and options. Share detailed trade analysis, ask questions, and learn from verified professional traders 
                through structured discussions with rich content support including charts and real-time market data.
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                <div className="w-2 h-2 bg-primary rounded-full inline-block mr-2" />
                <span className="text-foreground/80">Specialized trading categories and sub-forums</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                <div className="w-2 h-2 bg-primary rounded-full inline-block mr-2" />
                <span className="text-foreground/80">Verified professional traders and expert analysis</span>
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
                onClick={onNavigateToForum}
              >
                Access Trading Forum
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container-max mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/20">
            <TabsTrigger value="squads" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Squads</span>
            </TabsTrigger>
            <TabsTrigger value="forums" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Forums</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Challenges</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="squads">
            {renderSquadsContent()}
          </TabsContent>

          <TabsContent value="forums">
            {renderForumsContent()}
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Community Events</h2>
              <p className="text-muted-foreground">Live sessions, workshops, and community gatherings</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="military-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Weekly Gold Review</CardTitle>
                    <Badge className="bg-primary/10 text-primary">Live Today</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">2:00 PM EST</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">23 attending</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Review this week's gold trades and setups with senior mentors.
                    </p>
                  </div>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Join Session
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="military-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Macro AMA</CardTitle>
                    <Badge className="bg-secondary/10 text-secondary">Tomorrow</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">4:00 PM EST</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">67 registered</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Q&A on current macro environment with Chief Analyst.
                    </p>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Register
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Community Challenges</h2>
              <p className="text-muted-foreground">Compete with fellow warriors and earn recognition</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="military-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>30-Day Consistency Challenge</CardTitle>
                    <Badge className="bg-primary/10 text-primary">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Complete daily trading journal entries for 30 consecutive days.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>12/30 days</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Reward: Discipline Warrior Badge</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Leaderboard
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="military-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Best Analysis Contest</CardTitle>
                    <Badge className="bg-secondary/10 text-secondary">Voting Phase</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Submit your best market analysis for community voting.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">45 submissions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Reward: $500 + Expert Badge</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Vote Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Access to Forum */}
        <Card className="military-card mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Professional Trading Forum</h3>
                  <p className="text-muted-foreground">Join structured discussions with verified traders</p>
                </div>
              </div>
              <Button 
                onClick={onNavigateToForum}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Access Forum
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Create Squad Modal */}
        <CreateSquadModal
          isOpen={showCreateSquad}
          onClose={() => setShowCreateSquad(false)}
          onSquadCreated={handleSquadCreated}
          pastTasks={pastTasks}
        />
      </div>
    </div>
  );
};