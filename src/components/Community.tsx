import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  MessageCircle, 
  TrendingUp, 
  Star,
  Award,
  Calendar,
  BookOpen,
  Target,
  Brain,
  Building2,
  Search,
  Filter,
  Plus,
  Eye,
  ThumbsUp,
  Clock,
  ArrowRight,
  Zap,
  Trophy,
  Shield,
  Globe,
  Activity,
  FileText,
  Camera,
  BarChart3,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Flame,
  TrendingDown,
  MapPin,
  Bell,
  Settings,
  HelpCircle,
  Flag,
  Edit,
  Share,
  Bookmark,
  Hash,
  ChevronRight,
  PlayCircle,
  Video,
  Mic,
  Image,
  Link,
  Quote
} from 'lucide-react';

interface Post {
  id: string;
  type: 'trade-idea' | 'trade-recap' | 'macro-thesis' | 'question' | 'resource' | 'mindset' | 'business';
  title: string;
  author: string;
  authorLevel: string;
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
}

interface Squad {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  meetingCadence: string;
  tags: string[];
  isOpen: boolean;
}

interface Event {
  id: string;
  title: string;
  type: 'ama' | 'workshop' | 'review' | 'market-prep';
  date: string;
  time: string;
  host: string;
  description: string;
  attendees: number;
  maxAttendees?: number;
}

export const Community = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedForum, setSelectedForum] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAsset, setFilterAsset] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Sample data
  const samplePosts: Post[] = [
    {
      id: '1',
      type: 'trade-idea',
      title: 'XAUUSD Long Setup - London Session Breakout',
      author: 'GoldWarrior',
      authorLevel: 'A-Tier',
      timestamp: '2 hours ago',
      content: 'Clean breakout above 2020 resistance with strong volume confluence. Risk 1.5% for 3R target at 2045.',
      asset: 'XAUUSD',
      direction: 'long',
      timeframe: '4H',
      setupType: 'breakout',
      tags: ['gold', 'breakout', 'london-session'],
      likes: 24,
      replies: 8,
      views: 156,
      hasImage: true,
      isQualityVerified: true,
      isWikiCandidate: false
    },
    {
      id: '2',
      type: 'trade-recap',
      title: 'EURUSD Short Recap - Stopped Out',
      author: 'FXAnalyst',
      authorLevel: 'B-Tier',
      timestamp: '4 hours ago',
      content: 'Got stopped on EUR short. Plan was solid but missed the NFP volatility spike. Key lesson: check calendar before London close entries.',
      asset: 'EURUSD',
      direction: 'short',
      timeframe: '1H',
      setupType: 'retest',
      outcome: 'loss',
      rMultiple: -1,
      tags: ['eurusd', 'lesson-learned', 'news-impact'],
      likes: 18,
      replies: 12,
      views: 89,
      hasImage: true,
      isQualityVerified: true,
      isWikiCandidate: false
    },
    {
      id: '3',
      type: 'macro-thesis',
      title: 'USD Strength into Q1 2024 - Rate Differential Play',
      author: 'MacroMind',
      authorLevel: 'S-Tier',
      timestamp: '6 hours ago',
      content: 'Fed hawkish pivot vs ECB dovish hold creates compelling USD strength narrative. Key levels and trade implications inside.',
      tags: ['macro', 'usd', 'fed', 'rates'],
      likes: 45,
      replies: 23,
      views: 234,
      hasImage: false,
      isQualityVerified: true,
      isWikiCandidate: true
    }
  ];

  const sampleSquads: Squad[] = [
    {
      id: '1',
      name: 'Gold Desk Warriors',
      description: 'Daily gold analysis and trade reviews. Focus on London/NY sessions.',
      memberCount: 6,
      meetingCadence: 'Daily 8AM EST',
      tags: ['gold', 'daily', 'active'],
      isOpen: false
    },
    {
      id: '2',
      name: 'Macro Minds',
      description: 'Weekly deep dives into economic data and policy implications.',
      memberCount: 4,
      meetingCadence: 'Weekly Sundays',
      tags: ['macro', 'research', 'weekly'],
      isOpen: true
    },
    {
      id: '3',
      name: 'Psychology Focus Group',
      description: 'Mindset work, emotional regulation, and performance optimization.',
      memberCount: 5,
      meetingCadence: 'Bi-weekly',
      tags: ['psychology', 'mindset', 'accountability'],
      isOpen: true
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
      description: 'Review this week\'s gold trades and setups. Bring your charts!',
      attendees: 23,
      maxAttendees: 50
    },
    {
      id: '2',
      title: 'Macro AMA with Chief Analyst',
      type: 'ama',
      date: 'Tomorrow',
      time: '4:00 PM EST',
      host: 'Chief Analyst',
      description: 'Q&A on current macro environment and Q1 outlook.',
      attendees: 67,
      maxAttendees: 100
    },
    {
      id: '3',
      title: 'Risk Management Workshop',
      type: 'workshop',
      date: 'Friday',
      time: '1:00 PM EST',
      host: 'Risk Specialist',
      description: 'Advanced position sizing and portfolio risk techniques.',
      attendees: 34,
      maxAttendees: 75
    }
  ];

  const forums = [
    { id: 'gold-desk', name: 'Gold Desk (XAU)', icon: Trophy, color: 'text-yellow-500', posts: 234 },
    { id: 'fx-majors', name: 'FX Majors & Crosses', icon: Globe, color: 'text-blue-500', posts: 456 },
    { id: 'indices', name: 'Indices & Metals', icon: BarChart3, color: 'text-green-500', posts: 189 },
    { id: 'macro', name: 'Macro & Data', icon: TrendingUp, color: 'text-purple-500', posts: 167 },
    { id: 'strategy', name: 'Strategy & Playbooks', icon: Target, color: 'text-red-500', posts: 298 },
    { id: 'research', name: 'Backtesting & Research', icon: Activity, color: 'text-indigo-500', posts: 123 },
    { id: 'mindset', name: 'Mindset & Performance', icon: Brain, color: 'text-pink-500', posts: 345 },
    { id: 'business', name: 'Business & Career', icon: Building2, color: 'text-orange-500', posts: 156 }
  ];

  const challenges = [
    {
      id: '1',
      title: '30-Day Consistency Challenge',
      description: 'Daily trade plans and recaps for 30 days',
      participants: 89,
      daysLeft: 12,
      reward: '500 XP + Badge'
    },
    {
      id: '2',
      title: 'Gold Mastery Sprint',
      description: '2-week focused gold trading with mentor reviews',
      participants: 34,
      daysLeft: 5,
      reward: '300 XP + Gold Badge'
    }
  ];

  const renderPostCard = (post: Post) => (
    <Card key={post.id} className="military-card hover:border-primary/30 transition-all duration-300 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/20 text-primary font-semibold text-sm">
                {post.author.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold">{post.author}</span>
                <Badge className={`text-xs ${
                  post.authorLevel === 'S-Tier' ? 'bg-purple-500/10 text-purple-500' :
                  post.authorLevel === 'A-Tier' ? 'bg-primary/10 text-primary' :
                  'bg-secondary/10 text-secondary'
                }`}>
                  {post.authorLevel}
                </Badge>
                <span className="text-xs text-muted-foreground">{post.timestamp}</span>
              </div>
              <h3 className="font-semibold text-sm leading-tight">{post.title}</h3>
            </div>
          </div>
          <div className="flex items-center space-x-1">
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
              <Badge variant="outline" className="text-xs">{post.asset}</Badge>
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
            {post.rMultiple !== undefined && (
              <span className={`font-semibold ${
                post.rMultiple > 0 ? 'text-primary' : 'text-destructive'
              }`}>
                {post.rMultiple > 0 ? '+' : ''}{post.rMultiple}R
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-muted-foreground">+{post.tags.length - 3} more</span>
          )}
        </div>

        {/* Engagement stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ThumbsUp className="w-3 h-3" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-3 h-3" />
              <span>{post.replies}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{post.views}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            View Thread
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="community" className="section-padding">
      <div className="container-max mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-secondary/10 text-secondary border-secondary/20 px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            Brotherhood of Warriors
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Brotherhood of
            <span className="block gradient-text">Market Warriors</span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Connect with operators who understand that weakness is not an option. 
            Share the battlefield with warriors whose results command entrepreneurial respect.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-muted/20">
            <TabsTrigger value="home" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
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
          </TabsList>

          {/* Home Feed */}
          <TabsContent value="home" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Flame className="w-5 h-5 text-primary" />
                        <span>Today's Highlights</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        New Post
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {samplePosts.map(renderPostCard)}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Community Pulse</CardTitle>
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
                      {['#gold-breakout', '#fed-pivot', '#london-session', '#risk-management', '#psychology'].map(tag => (
                        <div key={tag} className="flex items-center justify-between p-2 bg-muted/10 rounded hover:bg-muted/20 cursor-pointer">
                          <span className="text-sm font-medium">{tag}</span>
                          <Badge variant="outline" className="text-xs">
                            {Math.floor(Math.random() * 50) + 10}
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
                      {sampleEvents.slice(0, 2).map(event => (
                        <div key={event.id} className="p-3 bg-muted/10 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{event.title}</span>
                            <Badge className="text-xs bg-primary/10 text-primary">
                              {event.date}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {event.time} • {event.attendees} attending
                          </div>
                        </div>
                      ))}
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
              {forums.map(forum => (
                <Card key={forum.id} className="military-card hover:border-primary/30 transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-muted/20 p-3 rounded-xl">
                        <forum.icon className={`w-6 h-6 ${forum.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{forum.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{forum.posts} posts</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
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
              ))}
            </div>
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
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Camera className="w-4 h-4 mr-2" />
                  Upload Trade
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {samplePosts.filter(post => post.type === 'trade-idea' || post.type === 'trade-recap').map(renderPostCard)}
            </div>
          </TabsContent>

          {/* Squads */}
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
                        <span className="font-medium">{squad.memberCount}/8</span>
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

            {/* Accountability Pairs */}
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
                              <div className="text-xs text-muted-foreground">EST timezone</div>
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
                        <div className="text-xs text-muted-foreground">
                          "45-day streak together! Accountability works."
                        </div>
                      </div>
                      <div className="p-3 bg-secondary/10 rounded">
                        <div className="text-sm font-medium mb-1">Alex & Jordan</div>
                        <div className="text-xs text-muted-foreground">
                          "Improved win rate by 15% through daily check-ins."
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events */}
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
                              event.type === 'review' ? 'bg-purple-500/10' : 'bg-orange-500/10'
                            }`}>
                              {event.type === 'ama' ? <Mic className="w-6 h-6 text-primary" /> :
                               event.type === 'workshop' ? <BookOpen className="w-6 h-6 text-secondary" /> :
                               event.type === 'review' ? <Eye className="w-6 h-6 text-purple-500" /> :
                               <Activity className="w-6 h-6 text-orange-500" />}
                            </div>
                            <div>
                              <h5 className="font-semibold mb-1">{event.title}</h5>
                              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span>{event.date} at {event.time}</span>
                                <span>Host: {event.host}</span>
                                <span>{event.attendees} attending</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm">Join Event</Button>
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
                            {index === 1 && <div className="w-2 h-2 bg-primary rounded-full" />}
                            {index === 3 && <div className="w-2 h-2 bg-secondary rounded-full" />}
                            {index === 4 && <div className="w-2 h-2 bg-purple-500 rounded-full" />}
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
                      {['Gold Market Review', 'Risk Management 101', 'Psychology Deep Dive'].map(title => (
                        <div key={title} className="flex items-center space-x-3 p-2 hover:bg-muted/10 rounded cursor-pointer">
                          <PlayCircle className="w-4 h-4 text-primary" />
                          <div>
                            <div className="text-sm font-medium">{title}</div>
                            <div className="text-xs text-muted-foreground">45 min • 234 views</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Challenges */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Challenges & Sprints</h3>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Trophy className="w-4 h-4 mr-2" />
                Create Challenge
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges.map(challenge => (
                <Card key={challenge.id} className="military-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <Badge className="bg-primary/10 text-primary">
                        {challenge.daysLeft} days left
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Participants:</span>
                        <span className="font-medium">{challenge.participants}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Reward:</span>
                        <span className="font-medium text-primary">{challenge.reward}</span>
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
                  {[
                    { name: 'ConsistentTrader', score: 95, badge: '🥇' },
                    { name: 'DisciplinedMind', score: 92, badge: '🥈' },
                    { name: 'RiskMaster', score: 89, badge: '🥉' },
                    { name: 'PatientWarrior', score: 87, badge: '4th' },
                    { name: 'SystemFollower', score: 85, badge: '5th' }
                  ].map((leader, index) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};