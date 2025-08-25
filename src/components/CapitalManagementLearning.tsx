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
  Shield, 
  Target, 
  BarChart3, 
  Award, 
  CheckCircle, 
  Lock, 
  PlayCircle,
  Trophy,
  Star,
  Zap,
  Activity,
  Calculator,
  PieChart,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Coins,
  ArrowRight
} from 'lucide-react';

interface CapitalManagementLearningProps {
  onBack: () => void;
  onLogout: () => void;
}

export const CapitalManagementLearning: React.FC<CapitalManagementLearningProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userLevel, setUserLevel] = useState(6);
  const [userXP, setUserXP] = useState(390);

  // Capital Management Learning Path (30 levels)
  const learningLevels = [
    // TIER 1: RISK BASICS (Levels 1-10)
    {
      level: 1,
      title: "Introduction to Risk Management",
      description: "Fundamental concepts of risk and capital preservation",
      tier: "Risk Basics",
      unlockRequirement: 0,
      completed: true,
      locked: false,
      totalXP: 50,
      modules: [
        {
          id: "cm-1-1",
          title: "Risk vs Reward Fundamentals",
          description: "Understanding the relationship between risk and potential returns",
          type: "lesson",
          xpReward: 30,
          duration: "20 min",
          completed: true,
          content: "Risk management is the foundation of successful trading. Every trade involves risk, and managing that risk determines long-term survival and success. The goal is not to eliminate risk but to manage it systematically..."
        },
        {
          id: "cm-1-2",
          title: "Risk Assessment Quiz",
          description: "Test your understanding of basic risk concepts",
          type: "quiz",
          xpReward: 20,
          duration: "10 min",
          completed: true
        }
      ]
    },
    {
      level: 2,
      title: "Position Sizing Fundamentals",
      description: "Learn basic position sizing and the 1-2% rule",
      tier: "Risk Basics",
      unlockRequirement: 50,
      completed: true,
      locked: false,
      totalXP: 60,
      modules: [
        {
          id: "cm-2-1",
          title: "The 1-2% Rule",
          description: "Foundation of position sizing and capital preservation",
          type: "lesson",
          xpReward: 40,
          duration: "25 min",
          completed: true,
          content: "Never risk more than 1-2% of your account on a single trade. With a $10,000 account, risk only $100-200 per trade. This ensures you can survive 50+ consecutive losses..."
        },
        {
          id: "cm-2-2",
          title: "Position Size Calculator",
          description: "Build your personal position sizing calculator",
          type: "project",
          xpReward: 20,
          duration: "30 min",
          completed: true
        }
      ]
    },
    {
      level: 3,
      title: "Stop Loss Strategies",
      description: "Master different stop loss techniques and placement strategies",
      tier: "Risk Basics",
      unlockRequirement: 110,
      completed: true,
      locked: false,
      totalXP: 65,
      modules: [
        {
          id: "cm-3-1",
          title: "Stop Loss Placement",
          description: "Technical, percentage, and volatility-based stop placement",
          type: "lesson",
          xpReward: 45,
          duration: "30 min",
          completed: true,
          content: "Stop losses protect capital and define risk. Place stops based on technical levels (support/resistance), percentage levels (2-3%), or volatility measures (ATR-based)..."
        },
        {
          id: "cm-3-2",
          title: "Stop Loss Analysis",
          description: "Analyze different stop loss strategies for various market conditions",
          type: "project",
          xpReward: 20,
          duration: "45 min",
          completed: true
        }
      ]
    },
    {
      level: 4,
      title: "Risk-Reward Ratios",
      description: "Understanding and implementing proper risk-reward ratios",
      tier: "Risk Basics",
      unlockRequirement: 175,
      completed: true,
      locked: false,
      totalXP: 70,
      modules: [
        {
          id: "cm-4-1",
          title: "R-Multiple System",
          description: "Measuring performance in risk multiples rather than dollars",
          type: "lesson",
          xpReward: 50,
          duration: "35 min",
          completed: true,
          content: "R-multiples normalize performance across different account sizes and trades. 1R = your initial risk. A 2R win means you made twice your risk amount. Target minimum 1.5:1 R/R..."
        },
        {
          id: "cm-4-2",
          title: "R-Multiple Tracking",
          description: "Implement R-multiple tracking in your trading journal",
          type: "project",
          xpReward: 20,
          duration: "40 min",
          completed: true
        }
      ]
    },
    {
      level: 5,
      title: "Drawdown Management",
      description: "Strategies for managing and recovering from drawdowns",
      tier: "Risk Basics",
      unlockRequirement: 245,
      completed: true,
      locked: false,
      totalXP: 75,
      modules: [
        {
          id: "cm-5-1",
          title: "Drawdown Psychology",
          description: "Mental and practical approaches to handling drawdowns",
          type: "lesson",
          xpReward: 55,
          duration: "40 min",
          completed: true,
          content: "Drawdowns are inevitable in trading. Prepare mentally and financially: reduce position sizes during drawdowns, maintain emergency funds, and have recovery protocols..."
        },
        {
          id: "cm-5-2",
          title: "Drawdown Recovery Plan",
          description: "Create your personal drawdown management strategy",
          type: "project",
          xpReward: 20,
          duration: "60 min",
          completed: true
        }
      ]
    },
    {
      level: 6,
      title: "Account Structure & Allocation",
      description: "Organize your trading capital for optimal performance and protection",
      tier: "Risk Basics",
      unlockRequirement: 320,
      completed: false,
      locked: false,
      totalXP: 80,
      modules: [
        {
          id: "cm-6-1",
          title: "Capital Allocation Framework",
          description: "Systematic approach to organizing and allocating trading capital",
          type: "lesson",
          xpReward: 60,
          duration: "45 min",
          completed: false,
          content: "Separate your capital into buckets: trading capital (80%), emergency fund (15%), and opportunity fund (5%). This structure protects your lifestyle while enabling growth..."
        },
        {
          id: "cm-6-2",
          title: "Account Structure Setup",
          description: "Implement your personal capital allocation system",
          type: "project",
          xpReward: 20,
          duration: "75 min",
          completed: false
        }
      ]
    },
    {
      level: 7,
      title: "Correlation & Portfolio Risk",
      description: "Understand correlation risk and portfolio-level risk management",
      tier: "Risk Basics",
      unlockRequirement: 400,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "cm-7-1",
          title: "Correlation Analysis",
          description: "Understanding and measuring correlation between trading positions",
          type: "lesson",
          xpReward: 65,
          duration: "50 min",
          completed: false,
          content: "Correlation measures how assets move together. Taking multiple correlated positions (EUR/USD long + GBP/USD long) increases risk without proportional reward increase..."
        },
        {
          id: "cm-7-2",
          title: "Portfolio Risk Assessment",
          description: "Analyze and optimize your portfolio-level risk exposure",
          type: "project",
          xpReward: 20,
          duration: "60 min",
          completed: false
        }
      ]
    },
    {
      level: 8,
      title: "Leverage & Margin Management",
      description: "Safe and effective use of leverage in trading",
      tier: "Risk Basics",
      unlockRequirement: 485,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "cm-8-1",
          title: "Leverage Fundamentals",
          description: "Understanding leverage, margin, and their impact on risk",
          type: "lesson",
          xpReward: 60,
          duration: "40 min",
          completed: false,
          content: "Leverage amplifies both gains and losses. Use leverage to optimize position sizing, not to increase risk. Calculate effective leverage and maintain margin safety buffers..."
        },
        {
          id: "cm-8-2",
          title: "Leverage Strategy",
          description: "Develop your personal leverage and margin management strategy",
          type: "project",
          xpReward: 20,
          duration: "45 min",
          completed: false
        }
      ]
    },
    {
      level: 9,
      title: "Emergency Protocols & Crisis Management",
      description: "Prepare for and manage trading emergencies and market crises",
      tier: "Risk Basics",
      unlockRequirement: 565,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "cm-9-1",
          title: "Crisis Preparation",
          description: "Preparing for market crashes, system failures, and personal emergencies",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          content: "Prepare for worst-case scenarios: market crashes, broker failures, technology breakdowns, and personal emergencies. Have backup plans, emergency funds, and crisis protocols..."
        },
        {
          id: "cm-9-2",
          title: "Emergency Response Plan",
          description: "Create comprehensive emergency response protocols",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false
        }
      ]
    },
    {
      level: 10,
      title: "Risk Basics Tier Assessment",
      description: "Comprehensive evaluation of fundamental risk management knowledge",
      tier: "Risk Basics",
      unlockRequirement: 650,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "cm-10-1",
          title: "Risk Management Exam",
          description: "Test all fundamental risk management concepts",
          type: "assessment",
          xpReward: 100,
          duration: "75 min",
          completed: false,
          content: "Comprehensive assessment covering position sizing, stop losses, R-multiples, drawdown management, account structure, correlation, leverage, and crisis management..."
        }
      ]
    },

    // TIER 2: PORTFOLIO (Levels 11-20)
    {
      level: 11,
      title: "Advanced Position Sizing Models",
      description: "Sophisticated position sizing techniques and optimization",
      tier: "Portfolio",
      unlockRequirement: 750,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "cm-11-1",
          title: "Kelly Criterion & Optimal F",
          description: "Mathematical approaches to optimal position sizing",
          type: "lesson",
          xpReward: 70,
          duration: "50 min",
          completed: false,
          content: "Kelly Criterion calculates optimal position size based on win rate and average win/loss ratio. Formula: f = (bp - q) / b, where b = odds, p = win probability, q = loss probability..."
        },
        {
          id: "cm-11-2",
          title: "Position Sizing Model",
          description: "Build advanced position sizing model with multiple factors",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false
        }
      ]
    },
    {
      level: 12,
      title: "Portfolio Construction & Diversification",
      description: "Build diversified trading portfolios for risk reduction",
      tier: "Portfolio",
      unlockRequirement: 840,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "cm-12-1",
          title: "Portfolio Diversification",
          description: "Systematic approaches to portfolio diversification",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          content: "Diversification reduces portfolio risk without proportionally reducing returns. Diversify across: asset classes, timeframes, strategies, and market conditions..."
        },
        {
          id: "cm-12-2",
          title: "Portfolio Design",
          description: "Design your optimal trading portfolio structure",
          type: "project",
          xpReward: 20,
          duration: "75 min",
          completed: false
        }
      ]
    },
    {
      level: 13,
      title: "Dynamic Risk Adjustment",
      description: "Adjust risk based on market conditions and performance",
      tier: "Portfolio",
      unlockRequirement: 925,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "cm-13-1",
          title: "Adaptive Risk Management",
          description: "Adjusting risk based on market volatility and personal performance",
          type: "lesson",
          xpReward: 70,
          duration: "50 min",
          completed: false,
          content: "Risk should adapt to conditions: reduce risk during high volatility, after losses, or in uncertain markets. Increase risk during favorable conditions and strong performance..."
        },
        {
          id: "cm-13-2",
          title: "Dynamic Risk System",
          description: "Implement adaptive risk adjustment protocols",
          type: "project",
          xpReward: 20,
          duration: "60 min",
          completed: false
        }
      ]
    },
    {
      level: 14,
      title: "Performance Attribution & Analysis",
      description: "Analyze performance sources and optimize capital allocation",
      tier: "Portfolio",
      unlockRequirement: 1015,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "cm-14-1",
          title: "Performance Attribution",
          description: "Understanding what drives your trading performance",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          content: "Performance attribution identifies profit sources: which strategies, timeframes, and market conditions generate the best results. Allocate more capital to high-performing areas..."
        },
        {
          id: "cm-14-2",
          title: "Attribution Analysis",
          description: "Conduct comprehensive performance attribution analysis",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false
        }
      ]
    },
    {
      level: 15,
      title: "Volatility-Based Risk Models",
      description: "Use market volatility to optimize risk management",
      tier: "Portfolio",
      unlockRequirement: 1100,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "cm-15-1",
          title: "Volatility Risk Models",
          description: "ATR, VIX, and volatility-based risk adjustment",
          type: "lesson",
          xpReward: 70,
          duration: "50 min",
          completed: false,
          content: "Volatility measures market uncertainty. Use ATR for stop placement, VIX for market stress assessment, and implied volatility for options strategies. Adjust position sizes based on volatility..."
        },
        {
          id: "cm-15-2",
          title: "Volatility Model Implementation",
          description: "Build volatility-based risk management system",
          type: "project",
          xpReward: 20,
          duration: "75 min",
          completed: false
        }
      ]
    },
    {
      level: 16,
      title: "Multi-Strategy Risk Management",
      description: "Manage risk across multiple trading strategies simultaneously",
      tier: "Portfolio",
      unlockRequirement: 1190,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "cm-16-1",
          title: "Strategy Allocation",
          description: "Allocating capital across multiple trading strategies",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          content: "Multiple strategies reduce single-strategy risk. Allocate capital based on: strategy performance, correlation, capacity, and market conditions. Rebalance regularly..."
        },
        {
          id: "cm-16-2",
          title: "Multi-Strategy Framework",
          description: "Design multi-strategy capital allocation framework",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false
        }
      ]
    },
    {
      level: 17,
      title: "Cashflow Management & Separation",
      description: "Separate trading capital from living expenses and lifestyle",
      tier: "Portfolio",
      unlockRequirement: 1275,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "cm-17-1",
          title: "Cashflow Separation",
          description: "Protecting lifestyle from trading volatility",
          type: "lesson",
          xpReward: 70,
          duration: "50 min",
          completed: false,
          content: "Separate trading capital from living expenses. Maintain 6-12 months of living expenses in safe investments. Only trade with capital you can afford to lose completely..."
        },
        {
          id: "cm-17-2",
          title: "Cashflow Structure",
          description: "Implement systematic cashflow separation protocols",
          type: "project",
          xpReward: 20,
          duration: "60 min",
          completed: false
        }
      ]
    },
    {
      level: 18,
      title: "Tax-Efficient Capital Management",
      description: "Optimize capital management for tax efficiency",
      tier: "Portfolio",
      unlockRequirement: 1365,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "cm-18-1",
          title: "Tax Optimization Strategies",
          description: "Tax-efficient approaches to capital management",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          content: "Tax efficiency preserves capital: tax-loss harvesting, retirement account strategies, business structure optimization, and timing of gains/losses..."
        },
        {
          id: "cm-18-2",
          title: "Tax Strategy Implementation",
          description: "Implement tax-efficient capital management system",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false
        }
      ]
    },
    {
      level: 19,
      title: "Capital Growth & Compounding",
      description: "Strategies for systematic capital growth and compounding",
      tier: "Portfolio",
      unlockRequirement: 1450,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "cm-19-1",
          title: "Compounding Strategies",
          description: "Systematic approaches to capital growth and compounding",
          type: "lesson",
          xpReward: 70,
          duration: "50 min",
          completed: false,
          content: "Compounding accelerates wealth building. Reinvest profits systematically, avoid lifestyle inflation, and focus on consistent returns rather than home runs..."
        },
        {
          id: "cm-19-2",
          title: "Growth Strategy Plan",
          description: "Create systematic capital growth and compounding plan",
          type: "project",
          xpReward: 20,
          duration: "75 min",
          completed: false
        }
      ]
    },
    {
      level: 20,
      title: "Portfolio Tier Assessment",
      description: "Comprehensive evaluation of portfolio management mastery",
      tier: "Portfolio",
      unlockRequirement: 1540,
      completed: false,
      locked: true,
      totalXP: 150,
      modules: [
        {
          id: "cm-20-1",
          title: "Portfolio Management Exam",
          description: "Test advanced portfolio and capital management concepts",
          type: "assessment",
          xpReward: 100,
          duration: "90 min",
          completed: false,
          content: "Advanced assessment covering position sizing models, portfolio construction, dynamic risk adjustment, performance attribution, volatility models, and capital growth strategies..."
        },
        {
          id: "cm-20-2",
          title: "Portfolio Optimization Project",
          description: "Optimize complete portfolio management system",
          type: "project",
          xpReward: 50,
          duration: "120 min",
          completed: false
        }
      ]
    },

    // TIER 3: INSTITUTIONAL (Levels 21-30)
    {
      level: 21,
      title: "Institutional Risk Management",
      description: "Enterprise-level risk management and institutional practices",
      tier: "Institutional",
      unlockRequirement: 1690,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "cm-21-1",
          title: "Institutional Risk Frameworks",
          description: "Risk management practices used by hedge funds and institutions",
          type: "lesson",
          xpReward: 80,
          duration: "60 min",
          completed: false,
          content: "Institutional risk management includes: Value at Risk (VaR), stress testing, scenario analysis, and regulatory compliance. These frameworks scale to manage billions in capital..."
        },
        {
          id: "cm-21-2",
          title: "Institutional Framework Implementation",
          description: "Implement institutional-grade risk management system",
          type: "project",
          xpReward: 20,
          duration: "150 min",
          completed: false
        }
      ]
    }
    // ... Continue with levels 22-30 following the same pattern
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Risk Basics': return 'bg-green-500';
      case 'Portfolio': return 'bg-blue-500';
      case 'Institutional': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTierProgress = (tier: string) => {
    const tierLevels = learningLevels.filter(level => level.tier === tier);
    const completedLevels = tierLevels.filter(level => level.completed).length;
    return (completedLevels / tierLevels.length) * 100;
  };

  const renderLevelCard = (level: any) => {
    const completedModules = level.modules.filter((m: any) => m.completed).length;
    const totalModules = level.modules.length;
    const progress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

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
                  <DollarSign className="w-6 h-6 text-secondary" />
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
              {level.unlockRequirement > 0 && (
                <div className="text-xs text-muted-foreground">
                  Requires {level.unlockRequirement} XP
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">{level.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{level.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{completedModules}/{totalModules} modules</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {level.modules.length} module{level.modules.length !== 1 ? 's' : ''}
            </div>
            {!level.locked && (
              <Button size="sm" variant="outline">
                {level.completed ? 'Review' : 'Start'}
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
                  <p className="text-sm text-foreground/70">Financial Risk & Money Management</p>
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
            <TabsTrigger value="risk-basics">Risk Basics</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="institutional">Institutional</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Learning Path Overview */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Capital Management Mastery
                <span className="block gradient-text">Financial Risk & Money Management</span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Master the financial architecture of professional trading through systematic capital allocation, 
                bankroll management, and survival protocols that ensure longevity in all market conditions.
              </p>
            </div>

            {/* Tier Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-green-500" />
                    </div>
                    <span>Risk Basics Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-green-500">Levels 1-10</div>
                    <p className="text-sm text-muted-foreground">
                      Fundamental risk concepts, position sizing, stop losses, and basic capital protection.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{getTierProgress('Risk Basics').toFixed(0)}%</span>
                      </div>
                      <Progress value={getTierProgress('Risk Basics')} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total XP Available: 750
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <PieChart className="w-5 h-5 text-blue-500" />
                    </div>
                    <span>Portfolio Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-blue-500">Levels 11-20</div>
                    <p className="text-sm text-muted-foreground">
                      Advanced portfolio construction, diversification, and dynamic risk management.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{getTierProgress('Portfolio').toFixed(0)}%</span>
                      </div>
                      <Progress value={getTierProgress('Portfolio')} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total XP Available: 940
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
                    <span>Institutional Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-purple-500">Levels 21-30</div>
                    <p className="text-sm text-muted-foreground">
                      Institutional-grade capital management, fund structures, and enterprise risk.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{getTierProgress('Institutional').toFixed(0)}%</span>
                      </div>
                      <Progress value={getTierProgress('Institutional')} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total XP Available: 1000
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Focus */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Continue Your Capital Management Journey</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Level {userLevel}: {learningLevels[userLevel - 1]?.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{learningLevels[userLevel - 1]?.description}</p>
                    <div className="space-y-2">
                      {learningLevels[userLevel - 1]?.modules.map((module: any, index: number) => (
                        <div key={module.id} className="flex items-center justify-between p-2 bg-muted/10 rounded">
                          <div className="flex items-center space-x-2">
                            {module.completed ? (
                              <CheckCircle className="w-4 h-4 text-primary" />
                            ) : (
                              <PlayCircle className="w-4 h-4 text-secondary" />
                            )}
                            <span className="text-sm">{module.title}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-primary">
                            <Coins className="w-3 h-3" />
                            <span>{module.xpReward}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Continue Learning
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk-basics" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Risk Basics Tier (Levels 1-10)</h2>
              <p className="text-lg text-muted-foreground">
                Master fundamental risk management concepts and capital protection strategies.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningLevels.filter(level => level.tier === 'Risk Basics').map(renderLevelCard)}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Portfolio Tier (Levels 11-20)</h2>
              <p className="text-lg text-muted-foreground">
                Advanced portfolio construction, diversification, and dynamic capital management.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningLevels.filter(level => level.tier === 'Portfolio').map(renderLevelCard)}
            </div>
          </TabsContent>

          <TabsContent value="institutional" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Institutional Tier (Levels 21-30)</h2>
              <p className="text-lg text-muted-foreground">
                Master institutional-grade capital management and enterprise risk frameworks.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningLevels.filter(level => level.tier === 'Institutional').slice(0, 1).map(renderLevelCard)}
            </div>
            <div className="text-center py-8">
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                Additional levels coming soon
              </Badge>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Capital Management Progress</h2>
              <p className="text-lg text-muted-foreground">
                Track your advancement through the complete Capital Management curriculum.
              </p>
            </div>

            {/* Overall Progress */}
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

            {/* Capital Management Achievements */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-secondary" />
                  <span>Capital Management Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">Risk Aware</div>
                    <div className="text-xs text-muted-foreground">Complete Level 1</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <Calculator className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <div className="text-sm font-medium">Position Sizer</div>
                    <div className="text-xs text-muted-foreground">Complete Level 2</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">Stop Loss Master</div>
                    <div className="text-xs text-muted-foreground">Complete Level 3</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <Target className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <div className="text-sm font-medium">R-Multiple Tracker</div>
                    <div className="text-xs text-muted-foreground">Complete Level 4</div>
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

export default CapitalManagementLearning;