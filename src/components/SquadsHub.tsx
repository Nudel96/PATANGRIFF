import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Users, 
  Search, 
  Filter, 
  MessageCircle, 
  CheckSquare, 
  Target, 
  Calendar,
  FileText,
  Award,
  TrendingUp,
  Building2,
  Brain,
  DollarSign,
  Globe,
  Lock,
  Eye,
  Settings,
  Star,
  Clock,
  MapPin,
  Zap,
  Shield,
  BookOpen,
  Lightbulb,
  BarChart3,
  Activity,
  ArrowRight,
  ChevronRight,
  Hash,
  Bell,
  Share,
  Download,
  Upload,
  Video,
  Mic,
  Image,
  Link,
  Send,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Crown,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface Squad {
  id: string;
  name: string;
  description: string;
  category: SquadCategory;
  privacy: SquadPrivacy;
  maxMembers: number;
  currentMembers: number;
  leaderId: string;
  moderatorIds: string[];
  memberIds: string[];
  pendingApplications: string[];
  invitedUsers: string[];
  tags: string[];
  goals: string[];
  activityLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  meetingCadence: string;
  timezone: string;
  requirements: string[];
  resources: SquadResource[];
  achievements: SquadAchievement[];
  createdAt: Date;
  lastActivity: Date;
  isActive: boolean;
  rules: string[];
  focusAreas: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mixed';
  language: string;
  region?: string;
}

type SquadCategory = 
  | 'Trading Strategies'
  | 'Business Development' 
  | 'Skill Learning'
  | 'Industry Specific'
  | 'Accountability'
  | 'Mentorship'
  | 'Project Based'
  | 'Study Groups'
  | 'Networking'
  | 'Career Development';

type SquadPrivacy = 'Open' | 'Application Required' | 'Invite Only' | 'Private';

interface SquadResource {
  id: string;
  name: string;
  type: 'document' | 'link' | 'video' | 'image';
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
  description?: string;
}

interface SquadAchievement {
  id: string;
  title: string;
  description: string;
  achievedAt: Date;
  achievedBy: string[];
}

interface SquadTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  dueDate?: Date;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Review' | 'Completed';
  createdBy: string;
  createdAt: Date;
  tags: string[];
}

interface SquadGoal {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  milestones: SquadMilestone[];
  assignedTo: string[];
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'Completed' | 'Paused' | 'Cancelled';
}

interface SquadMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completed: boolean;
  completedAt?: Date;
}

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'system';
  replyTo?: string;
  reactions: { emoji: string; users: string[] }[];
}

export const SquadsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [squads, setSquads] = useState<Squad[]>([]);
  const [userSquads, setUserSquads] = useState<Squad[]>([]);
  const [selectedSquad, setSelectedSquad] = useState<Squad | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<SquadCategory | 'All'>('All');
  const [privacyFilter, setPrivacyFilter] = useState<SquadPrivacy | 'All'>('All');

  // Sample data
  useEffect(() => {
    const sampleSquads: Squad[] = [
      {
        id: '1',
        name: 'Gold Trading Masters',
        description: 'Advanced gold trading strategies and market analysis. Focus on technical patterns, fundamental drivers, and risk management in precious metals markets.',
        category: 'Trading Strategies',
        privacy: 'Application Required',
        maxMembers: 8,
        currentMembers: 6,
        leaderId: 'user1',
        moderatorIds: ['user2'],
        memberIds: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
        pendingApplications: ['user7', 'user8'],
        invitedUsers: [],
        tags: ['gold', 'precious-metals', 'technical-analysis', 'risk-management'],
        goals: ['Achieve 15% monthly returns', 'Master gold correlation analysis', 'Develop systematic trading approach'],
        activityLevel: 'High',
        meetingCadence: 'Weekly - Tuesdays 7PM EST',
        timezone: 'EST',
        requirements: ['Minimum 6 months trading experience', 'Capital requirement: $10,000+', 'Commitment to weekly meetings'],
        resources: [],
        achievements: [],
        createdAt: new Date('2024-01-15'),
        lastActivity: new Date(),
        isActive: true,
        rules: ['Respect all members', 'Share knowledge openly', 'No promotional content', 'Maintain confidentiality'],
        focusAreas: ['Technical Analysis', 'Market Psychology', 'Risk Management'],
        skillLevel: 'Advanced',
        language: 'English',
        region: 'North America'
      },
      {
        id: '2',
        name: 'Forex Beginners Circle',
        description: 'Supportive learning environment for new forex traders. We focus on building solid foundations, understanding market basics, and developing disciplined trading habits.',
        category: 'Skill Learning',
        privacy: 'Open',
        maxMembers: 12,
        currentMembers: 9,
        leaderId: 'user9',
        moderatorIds: ['user10'],
        memberIds: ['user9', 'user10', 'user11', 'user12', 'user13', 'user14', 'user15', 'user16', 'user17'],
        pendingApplications: [],
        invitedUsers: [],
        tags: ['forex', 'beginners', 'education', 'support'],
        goals: ['Complete forex fundamentals course', 'Practice with demo accounts', 'Develop personal trading plan'],
        activityLevel: 'Medium',
        meetingCadence: 'Bi-weekly - Saturdays 2PM EST',
        timezone: 'EST',
        requirements: ['New to forex trading', 'Commitment to learning', 'Respectful communication'],
        resources: [],
        achievements: [],
        createdAt: new Date('2024-02-01'),
        lastActivity: new Date(),
        isActive: true,
        rules: ['No judgment zone', 'Ask questions freely', 'Share learning resources', 'Support fellow beginners'],
        focusAreas: ['Forex Basics', 'Chart Reading', 'Risk Management'],
        skillLevel: 'Beginner',
        language: 'English'
      },
      {
        id: '3',
        name: 'Crypto Startup Collective',
        description: 'Entrepreneurs building blockchain and cryptocurrency businesses. Collaborate on projects, share resources, and support each other through the startup journey.',
        category: 'Business Development',
        privacy: 'Invite Only',
        maxMembers: 6,
        currentMembers: 4,
        leaderId: 'user18',
        moderatorIds: [],
        memberIds: ['user18', 'user19', 'user20', 'user21'],
        pendingApplications: [],
        invitedUsers: ['user22', 'user23'],
        tags: ['crypto', 'startup', 'blockchain', 'entrepreneurship'],
        goals: ['Launch MVP products', 'Secure seed funding', 'Build strategic partnerships'],
        activityLevel: 'Very High',
        meetingCadence: 'Daily standups + Weekly deep dives',
        timezone: 'PST',
        requirements: ['Active crypto startup', 'Minimum viable product', 'Serious commitment to growth'],
        resources: [],
        achievements: [],
        createdAt: new Date('2024-01-20'),
        lastActivity: new Date(),
        isActive: true,
        rules: ['Confidentiality agreement required', 'Active participation mandatory', 'Resource sharing expected'],
        focusAreas: ['Product Development', 'Fundraising', 'Market Strategy'],
        skillLevel: 'Advanced',
        language: 'English',
        region: 'West Coast'
      }
    ];

    setSquads(sampleSquads);
    setUserSquads([sampleSquads[0]]); // User is member of first squad
  }, []);

  const categories: SquadCategory[] = [
    'Trading Strategies',
    'Business Development',
    'Skill Learning',
    'Industry Specific',
    'Accountability',
    'Mentorship',
    'Project Based',
    'Study Groups',
    'Networking',
    'Career Development'
  ];

  const privacyOptions: SquadPrivacy[] = [
    'Open',
    'Application Required',
    'Invite Only',
    'Private'
  ];

  const getCategoryIcon = (category: SquadCategory) => {
    switch (category) {
      case 'Trading Strategies': return TrendingUp;
      case 'Business Development': return Building2;
      case 'Skill Learning': return BookOpen;
      case 'Industry Specific': return Globe;
      case 'Accountability': return Target;
      case 'Mentorship': return Users;
      case 'Project Based': return Lightbulb;
      case 'Study Groups': return Brain;
      case 'Networking': return Share;
      case 'Career Development': return Award;
      default: return Users;
    }
  };

  const getPrivacyIcon = (privacy: SquadPrivacy) => {
    switch (privacy) {
      case 'Open': return Globe;
      case 'Application Required': return CheckSquare;
      case 'Invite Only': return UserPlus;
      case 'Private': return Lock;
      default: return Globe;
    }
  };

  const getPrivacyColor = (privacy: SquadPrivacy) => {
    switch (privacy) {
      case 'Open': return 'text-green-500';
      case 'Application Required': return 'text-blue-500';
      case 'Invite Only': return 'text-yellow-500';
      case 'Private': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const filteredSquads = squads.filter(squad => {
    const matchesSearch = squad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         squad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         squad.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'All' || squad.category === categoryFilter;
    const matchesPrivacy = privacyFilter === 'All' || squad.privacy === privacyFilter;
    
    return matchesSearch && matchesCategory && matchesPrivacy;
  });

  const renderSquadCard = (squad: Squad) => {
    const CategoryIcon = getCategoryIcon(squad.category);
    const PrivacyIcon = getPrivacyIcon(squad.privacy);
    const isUserMember = userSquads.some(s => s.id === squad.id);
    const hasPendingApplication = squad.pendingApplications.includes('currentUser');

    return (
      <Card key={squad.id} className="military-card hover:border-primary/30 transition-all duration-300 cursor-pointer">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <CategoryIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg mb-1">{squad.name}</CardTitle>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {squad.category}
                  </Badge>
                  <div className={`flex items-center space-x-1 ${getPrivacyColor(squad.privacy)}`}>
                    <PrivacyIcon className="w-3 h-3" />
                    <span className="text-xs">{squad.privacy}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                {squad.currentMembers}/{squad.maxMembers} members
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                <Activity className="w-3 h-3" />
                <span>{squad.activityLevel}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {squad.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {squad.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
            {squad.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{squad.tags.length - 3} more
              </Badge>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{squad.meetingCadence}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Target className="w-3 h-3" />
              <span>{squad.skillLevel} level</span>
            </div>
            {squad.region && (
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{squad.region}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {[...Array(Math.min(squad.currentMembers, 4))].map((_, i) => (
                <Avatar key={i} className="w-6 h-6 border-2 border-background">
                  <AvatarFallback className="text-xs">
                    {String.fromCharCode(65 + i)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {squad.currentMembers > 4 && (
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs">+{squad.currentMembers - 4}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => setSelectedSquad(squad)}>
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
              {!isUserMember && (
                <Button 
                  size="sm" 
                  disabled={hasPendingApplication}
                  className={hasPendingApplication ? 'opacity-50' : ''}
                >
                  {hasPendingApplication ? 'Applied' : 
                   squad.privacy === 'Open' ? 'Join' : 'Apply'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (selectedSquad) {
    return <SquadWorkspace squad={selectedSquad} onBack={() => setSelectedSquad(null)} />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container-max mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Squads Hub</h1>
            <p className="text-muted-foreground">Collaborative Learning & Accountability Groups</p>
          </div>
          
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Create Squad
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <CreateSquadModal onClose={() => setShowCreateModal(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/20">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="my-squads">My Squads ({userSquads.length})</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search squads by name, description, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as SquadCategory | 'All')}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={privacyFilter} onValueChange={(value) => setPrivacyFilter(value as SquadPrivacy | 'All')}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Privacy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Privacy Levels</SelectItem>
                  {privacyOptions.map(privacy => (
                    <SelectItem key={privacy} value={privacy}>{privacy}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Squad Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSquads.map(renderSquadCard)}
            </div>

            {filteredSquads.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No squads found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or create a new squad.
                </p>
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Squad
                </Button>
              </div>
            )}
          </TabsContent>

          {/* My Squads Tab */}
          <TabsContent value="my-squads" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userSquads.map(renderSquadCard)}
            </div>
            
            {userSquads.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No squads yet</h3>
                <p className="text-muted-foreground mb-4">
                  Join or create your first squad to start collaborating.
                </p>
                <Button onClick={() => setActiveTab('discover')}>
                  Discover Squads
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <div className="text-center py-12">
              <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Personalized Recommendations</h3>
              <p className="text-muted-foreground">
                Based on your interests and activity, we'll suggest relevant squads.
              </p>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="military-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Squads</p>
                      <p className="text-2xl font-bold text-primary">{squads.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Members</p>
                      <p className="text-2xl font-bold text-secondary">
                        {squads.reduce((sum, squad) => sum + squad.currentMembers, 0)}
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-secondary/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Categories</p>
                      <p className="text-2xl font-bold text-primary">{categories.length}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-primary/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Squad Size</p>
                      <p className="text-2xl font-bold text-secondary">
                        {Math.round(squads.reduce((sum, squad) => sum + squad.currentMembers, 0) / squads.length)}
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-secondary/20" />
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

// Create Squad Modal Component
const CreateSquadModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '' as SquadCategory | '',
    privacy: '' as SquadPrivacy | '',
    maxMembers: 8,
    skillLevel: '' as 'Beginner' | 'Intermediate' | 'Advanced' | 'Mixed' | '',
    activityLevel: '' as 'Low' | 'Medium' | 'High' | 'Very High' | '',
    meetingCadence: '',
    timezone: '',
    language: 'English',
    region: '',
    tags: [] as string[],
    goals: [] as string[],
    requirements: [] as string[],
    rules: [] as string[],
    focusAreas: [] as string[]
  });

  const [newTag, setNewTag] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newRule, setNewRule] = useState('');
  const [newFocusArea, setNewFocusArea] = useState('');

  const categories: SquadCategory[] = [
    'Trading Strategies',
    'Business Development',
    'Skill Learning',
    'Industry Specific',
    'Accountability',
    'Mentorship',
    'Project Based',
    'Study Groups',
    'Networking',
    'Career Development'
  ];

  const privacyOptions: SquadPrivacy[] = [
    'Open',
    'Application Required',
    'Invite Only',
    'Private'
  ];

  const addToArray = (field: keyof typeof formData, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
      setter('');
    }
  };

  const removeFromArray = (field: keyof typeof formData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Squad Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Gold Trading Masters"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your squad's purpose, goals, and what members can expect..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addToArray('tags', newTag, setNewTag)}
              />
              <Button 
                type="button" 
                onClick={() => addToArray('tags', newTag, setNewTag)}
                disabled={!newTag.trim()}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeFromArray('tags', index)}>
                  #{tag} ×
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Category & Privacy</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Category *</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {categories.map(category => {
                const Icon = getCategoryIcon(category);
                return (
                  <div
                    key={category}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.category === category 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, category }))}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <Label>Privacy Level *</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {privacyOptions.map(privacy => {
                const Icon = getPrivacyIcon(privacy);
                const descriptions = {
                  'Open': 'Anyone can join immediately',
                  'Application Required': 'Members must apply and be approved',
                  'Invite Only': 'Members can only join by invitation',
                  'Private': 'Completely private, invitation only'
                };
                
                return (
                  <div
                    key={privacy}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.privacy === privacy 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, privacy }))}
                  >
                    <div className="flex items-start space-x-2">
                      <Icon className="w-4 h-4 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">{privacy}</div>
                        <div className="text-xs text-muted-foreground">{descriptions[privacy]}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Settings & Requirements</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxMembers">Maximum Members</Label>
              <Input
                id="maxMembers"
                type="number"
                min="2"
                max="50"
                value={formData.maxMembers}
                onChange={(e) => setFormData(prev => ({ ...prev, maxMembers: parseInt(e.target.value) }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="skillLevel">Skill Level</Label>
              <Select value={formData.skillLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, skillLevel: value as any }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Mixed">Mixed Levels</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select value={formData.activityLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, activityLevel: value as any }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low (Weekly check-ins)</SelectItem>
                  <SelectItem value="Medium">Medium (Few times per week)</SelectItem>
                  <SelectItem value="High">High (Daily interaction)</SelectItem>
                  <SelectItem value="Very High">Very High (Multiple daily)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="meetingCadence">Meeting Schedule</Label>
            <Input
              id="meetingCadence"
              placeholder="e.g., Weekly - Tuesdays 7PM EST"
              value={formData.meetingCadence}
              onChange={(e) => setFormData(prev => ({ ...prev, meetingCadence: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                placeholder="e.g., EST, PST, GMT"
                value={formData.timezone}
                onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="region">Region (Optional)</Label>
              <Input
                id="region"
                placeholder="e.g., North America, Europe"
                value={formData.region}
                onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label>Requirements</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                placeholder="Add a requirement"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addToArray('requirements', newRequirement, setNewRequirement)}
              />
              <Button 
                type="button" 
                onClick={() => addToArray('requirements', newRequirement, setNewRequirement)}
                disabled={!newRequirement.trim()}
              >
                Add
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <span className="text-sm">{req}</span>
                  <Button size="sm" variant="ghost" onClick={() => removeFromArray('requirements', index)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Goals & Guidelines</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Squad Goals</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                placeholder="Add a goal"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addToArray('goals', newGoal, setNewGoal)}
              />
              <Button 
                type="button" 
                onClick={() => addToArray('goals', newGoal, setNewGoal)}
                disabled={!newGoal.trim()}
              >
                Add
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.goals.map((goal, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <span className="text-sm">{goal}</span>
                  <Button size="sm" variant="ghost" onClick={() => removeFromArray('goals', index)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Focus Areas</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                placeholder="Add a focus area"
                value={newFocusArea}
                onChange={(e) => setNewFocusArea(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addToArray('focusAreas', newFocusArea, setNewFocusArea)}
              />
              <Button 
                type="button" 
                onClick={() => addToArray('focusAreas', newFocusArea, setNewFocusArea)}
                disabled={!newFocusArea.trim()}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.focusAreas.map((area, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeFromArray('focusAreas', index)}>
                  {area} ×
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Community Rules</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                placeholder="Add a rule"
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addToArray('rules', newRule, setNewRule)}
              />
              <Button 
                type="button" 
                onClick={() => addToArray('rules', newRule, setNewRule)}
                disabled={!newRule.trim()}
              >
                Add
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.rules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <span className="text-sm">{rule}</span>
                  <Button size="sm" variant="ghost" onClick={() => removeFromArray('rules', index)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.trim() && formData.description.trim();
      case 2:
        return formData.category && formData.privacy;
      case 3:
        return formData.maxMembers > 1 && formData.skillLevel && formData.activityLevel;
      case 4:
        return true; // Goals and rules are optional
      default:
        return false;
    }
  };

  const handleCreate = () => {
    // Here you would typically send the data to your backend
    console.log('Creating squad:', formData);
    onClose();
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Create New Squad</DialogTitle>
        <div className="flex items-center space-x-2 mt-2">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                i === step 
                  ? 'bg-primary text-primary-foreground' 
                  : i < step 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {i < step ? <CheckCircle className="w-4 h-4" /> : i}
            </div>
          ))}
        </div>
      </DialogHeader>

      <div className="mt-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>

      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={() => step > 1 ? setStep(step - 1) : onClose()}
        >
          {step === 1 ? 'Cancel' : 'Previous'}
        </Button>
        
        <Button 
          onClick={() => step < 4 ? setStep(step + 1) : handleCreate()}
          disabled={!canProceed()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {step === 4 ? 'Create Squad' : 'Next Step'}
        </Button>
      </div>
    </div>
  );
};

// Squad Workspace Component
const SquadWorkspace: React.FC<{ squad: Squad; onBack: () => void }> = ({ squad, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [tasks, setTasks] = useState<SquadTask[]>([]);
  const [goals, setGoals] = useState<SquadGoal[]>([]);

  // Sample data
  useEffect(() => {
    const sampleMessages: ChatMessage[] = [
      {
        id: '1',
        userId: 'user1',
        username: 'GoldWarrior',
        content: 'Great analysis on the gold breakout! The volume confirmation was spot on.',
        timestamp: new Date(Date.now() - 3600000),
        type: 'text',
        reactions: [{ emoji: '👍', users: ['user2', 'user3'] }]
      },
      {
        id: '2',
        userId: 'user2',
        username: 'TechAnalyst',
        content: 'Thanks! I\'ve been tracking this setup for weeks. The 2020 resistance level was key.',
        timestamp: new Date(Date.now() - 3000000),
        type: 'text',
        reactions: []
      }
    ];

    const sampleTasks: SquadTask[] = [
      {
        id: '1',
        title: 'Weekly Market Analysis',
        description: 'Prepare comprehensive gold market analysis for next meeting',
        assignedTo: ['user1', 'user2'],
        dueDate: new Date(Date.now() + 86400000 * 3),
        priority: 'High',
        status: 'In Progress',
        createdBy: 'user1',
        createdAt: new Date(Date.now() - 86400000),
        tags: ['analysis', 'gold', 'weekly']
      },
      {
        id: '2',
        title: 'Risk Management Review',
        description: 'Review and update squad risk management guidelines',
        assignedTo: ['user3'],
        dueDate: new Date(Date.now() + 86400000 * 7),
        priority: 'Medium',
        status: 'Todo',
        createdBy: 'user1',
        createdAt: new Date(Date.now() - 86400000 * 2),
        tags: ['risk', 'guidelines']
      }
    ];

    const sampleGoals: SquadGoal[] = [
      {
        id: '1',
        title: 'Achieve 15% Monthly Returns',
        description: 'Collective goal to achieve consistent 15% monthly returns through disciplined trading',
        targetDate: new Date(Date.now() + 86400000 * 30),
        progress: 65,
        milestones: [
          {
            id: '1',
            title: 'Establish trading rules',
            description: 'Define clear entry/exit criteria',
            targetDate: new Date(Date.now() - 86400000 * 5),
            completed: true,
            completedAt: new Date(Date.now() - 86400000 * 5)
          },
          {
            id: '2',
            title: 'Complete first week',
            description: 'Execute trades following established rules',
            targetDate: new Date(Date.now() + 86400000 * 2),
            completed: false
          }
        ],
        assignedTo: ['user1', 'user2', 'user3'],
        category: 'Performance',
        priority: 'High',
        status: 'Active'
      }
    ];

    setChatMessages(sampleMessages);
    setTasks(sampleTasks);
    setGoals(sampleGoals);
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        userId: 'currentUser',
        username: 'You',
        content: newMessage,
        timestamp: new Date(),
        type: 'text',
        reactions: []
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Squad Header */}
      <Card className="military-card">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{squad.name}</h2>
              <p className="text-muted-foreground mb-4">{squad.description}</p>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">{squad.category}</Badge>
                <div className={`flex items-center space-x-1 ${getPrivacyColor(squad.privacy)}`}>
                  {React.createElement(getPrivacyIcon(squad.privacy), { className: "w-4 h-4" })}
                  <span className="text-sm">{squad.privacy}</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{squad.currentMembers}/{squad.maxMembers} members</span>
                </div>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Activity className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">{squad.activityLevel}</div>
              <div className="text-sm text-muted-foreground">Activity Level</div>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <Clock className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-lg font-bold text-secondary">{squad.meetingCadence}</div>
              <div className="text-sm text-muted-foreground">Meeting Schedule</div>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">{squad.skillLevel}</div>
              <div className="text-sm text-muted-foreground">Skill Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals Progress */}
      <Card className="military-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Active Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map(goal => (
              <div key={goal.id} className="p-4 border border-border/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{goal.title}</h4>
                  <Badge className={goal.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-muted'}>
                    {goal.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <span>Due: {goal.targetDate.toLocaleDateString()}</span>
                  <span>{goal.milestones.filter(m => m.completed).length}/{goal.milestones.length} milestones</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="military-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-secondary" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>GW</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm"><span className="font-medium">GoldWarrior</span> completed task "Weekly Market Analysis"</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>TA</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm"><span className="font-medium">TechAnalyst</span> shared a new resource</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>RM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm"><span className="font-medium">RiskMaster</span> updated goal progress</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderChat = () => (
    <div className="space-y-6">
      <Card className="military-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span>Squad Chat</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
            {chatMessages.map(message => (
              <div key={message.id} className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{message.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">{message.username}</span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  {message.reactions.length > 0 && (
                    <div className="flex space-x-2 mt-2">
                      {message.reactions.map((reaction, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {reaction.emoji} {reaction.users.length}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <Card className="military-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-secondary" />
              <span>Task Management</span>
            </CardTitle>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="p-4 border border-border/50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{task.title}</h4>
                      <Badge className={
                        task.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                        task.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-green-500/10 text-green-500'
                      }>
                        {task.priority}
                      </Badge>
                      <Badge variant="outline" className={
                        task.status === 'Completed' ? 'border-green-500 text-green-500' :
                        task.status === 'In Progress' ? 'border-blue-500 text-blue-500' :
                        'border-gray-500 text-gray-500'
                      }>
                        {task.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Assigned to: {task.assignedTo.length} member(s)</span>
                      {task.dueDate && (
                        <span>Due: {task.dueDate.toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {task.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      <Card className="military-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Goal Planning</span>
            </CardTitle>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goals.map(goal => (
              <div key={goal.id} className="p-6 border border-border/50 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{goal.title}</h3>
                      <Badge className={
                        goal.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                        goal.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-green-500/10 text-green-500'
                      }>
                        {goal.priority}
                      </Badge>
                      <Badge variant="outline" className={
                        goal.status === 'Active' ? 'border-green-500 text-green-500' :
                        goal.status === 'Completed' ? 'border-blue-500 text-blue-500' :
                        'border-gray-500 text-gray-500'
                      }>
                        {goal.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{goal.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                      <span>Target: {goal.targetDate.toLocaleDateString()}</span>
                      <span>Category: {goal.category}</span>
                      <span>Assigned: {goal.assignedTo.length} member(s)</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-3" />
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Milestones</h4>
                  {goal.milestones.map(milestone => (
                    <div key={milestone.id} className="flex items-center space-x-3 p-3 bg-muted/10 rounded">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        milestone.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-muted-foreground'
                      }`}>
                        {milestone.completed && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {milestone.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {milestone.completed 
                              ? `Completed ${milestone.completedAt?.toLocaleDateString()}`
                              : `Due ${milestone.targetDate.toLocaleDateString()}`
                            }
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <Card className="military-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-secondary" />
              <span>Resource Library</span>
            </CardTitle>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Resource
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources yet</h3>
            <p className="text-muted-foreground mb-4">
              Start building your squad's knowledge base by uploading documents, links, and other resources.
            </p>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload First Resource
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMembers = () => (
    <div className="space-y-6">
      <Card className="military-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Squad Members ({squad.currentMembers})</span>
            </CardTitle>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Members
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Squad Leader */}
            <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>GW</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">GoldWarrior</span>
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <Badge variant="outline" className="text-xs">Squad Leader</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Advanced trader, 5+ years experience</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500/10 text-green-500">Online</Badge>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Regular Members */}
            {[
              { name: 'TechAnalyst', role: 'Moderator', status: 'Online', experience: 'Technical analysis expert' },
              { name: 'RiskMaster', role: 'Member', status: 'Away', experience: 'Risk management specialist' },
              { name: 'ChartReader', role: 'Member', status: 'Offline', experience: 'Pattern recognition pro' },
              { name: 'MarketMover', role: 'Member', status: 'Online', experience: 'Macro economics focus' },
              { name: 'PipHunter', role: 'Member', status: 'Online', experience: 'Scalping strategies' }
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{member.name}</span>
                      {member.role === 'Moderator' && (
                        <Badge variant="outline" className="text-xs">Moderator</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.experience}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={
                    member.status === 'Online' ? 'bg-green-500/10 text-green-500' :
                    member.status === 'Away' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-gray-500/10 text-gray-500'
                  }>
                    {member.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container-max mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to Squads
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{squad.name}</h1>
              <p className="text-muted-foreground">{squad.category} • {squad.currentMembers} members</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Invite
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">{renderOverview()}</TabsContent>
          <TabsContent value="chat">{renderChat()}</TabsContent>
          <TabsContent value="tasks">{renderTasks()}</TabsContent>
          <TabsContent value="goals">{renderGoals()}</TabsContent>
          <TabsContent value="resources">{renderResources()}</TabsContent>
          <TabsContent value="members">{renderMembers()}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper functions (moved outside component to avoid re-declaration)
const getCategoryIcon = (category: SquadCategory) => {
  switch (category) {
    case 'Trading Strategies': return TrendingUp;
    case 'Business Development': return Building2;
    case 'Skill Learning': return BookOpen;
    case 'Industry Specific': return Globe;
    case 'Accountability': return Target;
    case 'Mentorship': return Users;
    case 'Project Based': return Lightbulb;
    case 'Study Groups': return Brain;
    case 'Networking': return Share;
    case 'Career Development': return Award;
    default: return Users;
  }
};

const getPrivacyIcon = (privacy: SquadPrivacy) => {
  switch (privacy) {
    case 'Open': return Globe;
    case 'Application Required': return CheckSquare;
    case 'Invite Only': return UserPlus;
    case 'Private': return Lock;
    default: return Globe;
  }
};

const getPrivacyColor = (privacy: SquadPrivacy) => {
  switch (privacy) {
    case 'Open': return 'text-green-500';
    case 'Application Required': return 'text-blue-500';
    case 'Invite Only': return 'text-yellow-500';
    case 'Private': return 'text-red-500';
    default: return 'text-gray-500';
  }
};