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
  Activity,
  Shield,
  TrendingUp,
  Calculator,
  PieChart,
  Globe,
  Building,
  Briefcase,
  FileText,
  Brain,
  Zap,
  AlertTriangle,
  Eye,
  Settings
} from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'quiz' | 'assessment' | 'project' | 'challenge' | 'reflection';
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

interface CapitalManagementLearningProps {
  onBack: () => void;
  onLogout: () => void;
}

export const CapitalManagementLearning: React.FC<CapitalManagementLearningProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userXP] = useState(0);
  const [userLevel] = useState(1);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  // Complete 30-level Capital Management curriculum
  const learningLevels: LearningLevel[] = [
    // TIER 1: RISK FOUNDATIONS (Levels 1-10)
    {
      level: 1,
      title: "Introduction to Capital Management",
      description: "Understanding the fundamental principles of capital preservation and growth",
      tier: "Beginner",
      unlockRequirement: 0,
      completed: false,
      locked: false,
      totalXP: 50,
      modules: [
        {
          id: "1-1",
          title: "What is Capital Management?",
          description: "Learn the core principles of protecting and growing your trading capital",
          type: "lesson",
          xpReward: 50,
          duration: "20 min",
          completed: false,
          locked: false,
          content: "Capital management is the systematic approach to preserving, protecting, and growing your trading capital. It encompasses risk management, position sizing, portfolio allocation, and long-term wealth building strategies. The primary goal is survival first, growth second. Without proper capital management, even the best trading strategies will eventually fail due to excessive risk-taking or poor money management decisions."
        }
      ]
    },
    {
      level: 2,
      title: "Risk vs. Reward Fundamentals",
      description: "Master the basic relationship between risk and potential returns",
      tier: "Beginner",
      unlockRequirement: 50,
      completed: false,
      locked: true,
      totalXP: 60,
      modules: [
        {
          id: "2-1",
          title: "Understanding Risk-Reward Ratios",
          description: "Learn to calculate and apply risk-reward ratios in trading decisions",
          type: "lesson",
          xpReward: 40,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "Risk-reward ratio is the foundation of profitable trading. A 1:2 ratio means you risk $1 to potentially make $2. This concept helps you maintain profitability even with a lower win rate. For example, with a 1:3 ratio, you only need to be right 25% of the time to break even, and anything above that is profit."
        },
        {
          id: "2-2",
          title: "Risk-Reward Calculator",
          description: "Practice calculating optimal risk-reward ratios for different scenarios",
          type: "challenge",
          xpReward: 20,
          duration: "15 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 3,
      title: "The 1% Rule and Position Sizing",
      description: "Learn the fundamental rule of never risking more than 1% per trade",
      tier: "Beginner",
      unlockRequirement: 110,
      completed: false,
      locked: true,
      totalXP: 65,
      modules: [
        {
          id: "3-1",
          title: "Position Sizing Fundamentals",
          description: "Master the art of determining appropriate trade sizes",
          type: "lesson",
          xpReward: 45,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "The 1% rule states that you should never risk more than 1% of your total capital on a single trade. This ensures longevity in trading. If you have $10,000, you should never risk more than $100 per trade. Position size = (Account Size × Risk %) ÷ (Entry Price - Stop Loss Price)."
        },
        {
          id: "3-2",
          title: "Position Size Calculator",
          description: "Practice calculating position sizes for different account sizes",
          type: "challenge",
          xpReward: 20,
          duration: "20 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 4,
      title: "Stop Loss Strategies",
      description: "Implement effective stop loss techniques to protect capital",
      tier: "Beginner",
      unlockRequirement: 175,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "4-1",
          title: "Types of Stop Losses",
          description: "Learn different stop loss methods and when to use each",
          type: "lesson",
          xpReward: 50,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "Stop losses are your insurance policy in trading. Technical stops are placed beyond support/resistance levels. ATR-based stops use volatility measures. Time-based stops exit after a predetermined period. Percentage stops use fixed percentage levels. Each method has its place depending on market conditions and trading style."
        },
        {
          id: "4-2",
          title: "Stop Loss Placement Quiz",
          description: "Test your knowledge of optimal stop loss placement",
          type: "quiz",
          xpReward: 20,
          duration: "15 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 5,
      title: "Drawdown Management",
      description: "Learn to manage and recover from trading drawdowns",
      tier: "Beginner",
      unlockRequirement: 245,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "5-1",
          title: "Understanding Drawdowns",
          description: "Learn what drawdowns are and how to measure them",
          type: "lesson",
          xpReward: 55,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "Drawdown is the decline from a peak to a trough in your account value. Maximum drawdown is the largest peak-to-trough decline. A 20% drawdown requires a 25% gain to recover. Understanding this mathematics is crucial for capital preservation and psychological preparation."
        },
        {
          id: "5-2",
          title: "Drawdown Recovery Plan",
          description: "Create a personal plan for managing drawdown periods",
          type: "project",
          xpReward: 20,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 6,
      title: "Capital Allocation Basics",
      description: "Learn how to allocate capital across different trading strategies",
      tier: "Beginner",
      unlockRequirement: 320,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "6-1",
          title: "Basic Portfolio Allocation",
          description: "Understand how to divide capital among different approaches",
          type: "lesson",
          xpReward: 60,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "Capital allocation involves dividing your trading capital among different strategies, timeframes, or asset classes. A common approach is 60% for your main strategy, 30% for secondary strategies, and 10% for experimental approaches. This diversification reduces overall portfolio risk while maintaining growth potential."
        },
        {
          id: "6-2",
          title: "Allocation Strategy Design",
          description: "Design your personal capital allocation strategy",
          type: "project",
          xpReward: 20,
          duration: "20 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 7,
      title: "Money Management Psychology",
      description: "Understand the psychological aspects of managing money",
      tier: "Beginner",
      unlockRequirement: 400,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "7-1",
          title: "Emotional Relationship with Money",
          description: "Explore your psychological relationship with money and risk",
          type: "lesson",
          xpReward: 65,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "Your relationship with money affects every trading decision. Fear of loss can lead to premature exits, while greed can cause position sizing errors. Understanding your money psychology helps you make rational decisions. Common biases include loss aversion, where losses feel twice as painful as equivalent gains."
        },
        {
          id: "7-2",
          title: "Money Psychology Assessment",
          description: "Assess your personal money management psychology",
          type: "reflection",
          xpReward: 20,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 8,
      title: "Performance Metrics",
      description: "Learn to measure and track capital management performance",
      tier: "Beginner",
      unlockRequirement: 485,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "8-1",
          title: "Key Performance Indicators",
          description: "Master the essential metrics for evaluating performance",
          type: "lesson",
          xpReward: 70,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "Essential performance metrics include: Sharpe Ratio (risk-adjusted returns), Maximum Drawdown, Win Rate, Average Win/Loss, Profit Factor, and Return on Investment. These metrics help you evaluate not just profitability, but the quality and sustainability of your returns."
        },
        {
          id: "8-2",
          title: "Performance Tracking Setup",
          description: "Set up your personal performance tracking system",
          type: "project",
          xpReward: 20,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 9,
      title: "Risk Budgeting",
      description: "Learn to allocate risk across your trading portfolio",
      tier: "Beginner",
      unlockRequirement: 575,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "9-1",
          title: "Risk Budget Allocation",
          description: "Understand how to distribute risk across different trades and strategies",
          type: "lesson",
          xpReward: 75,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Risk budgeting involves allocating your total acceptable risk across different trades, strategies, and time periods. If you're willing to risk 2% of your account per day, you might allocate 1% to your main strategy, 0.5% to secondary strategies, and keep 0.5% in reserve for exceptional opportunities."
        },
        {
          id: "9-2",
          title: "Risk Budget Calculator",
          description: "Create your personal risk budget allocation system",
          type: "challenge",
          xpReward: 20,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 10,
      title: "Risk Foundations Assessment",
      description: "Comprehensive evaluation of risk management fundamentals",
      tier: "Beginner",
      unlockRequirement: 670,
      completed: false,
      locked: true,
      totalXP: 150,
      modules: [
        {
          id: "10-1",
          title: "Risk Management Mastery Exam",
          description: "Comprehensive test of all risk management concepts learned",
          type: "assessment",
          xpReward: 100,
          duration: "60 min",
          completed: false,
          locked: false,
          content: "This comprehensive assessment covers position sizing, risk-reward ratios, stop loss strategies, drawdown management, and performance metrics. You'll analyze real trading scenarios and demonstrate your ability to make sound capital management decisions."
        },
        {
          id: "10-2",
          title: "Personal Risk Management Plan",
          description: "Create your comprehensive risk management framework",
          type: "project",
          xpReward: 50,
          duration: "45 min",
          completed: false,
          locked: false
        }
      ]
    },

    // TIER 2: PORTFOLIO MANAGEMENT (Levels 11-20)
    {
      level: 11,
      title: "Advanced Position Sizing Models",
      description: "Master sophisticated position sizing techniques beyond the 1% rule",
      tier: "Intermediate",
      unlockRequirement: 820,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "11-1",
          title: "Kelly Criterion and Optimal F",
          description: "Learn advanced mathematical models for position sizing",
          type: "lesson",
          xpReward: 80,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "The Kelly Criterion calculates the optimal position size based on win rate and average win/loss ratio. Formula: f = (bp - q) / b, where b is odds, p is win probability, q is loss probability. While theoretically optimal, it often suggests position sizes too large for practical trading, so fractional Kelly (25-50% of Kelly) is commonly used."
        },
        {
          id: "11-2",
          title: "Kelly Calculator Implementation",
          description: "Build and test Kelly Criterion calculations",
          type: "challenge",
          xpReward: 20,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 12,
      title: "Portfolio Correlation Analysis",
      description: "Understand how different positions interact within your portfolio",
      tier: "Intermediate",
      unlockRequirement: 920,
      completed: false,
      locked: true,
      totalXP: 105,
      modules: [
        {
          id: "12-1",
          title: "Correlation and Diversification",
          description: "Learn how correlation affects portfolio risk and returns",
          type: "lesson",
          xpReward: 85,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Correlation measures how similarly two assets move. Perfect positive correlation (+1) means assets move identically, while perfect negative correlation (-1) means they move in opposite directions. Understanding correlation helps you avoid concentration risk and build truly diversified portfolios."
        },
        {
          id: "12-2",
          title: "Correlation Analysis Project",
          description: "Analyze correlations in your trading portfolio",
          type: "project",
          xpReward: 20,
          duration: "35 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 13,
      title: "Volatility-Based Position Sizing",
      description: "Adjust position sizes based on market volatility conditions",
      tier: "Intermediate",
      unlockRequirement: 1025,
      completed: false,
      locked: true,
      totalXP: 110,
      modules: [
        {
          id: "13-1",
          title: "ATR-Based Position Sizing",
          description: "Use Average True Range to adjust for volatility",
          type: "lesson",
          xpReward: 90,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "Average True Range (ATR) measures volatility. In high volatility periods, you should reduce position sizes to maintain consistent dollar risk. In low volatility, you can increase sizes. Formula: Position Size = Risk Amount / (ATR × Multiplier), where multiplier is typically 1.5-2.0."
        },
        {
          id: "13-2",
          title: "Volatility Adjustment Calculator",
          description: "Build a volatility-adjusted position sizing system",
          type: "challenge",
          xpReward: 20,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 14,
      title: "Multi-Asset Portfolio Construction",
      description: "Build portfolios across different asset classes and markets",
      tier: "Intermediate",
      unlockRequirement: 1135,
      completed: false,
      locked: true,
      totalXP: 115,
      modules: [
        {
          id: "14-1",
          title: "Asset Class Diversification",
          description: "Learn to construct portfolios across stocks, forex, commodities, and bonds",
          type: "lesson",
          xpReward: 95,
          duration: "50 min",
          completed: false,
          locked: false,
          content: "Multi-asset portfolios reduce risk through diversification across asset classes that respond differently to economic conditions. Stocks may decline during recessions while bonds rally. Commodities often perform well during inflation while stocks struggle. Understanding these relationships helps build robust portfolios."
        },
        {
          id: "14-2",
          title: "Multi-Asset Portfolio Design",
          description: "Design your own multi-asset trading portfolio",
          type: "project",
          xpReward: 20,
          duration: "40 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 15,
      title: "Dynamic Risk Management",
      description: "Adjust risk parameters based on market conditions and performance",
      tier: "Intermediate",
      unlockRequirement: 1250,
      completed: false,
      locked: true,
      totalXP: 120,
      modules: [
        {
          id: "15-1",
          title: "Adaptive Risk Systems",
          description: "Learn to adjust risk based on market regime and personal performance",
          type: "lesson",
          xpReward: 100,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Dynamic risk management involves adjusting your risk parameters based on changing conditions. During winning streaks, you might gradually increase position sizes. During drawdowns, you reduce risk. Market volatility, your confidence level, and portfolio performance all factor into dynamic risk adjustments."
        },
        {
          id: "15-2",
          title: "Dynamic Risk Framework",
          description: "Create your adaptive risk management system",
          type: "project",
          xpReward: 20,
          duration: "35 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 16,
      title: "Leverage and Margin Management",
      description: "Master the safe and effective use of leverage in trading",
      tier: "Intermediate",
      unlockRequirement: 1370,
      completed: false,
      locked: true,
      totalXP: 125,
      modules: [
        {
          id: "16-1",
          title: "Understanding Leverage Risks",
          description: "Learn the mathematics and psychology of leverage",
          type: "lesson",
          xpReward: 105,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Leverage amplifies both gains and losses. 10:1 leverage means a 10% adverse move wipes out your capital. Effective leverage = (Position Size × Price) / Account Equity. Many traders fail because they confuse available leverage with safe leverage. Safe leverage rarely exceeds 3:1 for most retail traders."
        },
        {
          id: "16-2",
          title: "Leverage Safety Calculator",
          description: "Build tools to monitor and control leverage usage",
          type: "challenge",
          xpReward: 20,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 17,
      title: "Performance Attribution Analysis",
      description: "Analyze what drives your portfolio's performance",
      tier: "Intermediate",
      unlockRequirement: 1495,
      completed: false,
      locked: true,
      totalXP: 130,
      modules: [
        {
          id: "17-1",
          title: "Breaking Down Performance Sources",
          description: "Learn to identify what contributes to your returns",
          type: "lesson",
          xpReward: 110,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Performance attribution breaks down returns into components: asset allocation, security selection, timing, and interaction effects. This analysis helps you understand whether your profits come from good stock picking, market timing, or simply being in the right asset class at the right time."
        },
        {
          id: "17-2",
          title: "Performance Attribution Report",
          description: "Analyze your own trading performance sources",
          type: "project",
          xpReward: 20,
          duration: "40 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 18,
      title: "Stress Testing and Scenario Analysis",
      description: "Test your portfolio against extreme market conditions",
      tier: "Intermediate",
      unlockRequirement: 1625,
      completed: false,
      locked: true,
      totalXP: 135,
      modules: [
        {
          id: "18-1",
          title: "Portfolio Stress Testing",
          description: "Learn to test portfolios against historical crisis scenarios",
          type: "lesson",
          xpReward: 115,
          duration: "50 min",
          completed: false,
          locked: false,
          content: "Stress testing involves simulating how your portfolio would perform during extreme market events like the 2008 financial crisis or COVID-19 crash. This helps identify vulnerabilities and adjust position sizes or correlations before real crises hit."
        },
        {
          id: "18-2",
          title: "Stress Test Implementation",
          description: "Conduct stress tests on your trading portfolio",
          type: "challenge",
          xpReward: 20,
          duration: "45 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 19,
      title: "Capital Growth Strategies",
      description: "Learn systematic approaches to growing your trading capital",
      tier: "Intermediate",
      unlockRequirement: 1760,
      completed: false,
      locked: true,
      totalXP: 140,
      modules: [
        {
          id: "19-1",
          title: "Compounding and Reinvestment",
          description: "Master the mathematics and psychology of compound growth",
          type: "lesson",
          xpReward: 120,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Compound growth is the eighth wonder of the world. A 20% annual return doubles your money every 3.6 years. However, the key is consistency and avoiding large drawdowns. A 50% loss requires a 100% gain to recover, destroying years of compounding."
        },
        {
          id: "19-2",
          title: "Growth Strategy Design",
          description: "Create your systematic capital growth plan",
          type: "project",
          xpReward: 20,
          duration: "35 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 20,
      title: "Portfolio Management Assessment",
      description: "Comprehensive evaluation of portfolio management skills",
      tier: "Intermediate",
      unlockRequirement: 1900,
      completed: false,
      locked: true,
      totalXP: 200,
      modules: [
        {
          id: "20-1",
          title: "Portfolio Management Mastery Exam",
          description: "Advanced assessment of portfolio construction and management",
          type: "assessment",
          xpReward: 150,
          duration: "90 min",
          completed: false,
          locked: false,
          content: "This comprehensive exam tests your ability to construct diversified portfolios, manage correlation risk, implement dynamic risk management, and analyze performance attribution. You'll work through complex scenarios requiring integration of all portfolio management concepts."
        },
        {
          id: "20-2",
          title: "Master Portfolio Strategy",
          description: "Design your complete portfolio management framework",
          type: "project",
          xpReward: 50,
          duration: "60 min",
          completed: false,
          locked: false
        }
      ]
    },

    // TIER 3: INSTITUTIONAL SYSTEMS (Levels 21-30)
    {
      level: 21,
      title: "Institutional Risk Management",
      description: "Learn risk management techniques used by professional institutions",
      tier: "Professional",
      unlockRequirement: 2100,
      completed: false,
      locked: true,
      totalXP: 150,
      modules: [
        {
          id: "21-1",
          title: "Value at Risk (VaR) Models",
          description: "Master institutional risk measurement techniques",
          type: "lesson",
          xpReward: 130,
          duration: "60 min",
          completed: false,
          locked: false,
          content: "Value at Risk (VaR) estimates the maximum loss over a specific time period at a given confidence level. A 1-day 95% VaR of $10,000 means there's a 5% chance of losing more than $10,000 in one day. Institutions use VaR for risk budgeting, regulatory compliance, and performance evaluation."
        },
        {
          id: "21-2",
          title: "VaR Implementation Project",
          description: "Build and implement VaR models for your portfolio",
          type: "project",
          xpReward: 20,
          duration: "45 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 22,
      title: "Alternative Risk Measures",
      description: "Explore advanced risk metrics beyond traditional measures",
      tier: "Professional",
      unlockRequirement: 2250,
      completed: false,
      locked: true,
      totalXP: 155,
      modules: [
        {
          id: "22-1",
          title: "Expected Shortfall and Tail Risk",
          description: "Learn to measure and manage extreme tail risks",
          type: "lesson",
          xpReward: 135,
          duration: "55 min",
          completed: false,
          locked: false,
          content: "Expected Shortfall (ES) measures the average loss beyond the VaR threshold. While VaR tells you the minimum loss in the worst 5% of cases, ES tells you the average loss in those worst cases. ES is more sensitive to tail risk and provides better information for extreme scenarios."
        },
        {
          id: "22-2",
          title: "Tail Risk Analysis",
          description: "Analyze tail risks in your trading strategies",
          type: "challenge",
          xpReward: 20,
          duration: "40 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 23,
      title: "Derivatives for Risk Management",
      description: "Use options and futures for portfolio hedging and risk control",
      tier: "Professional",
      unlockRequirement: 2405,
      completed: false,
      locked: true,
      totalXP: 160,
      modules: [
        {
          id: "23-1",
          title: "Hedging with Options and Futures",
          description: "Learn to use derivatives for portfolio protection",
          type: "lesson",
          xpReward: 140,
          duration: "65 min",
          completed: false,
          locked: false,
          content: "Derivatives can provide portfolio insurance and risk management. Put options protect against downside risk, while futures can hedge currency or commodity exposure. Understanding the Greeks (Delta, Gamma, Theta, Vega) is essential for effective options-based risk management."
        },
        {
          id: "23-2",
          title: "Hedging Strategy Design",
          description: "Design derivative-based hedging strategies",
          type: "project",
          xpReward: 20,
          duration: "50 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 24,
      title: "Liquidity Risk Management",
      description: "Understand and manage liquidity risks in your portfolio",
      tier: "Professional",
      unlockRequirement: 2565,
      completed: false,
      locked: true,
      totalXP: 165,
      modules: [
        {
          id: "24-1",
          title: "Liquidity Risk Assessment",
          description: "Learn to measure and manage liquidity risks",
          type: "lesson",
          xpReward: 145,
          duration: "50 min",
          completed: false,
          locked: false,
          content: "Liquidity risk is the risk that you cannot exit positions quickly without significant price impact. This risk increases during market stress when bid-ask spreads widen and market depth decreases. Effective liquidity management involves position sizing based on average daily volume and maintaining cash reserves."
        },
        {
          id: "24-2",
          title: "Liquidity Assessment Framework",
          description: "Build a system to monitor portfolio liquidity",
          type: "challenge",
          xpReward: 20,
          duration: "35 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 25,
      title: "Global Macro Risk Management",
      description: "Manage risks across global markets and currencies",
      tier: "Professional",
      unlockRequirement: 2730,
      completed: false,
      locked: true,
      totalXP: 170,
      modules: [
        {
          id: "25-1",
          title: "Currency and Country Risk",
          description: "Understand and manage global macro risks",
          type: "lesson",
          xpReward: 150,
          duration: "60 min",
          completed: false,
          locked: false,
          content: "Global trading involves currency risk, political risk, and regulatory risk. Currency hedging can eliminate FX exposure, while country risk assessment helps avoid markets with high political instability. Understanding central bank policies and their impact on different asset classes is crucial for global portfolio management."
        },
        {
          id: "25-2",
          title: "Global Risk Framework",
          description: "Design a comprehensive global risk management system",
          type: "project",
          xpReward: 20,
          duration: "55 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 26,
      title: "Quantitative Risk Models",
      description: "Implement sophisticated quantitative risk management models",
      tier: "Professional",
      unlockRequirement: 2900,
      completed: false,
      locked: true,
      totalXP: 175,
      modules: [
        {
          id: "26-1",
          title: "Factor Models and Risk Attribution",
          description: "Use factor models to understand and manage portfolio risks",
          type: "lesson",
          xpReward: 155,
          duration: "70 min",
          completed: false,
          locked: false,
          content: "Factor models decompose portfolio returns into systematic factors (market, size, value, momentum) and idiosyncratic risks. This helps identify risk concentrations and optimize diversification. The Fama-French three-factor model and its extensions are widely used in institutional risk management."
        },
        {
          id: "26-2",
          title: "Factor Model Implementation",
          description: "Build and apply factor models to your portfolio",
          type: "challenge",
          xpReward: 20,
          duration: "60 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 27,
      title: "Regulatory Capital Requirements",
      description: "Understand regulatory frameworks and capital adequacy requirements",
      tier: "Professional",
      unlockRequirement: 3075,
      completed: false,
      locked: true,
      totalXP: 180,
      modules: [
        {
          id: "27-1",
          title: "Basel III and Capital Adequacy",
          description: "Learn regulatory capital requirements and their implications",
          type: "lesson",
          xpReward: 160,
          duration: "55 min",
          completed: false,
          locked: false,
          content: "Regulatory capital requirements ensure financial institutions maintain adequate capital buffers. Basel III introduced stricter capital ratios, liquidity requirements, and leverage limits. Understanding these frameworks helps in designing compliant risk management systems and understanding institutional behavior."
        },
        {
          id: "27-2",
          title: "Regulatory Compliance Assessment",
          description: "Evaluate regulatory implications for your trading business",
          type: "reflection",
          xpReward: 20,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 28,
      title: "Advanced Portfolio Optimization",
      description: "Master sophisticated portfolio optimization techniques",
      tier: "Professional",
      unlockRequirement: 3255,
      completed: false,
      locked: true,
      totalXP: 185,
      modules: [
        {
          id: "28-1",
          title: "Modern Portfolio Theory and Beyond",
          description: "Apply advanced optimization techniques to portfolio construction",
          type: "lesson",
          xpReward: 165,
          duration: "75 min",
          completed: false,
          locked: false,
          content: "Modern Portfolio Theory optimizes portfolios based on expected returns, volatilities, and correlations. However, real-world applications require modifications for non-normal distributions, time-varying parameters, and transaction costs. Black-Litterman and robust optimization techniques address these limitations."
        },
        {
          id: "28-2",
          title: "Portfolio Optimization Engine",
          description: "Build an advanced portfolio optimization system",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 29,
      title: "Risk Technology and Systems",
      description: "Implement technology solutions for risk management",
      tier: "Professional",
      unlockRequirement: 3440,
      completed: false,
      locked: true,
      totalXP: 190,
      modules: [
        {
          id: "29-1",
          title: "Risk Management Systems Architecture",
          description: "Design and implement comprehensive risk management technology",
          type: "lesson",
          xpReward: 170,
          duration: "60 min",
          completed: false,
          locked: false,
          content: "Modern risk management requires sophisticated technology infrastructure. Real-time position monitoring, automated risk alerts, and integrated reporting systems are essential. Cloud-based solutions, APIs, and machine learning are transforming institutional risk management capabilities."
        },
        {
          id: "29-2",
          title: "Risk System Design Project",
          description: "Design a comprehensive risk management technology solution",
          type: "project",
          xpReward: 20,
          duration: "80 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 30,
      title: "Capital Management Mastery",
      description: "Final assessment and certification in capital management",
      tier: "Professional",
      unlockRequirement: 3630,
      completed: false,
      locked: true,
      totalXP: 250,
      modules: [
        {
          id: "30-1",
          title: "Master Capital Manager Examination",
          description: "Comprehensive final assessment of all capital management skills",
          type: "assessment",
          xpReward: 200,
          duration: "120 min",
          completed: false,
          locked: false,
          content: "This final examination tests your mastery of all capital management concepts from basic risk management to institutional-level portfolio optimization. You'll design complete risk management frameworks, analyze complex scenarios, and demonstrate your ability to manage capital like a professional institution."
        },
        {
          id: "30-2",
          title: "Capital Management Thesis",
          description: "Create your comprehensive capital management philosophy and framework",
          type: "project",
          xpReward: 50,
          duration: "90 min",
          completed: false,
          locked: false
        }
      ]
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-blue-500';
      case 'Professional': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTierProgress = (tier: string) => {
    const tierLevels = learningLevels.filter(level => level.tier === tier);
    const completedLevels = tierLevels.filter(level => level.completed).length;
    return tierLevels.length > 0 ? (completedLevels / tierLevels.length) * 100 : 0;
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
        onClick={() => !level.locked && setSelectedModule(level.modules[0])}
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
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Complete Lesson
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {(module.type === 'quiz' || module.type === 'challenge') && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {module.type === 'quiz' ? 'Knowledge Challenge' : 'Practical Challenge'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {module.type === 'quiz' 
                      ? 'Test your understanding and earn XP!' 
                      : 'Apply your knowledge in a practical exercise!'
                    }
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start {module.type === 'quiz' ? 'Quiz' : 'Challenge'}
                  </Button>
                </div>
              </div>
            )}

            {module.type === 'assessment' && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Award className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Comprehensive Assessment</h3>
                  <p className="text-muted-foreground mb-6">
                    Demonstrate your mastery of all concepts in this tier
                  </p>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Begin Assessment
                  </Button>
                </div>
              </div>
            )}

            {(module.type === 'project' || module.type === 'reflection') && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {module.type === 'project' ? 'Practical Project' : 'Reflection Exercise'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {module.type === 'project' 
                      ? 'Apply your knowledge in a comprehensive project'
                      : 'Reflect on your learning and personal development'
                    }
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start {module.type === 'project' ? 'Project' : 'Reflection'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
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
        {selectedModule ? (
          renderModuleContent(selectedModule)
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-muted/20">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="beginner">Risk Foundations</TabsTrigger>
              <TabsTrigger value="intermediate">Portfolio Mgmt</TabsTrigger>
              <TabsTrigger value="professional">Institutional</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  Master Capital Management Through
                  <span className="block gradient-text">30 Progressive Levels</span>
                </h2>
                <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                  Transform from basic risk management to institutional-level capital allocation. 
                  Learn to protect, grow, and optimize capital like professional money managers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <Shield className="w-5 h-5 text-green-500" />
                      </div>
                      <span>Risk Foundations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-green-500">Levels 1-10</div>
                      <p className="text-sm text-muted-foreground">
                        Master fundamental risk management and capital protection principles.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{getTierProgress('Beginner').toFixed(0)}%</span>
                        </div>
                        <Progress value={getTierProgress('Beginner')} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total XP Available: 820
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
                      <span>Portfolio Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-blue-500">Levels 11-20</div>
                      <p className="text-sm text-muted-foreground">
                        Advanced portfolio construction and multi-asset management.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{getTierProgress('Intermediate').toFixed(0)}%</span>
                        </div>
                        <Progress value={getTierProgress('Intermediate')} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total XP Available: 1,280
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <Building className="w-5 h-5 text-purple-500" />
                      </div>
                      <span>Institutional Systems</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-purple-500">Levels 21-30</div>
                      <p className="text-sm text-muted-foreground">
                        Professional-grade risk systems and regulatory frameworks.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{getTierProgress('Professional').toFixed(0)}%</span>
                        </div>
                        <Progress value={getTierProgress('Professional')} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total XP Available: 1,730
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="beginner" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Risk Foundations (Levels 1-10)</h2>
                <p className="text-lg text-muted-foreground">
                  Master fundamental risk management and capital protection principles.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningLevels.filter(level => level.tier === 'Beginner').map(renderLevelCard)}
              </div>
            </TabsContent>

            <TabsContent value="intermediate" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Portfolio Management (Levels 11-20)</h2>
                <p className="text-lg text-muted-foreground">
                  Advanced portfolio construction and multi-asset management techniques.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningLevels.filter(level => level.tier === 'Intermediate').map(renderLevelCard)}
              </div>
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Institutional Systems (Levels 21-30)</h2>
                <p className="text-lg text-muted-foreground">
                  Professional-grade risk systems and regulatory frameworks.
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
                      <div className="text-sm font-medium">Risk Aware</div>
                      <div className="text-xs text-muted-foreground">Complete Level 1</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                      <Shield className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-medium">Capital Guardian</div>
                      <div className="text-xs text-muted-foreground">Complete Tier 1</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                      <PieChart className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-medium">Portfolio Master</div>
                      <div className="text-xs text-muted-foreground">Complete Tier 2</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                      <Building className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-medium">Institutional Pro</div>
                      <div className="text-xs text-muted-foreground">Complete Level 30</div>
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