import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  onNavigateToJournal: () => void;
  onNavigateToHeatmap: () => void;
  onNavigateToTradingMastery: () => void;
  onNavigateToBusinessOps: () => void;
  onNavigateToPsychology: () => void;
  onNavigateToCapitalMgmt: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onLogout, 
  onNavigateToJournal, 
  onNavigateToHeatmap, 
  onNavigateToTradingMastery,
  onNavigateToBusinessOps,
  onNavigateToPsychology,
  onNavigateToCapitalMgmt
}) => {
  const [activeSection, setActiveSection] = useState('overview');

  const pillarsProgress = [
    { name: 'Trading Mastery', progress: 75, color: 'primary', icon: TrendingUp },
    { name: 'Business Operations', progress: 45, color: 'secondary', icon: Building2 },
    { name: 'Capital Management', progress: 60, color: 'primary', icon: DollarSign },
    { name: 'Trading Psychology', progress: 30, color: 'secondary', icon: Brain }
  ];

  const recentActivity = [
    { action: 'Completed: Risk Management Module', time: '2 hours ago', type: 'course' },
    { action: 'New trade logged: EURUSD Long', time: '4 hours ago', type: 'trade' },
    { action: 'Joined live session: Market Analysis', time: '1 day ago', type: 'session' },
    { action: 'Achievement unlocked: Discipline Warrior', time: '2 days ago', type: 'achievement' }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="gradient-text">Warrior</span>
          </h1>
          <p className="text-foreground/70">
            Continue your transformation from chart-watcher to market operator.
          </p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
          <Award className="w-4 h-4 mr-2" />
          Elite Member
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="military-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Progress</p>
                <p className="text-2xl font-bold text-primary">52%</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-xl">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trades Logged</p>
                <p className="text-2xl font-bold text-secondary">127</p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold text-primary">73%</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-xl">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Days Active</p>
                <p className="text-2xl font-bold text-secondary">89</p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Four Pillars Progress */}
        <div className="lg:col-span-2">
          <Card className="military-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Four Pillars Mastery</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {pillarsProgress.map((pillar, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`bg-${pillar.color}/10 p-2 rounded-lg`}>
                        <pillar.icon className={`w-4 h-4 text-${pillar.color}`} />
                      </div>
                      <span className="font-semibold">{pillar.name}</span>
                    </div>
                    <span className={`text-${pillar.color} font-bold`}>{pillar.progress}%</span>
                  </div>
                  <Progress value={pillar.progress} className="h-2" />
                </div>
              ))}
              <Button 
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={onNavigateToTradingMastery}
              >
                Continue Training
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="military-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'course' ? 'bg-primary' :
                    activity.type === 'trade' ? 'bg-secondary' :
                    activity.type === 'session' ? 'bg-primary' : 'bg-secondary'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderTradingMastery = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <span>Trading Mastery</span>
          </h2>
          <p className="text-foreground/70">30-Level Professional Development Program</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20">Level 1/30</Badge>
      </div>

      {/* Launch Trading Mastery Learning */}
      <Card className="military-card">
        <CardContent className="p-8 text-center">
          <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Master Trading Through 30 Progressive Levels</h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Transform from chart-watcher to market operator through our systematic 30-level progression. 
            Each level builds upon the previous, ensuring comprehensive mastery of technical analysis, 
            risk management, psychology, and market fundamentals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-green-500/10 rounded-lg">
              <div className="text-lg font-bold text-green-500 mb-1">Levels 1-10</div>
              <div className="text-sm text-muted-foreground">Beginner Foundations</div>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <div className="text-lg font-bold text-blue-500 mb-1">Levels 11-20</div>
              <div className="text-sm text-muted-foreground">Intermediate Skills</div>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <div className="text-lg font-bold text-purple-500 mb-1">Levels 21-30</div>
              <div className="text-sm text-muted-foreground">Professional Mastery</div>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold"
            onClick={onNavigateToTradingMastery}
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderBusinessOperations = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-secondary" />
            <span>Business Operations</span>
          </h2>
          <p className="text-foreground/70">30-Level Professional Development Program</p>
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20">Level 1/30</Badge>
      </div>

      {/* Launch Business Operations Learning */}
      <Card className="military-card">
        <CardContent className="p-8 text-center">
          <div className="bg-secondary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10 text-secondary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Master Business Operations Through 30 Progressive Levels</h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Transform your trading into a systematic business operation through comprehensive development 
            of processes, analytics, and management skills across 30 structured levels.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-green-500/10 rounded-lg">
              <div className="text-lg font-bold text-green-500 mb-1">Levels 1-10</div>
              <div className="text-sm text-muted-foreground">Business Foundations</div>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <div className="text-lg font-bold text-blue-500 mb-1">Levels 11-20</div>
              <div className="text-sm text-muted-foreground">Advanced Systems</div>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <div className="text-lg font-bold text-purple-500 mb-1">Levels 21-30</div>
              <div className="text-sm text-muted-foreground">Professional Operations</div>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg font-semibold"
            onClick={onNavigateToBusinessOps}
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderTradingPsychology = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
            <Brain className="w-6 h-6 text-secondary" />
            <span>Trading Psychology</span>
          </h2>
          <p className="text-foreground/70">30-Level Professional Development Program</p>
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20">Level 1/30</Badge>
      </div>

      {/* Launch Trading Psychology Learning */}
      <Card className="military-card">
        <CardContent className="p-8 text-center">
          <div className="bg-secondary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-secondary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Master Trading Psychology Through 30 Progressive Levels</h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Develop the mental framework and emotional discipline required for consistent trading success 
            through systematic psychological training and the 7 Pillars of Resilience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-green-500/10 rounded-lg">
              <div className="text-lg font-bold text-green-500 mb-1">Levels 1-10</div>
              <div className="text-sm text-muted-foreground">Emotional Foundations</div>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <div className="text-lg font-bold text-blue-500 mb-1">Levels 11-20</div>
              <div className="text-sm text-muted-foreground">Mental Resilience</div>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <div className="text-lg font-bold text-purple-500 mb-1">Levels 21-30</div>
              <div className="text-sm text-muted-foreground">7 Pillars Mastery</div>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg font-semibold"
            onClick={onNavigateToPsychology}
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderCapitalManagement = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-primary" />
            <span>Capital Management</span>
          </h2>
          <p className="text-foreground/70">30-Level Professional Development Program</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20">Level 1/30</Badge>
      </div>

      {/* Launch Capital Management Learning */}
      <Card className="military-card">
        <CardContent className="p-8 text-center">
          <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Master Capital Management Through 30 Progressive Levels</h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Build the financial architecture of professional trading through systematic capital allocation, 
            risk management, and survival protocols across 30 comprehensive levels.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-green-500/10 rounded-lg">
              <div className="text-lg font-bold text-green-500 mb-1">Levels 1-10</div>
              <div className="text-sm text-muted-foreground">Risk Foundations</div>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <div className="text-lg font-bold text-blue-500 mb-1">Levels 11-20</div>
              <div className="text-sm text-muted-foreground">Portfolio Management</div>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <div className="text-lg font-bold text-purple-500 mb-1">Levels 21-30</div>
              <div className="text-sm text-muted-foreground">Institutional Systems</div>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold"
            onClick={onNavigateToCapitalMgmt}
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );

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

            {/* Header Actions */}
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
        {/* Navigation Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/20">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="trading-mastery" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Trading Mastery</span>
            </TabsTrigger>
            <TabsTrigger value="business-operations" className="flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Business Ops</span>
            </TabsTrigger>
            <TabsTrigger value="trading-psychology" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Psychology</span>
            </TabsTrigger>
            <TabsTrigger value="capital-management" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Capital Mgmt</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">{renderOverview()}</TabsContent>
          <TabsContent value="trading-mastery">{renderTradingMastery()}</TabsContent>
          <TabsContent value="business-operations">{renderBusinessOperations()}</TabsContent>
          <TabsContent value="trading-psychology">{renderTradingPsychology()}</TabsContent>
          <TabsContent value="capital-management">{renderCapitalManagement()}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};