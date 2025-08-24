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
}

export const MemberCommunity: React.FC<MemberCommunityProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedForum, setSelectedForum] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAsset, setFilterAsset] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Add squads view state
  const [showSquads, setShowSquads] = useState(false);
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
    // Refresh squads list or navigate to new squad
    console.log('New squad created:', newSquad);
  };

  // If showing squads, render the SquadsHub component
  if (showSquads) {
    return <SquadsHub />;
  }

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
      title: 'Market Prep Session',
      type: 'market-prep',
      date: 'Monday',
      time: '7:30 AM EST',
      host: 'Head Analyst',
      description: 'Week ahead preview: key levels, events, and setups to watch. Interactive prep session.',
      attendees: 45,
      maxAttendees: 100,
      status: 'upcoming'
    }
  ];

  const sampleChallenges: Challenge[] = [
    {
      id: '1',
      title: '30-Day Consistency Challenge',
      description: 'Post one quality trade analysis or recap daily for 30 days. Build the habit of systematic documentation.',
      type: 'consistency',
      startDate: 'Jan 1, 2024',
      endDate: 'Jan 30, 2024',
      participants: 47,
      maxParticipants: 100,
      reward: 'Consistency Badge + 1-on-1 Mentor Session',
      rules: [
        'Post daily trade analysis or recap',
        'Minimum 100 words per post',
        'Include chart or setup explanation',
        'Tag with #ConsistencyChallenge'
      ],
      leaderboard: [
        { rank: 1, name: 'TradeLogger', score: 28, badge: 'streak-leader' },
        { rank: 2, name: 'ChartMaster', score: 26, badge: 'quality-posts' },
        { rank: 3, name: 'SystemTrader', score: 25 }
      ]
    },
    {
      id: '2',
      title: 'Wiki Contributor Sprint',
      description: 'Help build the community knowledge base. Contribute high-quality educational content and earn recognition.',
      type: 'quality',
      startDate: 'Jan 15, 2024',
      endDate: 'Feb 15, 2024',
      participants: 23,
      reward: 'Wiki Contributor Badge + Featured Profile',
      rules: [
        'Submit original educational content',
        'Minimum 500 words per submission',
        'Include examples and visuals',
        'Pass community review process'
      ],
      leaderboard: [
        { rank: 1, name: 'EduMaster', score: 3, badge: 'top-contributor' },
        { rank: 2, name: 'KnowledgeSeeker', score: 2 },
        { rank: 3, name: 'TeachingTrader', score: 2 }
      ]
    }
  ];

  const filteredPosts = samplePosts.filter(post => {
    const matchesForum = selectedForum === 'all' || post.forum === selectedForum;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAsset = filterAsset === 'all' || post.asset === filterAsset;
    const matchesType = filterType === 'all' || post.type === filterType;
    
    return matchesForum && matchesSearch && matchesAsset && matchesType;
  });

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'trade-idea': return Target;
      case 'trade-recap': return BarChart3;
      case 'macro-thesis': return TrendingUp;
      case 'question': return HelpCircle;
      case 'resource': return BookOpen;
      case 'mindset': return Brain;
      case 'business': return Building2;
      case 'showcase': return Star;
      default: return FileText;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'trade-idea': return 'text-blue-500';
      case 'trade-recap': return 'text-green-500';
      case 'macro-thesis': return 'text-purple-500';
      case 'question': return 'text-orange-500';
      case 'resource': return 'text-indigo-500';
      case 'mindset': return 'text-pink-500';
      case 'business': return 'text-yellow-500';
      case 'showcase': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'S-Tier': return 'text-purple-500 bg-purple-50';
      case 'A-Tier': return 'text-blue-500 bg-blue-50';
      case 'B-Tier': return 'text-green-500 bg-green-50';
      case 'C-Tier': return 'text-gray-500 bg-gray-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'ama': return MessageCircle;
      case 'workshop': return BookOpen;
      case 'review': return BarChart3;
      case 'market-prep': return TrendingUp;
      case 'office-hours': return Clock;
      default: return Calendar;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'ama': return 'text-purple-500 bg-purple-50';
      case 'workshop': return 'text-blue-500 bg-blue-50';
      case 'review': return 'text-green-500 bg-green-50';
      case 'market-prep': return 'text-orange-500 bg-orange-50';
      case 'office-hours': return 'text-indigo-500 bg-indigo-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getChallengeTypeIcon = (type: string) => {
    switch (type) {
      case 'consistency': return Target;
      case 'quality': return Star;
      case 'learning': return BookOpen;
      case 'community': return Users;
      default: return Trophy;
    }
  };

  const getChallengeTypeColor = (type: string) => {
    switch (type) {
      case 'consistency': return 'text-blue-500 bg-blue-50';
      case 'quality': return 'text-purple-500 bg-purple-50';
      case 'learning': return 'text-green-500 bg-green-50';
      case 'community': return 'text-orange-500 bg-orange-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">Community Hub</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
                <Badge variant="destructive" className="ml-1 px-1.5 py-0.5 text-xs">3</Badge>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="home" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </TabsTrigger>
            <TabsTrigger value="forums" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Forums</span>
            </TabsTrigger>
            <TabsTrigger value="squads" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Squads</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Challenges</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Forums</p>
                      <p className="text-2xl font-bold text-gray-900">8</p>
                    </div>
                    <MessageCircle className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Your Squads</p>
                      <p className="text-2xl font-bold text-gray-900">2</p>
                    </div>
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                      <p className="text-2xl font-bold text-gray-900">4</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Challenges</p>
                      <p className="text-2xl font-bold text-gray-900">2</p>
                    </div>
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredPosts.slice(0, 3).map((post) => {
                  const PostIcon = getPostTypeIcon(post.type);
                  return (
                    <div key={post.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={getLevelColor(post.author.level)}>
                          {post.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <PostIcon className={`h-4 w-4 ${getPostTypeColor(post.type)}`} />
                          <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
                          <Badge variant="secondary" className={getLevelColor(post.author.level)}>
                            {post.author.level}
                          </Badge>
                          <span className="text-sm text-gray-500">{post.timestamp}</span>
                        </div>
                        
                        <h4 className="text-sm font-medium text-gray-900 mb-2">{post.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                        
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <div className="text-center pt-4">
                  <Button variant="outline" onClick={() => setActiveTab('forums')}>
                    View All Posts
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forums Tab */}
          <TabsContent value="forums" className="space-y-6">
            {/* Forum Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    
                    <Select value={selectedForum} onValueChange={setSelectedForum}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Select forum" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Forums</SelectItem>
                        {forums.map((forum) => (
                          <SelectItem key={forum.id} value={forum.id}>
                            {forum.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Post type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="trade-idea">Trade Ideas</SelectItem>
                        <SelectItem value="trade-recap">Trade Recaps</SelectItem>
                        <SelectItem value="macro-thesis">Macro Thesis</SelectItem>
                        <SelectItem value="question">Questions</SelectItem>
                        <SelectItem value="resource">Resources</SelectItem>
                        <SelectItem value="mindset">Mindset</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="showcase">Showcase</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Recent</SelectItem>
                        <SelectItem value="popular">Popular</SelectItem>
                        <SelectItem value="trending">Trending</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Forum List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {forums.map((forum) => {
                const ForumIcon = forum.icon;
                return (
                  <Card key={forum.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <ForumIcon className={`h-6 w-6 ${forum.color}`} />
                          <div>
                            <h3 className="font-semibold text-gray-900">{forum.name}</h3>
                            <p className="text-sm text-gray-600">{forum.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>{forum.members.toLocaleString()} members</span>
                          <span>{forum.posts} posts</span>
                        </div>
                        <Badge variant="secondary">
                          {forum.todaysPosts} today
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Posts Feed */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
              {filteredPosts.map((post) => {
                const PostIcon = getPostTypeIcon(post.type);
                return (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className={getLevelColor(post.author.level)}>
                              {post.author.avatar}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{post.author.name}</span>
                              <Badge variant="secondary" className={getLevelColor(post.author.level)}>
                                {post.author.level}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <PostIcon className={`h-4 w-4 ${getPostTypeColor(post.type)}`} />
                              <span className="capitalize">{post.type.replace('-', ' ')}</span>
                              <span>•</span>
                              <span>{post.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {post.isQualityVerified && (
                            <Badge variant="secondary" className="text-green-600 bg-green-50">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {post.isPinned && (
                            <Pin className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                      </div>
                      
                      {/* Post Content */}
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
                      </div>
                      
                      {/* Trade Details */}
                      {(post.asset || post.direction || post.timeframe) && (
                        <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg">
                          {post.asset && (
                            <div className="flex items-center space-x-1">
                              <span className="text-xs font-medium text-gray-500">Asset:</span>
                              <Badge variant="outline">{post.asset}</Badge>
                            </div>
                          )}
                          {post.direction && (
                            <div className="flex items-center space-x-1">
                              <span className="text-xs font-medium text-gray-500">Direction:</span>
                              <Badge variant={post.direction === 'long' ? 'default' : 'destructive'}>
                                {post.direction.toUpperCase()}
                              </Badge>
                            </div>
                          )}
                          {post.timeframe && (
                            <div className="flex items-center space-x-1">
                              <span className="text-xs font-medium text-gray-500">Timeframe:</span>
                              <Badge variant="secondary">{post.timeframe}</Badge>
                            </div>
                          )}
                          {post.outcome && (
                            <div className="flex items-center space-x-1">
                              <span className="text-xs font-medium text-gray-500">Outcome:</span>
                              <Badge variant={
                                post.outcome === 'win' ? 'default' : 
                                post.outcome === 'loss' ? 'destructive' : 'secondary'
                              }>
                                {post.outcome}
                                {post.rMultiple && ` (${post.rMultiple}R)`}
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </Button>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Eye className="h-4 w-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Squads Tab */}
          <TabsContent value="squads" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Trading Squads</h2>
                <p className="text-gray-600">Join small groups for focused learning and accountability</p>
              </div>
              <Button onClick={handleCreateSquadClick} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Squad</span>
              </Button>
            </div>

            {/* Squad Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Strategy Focused</h3>
                  <p className="text-sm text-gray-600">Deep dive into specific trading strategies and setups</p>
                </CardContent>
              </Card>
              
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <Brain className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Psychology & Mindset</h3>
                  <p className="text-sm text-gray-600">Work on mental game and emotional regulation</p>
                </CardContent>
              </Card>
              
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-6 text-center">
                  <Building2 className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Business Building</h3>
                  <p className="text-sm text-gray-600">Scale your trading into a sustainable business</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Squads */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleSquads.map((squad) => (
                <Card key={squad.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{squad.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{squad.description}</p>
                      </div>
                      {squad.isOpen && (
                        <Badge variant="secondary" className="text-green-600 bg-green-50">
                          Open
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Members</span>
                        <span className="font-medium">{squad.memberCount}/{squad.maxMembers}</span>
                      </div>
                      <Progress value={(squad.memberCount / squad.maxMembers) * 100} className="h-2" />
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Meetings</span>
                        <span className="font-medium">{squad.meetingCadence}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {squad.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      {squad.members.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {member.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {squad.members.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{squad.members.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <Button className="w-full" size="sm">
                      {squad.isOpen ? 'Join Squad' : 'View Squad'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Community Events</h2>
                <p className="text-gray-600">Live sessions, workshops, and AMAs with experts</p>
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>View Calendar</span>
              </Button>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-4">
              {sampleEvents.map((event) => {
                const EventIcon = getEventTypeIcon(event.type);
                return (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${getEventTypeColor(event.type)}`}>
                            <EventIcon className="h-6 w-6" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{event.title}</h3>
                              <Badge variant="outline" className="capitalize">
                                {event.type.replace('-', ' ')}
                              </Badge>
                              {event.status === 'live' && (
                                <Badge variant="destructive" className="animate-pulse">
                                  <Circle className="h-2 w-2 mr-1 fill-current" />
                                  Live
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-gray-600 mb-3">{event.description}</p>
                            
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{event.attendees} attending</span>
                                {event.maxAttendees && (
                                  <span>/ {event.maxAttendees} max</span>
                                )}
                              </div>
                              <div className="flex items-center space-x-1">
                                <Mic className="h-4 w-4" />
                                <span>Host: {event.host}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {event.status === 'upcoming' && (
                            <Button size="sm">
                              Join Event
                            </Button>
                          )}
                          {event.status === 'live' && (
                            <Button size="sm" variant="destructive">
                              Join Live
                            </Button>
                          )}
                          {event.status === 'completed' && event.hasRecording && (
                            <Button size="sm" variant="outline">
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Watch Recording
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Community Challenges</h2>
                <p className="text-gray-600">Compete, learn, and earn recognition through structured challenges</p>
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>My Achievements</span>
              </Button>
            </div>

            {/* Active Challenges */}
            <div className="space-y-6">
              {sampleChallenges.map((challenge) => {
                const ChallengeIcon = getChallengeTypeIcon(challenge.type);
                return (
                  <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${getChallengeTypeColor(challenge.type)}`}>
                            <ChallengeIcon className="h-6 w-6" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                              <Badge variant="outline" className="capitalize">
                                {challenge.type}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{challenge.description}</p>
                            
                            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{challenge.startDate} - {challenge.endDate}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{challenge.participants} participants</span>
                                {challenge.maxParticipants && (
                                  <span>/ {challenge.maxParticipants} max</span>
                                )}
                              </div>
                              <div className="flex items-center space-x-1">
                                <Award className="h-4 w-4" />
                                <span>{challenge.reward}</span>
                              </div>
                            </div>
                            
                            {/* Challenge Rules */}
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 mb-2">Rules:</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {challenge.rules.map((rule, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{rule}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <Button size="sm">
                          Join Challenge
                        </Button>
                      </div>
                      
                      {/* Leaderboard */}
                      <div className="border-t border-gray-100 pt-6">
                        <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <span>Leaderboard</span>
                        </h4>
                        
                        <div className="space-y-3">
                          {challenge.leaderboard.map((entry) => (
                            <div key={entry.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                                  entry.rank === 2 ? 'bg-gray-100 text-gray-800' :
                                  entry.rank === 3 ? 'bg-orange-100 text-orange-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {entry.rank}
                                </div>
                                <span className="font-medium text-gray-900">{entry.name}</span>
                                {entry.badge && (
                                  <Badge variant="secondary" className="text-xs">
                                    {entry.badge}
                                  </Badge>
                                )}
                              </div>
                              <span className="font-bold text-gray-900">{entry.score}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Squad Creation Modal */}
      {showCreateSquad && (
        <CreateSquadModal
          isOpen={showCreateSquad}
          onClose={() => setShowCreateSquad(false)}
          onSquadCreated={handleSquadCreated}
          pastTasks={pastTasks}
        />
      )}
    </div>
  );
};