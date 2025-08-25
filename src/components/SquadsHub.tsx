import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CreateSquadModal } from './CreateSquadModal';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Calendar,
  Clock,
  Target,
  Shield,
  Globe,
  Lock,
  Crown,
  Star,
  Activity,
  MessageCircle,
  TrendingUp,
  Building2,
  Brain,
  BookOpen,
  Award,
  Zap,
  CheckCircle,
  AlertTriangle,
  Settings,
  MoreHorizontal,
  UserPlus,
  UserCheck,
  Bell,
  Pin,
  Archive,
  Edit,
  Trash2,
  ExternalLink,
  Share,
  Bookmark,
  Flag,
  ArrowRight,
  ChevronRight,
  Flame,
  TrendingDown,
  Hash,
  Tag,
  MapPin,
  Languages,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon
} from 'lucide-react';

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

interface Squad {
  id: string;
  name: string;
  description: string;
  category: string;
  privacy: 'open' | 'application' | 'invite' | 'private';
  maxMembers: number;
  currentMembers: number;
  leaderId: string;
  memberIds: string[];
  tags: string[];
  goals: string[];
  activityLevel: 'low' | 'medium' | 'high' | 'very-high';
  meetingCadence: string;
  timezone: string;
  language: string;
  region?: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
  createdAt: Date;
  lastActivity: Date;
  isActive: boolean;
  members: SquadMember[];
  recentActivity: SquadActivity[];
  achievements: string[];
  projects: SquadProject[];
}

interface SquadMember {
  id: string;
  username: string;
  displayName: string;
  role: 'leader' | 'moderator' | 'member';
  level: 'S-Tier' | 'A-Tier' | 'B-Tier' | 'C-Tier';
  joinedAt: Date;
  lastActive: Date;
  contributionScore: number;
  badges: string[];
}

interface SquadActivity {
  id: string;
  type: 'message' | 'project' | 'achievement' | 'member-join' | 'member-leave';
  description: string;
  timestamp: Date;
  userId: string;
  username: string;
}

interface SquadProject {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  progress: number;
  dueDate?: Date;
  assignedMembers: string[];
  createdAt: Date;
}

interface SquadsHubProps {
  onBack: () => void;
  onLogout: () => void;
}

export const SquadsHub: React.FC<SquadsHubProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPrivacy, setFilterPrivacy] = useState('all');
  const [filterSkillLevel, setFilterSkillLevel] = useState('all');
  const [showCreateSquad, setShowCreateSquad] = useState(false);
  const [selectedSquad, setSelectedSquad] = useState<Squad | null>(null);
  const [userSquads, setUserSquads] = useState<Squad[]>([]);
  const [allSquads, setAllSquads] = useState<Squad[]>([]);
  const [pastTasks, setPastTasks] = useState<Task[]>([]);

  // Sample past tasks
  useEffect(() => {
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
      }
    ];
    setPastTasks(sampleTasks);
  }, []);

  // Sample squads data
  useEffect(() => {
    const sampleSquads: Squad[] = [
      {
        id: '1',
        name: 'Gold Trading Masters',
        description: 'Elite group focused on mastering gold trading strategies and market analysis. Daily sessions during London/NY overlap.',
        category: 'trading-strategies',
        privacy: 'application',
        maxMembers: 8,
        currentMembers: 6,
        leaderId: 'user1',
        memberIds: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
        tags: ['gold', 'xauusd', 'technical-analysis', 'london-ny'],
        goals: ['Master gold trading setups', 'Achieve consistent profitability', 'Develop systematic approach'],
        activityLevel: 'very-high',
        meetingCadence: 'Daily 8AM EST',
        timezone: 'America/New_York',
        language: 'English',
        skillLevel: 'advanced',
        createdAt: new Date('2023-12-01'),
        lastActivity: new Date(),
        isActive: true,
        achievements: ['100 Days Active', 'Top Performing Squad'],
        members: [
          {
            id: 'user1',
            username: 'GoldMaster',
            displayName: 'Gold Master',
            role: 'leader',
            level: 'S-Tier',
            joinedAt: new Date('2023-12-01'),
            lastActive: new Date(),
            contributionScore: 95,
            badges: ['Squad Leader', 'Gold Expert']
          },
          {
            id: 'user2',
            username: 'XAUTrader',
            displayName: 'XAU Trader',
            role: 'member',
            level: 'A-Tier',
            joinedAt: new Date('2023-12-05'),
            lastActive: new Date(),
            contributionScore: 87,
            badges: ['Active Member']
          }
        ],
        recentActivity: [
          {
            id: '1',
            type: 'message',
            description: 'Shared new gold analysis for London session',
            timestamp: new Date(),
            userId: 'user1',
            username: 'GoldMaster'
          }
        ],
        projects: [
          {
            id: '1',
            title: 'Gold Trading Playbook',
            description: 'Comprehensive guide to gold trading strategies',
            status: 'active',
            progress: 75,
            dueDate: new Date('2024-02-01'),
            assignedMembers: ['user1', 'user2'],
            createdAt: new Date('2024-01-01')
          }
        ]
      },
      {
        id: '2',
        name: 'Macro Analysis Group',
        description: 'Weekly deep dives into macroeconomic data and policy implications. Research-focused collaborative environment.',
        category: 'skill-learning',
        privacy: 'open',
        maxMembers: 12,
        currentMembers: 8,
        leaderId: 'user3',
        memberIds: ['user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9', 'user10'],
        tags: ['macro', 'economics', 'research', 'fundamentals'],
        goals: ['Master macroeconomic analysis', 'Understand policy implications', 'Develop research skills'],
        activityLevel: 'medium',
        meetingCadence: 'Weekly Sundays 2PM EST',
        timezone: 'America/New_York',
        language: 'English',
        skillLevel: 'intermediate',
        createdAt: new Date('2023-11-15'),
        lastActivity: new Date(),
        isActive: true,
        achievements: ['Research Excellence'],
        members: [
          {
            id: 'user3',
            username: 'MacroMind',
            displayName: 'Macro Mind',
            role: 'leader',
            level: 'A-Tier',
            joinedAt: new Date('2023-11-15'),
            lastActive: new Date(),
            contributionScore: 92,
            badges: ['Squad Leader', 'Macro Expert']
          }
        ],
        recentActivity: [],
        projects: []
      }
    ];
    
    setAllSquads(sampleSquads);
    setUserSquads(sampleSquads.filter(squad => squad.memberIds.includes('current-user-id')));
  }, []);

  const handleCreateSquad = () => {
    setShowCreateSquad(true);
  };

  const handleSquadCreated = (newSquad: any) => {
    setAllSquads(prev => [...prev, newSquad]);
    setUserSquads(prev => [...prev, newSquad]);
    setShowCreateSquad(false);
    setActiveTab('my-squads');
  };

  const handleJoinSquad = (squadId: string) => {
    const squad = allSquads.find(s => s.id === squadId);
    if (squad && squad.currentMembers < squad.maxMembers) {
      // Add user to squad
      const updatedSquad = {
        ...squad,
        currentMembers: squad.currentMembers + 1,
        memberIds: [...squad.memberIds, 'current-user-id']
      };
      
      setAllSquads(prev => prev.map(s => s.id === squadId ? updatedSquad : s));
      setUserSquads(prev => [...prev, updatedSquad]);
    }
  };

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case 'open': return Globe;
      case 'application': return Eye;
      case 'invite': return Shield;
      case 'private': return Lock;
      default: return Globe;
    }
  };

  const getPrivacyColor = (privacy: string) => {
    switch (privacy) {
      case 'open': return 'text-green-500';
      case 'application': return 'text-blue-500';
      case 'invite': return 'text-yellow-500';
      case 'private': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getActivityLevelColor = (level: string) => {
    switch (level) {
      case 'very-high': return 'bg-red-500/10 text-red-500';
      case 'high': return 'bg-orange-500/10 text-orange-500';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500';
      case 'low': return 'bg-green-500/10 text-green-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredSquads = allSquads.filter(squad => {
    const matchesSearch = squad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         squad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         squad.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || squad.category === filterCategory;
    const matchesPrivacy = filterPrivacy === 'all' || squad.privacy === filterPrivacy;
    const matchesSkillLevel = filterSkillLevel === 'all' || squad.skillLevel === filterSkillLevel;
    
    return matchesSearch && matchesCategory && matchesPrivacy && matchesSkillLevel;
  });

  const renderSquadCard = (squad: Squad, showJoinButton: boolean = true) => (
    <Card key={squad.id} className="military-card group cursor-pointer hover:border-primary/30 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {squad.name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getActivityLevelColor(squad.activityLevel)}>
                  {squad.activityLevel.replace('-', ' ')}
                </Badge>
                <div className="flex items-center space-x-1">
                  {React.createElement(getPrivacyIcon(squad.privacy), { 
                    className: `w-3 h-3 ${getPrivacyColor(squad.privacy)}` 
                  })}
                  <span className="text-xs text-muted-foreground capitalize">{squad.privacy}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{squad.currentMembers}/{squad.maxMembers}</div>
            <div className="text-xs text-muted-foreground">members</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {squad.description}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Meeting Schedule:</span>
            <span className="font-medium">{squad.meetingCadence}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Skill Level:</span>
            <Badge variant="outline" className="text-xs">
              {squad.skillLevel}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Language:</span>
            <span className="font-medium">{squad.language}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {squad.tags.slice(0, 4).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {squad.tags.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{squad.tags.length - 4} more
            </Badge>
          )}
        </div>

        {/* Members Preview */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex -space-x-2">
            {squad.members.slice(0, 4).map((member, index) => (
              <Avatar key={member.id} className="w-6 h-6 border-2 border-background">
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  {member.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {squad.members.length > 4 ? `+${squad.members.length - 4} more` : ''}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Squad Progress</span>
            <span className="font-medium">75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {showJoinButton ? (
            <>
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => handleJoinSquad(squad.id)}
                disabled={squad.currentMembers >= squad.maxMembers}
              >
                {squad.privacy === 'open' ? 'Join Squad' : 'Apply to Join'}
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <MessageCircle className="w-4 h-4 mr-2" />
                Open Squad
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Last Activity */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            Last activity: {squad.lastActivity.toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderDiscoverTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search squads by name, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="trading-strategies">Trading Strategies</SelectItem>
              <SelectItem value="business-development">Business Development</SelectItem>
              <SelectItem value="skill-learning">Skill Learning</SelectItem>
              <SelectItem value="accountability">Accountability</SelectItem>
              <SelectItem value="mentorship">Mentorship</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterPrivacy} onValueChange={setFilterPrivacy}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Privacy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="application">Application</SelectItem>
              <SelectItem value="invite">Invite Only</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterSkillLevel} onValueChange={setFilterSkillLevel}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Skill Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Featured Squads */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Featured Squads</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSquads.slice(0, 3).map(squad => renderSquadCard(squad))}
        </div>
      </div>

      {/* All Squads */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">All Squads ({filteredSquads.length})</h3>
          <Button onClick={handleCreateSquad} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Create Squad
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSquads.map(squad => renderSquadCard(squad))}
        </div>
      </div>
    </div>
  );

  const renderMySquadsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Squads ({userSquads.length})</h2>
        <Button onClick={handleCreateSquad} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Create New Squad
        </Button>
      </div>

      {userSquads.length === 0 ? (
        <Card className="military-card">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Squads Yet</h3>
            <p className="text-muted-foreground mb-6">
              Join existing squads or create your own to start collaborating with fellow traders.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Button onClick={handleCreateSquad} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Create Squad
              </Button>
              <Button variant="outline" onClick={() => setActiveTab('discover')}>
                <Search className="w-4 h-4 mr-2" />
                Discover Squads
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userSquads.map(squad => renderSquadCard(squad, false))}
        </div>
      )}
    </div>
  );

  const renderRecommendationsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recommended for You</h2>
      
      <Card className="military-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Personalized Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Based on your interests in gold trading and technical analysis, here are squads that might interest you:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allSquads.slice(0, 4).map(squad => renderSquadCard(squad))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted/20">
          <TabsTrigger value="discover" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Discover</span>
          </TabsTrigger>
          <TabsTrigger value="my-squads" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>My Squads</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Recommended</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discover">
          {renderDiscoverTab()}
        </TabsContent>

        <TabsContent value="my-squads">
          {renderMySquadsTab()}
        </TabsContent>

        <TabsContent value="recommendations">
          {renderRecommendationsTab()}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-bold">Squad Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="military-card">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">{userSquads.length}</div>
                <div className="text-sm text-muted-foreground">Active Squads</div>
              </CardContent>
            </Card>
            
            <Card className="military-card">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-secondary mb-2">87%</div>
                <div className="text-sm text-muted-foreground">Engagement Rate</div>
              </CardContent>
            </Card>
            
            <Card className="military-card">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">24</div>
                <div className="text-sm text-muted-foreground">Goals Completed</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Squad Modal */}
      <CreateSquadModal
        isOpen={showCreateSquad}
        onClose={() => setShowCreateSquad(false)}
        onSquadCreated={handleSquadCreated}
        pastTasks={pastTasks}
      />
    </div>
  );
};