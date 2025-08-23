import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  ArrowLeft, 
  LogOut, 
  Trophy,
  BookOpen,
  Target,
  Award,
  Star,
  Lock,
  CheckCircle,
  PlayCircle,
  Clock,
  Coins,
  BarChart3,
  Users,
  Activity
} from 'lucide-react';

interface CapitalManagementLearningProps {
  onBack: () => void;
  onLogout: () => void;
}

export const CapitalManagementLearning: React.FC<CapitalManagementLearningProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userXP] = useState(0);
  const [userLevel] = useState(1);

  // Placeholder learning levels for Capital Management
  const learningLevels = [
    // TIER 1: BEGINNER (Levels 1-10)
    { level: 1, title: "Introduction to Capital Management", tier: "Beginner", locked: false, completed: false, totalXP: 50 },
    { level: 2, title: "Basic Risk Concepts", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 3, title: "Position Sizing Fundamentals", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 4, title: "The 1% Rule", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 5, title: "Stop Loss Basics", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 6, title: "Risk-Reward Ratios", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 7, title: "Account Protection Strategies", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 8, title: "Drawdown Management", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 9, title: "Capital Preservation", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 10, title: "Beginner Capital Assessment", tier: "Beginner", locked: true, completed: false, totalXP: 100 },

    // TIER 2: INTERMEDIATE (Levels 11-20)
    { level: 11, title: "Advanced Position Sizing", tier: "Intermediate", locked: true, completed: false, totalXP: 60 },
    { level: 12, title: "Kelly Criterion", tier: "Intermediate", locked: true, completed: false, totalXP: 60 },
    { level: 13, title: "Portfolio Risk Management", tier: "Intermediate", locked: true, completed: false, totalXP: 60 },
    { level: 14, title: "Correlation Risk", tier: "Intermediate", locked: true, completed: false, totalXP: 70 },
    { level: 15, title: "Volatility-Based Sizing", tier: "Intermediate", locked: true, completed: false, totalXP: 70 },
    { level: 16, title: "Dynamic Risk Adjustment", tier: "Intermediate", locked: true, completed: false, totalXP: 70 },
    { level: 17, title: "Capital Allocation Models", tier: "Intermediate", locked: true, completed: false, totalXP: 75 },
    { level: 18, title: "Performance Metrics", tier: "Intermediate", locked: true, completed: false, totalXP: 75 },
    { level: 19, title: "Risk-Adjusted Returns", tier: "Intermediate", locked: true, completed: false, totalXP: 80 },
    { level: 20, title: "Intermediate Capital Assessment", tier: "Intermediate", locked: true, completed: false, totalXP: 150 },

    // TIER 3: PROFESSIONAL (Levels 21-30)
    { level: 21, title: "Institutional Risk Management", tier: "Professional", locked: true, completed: false, totalXP: 75 },
    { level: 22, title: "Advanced Portfolio Theory", tier: "Professional", locked: true, completed: false, totalXP: 75 },
    { level: 23, title: "Hedging Strategies", tier: "Professional", locked: true, completed: false, totalXP: 80 },
    { level: 24, title: "Options for Risk Management", tier: "Professional", locked: true, completed: false, totalXP: 80 },
    { level: 25, title: "Multi-Asset Risk Models", tier: "Professional", locked: true, completed: false, totalXP: 90 },
    { level: 26, title: "Stress Testing and Scenarios", tier: "Professional", locked: true, completed: false, totalXP: 90 },
    { level: 27, title: "Capital Efficiency Optimization", tier: "Professional", locked: true, completed: false, totalXP: 100 },
    { level: 28, title: "Advanced Drawdown Recovery", tier: "Professional", locked: true, completed: false, totalXP: 80 },
    { level: 29, title: "Professional Risk Systems", tier: "Professional", locked: true, completed: false, totalXP: 80 },
    { level: 30, title: "Capital Management Mastery", tier: "Professional", locked: true, completed: false, totalXP: 200 }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-blue-500';
      case 'Professional': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const renderLevelCard = (level: any) => {
    return (
      <Card 
        key={level.level} 
        className={`military-card cursor-pointer transition-all duration-300 ${
          level.locked ? 'opacity-50' : 'hover:border-primary/30'
        }`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                level.locked ? 'bg-muted' : level.completed ? 'bg-primary/20' : 'bg-secondary/20'
              }`}>
                {level.locked ? (
                  <Lock className="w-6 h-6 text-muted-foreground" />
                ) : level.completed ? (
                  <CheckCircle className="w-6 h-6 text-primary" />
                ) : (
                  <BookOpen className="w-6 h-6 text-secondary" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg">Level {level.level}</CardTitle>
                <Badge className={`${getTierColor(level.tier)} text-white text-xs`}>
                  {level.tier}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-primary">
                <Coins className="w-4 h-4" />
                <span className="font-bold">{level.totalXP} XP</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">{level.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">Content coming soon...</p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Capital Management
            </div>
            {!level.locked && (
              <Button size="sm" variant="outline" disabled>
                Coming Soon
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

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
                <div className="bg-primary/10 p-2 rounded-lg">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Capital Management</h1>
                  <p className="text-sm text-foreground/70">30-Level Professional Development</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-lg">
                <Coins className="w-4 h-4 text-primary" />
                <span className="font-bold text-primary">{userXP} XP</span>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Level {userLevel}
              </Badge>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Exit Portal
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-max mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Master Capital Management Through
                <span className="block gradient-text">30 Progressive Levels</span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Build the financial architecture of professional trading through systematic capital allocation, 
                risk management, and survival protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <BookOpen className="w-5 h-5 text-green-500" />
                    </div>
                    <span>Beginner Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-green-500">Levels 1-10</div>
                    <p className="text-sm text-muted-foreground">
                      Foundation of risk management and capital protection.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      Total XP Available: 550
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Target className="w-5 h-5 text-blue-500" />
                    </div>
                    <span>Intermediate Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-blue-500">Levels 11-20</div>
                    <p className="text-sm text-muted-foreground">
                      Advanced portfolio management and risk models.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      Total XP Available: 720
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <Trophy className="w-5 h-5 text-purple-500" />
                    </div>
                    <span>Professional Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-purple-500">Levels 21-30</div>
                    <p className="text-sm text-muted-foreground">
                      Institutional-grade capital management systems.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      Total XP Available: 850
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="beginner" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Beginner Tier (Levels 1-10)</h2>
              <p className="text-lg text-muted-foreground">
                Build your foundation in risk management and capital protection.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningLevels.filter(level => level.tier === 'Beginner').map(renderLevelCard)}
            </div>
          </TabsContent>

          <TabsContent value="intermediate" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Intermediate Tier (Levels 11-20)</h2>
              <p className="text-lg text-muted-foreground">
                Develop advanced portfolio management and risk models.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningLevels.filter(level => level.tier === 'Intermediate').map(renderLevelCard)}
            </div>
          </TabsContent>

          <TabsContent value="professional" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Professional Tier (Levels 21-30)</h2>
              <p className="text-lg text-muted-foreground">
                Master institutional-grade capital management systems.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningLevels.filter(level => level.tier === 'Professional').map(renderLevelCard)}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Learning Progress</h2>
              <p className="text-lg text-muted-foreground">
                Track your advancement through the Capital Management curriculum.
              </p>
            </div>

            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Overall Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{userLevel}/30</div>
                    <div className="text-sm text-muted-foreground">Levels Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">{userXP}</div>
                    <div className="text-sm text-muted-foreground">Total XP Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {Math.round((userLevel / 30) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Course Completion</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};