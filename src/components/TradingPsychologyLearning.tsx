import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
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

interface TradingPsychologyLearningProps {
  onBack: () => void;
  onLogout: () => void;
}

export const TradingPsychologyLearning: React.FC<TradingPsychologyLearningProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userXP] = useState(0);
  const [userLevel] = useState(1);

  // Placeholder learning levels for Trading Psychology
  const learningLevels = [
    // TIER 1: BEGINNER (Levels 1-10)
    { level: 1, title: "Introduction to Trading Psychology", tier: "Beginner", locked: false, completed: false, totalXP: 50 },
    { level: 2, title: "Understanding Emotions in Trading", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 3, title: "Fear and Greed Management", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 4, title: "Building Basic Discipline", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 5, title: "Stress Recognition and Response", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 6, title: "Developing Trading Routines", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 7, title: "Basic Mindfulness Techniques", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 8, title: "Goal Setting and Motivation", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 9, title: "Self-Awareness Development", tier: "Beginner", locked: true, completed: false, totalXP: 50 },
    { level: 10, title: "Beginner Psychology Assessment", tier: "Beginner", locked: true, completed: false, totalXP: 100 },

    // TIER 2: INTERMEDIATE (Levels 11-20)
    { level: 11, title: "Cognitive Biases in Trading", tier: "Intermediate", locked: true, completed: false, totalXP: 60 },
    { level: 12, title: "Advanced Emotional Regulation", tier: "Intermediate", locked: true, completed: false, totalXP: 60 },
    { level: 13, title: "Confidence Building Strategies", tier: "Intermediate", locked: true, completed: false, totalXP: 60 },
    { level: 14, title: "Handling Losing Streaks", tier: "Intermediate", locked: true, completed: false, totalXP: 70 },
    { level: 15, title: "Mental Resilience Training", tier: "Intermediate", locked: true, completed: false, totalXP: 70 },
    { level: 16, title: "Pressure Management", tier: "Intermediate", locked: true, completed: false, totalXP: 70 },
    { level: 17, title: "Decision Making Under Stress", tier: "Intermediate", locked: true, completed: false, totalXP: 75 },
    { level: 18, title: "Building Mental Toughness", tier: "Intermediate", locked: true, completed: false, totalXP: 75 },
    { level: 19, title: "Advanced Mindfulness Practice", tier: "Intermediate", locked: true, completed: false, totalXP: 80 },
    { level: 20, title: "Intermediate Psychology Assessment", tier: "Intermediate", locked: true, completed: false, totalXP: 150 },

    // TIER 3: PROFESSIONAL (Levels 21-30)
    { level: 21, title: "The 7 Pillars of Resilience - Introduction", tier: "Professional", locked: true, completed: false, totalXP: 75 },
    { level: 22, title: "Pillar 1: Optimism and Positive Thinking", tier: "Professional", locked: true, completed: false, totalXP: 75 },
    { level: 23, title: "Pillar 2: Acceptance and Letting Go", tier: "Professional", locked: true, completed: false, totalXP: 80 },
    { level: 24, title: "Pillar 3: Solution-Oriented Mindset", tier: "Professional", locked: true, completed: false, totalXP: 80 },
    { level: 25, title: "Pillar 4: Personal Responsibility", tier: "Professional", locked: true, completed: false, totalXP: 90 },
    { level: 26, title: "Pillar 5: Building Support Networks", tier: "Professional", locked: true, completed: false, totalXP: 90 },
    { level: 27, title: "Pillar 6: Future Planning and Vision", tier: "Professional", locked: true, completed: false, totalXP: 100 },
    { level: 28, title: "Pillar 7: Self-Reflection and Growth", tier: "Professional", locked: true, completed: false, totalXP: 80 },
    { level: 29, title: "Peak Performance Psychology", tier: "Professional", locked: true, completed: false, totalXP: 80 },
    { level: 30, title: "Psychology Mastery Assessment", tier: "Professional", locked: true, completed: false, totalXP: 200 }
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
              Trading Psychology
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
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <Brain className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Trading Psychology</h1>
                  <p className="text-sm text-foreground/70">30-Level Professional Development</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-lg">
                <Coins className="w-4 h-4 text-primary" />
                <span className="font-bold text-primary">{userXP} XP</span>
              </div>
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">
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
                Master Trading Psychology Through
                <span className="block gradient-text">30 Progressive Levels</span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Develop the mental framework and emotional discipline required for consistent trading success 
                through systematic psychological training.
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
                      Foundation of emotional awareness and basic discipline.
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
                      Advanced emotional regulation and mental resilience.
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
                      Master the 7 Pillars of Resilience and peak performance.
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
                Build emotional awareness and develop basic trading discipline.
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
                Develop advanced emotional regulation and mental resilience.
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
                Master the 7 Pillars of Resilience and achieve peak performance psychology.
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
                Track your advancement through the Trading Psychology curriculum.
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