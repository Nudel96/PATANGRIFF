import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UserSettings } from './UserSettings';
import { 
  Shield, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Activity, 
  FileText, 
  Brain, 
  Target,
  DollarSign,
  Building2,
  Award,
  Calendar,
  BarChart3,
  PlayCircle,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Zap,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingDown,
  PieChart,
  Calculator,
  Briefcase,
  GraduationCap,
  HeadphonesIcon,
  Video,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Filter,
  Search,
  ArrowRight,
  Home,
  Map,
  Compass,
  LineChart
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  onNavigateToJournal: () => void;
  onNavigateToHeatmap: () => void;
  onNavigateToCommunity: () => void;
  onNavigateToForum: () => void;
  onNavigateToTradingMastery: () => void;
  onNavigateToBusinessOps: () => void;
  onNavigateToPsychology: () => void;
  onNavigateToCapitalMgmt: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onLogout, 
  onNavigateToJournal, 
  onNavigateToHeatmap, 
  onNavigateToCommunity,
  onNavigateToForum,
  onNavigateToTradingMastery,
  onNavigateToBusinessOps,
  onNavigateToPsychology,
  onNavigateToCapitalMgmt
}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [showUserSettings, setShowUserSettings] = useState(false);

  // Quick stats for overview
  const quickStats = [
    { label: 'Total Progress', value: '52%', icon: BarChart3, color: 'primary' },
    { label: 'Trades Logged', value: '127', icon: FileText, color: 'secondary' },
    { label: 'Win Rate', value: '73%', icon: Target, color: 'primary' },
    { label: 'Days Active', value: '89', icon: Calendar, color: 'secondary' }
  ];

  // Four Pillars progress data
  const pillarsProgress = [
    { name: 'Trading Mastery', progress: 75, color: 'primary', icon: TrendingUp, onClick: onNavigateToTradingMastery },
    { name: 'Business Operations', progress: 45, color: 'secondary', icon: Building2, onClick: onNavigateToBusinessOps },
    { name: 'Capital Management', progress: 60, color: 'primary', icon: DollarSign, onClick: onNavigateToCapitalMgmt },
    { name: 'Trading Psychology', progress: 30, color: 'secondary', icon: Brain, onClick: onNavigateToPsychology }
  ];

  // Recent activity data
  const recentActivity = [
    { action: 'Completed: Risk Management Module', time: '2 hours ago', type: 'course', icon: CheckCircle },
    { action: 'New trade logged: EURUSD Long', time: '4 hours ago', type: 'trade', icon: TrendingUp },
    { action: 'Joined live session: Market Analysis', time: '1 day ago', type: 'session', icon: Video },
    { action: 'Achievement unlocked: Discipline Warrior', time: '2 days ago', type: 'achievement', icon: Award }
  ];

  // Add Community section
  const communitySection = {
    id: 'community',
    title: 'Community Hub',
    subtitle: 'Brotherhood of Warriors',
    description: 'Connect with fellow traders through squads, accountability groups, and collaborative learning. Build lasting professional relationships.',
    icon: Users,
    color: 'secondary',
    features: ['Elite Squads', 'Accountability Groups', 'Peer Mentorship', 'Collaborative Projects'],
    action: 'Enter Community',
    onClick: onNavigateToCommunity
  };

  const forumSection = {
    id: 'forum',
    title: 'Trading Forum',
    subtitle: 'Professional Discussion Hub',
    description: 'Engage in structured discussions across specialized trading topics. Share analysis, trade ideas, and learn from experienced professionals.',
    icon: MessageCircle,
    color: 'primary',
    features: ['Discussion Forums', 'Trade Analysis', 'Market Insights', 'Expert Q&A'],
    action: 'Join Discussions',
    onClick: onNavigateToForum
  };

  const updatedMainSections = [
    {
      id: 'learning',
      title: 'Learning Center',
      subtitle: 'Master the Four Pillars',
      description: 'Comprehensive education across Trading Mastery, Business Operations, Psychology, and Capital Management',
      icon: GraduationCap,
      color: 'primary',
      features: ['30 Levels per Pillar', 'XP Progression', 'Interactive Modules', 'Assessments'],
      action: 'Start Learning',
      onClick: () => setActiveSection('learning')
    },
    {
      id: 'heatmap',
      title: 'Market Heatmap',
      subtitle: 'Real-time Market Analysis',
      description: 'Live currency strength analysis with comprehensive economic data and trading signals',
      icon: Activity,
      color: 'secondary',
      features: ['Live Data', 'Currency Strength', 'Economic Indicators', 'Trading Signals'],
      action: 'View Markets',
      onClick: onNavigateToHeatmap
    },
    communitySection,
    forumSection,
    {
      id: 'journal',
      title: 'Trading Journal',
      subtitle: 'Track & Analyze Performance',
      description: 'Professional trade logging with pre-trade checklists, analytics, and performance tracking',
      icon: FileText,
      color: 'primary',
      features: ['Trade Logging', 'Pre-trade Checklist', 'Analytics', 'Calendar View'],
      action: 'Open Journal',
      onClick: onNavigateToJournal
    }
  ];

  const renderMainDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome back, <span className="gradient-text">Warrior</span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-6">
          Continue your transformation from chart-watcher to market operator. 
          Choose your path to excellence.
        </p>
        <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-lg">
          <Award className="w-5 h-5 mr-2" />
          Elite Warrior Member
        </Badge>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {quickStats.map((stat, index) => (
          <Card key={index} className="military-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`bg-${stat.color}/10 p-2 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Navigation Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
        {updatedMainSections.map((section, index) => (
          <Card key={section.id} className="military-card group cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg" onClick={section.onClick}>
            <CardHeader className="text-center pb-4">
              <div className={`bg-${section.color}/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-${section.color}/20 transition-colors`}>
                <section.icon className={`w-10 h-10 text-${section.color}`} />
              </div>
              <CardTitle className="text-2xl mb-2">{section.title}</CardTitle>
              <p className={`text-${section.color} font-semibold`}>{section.subtitle}</p>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-foreground/70 mb-6 leading-relaxed">
                {section.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                {section.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                    <div className={`w-2 h-2 bg-${section.color} rounded-full`} />
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                className={`w-full bg-${section.color} hover:bg-${section.color}/90 text-${section.color}-foreground group`}
                size="lg"
              >
                {section.action}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Four Pillars Progress */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Four Pillars Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {pillarsProgress.map((pillar, index) => (
              <div key={index} className="space-y-3 cursor-pointer group" onClick={pillar.onClick}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`bg-${pillar.color}/10 p-2 rounded-lg group-hover:bg-${pillar.color}/20 transition-colors`}>
                      <pillar.icon className={`w-4 h-4 text-${pillar.color}`} />
                    </div>
                    <span className="font-semibold group-hover:text-primary transition-colors">{pillar.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-${pillar.color} font-bold`}>{pillar.progress}%</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <Progress value={pillar.progress} className="h-2" />
              </div>
            ))}
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
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  activity.type === 'course' ? 'bg-primary/10' :
                  activity.type === 'trade' ? 'bg-secondary/10' :
                  activity.type === 'session' ? 'bg-primary/10' : 'bg-secondary/10'
                }`}>
                  <activity.icon className={`w-4 h-4 ${
                    activity.type === 'course' ? 'text-primary' :
                    activity.type === 'trade' ? 'text-secondary' :
                    activity.type === 'session' ? 'text-primary' : 'text-secondary'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              View All Activity
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );

  const renderLearningSection = () => (
    <div className="space-y-8">
      {/* Learning Header */}
      <div className="text-center mb-12">
        <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-4xl font-bold mb-4">
          Warrior Development
          <span className="block gradient-text">Learning Center</span>
        </h2>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
          Master the Four Pillars of Trading Excellence through our comprehensive 30-level progression system. 
          Each pillar builds the skills needed to transform from chart-watcher to market operator.
        </p>
      </div>

      {/* Four Pillars Learning Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Trading Mastery */}
        <Card className="military-card group cursor-pointer" onClick={onNavigateToTradingMastery}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Trading Mastery</CardTitle>
                  <p className="text-primary font-semibold">Analytical & Execution Excellence</p>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary">Level 8/30</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70 mb-4">
              Master the complete trading sequence from macro-economic analysis to precise execution. 
              Develop systematic approaches to market analysis and risk-managed position sizing.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center mb-4">
              <div className="p-2 bg-green-500/10 rounded">
                <div className="font-bold text-green-500">1-10</div>
                <div className="text-muted-foreground">Foundations</div>
              </div>
              <div className="p-2 bg-blue-500/10 rounded">
                <div className="font-bold text-blue-500">11-20</div>
                <div className="text-muted-foreground">Advanced</div>
              </div>
              <div className="p-2 bg-purple-500/10 rounded">
                <div className="font-bold text-purple-500">21-30</div>
                <div className="text-muted-foreground">Professional</div>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group">
              Continue Journey
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Business Operations */}
        <Card className="military-card group cursor-pointer" onClick={onNavigateToBusinessOps}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 p-3 rounded-xl group-hover:bg-secondary/20 transition-colors">
                  <Building2 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Business Operations</CardTitle>
                  <p className="text-secondary font-semibold">Professional Trading Practices</p>
                </div>
              </div>
              <Badge className="bg-secondary/10 text-secondary">Level 5/30</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70 mb-4">
              Transform trading from hobby to professional enterprise. Develop systematic business 
              operations including SOPs, KPI tracking, and scalable processes.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center mb-4">
              <div className="p-2 bg-green-500/10 rounded">
                <div className="font-bold text-green-500">1-10</div>
                <div className="text-muted-foreground">Foundations</div>
              </div>
              <div className="p-2 bg-blue-500/10 rounded">
                <div className="font-bold text-blue-500">11-20</div>
                <div className="text-muted-foreground">Strategy</div>
              </div>
              <div className="p-2 bg-purple-500/10 rounded">
                <div className="font-bold text-purple-500">21-30</div>
                <div className="text-muted-foreground">Scaling</div>
              </div>
            </div>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground group">
              Continue Journey
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Trading Psychology */}
        <Card className="military-card group cursor-pointer" onClick={onNavigateToPsychology}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 p-3 rounded-xl group-hover:bg-secondary/20 transition-colors">
                  <Brain className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Trading Psychology</CardTitle>
                  <p className="text-secondary font-semibold">Mental Framework & Discipline</p>
                </div>
              </div>
              <Badge className="bg-secondary/10 text-secondary">Level 3/30</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70 mb-4">
              Forge the mental conditioning required for consistent market success. Develop anti-tilt 
              strategies, ego management, and professional identity formation.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center mb-4">
              <div className="p-2 bg-green-500/10 rounded">
                <div className="font-bold text-green-500">1-10</div>
                <div className="text-muted-foreground">Emotional</div>
              </div>
              <div className="p-2 bg-blue-500/10 rounded">
                <div className="font-bold text-blue-500">11-20</div>
                <div className="text-muted-foreground">Resilience</div>
              </div>
              <div className="p-2 bg-purple-500/10 rounded">
                <div className="font-bold text-purple-500">21-30</div>
                <div className="text-muted-foreground">7 Pillars</div>
              </div>
            </div>
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground group">
              Continue Journey
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Capital Management */}
        <Card className="military-card group cursor-pointer" onClick={onNavigateToCapitalMgmt}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Capital Management</CardTitle>
                  <p className="text-primary font-semibold">Financial Risk & Money Management</p>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary">Level 6/30</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/70 mb-4">
              Master the financial architecture of professional trading through systematic capital 
              allocation, bankroll management, and survival protocols.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-center mb-4">
              <div className="p-2 bg-green-500/10 rounded">
                <div className="font-bold text-green-500">1-10</div>
                <div className="text-muted-foreground">Risk Basics</div>
              </div>
              <div className="p-2 bg-blue-500/10 rounded">
                <div className="font-bold text-blue-500">11-20</div>
                <div className="text-muted-foreground">Portfolio</div>
              </div>
              <div className="p-2 bg-purple-500/10 rounded">
                <div className="font-bold text-purple-500">21-30</div>
                <div className="text-muted-foreground">Institutional</div>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group">
              Continue Journey
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Community and Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Users className="w-5 h-5 text-secondary" />
              <span>Community</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Members:</span>
                <span className="font-semibold text-secondary">10,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Daily Messages:</span>
                <span className="font-semibold text-secondary">1,834</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Live Sessions:</span>
                <span className="font-semibold text-secondary">3 Today</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Join Discussion
            </Button>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Today's Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-primary/10 rounded">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-sm font-medium">Market Analysis</div>
                  <div className="text-xs text-muted-foreground">2:00 PM EST</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-secondary/10 rounded">
                <Video className="w-4 h-4 text-secondary" />
                <div>
                  <div className="text-sm font-medium">Psychology Session</div>
                  <div className="text-xs text-muted-foreground">4:00 PM EST</div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Full Calendar
            </Button>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Award className="w-5 h-5 text-primary" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/20 p-2 rounded">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">First Steps</div>
                  <div className="text-xs text-muted-foreground">Complete Level 1</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/20 p-2 rounded">
                  <Target className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Discipline Warrior</div>
                  <div className="text-xs text-muted-foreground">Complete 10 trades</div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Badges
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (showUserSettings) {
    return (
      <UserSettings 
        onBack={() => setShowUserSettings(false)}
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="container-max mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-primary" />
                <TrendingUp className="w-4 h-4 text-secondary absolute -top-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold gradient-text">PRICEACTIONTALK</span>
                <span className="text-sm text-muted-foreground -mt-1">WARRIOR PORTAL</span>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Button 
                variant={activeSection === 'home' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setActiveSection('home')}
                className="flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
              <Button 
                variant={activeSection === 'learning' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setActiveSection('learning')}
                className="flex items-center space-x-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Learning</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onNavigateToHeatmap}
                className="flex items-center space-x-2"
              >
                <Activity className="w-4 h-4" />
                <span>Heatmap</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onNavigateToJournal}
                className="flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Journal</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onNavigateToForum}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Forum</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onNavigateToCommunity}
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Community</span>
              </Button>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                </div>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowUserSettings(true)}>
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

      {/* Mobile Navigation */}
      <div className="md:hidden bg-card/30 backdrop-blur-sm border-b border-border/50">
        <div className="container-max mx-auto px-6">
          <div className="flex items-center justify-between py-3">
            <div className="flex space-x-2">
              <Button 
                variant={activeSection === 'home' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setActiveSection('home')}
              >
                <Home className="w-4 h-4" />
              </Button>
              <Button 
                variant={activeSection === 'learning' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setActiveSection('learning')}
              >
                <GraduationCap className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onNavigateToHeatmap}
              >
                <Activity className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onNavigateToJournal}
              >
                <FileText className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onNavigateToForum}
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onNavigateToCommunity}
              >
                <Users className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max mx-auto px-6 py-8">
        {activeSection === 'home' && renderMainDashboard()}
        {activeSection === 'learning' && renderLearningSection()}
      </div>
    </div>
  );
};