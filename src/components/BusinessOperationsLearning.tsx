import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  ArrowLeft, 
  LogOut, 
  Target, 
  BarChart3, 
  FileText, 
  Users, 
  DollarSign,
  Settings,
  Award,
  CheckCircle,
  Lock,
  PlayCircle,
  BookOpen,
  Trophy,
  Star,
  Clock,
  Zap,
  Brain,
  Activity,
  TrendingUp,
  Shield,
  Briefcase,
  Calculator,
  PieChart,
  LineChart,
  Coins
} from 'lucide-react';

interface BusinessOperationsLearningProps {
  onBack: () => void;
  onLogout: () => void;
}

export const BusinessOperationsLearning: React.FC<BusinessOperationsLearningProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userLevel, setUserLevel] = useState(5);
  const [userXP, setUserXP] = useState(635);

  // Business Operations Learning Path (30 levels)
  const learningLevels = [
    // TIER 1: FOUNDATION (Levels 1-10)
    {
      level: 1,
      title: "Trading as a Business Mindset",
      description: "Shift from hobby trading to professional business operations",
      tier: "Foundation",
      unlockRequirement: 0,
      completed: true,
      locked: false,
      totalXP: 50,
      modules: [
        {
          id: "bo-1-1",
          title: "Business vs Hobby Trading",
          description: "Understanding the fundamental differences between casual and professional trading",
          type: "lesson",
          xpReward: 30,
          duration: "20 min",
          completed: true,
          content: "Professional trading requires treating your trading activities as a legitimate business enterprise. This means systematic record-keeping, tax planning, performance measurement, and operational procedures..."
        },
        {
          id: "bo-1-2",
          title: "Business Structure Quiz",
          description: "Test your understanding of trading business fundamentals",
          type: "quiz",
          xpReward: 20,
          duration: "10 min",
          completed: true
        }
      ]
    },
    {
      level: 2,
      title: "Record Keeping & Documentation Systems",
      description: "Establish comprehensive documentation and record-keeping protocols",
      tier: "Foundation",
      unlockRequirement: 50,
      completed: true,
      locked: false,
      totalXP: 60,
      modules: [
        {
          id: "bo-2-1",
          title: "Trading Journal Systems",
          description: "Design and implement comprehensive trading documentation",
          type: "lesson",
          xpReward: 40,
          duration: "25 min",
          completed: true,
          content: "A professional trading journal goes beyond simple trade logs. Include market conditions, emotional state, decision-making process, and post-trade analysis..."
        },
        {
          id: "bo-2-2",
          title: "Documentation Project",
          description: "Create your personal documentation system",
          type: "project",
          xpReward: 20,
          duration: "45 min",
          completed: true
        }
      ]
    },
    {
      level: 3,
      title: "Performance Measurement & KPIs",
      description: "Develop key performance indicators and measurement systems",
      tier: "Foundation",
      unlockRequirement: 110,
      completed: true,
      locked: false,
      totalXP: 65,
      modules: [
        {
          id: "bo-3-1",
          title: "Trading KPIs and Metrics",
          description: "Essential performance indicators for trading businesses",
          type: "lesson",
          xpReward: 45,
          duration: "30 min",
          completed: true,
          content: "Key Performance Indicators for trading include: Sharpe ratio, maximum drawdown, win rate, average R-multiple, profit factor, and consistency metrics..."
        },
        {
          id: "bo-3-2",
          title: "KPI Implementation",
          description: "Set up your personal KPI tracking system",
          type: "project",
          xpReward: 20,
          duration: "40 min",
          completed: true
        }
      ]
    },
    {
      level: 4,
      title: "Goal Setting & Strategic Planning",
      description: "Create systematic goal-setting and strategic planning frameworks",
      tier: "Foundation",
      unlockRequirement: 175,
      completed: true,
      locked: false,
      totalXP: 70,
      modules: [
        {
          id: "bo-4-1",
          title: "SMART Goals for Traders",
          description: "Specific, Measurable, Achievable, Relevant, Time-bound goal setting",
          type: "lesson",
          xpReward: 50,
          duration: "25 min",
          completed: true,
          content: "SMART goals provide structure for trading development. Example: 'Achieve 15% annual return with maximum 8% drawdown by December 31st through systematic trend-following strategy'..."
        },
        {
          id: "bo-4-2",
          title: "Strategic Planning Workshop",
          description: "Develop your 1-year and 5-year trading business plan",
          type: "project",
          xpReward: 20,
          duration: "60 min",
          completed: true
        }
      ]
    },
    {
      level: 5,
      title: "Standard Operating Procedures (SOPs)",
      description: "Create systematic procedures for all trading activities",
      tier: "Foundation",
      unlockRequirement: 245,
      completed: false,
      locked: false,
      totalXP: 75,
      modules: [
        {
          id: "bo-5-1",
          title: "SOP Development Framework",
          description: "How to create effective standard operating procedures",
          type: "lesson",
          xpReward: 55,
          duration: "35 min",
          completed: false,
          content: "SOPs ensure consistency and reduce decision fatigue. Create procedures for: market analysis, trade entry, position management, exit criteria, and post-trade review..."
        },
        {
          id: "bo-5-2",
          title: "Create Your Trading SOPs",
          description: "Develop comprehensive SOPs for your trading process",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false
        }
      ]
    },
    {
      level: 6,
      title: "Time Management & Productivity",
      description: "Optimize time allocation and productivity systems",
      tier: "Foundation",
      unlockRequirement: 320,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "bo-6-1",
          title: "Trading Schedule Optimization",
          description: "Design efficient daily and weekly trading schedules",
          type: "lesson",
          xpReward: 50,
          duration: "30 min",
          completed: false,
          content: "Effective time management separates professional traders from amateurs. Allocate specific time blocks for: market analysis, trade execution, education, and business development..."
        },
        {
          id: "bo-6-2",
          title: "Productivity Assessment",
          description: "Evaluate and optimize your current productivity systems",
          type: "assessment",
          xpReward: 20,
          duration: "30 min",
          completed: false
        }
      ]
    },
    {
      level: 7,
      title: "Technology Stack & Tools",
      description: "Select and optimize your trading technology infrastructure",
      tier: "Foundation",
      unlockRequirement: 390,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "bo-7-1",
          title: "Trading Technology Audit",
          description: "Evaluate and optimize your trading technology stack",
          type: "lesson",
          xpReward: 55,
          duration: "40 min",
          completed: false,
          content: "Professional traders require reliable technology: multiple monitors, backup internet, professional charting software, news feeds, and execution platforms..."
        },
        {
          id: "bo-7-2",
          title: "Technology Implementation Plan",
          description: "Create your technology upgrade roadmap",
          type: "project",
          xpReward: 20,
          duration: "60 min",
          completed: false
        }
      ]
    },
    {
      level: 8,
      title: "Legal Structure & Compliance",
      description: "Understand legal requirements and business structure options",
      tier: "Foundation",
      unlockRequirement: 465,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "bo-8-1",
          title: "Business Entity Selection",
          description: "LLC, Corporation, or Sole Proprietorship for traders",
          type: "lesson",
          xpReward: 60,
          duration: "35 min",
          completed: false,
          content: "Business structure affects taxes, liability, and growth potential. LLCs offer flexibility and protection, while corporations enable investment and scaling..."
        },
        {
          id: "bo-8-2",
          title: "Compliance Checklist",
          description: "Create your regulatory compliance framework",
          type: "project",
          xpReward: 20,
          duration: "45 min",
          completed: false
        }
      ]
    },
    {
      level: 9,
      title: "Tax Planning & Optimization",
      description: "Develop tax-efficient trading business strategies",
      tier: "Foundation",
      unlockRequirement: 545,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "bo-9-1",
          title: "Trader Tax Strategies",
          description: "Tax optimization techniques for trading businesses",
          type: "lesson",
          xpReward: 65,
          duration: "40 min",
          completed: false,
          content: "Mark-to-market election, business expense deductions, retirement account strategies, and tax-loss harvesting can significantly impact your bottom line..."
        },
        {
          id: "bo-9-2",
          title: "Tax Planning Workshop",
          description: "Develop your annual tax optimization strategy",
          type: "project",
          xpReward: 20,
          duration: "75 min",
          completed: false
        }
      ]
    },
    {
      level: 10,
      title: "Foundation Tier Assessment",
      description: "Comprehensive evaluation of business foundation knowledge",
      tier: "Foundation",
      unlockRequirement: 630,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "bo-10-1",
          title: "Business Foundation Exam",
          description: "Test all foundation concepts and practical application",
          type: "assessment",
          xpReward: 100,
          duration: "60 min",
          completed: false,
          content: "Comprehensive assessment covering business mindset, documentation, KPIs, goal setting, SOPs, productivity, technology, legal structure, and tax planning..."
        }
      ]
    },

    // TIER 2: STRATEGY (Levels 11-20)
    {
      level: 11,
      title: "Business Model Development",
      description: "Design sustainable trading business models",
      tier: "Strategy",
      unlockRequirement: 730,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "bo-11-1",
          title: "Trading Business Models",
          description: "Proprietary trading, fund management, and education models",
          type: "lesson",
          xpReward: 60,
          duration: "45 min",
          completed: false,
          content: "Different business models serve different goals: proprietary trading for personal wealth, fund management for scaling capital, education for recurring revenue..."
        },
        {
          id: "bo-11-2",
          title: "Business Model Canvas",
          description: "Create your trading business model canvas",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false
        }
      ]
    },
    {
      level: 12,
      title: "Revenue Diversification Strategies",
      description: "Develop multiple income streams from trading expertise",
      tier: "Strategy",
      unlockRequirement: 810,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "bo-12-1",
          title: "Income Stream Development",
          description: "Trading, education, consulting, and content monetization",
          type: "lesson",
          xpReward: 65,
          duration: "40 min",
          completed: false,
          content: "Diversified income reduces business risk: trading profits, educational courses, one-on-one coaching, content creation, affiliate marketing, and software development..."
        },
        {
          id: "bo-12-2",
          title: "Revenue Strategy Plan",
          description: "Design your multi-stream revenue strategy",
          type: "project",
          xpReward: 20,
          duration: "75 min",
          completed: false
        }
      ]
    },
    {
      level: 13,
      title: "Brand Building & Personal Marketing",
      description: "Develop your professional trading brand and online presence",
      tier: "Strategy",
      unlockRequirement: 895,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "bo-13-1",
          title: "Professional Brand Development",
          description: "Building credibility and authority in trading markets",
          type: "lesson",
          xpReward: 70,
          duration: "50 min",
          completed: false,
          content: "Your brand represents your expertise and credibility. Consistent content creation, thought leadership, and professional networking build long-term business value..."
        },
        {
          id: "bo-13-2",
          title: "Brand Strategy Implementation",
          description: "Launch your professional trading brand",
          type: "project",
          xpReward: 20,
          duration: "120 min",
          completed: false
        }
      ]
    },
    {
      level: 14,
      title: "Client Acquisition & Relationship Management",
      description: "Systematic approaches to acquiring and managing clients",
      tier: "Strategy",
      unlockRequirement: 985,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "bo-14-1",
          title: "Client Acquisition Systems",
          description: "Systematic approaches to finding and converting prospects",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          content: "Sustainable client acquisition requires systematic processes: content marketing, referral systems, networking strategies, and value demonstration..."
        },
        {
          id: "bo-14-2",
          title: "CRM Implementation",
          description: "Set up client relationship management systems",
          type: "project",
          xpReward: 20,
          duration: "60 min",
          completed: false
        }
      ]
    },
    {
      level: 15,
      title: "Financial Planning & Business Accounting",
      description: "Professional financial management for trading businesses",
      tier: "Strategy",
      unlockRequirement: 1070,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "bo-15-1",
          title: "Business Financial Management",
          description: "Cash flow, budgeting, and financial planning for traders",
          type: "lesson",
          xpReward: 70,
          duration: "50 min",
          completed: false,
          content: "Separate business and personal finances, maintain emergency funds, plan for tax obligations, and track business expenses systematically..."
        },
        {
          id: "bo-15-2",
          title: "Financial Planning Workshop",
          description: "Create comprehensive financial plan for your trading business",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false
        }
      ]
    },
    {
      level: 16,
      title: "Team Building & Delegation",
      description: "Scale operations through effective team building",
      tier: "Strategy",
      unlockRequirement: 1160,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "bo-16-1",
          title: "Building Trading Teams",
          description: "Hiring, training, and managing trading team members",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          content: "Successful trading teams require clear roles, systematic training, performance measurement, and aligned incentives. Start with virtual assistants and analysts..."
        },
        {
          id: "bo-16-2",
          title: "Team Structure Design",
          description: "Design your ideal team structure and hiring plan",
          type: "project",
          xpReward: 20,
          duration: "75 min",
          completed: false
        }
      ]
    },
    {
      level: 17,
      title: "Risk Management Systems",
      description: "Enterprise-level risk management and control systems",
      tier: "Strategy",
      unlockRequirement: 1245,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "bo-17-1",
          title: "Business Risk Management",
          description: "Operational, financial, and strategic risk management",
          type: "lesson",
          xpReward: 70,
          duration: "50 min",
          completed: false,
          content: "Business risk extends beyond trading risk: operational failures, technology breakdowns, regulatory changes, and market access issues require systematic mitigation..."
        },
        {
          id: "bo-17-2",
          title: "Risk Management Framework",
          description: "Implement comprehensive business risk controls",
          type: "project",
          xpReward: 20,
          duration: "80 min",
          completed: false
        }
      ]
    },
    {
      level: 18,
      title: "Technology Infrastructure & Automation",
      description: "Advanced technology systems and automation strategies",
      tier: "Strategy",
      unlockRequirement: 1335,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "bo-18-1",
          title: "Trading Technology Architecture",
          description: "Professional-grade technology infrastructure design",
          type: "lesson",
          xpReward: 75,
          duration: "55 min",
          completed: false,
          content: "Professional infrastructure includes: redundant internet connections, backup power, multiple execution venues, automated reporting, and disaster recovery plans..."
        },
        {
          id: "bo-18-2",
          title: "Automation Implementation",
          description: "Automate routine business processes",
          type: "project",
          xpReward: 20,
          duration: "100 min",
          completed: false
        }
      ]
    },
    {
      level: 19,
      title: "Partnership & Joint Venture Development",
      description: "Strategic partnerships and collaborative business development",
      tier: "Strategy",
      unlockRequirement: 1430,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "bo-19-1",
          title: "Strategic Partnerships",
          description: "Identifying and developing profitable business partnerships",
          type: "lesson",
          xpReward: 70,
          duration: "45 min",
          completed: false,
          content: "Strategic partnerships accelerate growth: technology providers, educational platforms, prop firms, and complementary service providers..."
        },
        {
          id: "bo-19-2",
          title: "Partnership Strategy",
          description: "Develop your partnership and collaboration strategy",
          type: "project",
          xpReward: 20,
          duration: "70 min",
          completed: false
        }
      ]
    },
    {
      level: 20,
      title: "Strategy Tier Assessment & Business Plan",
      description: "Comprehensive business strategy evaluation and planning",
      tier: "Strategy",
      unlockRequirement: 1520,
      completed: false,
      locked: true,
      totalXP: 150,
      modules: [
        {
          id: "bo-20-1",
          title: "Business Strategy Exam",
          description: "Comprehensive assessment of business strategy knowledge",
          type: "assessment",
          xpReward: 100,
          duration: "90 min",
          completed: false,
          content: "Advanced assessment covering business models, revenue diversification, branding, client management, financial planning, team building, and risk management..."
        },
        {
          id: "bo-20-2",
          title: "Complete Business Plan",
          description: "Create comprehensive trading business plan",
          type: "project",
          xpReward: 50,
          duration: "180 min",
          completed: false
        }
      ]
    },

    // TIER 3: SCALING (Levels 21-30)
    {
      level: 21,
      title: "Capital Raising & Investment Strategies",
      description: "Advanced capital acquisition and investment management",
      tier: "Scaling",
      unlockRequirement: 1670,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "bo-21-1",
          title: "Capital Raising Strategies",
          description: "Angel investors, venture capital, and alternative funding",
          type: "lesson",
          xpReward: 80,
          duration: "60 min",
          completed: false,
          content: "Scaling requires capital: personal savings, family offices, angel investors, venture capital, and alternative funding sources each have different requirements and implications..."
        },
        {
          id: "bo-21-2",
          title: "Investment Pitch Development",
          description: "Create compelling investment presentations",
          type: "project",
          xpReward: 20,
          duration: "120 min",
          completed: false
        }
      ]
    },
    {
      level: 22,
      title: "Institutional Client Development",
      description: "Strategies for acquiring and serving institutional clients",
      tier: "Scaling",
      unlockRequirement: 1770,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "bo-22-1",
          title: "Institutional Sales Process",
          description: "Systematic approach to institutional client acquisition",
          type: "lesson",
          xpReward: 75,
          duration: "55 min",
          completed: false,
          content: "Institutional clients require different approaches: due diligence processes, compliance requirements, performance reporting, and relationship management..."
        },
        {
          id: "bo-22-2",
          title: "Institutional Pitch Book",
          description: "Create professional institutional presentation materials",
          type: "project",
          xpReward: 20,
          duration: "150 min",
          completed: false
        }
      ]
    },
    {
      level: 23,
      title: "Fund Management & Structure",
      description: "Hedge fund and investment management business development",
      tier: "Scaling",
      unlockRequirement: 1865,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "bo-23-1",
          title: "Investment Fund Structures",
          description: "Hedge funds, private equity, and managed accounts",
          type: "lesson",
          xpReward: 80,
          duration: "65 min",
          completed: false,
          content: "Fund structures enable capital scaling: hedge funds for sophisticated investors, managed accounts for customization, and private equity for long-term strategies..."
        },
        {
          id: "bo-23-2",
          title: "Fund Structure Analysis",
          description: "Evaluate optimal fund structure for your strategy",
          type: "project",
          xpReward: 20,
          duration: "100 min",
          completed: false
        }
      ]
    },
    {
      level: 24,
      title: "Regulatory Compliance & Licensing",
      description: "Advanced regulatory requirements and licensing procedures",
      tier: "Scaling",
      unlockRequirement: 1965,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "bo-24-1",
          title: "Investment Advisor Licensing",
          description: "Series 65, RIA registration, and compliance requirements",
          type: "lesson",
          xpReward: 75,
          duration: "60 min",
          completed: false,
          content: "Managing client money requires proper licensing: Series 65 for investment advisors, RIA registration for firms, and ongoing compliance obligations..."
        },
        {
          id: "bo-24-2",
          title: "Compliance Program Design",
          description: "Create comprehensive compliance and risk management program",
          type: "project",
          xpReward: 20,
          duration: "120 min",
          completed: false
        }
      ]
    },
    {
      level: 25,
      title: "International Expansion & Global Markets",
      description: "Expanding trading operations to international markets",
      tier: "Scaling",
      unlockRequirement: 2060,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "bo-25-1",
          title: "Global Market Access",
          description: "International trading opportunities and regulatory considerations",
          type: "lesson",
          xpReward: 80,
          duration: "55 min",
          completed: false,
          content: "Global expansion requires understanding: international regulations, tax treaties, currency considerations, and local market structures..."
        },
        {
          id: "bo-25-2",
          title: "International Strategy",
          description: "Develop your global expansion strategy",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false
        }
      ]
    },
    {
      level: 26,
      title: "Advanced Analytics & Business Intelligence",
      description: "Sophisticated analytics and data-driven decision making",
      tier: "Scaling",
      unlockRequirement: 2160,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "bo-26-1",
          title: "Business Intelligence Systems",
          description: "Advanced analytics for trading business optimization",
          type: "lesson",
          xpReward: 75,
          duration: "50 min",
          completed: false,
          content: "Business intelligence transforms data into actionable insights: client analytics, performance attribution, risk analytics, and operational efficiency metrics..."
        },
        {
          id: "bo-26-2",
          title: "Analytics Dashboard",
          description: "Build comprehensive business analytics dashboard",
          type: "project",
          xpReward: 20,
          duration: "100 min",
          completed: false
        }
      ]
    },
    {
      level: 27,
      title: "Succession Planning & Exit Strategies",
      description: "Long-term business sustainability and exit planning",
      tier: "Scaling",
      unlockRequirement: 2255,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "bo-27-1",
          title: "Business Exit Strategies",
          description: "Sale, merger, succession, and legacy planning",
          type: "lesson",
          xpReward: 80,
          duration: "60 min",
          completed: false,
          content: "Exit planning ensures business continuity: management buyouts, strategic sales, public offerings, and succession planning require years of preparation..."
        },
        {
          id: "bo-27-2",
          title: "Exit Strategy Plan",
          description: "Develop comprehensive exit and succession strategy",
          type: "project",
          xpReward: 20,
          duration: "150 min",
          completed: false
        }
      ]
    },
    {
      level: 28,
      title: "Innovation & Technology Leadership",
      description: "Leading innovation in trading technology and methodologies",
      tier: "Scaling",
      unlockRequirement: 2355,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "bo-28-1",
          title: "Innovation Management",
          description: "Leading technological and methodological innovation",
          type: "lesson",
          xpReward: 75,
          duration: "55 min",
          completed: false,
          content: "Innovation leadership requires: technology trend analysis, R&D investment, intellectual property development, and systematic innovation processes..."
        },
        {
          id: "bo-28-2",
          title: "Innovation Strategy",
          description: "Develop innovation roadmap and R&D strategy",
          type: "project",
          xpReward: 20,
          duration: "120 min",
          completed: false
        }
      ]
    },
    {
      level: 29,
      title: "Industry Leadership & Thought Leadership",
      description: "Establishing industry authority and thought leadership",
      tier: "Scaling",
      unlockRequirement: 2450,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "bo-29-1",
          title: "Thought Leadership Development",
          description: "Building industry authority and influence",
          type: "lesson",
          xpReward: 80,
          duration: "60 min",
          completed: false,
          content: "Thought leadership creates industry influence: original research, speaking engagements, media appearances, and industry advisory positions..."
        },
        {
          id: "bo-29-2",
          title: "Leadership Platform",
          description: "Launch your thought leadership platform",
          type: "project",
          xpReward: 20,
          duration: "180 min",
          completed: false
        }
      ]
    },
    {
      level: 30,
      title: "Master Business Operator Certification",
      description: "Final assessment and certification as master business operator",
      tier: "Scaling",
      unlockRequirement: 2550,
      completed: false,
      locked: true,
      totalXP: 200,
      modules: [
        {
          id: "bo-30-1",
          title: "Master Business Exam",
          description: "Comprehensive master-level business assessment",
          type: "assessment",
          xpReward: 150,
          duration: "120 min",
          completed: false,
          content: "Final examination testing all aspects of trading business mastery: strategy, operations, scaling, leadership, and innovation..."
        },
        {
          id: "bo-30-2",
          title: "Business Mastery Thesis",
          description: "Present comprehensive business development case study",
          type: "project",
          xpReward: 50,
          duration: "240 min",
          completed: false
        }
      ]
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Foundation': return 'bg-green-500';
      case 'Strategy': return 'bg-blue-500';
      case 'Scaling': return 'bg-purple-500';
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
                  <Building2 className="w-6 h-6 text-secondary" />
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
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <Building2 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Business Operations</h1>
                  <p className="text-sm text-foreground/70">Professional Trading Enterprise</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-secondary/10 px-3 py-1 rounded-lg">
                <Coins className="w-4 h-4 text-secondary" />
                <span className="font-bold text-secondary">{userXP} XP</span>
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
            <TabsTrigger value="foundation">Foundation</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="scaling">Scaling</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Learning Path Overview */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Business Operations Mastery
                <span className="block gradient-text">Professional Trading Enterprise</span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Transform your trading from hobby to professional enterprise through systematic business development. 
                Master the operational excellence that separates professionals from amateurs.
              </p>
            </div>

            {/* Tier Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <Building2 className="w-5 h-5 text-green-500" />
                    </div>
                    <span>Foundation Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-green-500">Levels 1-10</div>
                    <p className="text-sm text-muted-foreground">
                      Business fundamentals, documentation systems, KPIs, and operational foundations.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{getTierProgress('Foundation').toFixed(0)}%</span>
                      </div>
                      <Progress value={getTierProgress('Foundation')} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total XP Available: 730
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
                    <span>Strategy Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-blue-500">Levels 11-20</div>
                    <p className="text-sm text-muted-foreground">
                      Business models, revenue diversification, branding, and strategic development.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{getTierProgress('Strategy').toFixed(0)}%</span>
                      </div>
                      <Progress value={getTierProgress('Strategy')} className="h-2" />
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
                      <Crown className="w-5 h-5 text-purple-500" />
                    </div>
                    <span>Scaling Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-purple-500">Levels 21-30</div>
                    <p className="text-sm text-muted-foreground">
                      Capital raising, institutional clients, fund management, and industry leadership.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{getTierProgress('Scaling').toFixed(0)}%</span>
                      </div>
                      <Progress value={getTierProgress('Scaling')} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total XP Available: 985
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
                  <span>Continue Your Business Development</span>
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
                          <div className="flex items-center space-x-1 text-xs text-secondary">
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
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      Continue Learning
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="foundation" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Foundation Tier (Levels 1-10)</h2>
              <p className="text-lg text-muted-foreground">
                Build the operational foundation for your professional trading enterprise.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningLevels.filter(level => level.tier === 'Foundation').map(renderLevelCard)}
            </div>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Strategy Tier (Levels 11-20)</h2>
              <p className="text-lg text-muted-foreground">
                Develop advanced business strategies and systematic growth frameworks.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningLevels.filter(level => level.tier === 'Strategy').map(renderLevelCard)}
            </div>
          </TabsContent>

          <TabsContent value="scaling" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Scaling Tier (Levels 21-30)</h2>
              <p className="text-lg text-muted-foreground">
                Master institutional-level business operations and industry leadership.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningLevels.filter(level => level.tier === 'Scaling').map(renderLevelCard)}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Business Development Progress</h2>
              <p className="text-lg text-muted-foreground">
                Track your advancement through the complete Business Operations curriculum.
              </p>
            </div>

            {/* Overall Progress */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                  <span>Overall Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">{userLevel}/30</div>
                    <div className="text-sm text-muted-foreground">Levels Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{userXP}</div>
                    <div className="text-sm text-muted-foreground">Total XP Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">
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
                  <Award className="w-5 h-5 text-primary" />
                  <span>Business Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <Building2 className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <div className="text-sm font-medium">Business Mindset</div>
                    <div className="text-xs text-muted-foreground">Complete Level 1</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">Documentation Master</div>
                    <div className="text-xs text-muted-foreground">Complete Level 2</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <BarChart3 className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <div className="text-sm font-medium">KPI Tracker</div>
                    <div className="text-xs text-muted-foreground">Complete Level 3</div>
                  </div>
                  <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                    <Target className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <div className="text-sm font-medium">SOP Developer</div>
                    <div className="text-xs text-muted-foreground">Complete Level 5</div>
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