import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Trophy, 
  Star, 
  Lock, 
  CheckCircle, 
  PlayCircle,
  Award,
  Target,
  Brain,
  TrendingUp,
  DollarSign,
  Globe,
  ArrowLeft,
  LogOut,
  Zap,
  Clock,
  Users,
  BarChart3,
  Shield,
  Lightbulb,
  Activity,
  Calculator,
  Eye,
  FileText,
  MessageCircle,
  Coins
} from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'quiz' | 'assessment' | 'project';
  xpReward: number;
  duration: string;
  completed: boolean;
  locked: boolean;
  content?: string;
}

interface LearningLevel {
  level: number;
  title: string;
  description: string;
  tier: 'Beginner' | 'Intermediate' | 'Professional';
  modules: LearningModule[];
  totalXP: number;
  unlockRequirement: number;
  completed: boolean;
  locked: boolean;
}

interface TradingMasteryLearningProps {
  onBack: () => void;
  onLogout: () => void;
}

export const TradingMasteryLearning: React.FC<TradingMasteryLearningProps> = ({ onBack, onLogout }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Complete learning path data with all 30 levels
  const learningLevels: LearningLevel[] = [
    // TIER 1: BEGINNER (Levels 1-10)
    {
      level: 1,
      title: "Introduction to Trading & Markets",
      description: "Discover what trading is and explore different financial markets",
      tier: "Beginner",
      unlockRequirement: 0,
      completed: false,
      locked: false,
      totalXP: 50,
      modules: [
        {
          id: "1-1",
          title: "Welcome to Trading",
          description: "Understanding financial markets and how traders profit from price movements",
          type: "lesson",
          xpReward: 30,
          duration: "15 min",
          completed: false,
          locked: false,
          content: "Trading is the art and science of buying and selling financial instruments to profit from price movements. Think of it like a global marketplace where currencies, stocks, commodities, and other assets are constantly changing hands..."
        },
        {
          id: "1-2",
          title: "Market Types Quiz",
          description: "Test your understanding of different financial markets",
          type: "quiz",
          xpReward: 20,
          duration: "5 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 2,
      title: "Key Trading Terminology",
      description: "Master essential trading terms and definitions",
      tier: "Beginner",
      unlockRequirement: 50,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "2-1",
          title: "Trading Vocabulary",
          description: "Learn pips, lots, leverage, margin, and order types",
          type: "lesson",
          xpReward: 50,
          duration: "20 min",
          completed: false,
          locked: false,
          content: "In forex trading, a 'pip' is the smallest price movement. For most currency pairs, 1 pip = 0.0001. A 'standard lot' equals 100,000 units of the base currency..."
        },
        {
          id: "2-2",
          title: "Terminology Quiz",
          description: "Match terms with their definitions",
          type: "quiz",
          xpReward: 25,
          duration: "10 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 3,
      title: "Basics of Price Charts",
      description: "Learn to read and interpret price charts",
      tier: "Beginner",
      unlockRequirement: 125,
      completed: false,
      locked: true,
      totalXP: 50,
      modules: [
        {
          id: "3-1",
          title: "Understanding Candlesticks",
          description: "Master candlestick charts and basic patterns",
          type: "lesson",
          xpReward: 50,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "Candlestick charts show four key prices: Open, High, Low, and Close (OHLC). Each candlestick represents a specific time period..."
        }
      ]
    },
    {
      level: 4,
      title: "Identifying Trends",
      description: "Recognize market trends and their significance",
      tier: "Beginner",
      unlockRequirement: 175,
      completed: false,
      locked: true,
      totalXP: 50,
      modules: [
        {
          id: "4-1",
          title: "Trend Analysis",
          description: "Learn to identify uptrends, downtrends, and sideways markets",
          type: "lesson",
          xpReward: 50,
          duration: "20 min",
          completed: false,
          locked: false,
          content: "A trend is the general direction of price movement. An uptrend consists of higher highs and higher lows, while a downtrend shows lower highs and lower lows..."
        }
      ]
    },
    {
      level: 5,
      title: "Support and Resistance Levels",
      description: "Understand key price levels where markets react",
      tier: "Beginner",
      unlockRequirement: 225,
      completed: false,
      locked: true,
      totalXP: 50,
      modules: [
        {
          id: "5-1",
          title: "Support & Resistance",
          description: "Identify and use support and resistance levels",
          type: "lesson",
          xpReward: 50,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "Support is a price level where buying interest emerges, acting like a floor. Resistance is where selling pressure appears, acting like a ceiling..."
        }
      ]
    },
    {
      level: 6,
      title: "Introduction to Technical Indicators",
      description: "Basic overview of technical analysis tools",
      tier: "Beginner",
      unlockRequirement: 275,
      completed: false,
      locked: true,
      totalXP: 50,
      modules: [
        {
          id: "6-1",
          title: "Moving Averages",
          description: "Understanding simple and exponential moving averages",
          type: "lesson",
          xpReward: 50,
          duration: "20 min",
          completed: false,
          locked: false,
          content: "Moving averages smooth out price data to identify trend direction. A 50-day moving average shows the average price over the last 50 periods..."
        }
      ]
    },
    {
      level: 7,
      title: "Risk Management Basics",
      description: "Learn fundamental risk control principles",
      tier: "Beginner",
      unlockRequirement: 325,
      completed: false,
      locked: true,
      totalXP: 50,
      modules: [
        {
          id: "7-1",
          title: "The 1-2% Rule",
          description: "Position sizing and stop-loss fundamentals",
          type: "lesson",
          xpReward: 50,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "Never risk more than 1-2% of your account on a single trade. If you have $10,000, risk only $100-200 per trade. This ensures longevity..."
        }
      ]
    },
    {
      level: 8,
      title: "Psychology 101 - Emotions in Trading",
      description: "Introduction to trading psychology",
      tier: "Beginner",
      unlockRequirement: 375,
      completed: false,
      locked: true,
      totalXP: 50,
      modules: [
        {
          id: "8-1",
          title: "Fear and Greed",
          description: "Understanding emotional pitfalls in trading",
          type: "lesson",
          xpReward: 50,
          duration: "20 min",
          completed: false,
          locked: false,
          content: "Fear and greed are the two primary emotions that destroy trading accounts. Fear causes premature exits, while greed leads to overtrading..."
        }
      ]
    },
    {
      level: 9,
      title: "Introduction to Economic News",
      description: "How economic events impact markets",
      tier: "Beginner",
      unlockRequirement: 425,
      completed: false,
      locked: true,
      totalXP: 50,
      modules: [
        {
          id: "9-1",
          title: "Economic Calendar",
          description: "Understanding major economic indicators",
          type: "lesson",
          xpReward: 50,
          duration: "20 min",
          completed: false,
          locked: false,
          content: "Economic news releases can cause significant market volatility. Key events include interest rate decisions, employment reports, and GDP releases..."
        }
      ]
    },
    {
      level: 10,
      title: "Beginner Tier Assessment",
      description: "Comprehensive evaluation of foundational knowledge",
      tier: "Beginner",
      unlockRequirement: 475,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "10-1",
          title: "Final Beginner Exam",
          description: "Test all concepts learned in levels 1-9",
          type: "assessment",
          xpReward: 100,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "This comprehensive assessment covers terminology, chart reading, trends, support/resistance, basic risk management, and trading psychology..."
        }
      ]
    },

    // TIER 2: INTERMEDIATE (Levels 11-20)
    {
      level: 11,
      title: "Advanced Position Sizing & Money Management",
      description: "Sophisticated risk management techniques",
      tier: "Intermediate",
      unlockRequirement: 575,
      completed: false,
      locked: true,
      totalXP: 60,
      modules: [
        {
          id: "11-1",
          title: "Kelly Criterion & Risk Models",
          description: "Advanced position sizing methods and risk/reward optimization",
          type: "lesson",
          xpReward: 60,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "The Kelly Criterion helps determine optimal position size based on win rate and average win/loss ratio. Formula: f = (bp - q) / b..."
        }
      ]
    },
    {
      level: 12,
      title: "Stop Loss Strategies and Trade Exits",
      description: "Advanced exit strategies and stop placement",
      tier: "Intermediate",
      unlockRequirement: 635,
      completed: false,
      locked: true,
      totalXP: 60,
      modules: [
        {
          id: "12-1",
          title: "ATR-Based Stops & Trailing",
          description: "Dynamic stop-loss placement using volatility",
          type: "lesson",
          xpReward: 60,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "Average True Range (ATR) measures volatility. Set stops at 1.5-2x ATR from entry to account for normal price fluctuations..."
        }
      ]
    },
    {
      level: 13,
      title: "Crafting a Trading Plan & Strategy Basics",
      description: "Develop your personal trading methodology",
      tier: "Intermediate",
      unlockRequirement: 695,
      completed: false,
      locked: true,
      totalXP: 50,
      modules: [
        {
          id: "13-1",
          title: "Building Your Trading Plan",
          description: "Create a comprehensive trading strategy document",
          type: "project",
          xpReward: 50,
          duration: "60 min",
          completed: false,
          locked: false,
          content: "A trading plan includes: risk tolerance, preferred markets, trading hours, entry/exit criteria, position sizing rules, and review schedule..."
        }
      ]
    },
    {
      level: 14,
      title: "Technical Analysis - Chart Patterns & Indicators",
      description: "Advanced pattern recognition and indicator usage",
      tier: "Intermediate",
      unlockRequirement: 745,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "14-1",
          title: "Classic Chart Patterns",
          description: "Head & Shoulders, Double Tops, Triangles, and more",
          type: "lesson",
          xpReward: 50,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "Head and Shoulders pattern signals trend reversal. It consists of three peaks: left shoulder, head (highest), and right shoulder..."
        },
        {
          id: "14-2",
          title: "Pattern Recognition Quiz",
          description: "Identify patterns on real charts",
          type: "quiz",
          xpReward: 20,
          duration: "15 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 15,
      title: "Macroeconomics Fundamentals",
      description: "Understanding economic forces that drive markets",
      tier: "Intermediate",
      unlockRequirement: 815,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "15-1",
          title: "GDP, Inflation & Interest Rates",
          description: "Core economic concepts and their market impact",
          type: "lesson",
          xpReward: 70,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "GDP measures economic output. Rising GDP often strengthens currency. Inflation erodes purchasing power, prompting central bank rate hikes..."
        }
      ]
    },
    {
      level: 16,
      title: "Key Economic Indicators & Liquidity",
      description: "Market-moving events and liquidity concepts",
      tier: "Intermediate",
      unlockRequirement: 885,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "16-1",
          title: "Economic Calendar & Liquidity",
          description: "Major indicators and market liquidity dynamics",
          type: "lesson",
          xpReward: 70,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "Non-Farm Payrolls, CPI, and central bank meetings are high-impact events. Liquidity varies by session: London/NY overlap has highest volume..."
        }
      ]
    },
    {
      level: 17,
      title: "Understanding Market Psychology - Cognitive Biases",
      description: "Identify and overcome psychological trading traps",
      tier: "Intermediate",
      unlockRequirement: 955,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "17-1",
          title: "Common Trading Biases",
          description: "Confirmation bias, overconfidence, loss aversion, and more",
          type: "lesson",
          xpReward: 75,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "Confirmation bias makes us seek information that confirms our existing beliefs. In trading, this leads to ignoring contrary signals..."
        }
      ]
    },
    {
      level: 18,
      title: "Building Discipline and Consistency",
      description: "Develop systematic trading habits",
      tier: "Intermediate",
      unlockRequirement: 1030,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "18-1",
          title: "Trading Discipline Framework",
          description: "Routines, habits, and consistency techniques",
          type: "lesson",
          xpReward: 75,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "Discipline is following your plan even when emotions suggest otherwise. Create pre-market routines, use checklists, and maintain detailed records..."
        }
      ]
    },
    {
      level: 19,
      title: "Resilience & Emotion Management",
      description: "Introduction to the 7 Pillars of Resilience",
      tier: "Intermediate",
      unlockRequirement: 1105,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "19-1",
          title: "Building Trading Resilience",
          description: "Bounce back from losses and maintain emotional control",
          type: "lesson",
          xpReward: 80,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "Resilience is the ability to recover from setbacks. The 7 Pillars include optimism, acceptance, solution-orientation, responsibility, support network, future planning, and self-reflection..."
        }
      ]
    },
    {
      level: 20,
      title: "Intermediate Tier Assessment & Milestone",
      description: "Comprehensive intermediate-level evaluation",
      tier: "Intermediate",
      unlockRequirement: 1185,
      completed: false,
      locked: true,
      totalXP: 150,
      modules: [
        {
          id: "20-1",
          title: "Intermediate Mastery Exam",
          description: "Multi-part assessment covering all intermediate concepts",
          type: "assessment",
          xpReward: 100,
          duration: "60 min",
          completed: false,
          locked: false,
          content: "This comprehensive exam tests technical analysis, risk management, macroeconomics, and psychology through practical scenarios..."
        },
        {
          id: "20-2",
          title: "Trading Plan Presentation",
          description: "Present your complete trading strategy",
          type: "project",
          xpReward: 50,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },

    // TIER 3: PROFESSIONAL (Levels 21-30)
    {
      level: 21,
      title: "Advanced Price Action & Market Structure",
      description: "Institutional-level market analysis",
      tier: "Professional",
      unlockRequirement: 1335,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "21-1",
          title: "Wyckoff Theory & Market Phases",
          description: "Accumulation, distribution, and institutional behavior",
          type: "lesson",
          xpReward: 75,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Wyckoff identified four market phases: Accumulation (smart money buying), Markup (public participation), Distribution (smart money selling), and Markdown..."
        }
      ]
    },
    {
      level: 22,
      title: "Multi-Timeframe & Intermarket Analysis",
      description: "Holistic market analysis across timeframes and assets",
      tier: "Professional",
      unlockRequirement: 1410,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "22-1",
          title: "Correlation Analysis",
          description: "Understanding relationships between different markets",
          type: "lesson",
          xpReward: 75,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "USD/JPY often correlates with US 10-year yields. When yields rise, USD/JPY typically strengthens. Oil prices affect CAD and NOK currencies..."
        }
      ]
    },
    {
      level: 23,
      title: "Strategy Optimization and Backtesting",
      description: "Data-driven strategy development",
      tier: "Professional",
      unlockRequirement: 1485,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "23-1",
          title: "Backtesting Methodology",
          description: "Systematic strategy testing and optimization",
          type: "lesson",
          xpReward: 80,
          duration: "50 min",
          completed: false,
          locked: false,
          content: "Backtesting validates strategy performance using historical data. Include realistic spreads, slippage, and avoid over-optimization (curve fitting)..."
        }
      ]
    },
    {
      level: 24,
      title: "Portfolio Management and Hedging",
      description: "Advanced risk management across multiple positions",
      tier: "Professional",
      unlockRequirement: 1565,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "24-1",
          title: "Portfolio Risk & Correlation",
          description: "Managing multiple positions and correlation risk",
          type: "lesson",
          xpReward: 80,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Avoid taking multiple correlated positions (like EUR/USD long and GBP/USD long) without adjusting position sizes for combined risk..."
        }
      ]
    },
    {
      level: 25,
      title: "Global Macro Analysis - Connecting the Dots",
      description: "Advanced macroeconomic analysis and global market dynamics",
      tier: "Professional",
      unlockRequirement: 1645,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "25-1",
          title: "Yield Curves & Central Bank Policy",
          description: "Advanced macro concepts and policy divergence",
          type: "lesson",
          xpReward: 90,
          duration: "50 min",
          completed: false,
          locked: false,
          content: "Yield curve inversion (short rates > long rates) often signals recession. Central bank policy divergence creates carry trade opportunities..."
        }
      ]
    },
    {
      level: 26,
      title: "Market Liquidity and Microstructure",
      description: "Understanding how markets actually work",
      tier: "Professional",
      unlockRequirement: 1735,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "26-1",
          title: "Order Flow & Market Making",
          description: "Market microstructure and institutional behavior",
          type: "lesson",
          xpReward: 90,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Market makers provide liquidity by quoting bid/ask prices. Order flow imbalances can predict short-term price movements..."
        }
      ]
    },
    {
      level: 27,
      title: "Mastering Trading Psychology - The 7 Pillars of Resilience",
      description: "Complete psychological mastery framework",
      tier: "Professional",
      unlockRequirement: 1825,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "27-1",
          title: "The 7 Pillars Deep Dive",
          description: "Comprehensive resilience training for traders",
          type: "lesson",
          xpReward: 100,
          duration: "60 min",
          completed: false,
          locked: false,
          content: "The 7 Pillars of Resilience: 1) Optimism - maintaining positive outlook, 2) Acceptance - embracing what you cannot control, 3) Solution Orientation - focusing on solutions not problems..."
        }
      ]
    },
    {
      level: 28,
      title: "Peak Performance and Mental Edge",
      description: "Achieving and maintaining peak trading performance",
      tier: "Professional",
      unlockRequirement: 1925,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "28-1",
          title: "Mental Performance Optimization",
          description: "Mindfulness, stress management, and peak performance",
          type: "lesson",
          xpReward: 80,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Peak performance requires physical and mental optimization. Regular exercise, proper sleep, and mindfulness practices enhance decision-making under pressure..."
        }
      ]
    },
    {
      level: 29,
      title: "Professional Trading & Ethics",
      description: "Business aspects and ethical considerations",
      tier: "Professional",
      unlockRequirement: 2005,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "29-1",
          title: "Trading as a Business",
          description: "Professional practices, ethics, and business development",
          type: "lesson",
          xpReward: 80,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Professional trading requires proper record-keeping, tax planning, and ethical practices. Develop your niche and consider mentoring others..."
        }
      ]
    },
    {
      level: 30,
      title: "Final Expert Assessment & Graduation",
      description: "Master-level evaluation and certification",
      tier: "Professional",
      unlockRequirement: 2085,
      completed: false,
      locked: true,
      totalXP: 200,
      modules: [
        {
          id: "30-1",
          title: "Expert Trader Examination",
          description: "Comprehensive master-level assessment",
          type: "assessment",
          xpReward: 150,
          duration: "90 min",
          completed: false,
          locked: false,
          content: "This final examination tests all aspects of trading mastery through complex scenarios requiring technical, fundamental, and psychological expertise..."
        },
        {
          id: "30-2",
          title: "Master Thesis Project",
          description: "Create your comprehensive trading methodology",
          type: "project",
          xpReward: 50,
          duration: "120 min",
          completed: false,
          locked: false
        }
      ]
    }
  ];

  // Update level locks based on user XP
  useEffect(() => {
    const updatedLevels = learningLevels.map(level => ({
      ...level,
      locked: userXP < level.unlockRequirement
    }));
    // This would normally update state, but for demo purposes we'll keep it simple
  }, [userXP]);

  const completeModule = (moduleId: string, xpReward: number) => {
    setUserXP(prev => prev + xpReward);
    // Update module completion status
    // This would normally update the backend
  };

  const getTierProgress = (tier: string) => {
    const tierLevels = learningLevels.filter(level => level.tier === tier);
    const completedLevels = tierLevels.filter(level => level.completed).length;
    return (completedLevels / tierLevels.length) * 100;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-blue-500';
      case 'Professional': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const renderLevelCard = (level: LearningLevel) => {
    const completedModules = level.modules.filter(m => m.completed).length;
    const totalModules = level.modules.length;
    const progress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

    return (
      <Card 
        key={level.level} 
        className={`military-card cursor-pointer transition-all duration-300 ${
          level.locked ? 'opacity-50' : 'hover:border-primary/30'
        }`}
        onClick={() => !level.locked && setCurrentLevel(level.level)}
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

  const renderModuleContent = (module: LearningModule) => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{module.title}</h2>
            <p className="text-muted-foreground">{module.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-primary/10 text-primary">
              <Coins className="w-3 h-3 mr-1" />
              {module.xpReward} XP
            </Badge>
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {module.duration}
            </Badge>
          </div>
        </div>

        <Card className="military-card">
          <CardContent className="p-6">
            {module.type === 'lesson' && (
              <div className="space-y-4">
                <div className="prose prose-invert max-w-none">
                  <p>{module.content}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <Button variant="outline" onClick={() => setSelectedModule(null)}>
                    Back to Level
                  </Button>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => completeModule(module.id, module.xpReward)}
                  >
                    Complete Lesson
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {module.type === 'quiz' && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Quiz Challenge</h3>
                  <p className="text-muted-foreground mb-6">Test your knowledge and earn XP!</p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Quiz
                  </Button>
                </div>
              </div>
            )}

            {module.type === 'assessment' && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Award className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Tier Assessment</h3>
                  <p className="text-muted-foreground mb-6">Comprehensive evaluation of your skills</p>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Begin Assessment
                  </Button>
                </div>
              </div>
            )}

            {module.type === 'project' && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Practical Project</h3>
                  <p className="text-muted-foreground mb-6">Apply your knowledge in a real-world scenario</p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Project
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const currentLevelData = learningLevels.find(l => l.level === currentLevel);

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
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Trading Mastery</h1>
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
        {selectedModule ? (
          renderModuleContent(selectedModule)
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-muted/20">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Learning Path Overview */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  Master Trading Through
                  <span className="block gradient-text">30 Progressive Levels</span>
                </h2>
                <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                  From complete beginner to professional trader. Each level builds upon the previous, 
                  ensuring comprehensive mastery of technical analysis, risk management, psychology, and market fundamentals.
                </p>
              </div>

              {/* Tier Overview Cards */}
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
                        Foundation concepts, basic terminology, chart reading, and introduction to trading psychology.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{getTierProgress('Beginner').toFixed(0)}%</span>
                        </div>
                        <Progress value={getTierProgress('Beginner')} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total XP Available: 575
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
                        Advanced strategies, risk management, macroeconomics, and cognitive bias training.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{getTierProgress('Intermediate').toFixed(0)}%</span>
                        </div>
                        <Progress value={getTierProgress('Intermediate')} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total XP Available: 760
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
                        Master-level concepts, institutional analysis, and complete psychological mastery.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{getTierProgress('Professional').toFixed(0)}%</span>
                        </div>
                        <Progress value={getTierProgress('Professional')} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total XP Available: 850
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Current Level Focus */}
              {currentLevelData && (
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-primary" />
                      <span>Continue Your Journey</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Level {currentLevelData.level}: {currentLevelData.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{currentLevelData.description}</p>
                        <div className="space-y-2">
                          {currentLevelData.modules.map((module, index) => (
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
                          onClick={() => setSelectedModule(currentLevelData.modules[0])}
                        >
                          Continue Learning
                          <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="beginner" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Beginner Tier (Levels 1-10)</h2>
                <p className="text-lg text-muted-foreground">
                  Build your foundation with essential trading concepts and basic market understanding.
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
                  Develop advanced skills in technical analysis, risk management, and trading psychology.
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
                  Master institutional-level analysis and achieve complete psychological mastery.
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
                  Track your advancement through the complete Trading Mastery curriculum.
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

              {/* Achievements */}
              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-secondary" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-sm font-medium">First Steps</div>
                      <div className="text-xs text-muted-foreground">Complete Level 1</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                      <Trophy className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-medium">Beginner Graduate</div>
                      <div className="text-xs text-muted-foreground">Complete Tier 1</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                      <Shield className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-medium">Risk Master</div>
                      <div className="text-xs text-muted-foreground">Master Risk Management</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                      <Brain className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-medium">Psychology Expert</div>
                      <div className="text-xs text-muted-foreground">Complete Level 27</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};