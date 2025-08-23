import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
  Star
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const pillarsProgress = [
    { name: 'Trading Mastery', progress: 75, color: 'primary', icon: TrendingUp },
    { name: 'Business Operations', progress: 45, color: 'secondary', icon: Building2 },
    { name: 'Capital Management', progress: 60, color: 'primary', icon: DollarSign },
    { name: 'Trading Psychology', progress: 30, color: 'secondary', icon: Brain }
  ];

  const platformTools = [
    { name: 'Trading Journal', icon: FileText, status: 'Active', color: 'primary' },
    { name: 'Market Heatmap', icon: Activity, status: 'Live', color: 'secondary' },
    { name: 'Bias Analysis', icon: Target, status: 'Ready', color: 'primary' },
    { name: 'Member Area', icon: Users, status: 'Online', color: 'secondary' }
  ];

  const recentActivity = [
    { action: 'Completed: Risk Management Module', time: '2 hours ago', type: 'course' },
    { action: 'New trade logged: EURUSD Long', time: '4 hours ago', type: 'trade' },
    { action: 'Joined live session: Market Analysis', time: '1 day ago', type: 'session' },
    { action: 'Achievement unlocked: Discipline Warrior', time: '2 days ago', type: 'achievement' }
  ];

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
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
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
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Continue Training
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Platform Tools */}
          <div>
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-secondary" />
                  <span>Warrior Arsenal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {platformTools.map((tool, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`bg-${tool.color}/10 p-2 rounded-lg`}>
                        <tool.icon className={`w-4 h-4 text-${tool.color}`} />
                      </div>
                      <span className="font-medium">{tool.name}</span>
                    </div>
                    <Badge className={`bg-${tool.color}/10 text-${tool.color} border-${tool.color}/20`}>
                      {tool.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Recent Activity */}
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

          {/* Quick Actions */}
          <Card className="military-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-secondary" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-primary/20 hover:bg-primary/10">
                <PlayCircle className="w-4 h-4 mr-3 text-primary" />
                Join Live Session
              </Button>
              <Button variant="outline" className="w-full justify-start border-secondary/20 hover:bg-secondary/10">
                <FileText className="w-4 h-4 mr-3 text-secondary" />
                Log New Trade
              </Button>
              <Button variant="outline" className="w-full justify-start border-primary/20 hover:bg-primary/10">
                <BookOpen className="w-4 h-4 mr-3 text-primary" />
                Continue Course
              </Button>
              <Button variant="outline" className="w-full justify-start border-secondary/20 hover:bg-secondary/10">
                <MessageCircle className="w-4 h-4 mr-3 text-secondary" />
                Community Chat
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-primary/20 hover:bg-primary/10"
                onClick={() => window.open('/trading-journal', '_blank')}
              >
                <FileText className="w-4 h-4 mr-3 text-primary" />
                Trading Journal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Footer */}
        <div className="mt-12 text-center">
          <div className="military-card max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2">Today's Warrior Mindset</h3>
            <p className="text-foreground/70 italic mb-4">
              "Discipline is the bridge between goals and accomplishment. Every trade, every decision, 
              every moment of pressure is an opportunity to forge your warrior identity."
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Strategy</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span>Discipline</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Results</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};