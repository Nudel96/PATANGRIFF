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
  Search
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  onNavigateToJournal: () => void;
  onNavigateToHeatmap: () => void;
  onNavigateToTradingMastery: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, onNavigateToJournal, onNavigateToHeatmap, onNavigateToTradingMastery }) => {
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
          <p className="text-foreground/70">Master the complete trading sequence from analysis to execution</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20">Level 23/30</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Course Modules */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Course Modules</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Market Structure</span>
                </div>
                <Badge className="bg-primary/20 text-primary text-xs">Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <PlayCircle className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">Technical Analysis</span>
                </div>
                <Badge className="bg-secondary/20 text-secondary text-xs">In Progress</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Risk Management</span>
                </div>
                <Badge variant="outline" className="text-xs">Locked</Badge>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Continue Learning
            </Button>
          </CardContent>
        </Card>

        {/* Live Sessions */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Video className="w-5 h-5 text-secondary" />
              <span>Live Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Market Analysis</span>
                  <Badge className="bg-secondary/20 text-secondary text-xs">Live Now</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Daily market breakdown and trade setups</p>
                <p className="text-xs text-secondary mt-1">47 participants</p>
              </div>
              <div className="p-3 bg-muted/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Q&A Session</span>
                  <Badge variant="outline" className="text-xs">Tomorrow 3PM</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Weekly questions and answers</p>
              </div>
            </div>
            <Button variant="outline" className="w-full border-secondary/20 hover:bg-secondary/10">
              Join Live Session
            </Button>
          </CardContent>
        </Card>

        {/* Practice Tools */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              <span>Practice Tools</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-primary/20 hover:bg-primary/10">
                <BarChart3 className="w-4 h-4 mr-3 text-primary" />
                Chart Analysis Simulator
              </Button>
              <Button variant="outline" className="w-full justify-start border-secondary/20 hover:bg-secondary/10">
                <Activity className="w-4 h-4 mr-3 text-secondary" />
                Pattern Recognition Quiz
              </Button>
              <Button variant="outline" className="w-full justify-start border-primary/20 hover:bg-primary/10">
                <Calculator className="w-4 h-4 mr-3 text-primary" />
                Risk Calculator
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Tracking */}
      <Card className="military-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-primary" />
            <span>Your Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">23</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
              <Progress value={76} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
              <Progress value={62} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
              <Progress value={40} className="mt-2" />
            </div>
          </div>
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
          <p className="text-foreground/70">Transform trading into a systematic business operation</p>
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20">Level 14/30</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Performance Analytics */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <BarChart3 className="w-5 h-5 text-secondary" />
              <span>Performance Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="text-lg font-bold text-secondary">73%</div>
                <div className="text-xs text-muted-foreground">Win Rate</div>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-lg font-bold text-primary">2.3</div>
                <div className="text-xs text-muted-foreground">Profit Factor</div>
              </div>
            </div>
            <Button variant="outline" className="w-full border-secondary/20 hover:bg-secondary/10">
              <Eye className="w-4 h-4 mr-2" />
              View Full Report
            </Button>
          </CardContent>
        </Card>

        {/* Trading Journal */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <FileText className="w-5 h-5 text-primary" />
              <span>Trading Journal</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Trades This Month</span>
                <span className="font-bold text-primary">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Journal Entries</span>
                <span className="font-bold text-secondary">43</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Completion Rate</span>
                <span className="font-bold text-primary">91%</span>
              </div>
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={onNavigateToJournal}
            >
              <Edit className="w-4 h-4 mr-2" />
              Open Journal
            </Button>
          </CardContent>
        </Card>

        {/* Business Metrics */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Briefcase className="w-5 h-5 text-secondary" />
              <span>Business Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-muted/10 rounded-lg">
                <div className="text-sm text-muted-foreground">Monthly P&L</div>
                <div className="text-lg font-bold text-primary">+$2,847</div>
              </div>
              <div className="p-3 bg-muted/10 rounded-lg">
                <div className="text-sm text-muted-foreground">ROI</div>
                <div className="text-lg font-bold text-secondary">12.4%</div>
              </div>
            </div>
            <Button variant="outline" className="w-full border-secondary/20 hover:bg-secondary/10">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* SOPs and Documentation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Standard Operating Procedures</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Pre-Market Routine</span>
                </div>
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">Trade Entry Checklist</span>
                </div>
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Plus className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Create New SOP</span>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-secondary" />
              <span>KPI Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Monthly Target</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Risk Management</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Journal Compliance</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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
          <p className="text-foreground/70">Forge the mental framework of elite operators</p>
        </div>
        <Badge className="bg-secondary/10 text-secondary border-secondary/20">Level 9/30</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mental Conditioning */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Brain className="w-5 h-5 text-secondary" />
              <span>Mental Conditioning</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <div className="text-sm font-medium mb-1">Daily Mindset Protocol</div>
                <div className="text-xs text-muted-foreground">5-minute morning routine</div>
                <Button size="sm" className="mt-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Start Session
                </Button>
              </div>
              <div className="p-3 bg-muted/10 rounded-lg">
                <div className="text-sm font-medium mb-1">Pressure Training</div>
                <div className="text-xs text-muted-foreground">Stress management exercises</div>
                <Button size="sm" variant="outline" className="mt-2">
                  Begin Training
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emotional State Tracking */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Activity className="w-5 h-5 text-primary" />
              <span>Emotional Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Current State</span>
                <Badge className="bg-primary/20 text-primary">Focused</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Confidence Level</span>
                <span className="font-bold text-secondary">8/10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Stress Level</span>
                <span className="font-bold text-primary">3/10</span>
              </div>
            </div>
            <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10">
              <Plus className="w-4 h-4 mr-2" />
              Log Current State
            </Button>
          </CardContent>
        </Card>

        {/* Coaching Sessions */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <HeadphonesIcon className="w-5 h-5 text-secondary" />
              <span>Coaching Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <div className="text-sm font-medium mb-1">1-on-1 Mentoring</div>
                <div className="text-xs text-muted-foreground">Next: Tomorrow 2PM</div>
                <Button size="sm" variant="outline" className="mt-2">
                  Reschedule
                </Button>
              </div>
              <div className="p-3 bg-muted/10 rounded-lg">
                <div className="text-sm font-medium mb-1">Group Therapy</div>
                <div className="text-xs text-muted-foreground">Weekly peer support</div>
                <Button size="sm" variant="outline" className="mt-2">
                  Join Group
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Psychology Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Psychology Assessments</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <div>
                  <div className="text-sm font-medium">Risk Tolerance Test</div>
                  <div className="text-xs text-muted-foreground">Last taken: 2 weeks ago</div>
                </div>
                <Badge className="bg-primary/20 text-primary">High</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                <div>
                  <div className="text-sm font-medium">Emotional Intelligence</div>
                  <div className="text-xs text-muted-foreground">Last taken: 1 month ago</div>
                </div>
                <Badge className="bg-secondary/20 text-secondary">Above Average</Badge>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Take New Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-secondary" />
              <span>Mental Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-xs font-medium">Discipline Master</div>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <Shield className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="text-xs font-medium">Pressure Warrior</div>
              </div>
              <div className="text-center p-3 bg-muted/10 rounded-lg opacity-50">
                <Target className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <div className="text-xs font-medium">Focus Elite</div>
              </div>
              <div className="text-center p-3 bg-muted/10 rounded-lg opacity-50">
                <Brain className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <div className="text-xs font-medium">Mind Master</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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
          <p className="text-foreground/70">Master the financial architecture of professional trading</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20">Level 18/30</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Portfolio Overview */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <PieChart className="w-5 h-5 text-primary" />
              <span>Portfolio Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">$47,832</div>
              <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Available Capital</span>
                <span className="font-medium text-primary">$12,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Open Positions</span>
                <span className="font-medium text-secondary">$35,382</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full border-primary/20 hover:bg-primary/10"
              onClick={onNavigateToHeatmap}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Heatmap
            </Button>
          </CardContent>
        </Card>

        {/* Risk Metrics */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Shield className="w-5 h-5 text-secondary" />
              <span>Risk Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Max Drawdown</span>
                <span className="font-medium text-destructive">-8.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Risk per Trade</span>
                <span className="font-medium text-primary">1.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Sharpe Ratio</span>
                <span className="font-medium text-secondary">2.34</span>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Risk Level</span>
                <span className="text-sm font-medium text-primary">Moderate</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Position Sizing */}
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Calculator className="w-5 h-5 text-primary" />
              <span>Position Sizing</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <div className="text-sm font-medium mb-1">Risk Calculator</div>
                <div className="text-xs text-muted-foreground">Calculate optimal position size</div>
                <Button size="sm" className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Open Calculator
                </Button>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <div className="text-sm font-medium mb-1">Kelly Criterion</div>
                <div className="text-xs text-muted-foreground">Optimal bet sizing formula</div>
                <Button size="sm" variant="outline" className="mt-2">
                  Calculate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Capital Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Capital Allocation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Trading Capital</span>
                  <span className="text-sm font-medium">70% ($33,482)</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Emergency Fund</span>
                  <span className="text-sm font-medium">20% ($9,566)</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Growth Reserve</span>
                  <span className="text-sm font-medium">10% ($4,783)</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </div>
            <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10">
              <Edit className="w-4 h-4 mr-2" />
              Adjust Allocation
            </Button>
          </CardContent>
        </Card>

        <Card className="military-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <span>Performance Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-lg font-bold text-primary">+12.4%</div>
                <div className="text-xs text-muted-foreground">Monthly Return</div>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="text-lg font-bold text-secondary">+34.7%</div>
                <div className="text-xs text-muted-foreground">YTD Return</div>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-lg font-bold text-primary">2.8</div>
                <div className="text-xs text-muted-foreground">Profit Factor</div>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <div className="text-lg font-bold text-secondary">0.12</div>
                <div className="text-xs text-muted-foreground">Max DD</div>
              </div>
            </div>
            <Button variant="outline" className="w-full border-secondary/20 hover:bg-secondary/10">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </CardContent>
        </Card>
      </div>
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