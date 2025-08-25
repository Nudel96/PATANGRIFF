import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Building2, 
  DollarSign, 
  Brain, 
  Target,
  Award,
  BookOpen,
  Users,
  BarChart3,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Trophy,
  Activity
} from 'lucide-react';

export const TrainingSection = () => {
  const pillars = [
    {
      icon: TrendingUp,
      title: 'Trading Mastery',
      subtitle: 'Analytical & Execution Excellence',
      description: 'Master the complete trading sequence from macro-economic analysis to precise execution. Develop systematic approaches to market regime reading, bias identification, and risk-managed position sizing. Progress through 30 levels of increasingly sophisticated analytical frameworks.',
      levels: {
        beginner: 'Market fundamentals, chart reading, basic technical analysis',
        intermediate: 'Advanced pattern recognition, multi-timeframe analysis, sector rotation',
        professional: 'Institutional-grade execution, algorithmic thinking, market microstructure'
      },
      keySkills: [
        'Macro-to-technical analysis sequence',
        'Systematic bias identification',
        'Risk mathematics and position sizing',
        'Advanced execution protocols'
      ],
      color: 'primary',
      progress: 75
    },
    {
      icon: DollarSign,
      title: 'Capital Management',
      subtitle: 'Financial Risk & Money Management',
      description: 'Build the financial architecture of professional trading through systematic capital allocation, bankroll management, and survival protocols. Learn to structure your trading business for long-term sustainability across all market conditions.',
      levels: {
        beginner: 'Basic position sizing, stop-loss fundamentals, account protection',
        intermediate: 'Portfolio allocation, correlation analysis, drawdown management',
        professional: 'Institutional capital strategies, leverage optimization, crisis protocols'
      },
      keySkills: [
        'Bankroll structure and allocation',
        'Cashflow separation protocols',
        'Risk-adjusted return optimization',
        'Survival and recovery planning'
      ],
      color: 'secondary',
      progress: 60
    },
    {
      icon: Building2,
      title: 'Business Operations',
      subtitle: 'Professional Trading Practices',
      description: 'Transform trading from hobby to professional enterprise. Develop systematic business operations including SOPs, KPI tracking, performance analytics, and scalable processes that create lasting competitive advantages.',
      levels: {
        beginner: 'Trading journal setup, basic record keeping, goal setting',
        intermediate: 'Performance analytics, tax optimization, business structure',
        professional: 'Institutional operations, team management, systematic scaling'
      },
      keySkills: [
        'Trading business framework',
        'Systems and SOPs development',
        'KPI tracking and optimization',
        'Scalable process documentation'
      ],
      color: 'primary',
      progress: 45
    },
    {
      icon: Brain,
      title: 'Trading Psychology',
      subtitle: 'Mental Framework & Discipline',
      description: 'Forge the mental conditioning required for consistent market success. Develop anti-tilt strategies, ego management protocols, and the professional identity that commands respect in high-pressure trading environments.',
      levels: {
        beginner: 'Emotional awareness, basic discipline, fear/greed management',
        intermediate: 'Advanced psychology, stress testing, performance optimization',
        professional: 'Elite mindset, leadership under pressure, systematic mental conditioning'
      },
      keySkills: [
        'Mental conditioning protocols',
        'Anti-tilt strategies and frameworks',
        'Professional identity formation',
        'Pressure leadership development'
      ],
      color: 'secondary',
      progress: 30
    }
  ];

  const learningFeatures = [
    {
      icon: Target,
      title: 'XP Tracking System',
      description: 'Gamified progression through 30 levels per pillar with real-time experience points and achievement unlocks.'
    },
    {
      icon: BookOpen,
      title: 'Journal Integration',
      description: 'Seamless integration with trading journal for reflection exercises and performance correlation analysis.'
    },
    {
      icon: Activity,
      title: 'Live Market Practice',
      description: 'Real-time market sessions where you apply learned concepts under expert guidance and peer collaboration.'
    },
    {
      icon: Users,
      title: 'AI-Powered Coaching',
      description: 'Personalized learning paths with intelligent recommendations based on your progress and performance patterns.'
    }
  ];

  const progressLevels = [
    { range: '1-10', title: 'Beginner', description: 'Foundation building and core concept mastery', color: 'bg-muted' },
    { range: '11-20', title: 'Intermediate', description: 'Advanced application and systematic thinking', color: 'bg-secondary/20' },
    { range: '21-30', title: 'Professional', description: 'Expert-level execution and leadership development', color: 'bg-primary/20' }
  ];

  return (
    <section className="section-padding">
      <div className="container-max mx-auto">
        {/* Main Training Overview */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Trophy className="w-4 h-4 mr-2" />
            Four Pillars XP Learning System
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Trader
            <span className="block gradient-text">Development Program</span>
          </h1>
          
          <p className="text-xl text-foreground/70 max-w-4xl mx-auto mb-8">
            Master trading through our revolutionary Four Pillars XP Learning System. Each pillar features 
            30 progressive levels designed to transform you from chart-watcher to market operator through 
            systematic skill development and measurable advancement.
          </p>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {progressLevels.map((level, index) => (
              <div key={index} className={`military-card ${level.color}`}>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Levels {level.range}</div>
                  <div className="text-lg font-semibold mb-2">{level.title}</div>
                  <p className="text-sm text-foreground/70">{level.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold">
              Start Your Training Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/10">
              View Curriculum Details
            </Button>
          </div>
        </div>

        {/* Learning Experience Features */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Advanced Learning
            <span className="block gradient-text">Experience Features</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningFeatures.map((feature, index) => (
              <Card key={index} className="military-card text-center group">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Feature Descriptions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                  <span>Personalized Learning Paths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">
                  Our AI-powered coaching system analyzes your progress across all four pillars to create 
                  personalized learning recommendations. Identify strengths, address weaknesses, and optimize 
                  your development trajectory for maximum efficiency.
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex items-center space-x-2">
                    <Star className="w-3 h-3 text-primary" />
                    <span>Adaptive curriculum based on performance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="w-3 h-3 text-primary" />
                    <span>Weakness identification and targeted improvement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="w-3 h-3 text-primary" />
                    <span>Optimal learning sequence recommendations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Real-Time Market Integration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">
                  Bridge theory and practice through live market sessions where you apply learned concepts 
                  in real trading environments. Receive immediate feedback and guidance from expert mentors 
                  and peer collaboration.
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex items-center space-x-2">
                    <Star className="w-3 h-3 text-secondary" />
                    <span>Live trading room sessions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="w-3 h-3 text-secondary" />
                    <span>Real-time market analysis practice</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="w-3 h-3 text-secondary" />
                    <span>Immediate expert feedback and correction</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enrollment Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your
            <span className="block gradient-text">Professional Development?</span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            Join thousands of traders who have transformed their careers through our systematic, 
            level-based approach to trading education. Start your journey from beginner to 
            professional operator today.
          </p>

          <div className="military-card max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-2">120</div>
                <div className="text-sm text-foreground/70">Total Levels</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary mb-2">4</div>
                <div className="text-sm text-foreground/70">Core Pillars</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">∞</div>
                <div className="text-sm text-foreground/70">Lifetime Access</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold">
              Unlock Your Potential
              <Award className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-secondary/20 hover:bg-secondary/10">
              Schedule Assessment Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};