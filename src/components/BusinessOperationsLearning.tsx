import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
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
  Coins,
  BookOpen,
  PenTool,
  Briefcase,
  Network,
  Settings,
  Scale,
  Handshake,
  Gavel
} from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'quiz' | 'assessment' | 'project' | 'challenge';
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

interface BusinessOperationsLearningProps {
  onBack: () => void;
  onLogout: () => void;
}

export const BusinessOperationsLearning: React.FC<BusinessOperationsLearningProps> = ({ onBack, onLogout }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Complete Business Operations curriculum with all 30 levels
  const learningLevels: LearningLevel[] = [
    // TIER 1: BEGINNER (Levels 1-10) - Foundations
    {
      level: 1,
      title: "Embracing the Entrepreneurial Mindset",
      description: "Understand entrepreneurial mindset traits and see challenges as growth opportunities",
      tier: "Beginner",
      unlockRequirement: 0,
      completed: false,
      locked: false,
      totalXP: 50,
      modules: [
        {
          id: "1-1",
          title: "The Entrepreneurial Mindset",
          description: "Learn opportunity-focus, growth orientation, and resilience building",
          type: "lesson",
          xpReward: 30,
          duration: "20 min",
          completed: false,
          locked: false,
          content: "An entrepreneurial mindset thrives on identifying and seizing opportunities even in adversity. Such mindsets are growth-oriented (viewing failure as learning), risk-tolerant, and resourceful. Entrepreneurs constantly innovate and adapt, treating obstacles as stepping stones. Developing this mindset means being proactive, curious, and ready to learn. Cultivating resilience (bouncing back from setbacks) is central to entrepreneurial success."
        },
        {
          id: "1-2",
          title: "Mindset Assessment Quiz",
          description: "Test your understanding of entrepreneurial thinking",
          type: "quiz",
          xpReward: 20,
          duration: "10 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 2,
      title: "Defining Your Personal Mission & Values",
      description: "Craft a personal mission statement that guides your business vision and decisions",
      tier: "Beginner",
      unlockRequirement: 50,
      completed: false,
      locked: true,
      totalXP: 50,
      modules: [
        {
          id: "2-1",
          title: "Creating Your Mission Statement",
          description: "Learn to craft a personal mission that guides business decisions",
          type: "lesson",
          xpReward: 30,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "A personal mission statement is like a compass for your business and life. It defines why you work and what you stand for. Research shows personal missions give focus and motivation. Writing one helps clarify values and long-term purpose, keeping you aligned with goals. Think of it as your individual definition of success. An effective mission is brief, value-driven, and in present tense."
        },
        {
          id: "2-2",
          title: "Mission Statement Workshop",
          description: "Draft and refine your personal mission statement",
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
      title: "Opportunity Recognition & Ideation",
      description: "Learn to generate business ideas by spotting real problems and needs in the market",
      tier: "Beginner",
      unlockRequirement: 100,
      completed: false,
      locked: true,
      totalXP: 60,
      modules: [
        {
          id: "3-1",
          title: "Spotting Business Opportunities",
          description: "Master the art of seeing solutions where others see problems",
          type: "lesson",
          xpReward: 40,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "Entrepreneurs see solutions where others see problems. Start by observing your everyday life, skills, or hobbies for unmet needs. Mindset exercises (like brainstorming or 'what if' scenarios) can spark ideas. Remember Lean Startup principles: every idea is an experiment. Validated learning is key: test your assumptions early rather than assuming an idea is good."
        },
        {
          id: "3-2",
          title: "Ideation Challenge",
          description: "Generate and evaluate multiple business ideas",
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
      title: "Idea Validation (Lean Startup Basics)",
      description: "Use Lean Startup methods (MVP, feedback) to test and validate your idea quickly",
      tier: "Beginner",
      unlockRequirement: 160,
      completed: false,
      locked: true,
      totalXP: 60,
      modules: [
        {
          id: "4-1",
          title: "MVP Development & Testing",
          description: "Learn to build and test Minimum Viable Products",
          type: "lesson",
          xpReward: 40,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "Rather than building full products, the Lean Startup method teaches starting small: create a Minimum Viable Product (MVP) to learn what customers truly need. This 'build-measure-learn' feedback loop ensures you focus on solving real problems. Make simple prototypes or surveys, then measure reactions. Validated learning means using data from experiments to decide if you should pivot or persevere."
        },
        {
          id: "4-2",
          title: "Validation Project",
          description: "Create and test your first MVP",
          type: "project",
          xpReward: 20,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 5,
      title: "Crafting Your Value Proposition",
      description: "Define a clear value proposition that explains why customers need your product/service",
      tier: "Beginner",
      unlockRequirement: 220,
      completed: false,
      locked: true,
      totalXP: 60,
      modules: [
        {
          id: "5-1",
          title: "Value Proposition Design",
          description: "Create compelling value propositions that resonate with customers",
          type: "lesson",
          xpReward: 40,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "Your value proposition is a concise statement of the unique benefits you offer. It answers: 'Why choose us?' and 'What problem do we solve?' A strong value prop is customer-focused, specific, and contrasts you with alternatives. For example, it might highlight speed, quality, or innovation. Use feedback from validation to emphasize what customers valued most."
        },
        {
          id: "5-2",
          title: "Value Prop Testing",
          description: "Test and refine your value proposition with real feedback",
          type: "challenge",
          xpReward: 20,
          duration: "20 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 6,
      title: "Introduction to Business Model Planning",
      description: "Outline a basic business model using frameworks like the Lean Canvas",
      tier: "Beginner",
      unlockRequirement: 280,
      completed: false,
      locked: true,
      totalXP: 65,
      modules: [
        {
          id: "6-1",
          title: "Business Model Canvas",
          description: "Learn to map your business model using proven frameworks",
          type: "lesson",
          xpReward: 45,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "A business model shows how your idea makes money and delivers value. The Business Model Canvas breaks this into key parts: Customer Segments, Value Proposition, Channels, Revenue Streams, Costs, and more. Filling out a canvas helps ensure you haven't overlooked any piece of the puzzle. Focus on assumptions: who is your customer, and how will you reach and earn from them?"
        },
        {
          id: "6-2",
          title: "Canvas Workshop",
          description: "Complete your business model canvas",
          type: "project",
          xpReward: 20,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 7,
      title: "Goal-Setting and Personal Productivity",
      description: "Learn to set SMART goals and establish productive routines",
      tier: "Beginner",
      unlockRequirement: 345,
      completed: false,
      locked: true,
      totalXP: 65,
      modules: [
        {
          id: "7-1",
          title: "SMART Goals & Productivity Systems",
          description: "Master goal-setting and productivity frameworks",
          type: "lesson",
          xpReward: 45,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "Clear goals drive progress. Use SMART criteria: Specific, Measurable, Achievable, Relevant, Time-bound. Break annual goals into monthly or weekly tasks. Productive routines (daily work blocks, habit trackers) help maintain momentum. Remember Covey's principle: 'Begin with the end in mind.' Focus on high-impact activities and guard against distractions."
        },
        {
          id: "7-2",
          title: "Goal Setting Workshop",
          description: "Create your SMART goals and productivity system",
          type: "challenge",
          xpReward: 20,
          duration: "20 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 8,
      title: "Basic Finance and Budgeting",
      description: "Understand business finances by creating income and expense forecasts",
      tier: "Beginner",
      unlockRequirement: 410,
      completed: false,
      locked: true,
      totalXP: 65,
      modules: [
        {
          id: "8-1",
          title: "Business Finance Fundamentals",
          description: "Learn cash flow, profit margins, and budgeting basics",
          type: "lesson",
          xpReward: 45,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "Even a solo entrepreneur must track money. Start with projected revenue and expected costs. Calculate simple profit (Revenue – Costs). Keep separate personal and business finances. Learn terms like cash flow, profit margin, and break-even point. Use spreadsheets or budgeting apps to plan. Tracking money helps you make informed decisions and measure growth."
        },
        {
          id: "8-2",
          title: "Budget Creation Exercise",
          description: "Create your first business budget and financial forecast",
          type: "project",
          xpReward: 20,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 9,
      title: "Marketing Fundamentals & Brand Basics",
      description: "Identify your target audience and learn basic marketing principles",
      tier: "Beginner",
      unlockRequirement: 475,
      completed: false,
      locked: true,
      totalXP: 65,
      modules: [
        {
          id: "9-1",
          title: "Marketing & Brand Strategy",
          description: "Build your brand identity and marketing foundation",
          type: "lesson",
          xpReward: 45,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Marketing is communicating your value to the right people. Start by defining your ideal customer (age, interests, pain points). Craft messaging that appeals to them. Choose 1–2 channels to test. Brand elements (logo, voice, colors) should consistently reflect your mission and values. Building a simple marketing plan helps you focus efforts."
        },
        {
          id: "9-2",
          title: "Brand Identity Workshop",
          description: "Create your brand identity and first marketing content",
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
      title: "Developing Productive Routines and Habits",
      description: "Establish sustainable routines that support business growth and well-being",
      tier: "Beginner",
      unlockRequirement: 540,
      completed: false,
      locked: true,
      totalXP: 65,
      modules: [
        {
          id: "10-1",
          title: "Productive Routines & Self-Management",
          description: "Build habits and routines for sustainable success",
          type: "lesson",
          xpReward: 45,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "Successful entrepreneurs balance hard work with healthy routines. Dedicate consistent time each day to key business tasks. Use tools like time-blocking, to-do lists, or habit trackers. Also incorporate self-care: exercise, sleep, and breaks are vital. Covey's 'Sharpen the Saw' emphasizes renewal through rest and learning. Create rituals that reinforce progress."
        },
        {
          id: "10-2",
          title: "Routine Design Challenge",
          description: "Design and implement your weekly routine system",
          type: "challenge",
          xpReward: 20,
          duration: "20 min",
          completed: false,
          locked: false
        }
      ]
    },

    // TIER 2: INTERMEDIATE (Levels 11-20) - Strategy and Systems
    {
      level: 11,
      title: "Strategic Planning (Annual & Quarterly)",
      description: "Set a one-year vision and break it into quarterly goals for adaptability",
      tier: "Intermediate",
      unlockRequirement: 605,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "11-1",
          title: "Strategic Vision & OKRs",
          description: "Master long-term planning and quarterly goal setting",
          type: "lesson",
          xpReward: 50,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Long-term success requires structured planning. Define a clear 12-month vision for your business. Then adopt quarterly planning: every 3 months, review your OKRs (Objectives and Key Results) and KPIs. Quarterly planning is a strategic way to move towards your objectives by breaking annual plans into manageable 3-month increments. This lets you adjust quickly if something isn't working."
        },
        {
          id: "11-2",
          title: "Annual Planning Workshop",
          description: "Create your annual vision and quarterly breakdown",
          type: "project",
          xpReward: 20,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 12,
      title: "Documenting Processes and Systems",
      description: "Create Standard Operating Procedures (SOPs) for consistency and scalability",
      tier: "Intermediate",
      unlockRequirement: 675,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "12-1",
          title: "SOP Development",
          description: "Learn to document and standardize your business processes",
          type: "lesson",
          xpReward: 50,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "As you grow, informal ways of working can lead to missed steps. Documenting processes ensures quality and saves time. A simple SOP lists the steps, tools, and time needed for a task. This makes delegation easier later and prevents reinventing the wheel. Standardized processes are the building blocks of a scalable operation."
        },
        {
          id: "12-2",
          title: "Process Documentation Project",
          description: "Create your first Standard Operating Procedure",
          type: "project",
          xpReward: 20,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 13,
      title: "Marketing Strategy and Channels",
      description: "Develop a marketing strategy by choosing key channels and tactics",
      tier: "Intermediate",
      unlockRequirement: 745,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "13-1",
          title: "Multi-Channel Marketing Strategy",
          description: "Build comprehensive marketing systems and funnels",
          type: "lesson",
          xpReward: 50,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "With your audience defined, pick marketing methods that fit. Content marketing builds trust over time, while paid ads can drive quick traffic. Allocate time and budget to 1–2 channels first. Define your brand voice and consistent messaging. Keep testing: track what brings engagement. Your marketing system should feed into sales."
        },
        {
          id: "13-2",
          title: "Marketing Plan Creation",
          description: "Design your comprehensive marketing strategy",
          type: "project",
          xpReward: 20,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 14,
      title: "Sales Fundamentals",
      description: "Learn a basic sales process to convert interest into paying customers",
      tier: "Intermediate",
      unlockRequirement: 815,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "14-1",
          title: "Sales Process & Relationship Building",
          description: "Master the art of converting leads into customers",
          type: "lesson",
          xpReward: 50,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Sales is about understanding customer needs and communicating how you solve them. Map a sales flow: lead generation, follow-up, presentation, handling objections, and closing. Use tools like email follow-ups or call scheduling. Focus on building relationships: listen more than you talk. Practice explaining your value proposition clearly."
        },
        {
          id: "14-2",
          title: "Sales Role-Play Exercise",
          description: "Practice your sales pitch and objection handling",
          type: "challenge",
          xpReward: 20,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 15,
      title: "Performance Metrics and KPIs",
      description: "Identify and track Key Performance Indicators to measure business health",
      tier: "Intermediate",
      unlockRequirement: 885,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "15-1",
          title: "KPI Selection & Tracking",
          description: "Learn to choose and monitor the right business metrics",
          type: "lesson",
          xpReward: 55,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "KPIs are quantifiable metrics that show progress toward goals. Examples: monthly revenue, number of new clients, website traffic, or customer satisfaction score. Tracking KPIs provides clarity and focus by measuring progress. When metrics dip or rise, you get signals to adjust strategy. Use basic tools to log your numbers monthly and review trends regularly."
        },
        {
          id: "15-2",
          title: "KPI Dashboard Setup",
          description: "Create your business metrics tracking system",
          type: "project",
          xpReward: 20,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 16,
      title: "Delegation, Outsourcing, and Automation",
      description: "Learn when and how to delegate or automate tasks for efficiency",
      tier: "Intermediate",
      unlockRequirement: 960,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "16-1",
          title: "Delegation & Automation Strategy",
          description: "Master the art of letting go and scaling through others",
          type: "lesson",
          xpReward: 55,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Entrepreneurs often try to do everything themselves, which can lead to decreased productivity and missed opportunities. Examine your task list: what can be automated, outsourced, or delegated? Learning to delegate through automation, outsourcing or hiring is key to scaling a business. Start small: even hiring a freelancer for low-value tasks can multiply your efficiency."
        },
        {
          id: "16-2",
          title: "Delegation Implementation",
          description: "Implement your first delegation or automation solution",
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
      title: "Resilience and Adaptability",
      description: "Develop resilience skills to cope with setbacks and learn from failures",
      tier: "Intermediate",
      unlockRequirement: 1035,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "17-1",
          title: "Building Entrepreneurial Resilience",
          description: "Develop mental toughness and adaptability for business challenges",
          type: "lesson",
          xpReward: 55,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "In entrepreneurship, setbacks are inevitable. Cultivating resilience means bouncing back and adapting. Resilient entrepreneurs have a growth mindset and treat failures as learning. Building resilience involves setting realistic expectations, reframing challenges, and maintaining optimism. Practices like stress management, peer support, and reflective journaling strengthen this trait."
        },
        {
          id: "17-2",
          title: "Resilience Building Exercise",
          description: "Practice reframing setbacks as learning opportunities",
          type: "challenge",
          xpReward: 20,
          duration: "20 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 18,
      title: "Building a Network and Support System",
      description: "Learn to network effectively and build a community of mentors and peers",
      tier: "Intermediate",
      unlockRequirement: 1110,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "18-1",
          title: "Strategic Networking",
          description: "Build meaningful professional relationships and support systems",
          type: "lesson",
          xpReward: 55,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Successful entrepreneurs don't go it alone. A strong network provides advice, opportunities, and emotional support. Seek out industry meetups, online forums, or mastermind groups. Identify people who inspire you and reach out with genuine questions. Look for mentors who can give perspective. Networking isn't just asking for help – offer value in return."
        },
        {
          id: "18-2",
          title: "Networking Action Plan",
          description: "Create and execute your networking strategy",
          type: "challenge",
          xpReward: 20,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 19,
      title: "Implementing Technology and Tools",
      description: "Integrate digital tools and automation to streamline operations",
      tier: "Intermediate",
      unlockRequirement: 1185,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "19-1",
          title: "Business Technology Stack",
          description: "Choose and implement the right tools for your business",
          type: "lesson",
          xpReward: 60,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Technology can greatly increase capacity. For routine tasks, use automation: email filters, scheduling apps, or chatbots for basic questions. Automation frees you from routine tasks, so you get more time for productive work. Explore tools in marketing, finance, or project management. Choose tools that integrate well together to avoid siloed systems."
        },
        {
          id: "19-2",
          title: "Tech Implementation Project",
          description: "Set up your business technology stack",
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
      title: "Legal Basics and Risk Management",
      description: "Understand essential legal steps and basic risk management",
      tier: "Intermediate",
      unlockRequirement: 1265,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "20-1",
          title: "Legal Foundation & Risk Planning",
          description: "Protect your business with proper legal and risk management",
          type: "lesson",
          xpReward: 60,
          duration: "50 min",
          completed: false,
          locked: false,
          content: "Protecting yourself legally is part of running a sustainable business. Research business structures (sole proprietorship, LLC, etc.). Learn tax obligations and keep records. Use contracts for clients: even a one-page agreement builds trust and avoids disputes. Consider basic insurance if relevant. Planning for risk ensures longevity."
        },
        {
          id: "20-2",
          title: "Legal & Risk Assessment",
          description: "Complete your legal setup and risk management plan",
          type: "assessment",
          xpReward: 20,
          duration: "40 min",
          completed: false,
          locked: false
        }
      ]
    },

    // TIER 3: PROFESSIONAL (Levels 21-30) - Scaling & Sustainability
    {
      level: 21,
      title: "Advanced Financial Planning & Cash Flow Strategy",
      description: "Create long-term financial plans and funding strategies for growth",
      tier: "Professional",
      unlockRequirement: 1345,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "21-1",
          title: "Advanced Financial Strategy",
          description: "Master cash flow forecasting and funding strategies",
          type: "lesson",
          xpReward: 60,
          duration: "50 min",
          completed: false,
          locked: false,
          content: "Think beyond month-to-month budgeting. Build a cash flow forecast (6–12 months) incorporating growth assumptions and seasonal changes. Learn about break-even analysis and runway. Plan for investments or loans: keep clear records for potential funders. Monitor working capital. A scalable company can expand significantly and sustainably without proportionate expense increases."
        },
        {
          id: "21-2",
          title: "Financial Modeling Project",
          description: "Create comprehensive financial forecasts and funding plans",
          type: "project",
          xpReward: 20,
          duration: "40 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 22,
      title: "Leadership & Team Building",
      description: "Develop leadership skills and plan to build a team",
      tier: "Professional",
      unlockRequirement: 1425,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "22-1",
          title: "Leadership Development",
          description: "Transform from solo founder to effective leader",
          type: "lesson",
          xpReward: 60,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Transitioning from doer to leader requires people skills. Learn to delegate with clear instructions and empower others. Effective leadership combines vision with empathy. Define roles you need and write clear job descriptions. Interview focusing on values alignment. Practice giving feedback and recognition. Great teams follow leaders who communicate purpose and trust their people."
        },
        {
          id: "22-2",
          title: "Leadership Skills Assessment",
          description: "Evaluate and develop your leadership capabilities",
          type: "assessment",
          xpReward: 20,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 23,
      title: "Company Culture and Values at Scale",
      description: "Establish core values and culture practices for growth",
      tier: "Professional",
      unlockRequirement: 1505,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "23-1",
          title: "Culture Design & Implementation",
          description: "Build a strong company culture that scales",
          type: "lesson",
          xpReward: 60,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "A strong, positive culture attracts talent and customers. Define 3–5 core values that reflect your mission. Communicate these values in all dealings. Culture isn't just perks; it's how you treat people. Examples: team check-ins, celebrating wins, encouraging work-life balance. Your brand promise should match culture (happy team = happy customers)."
        },
        {
          id: "23-2",
          title: "Culture Implementation Plan",
          description: "Create your company culture framework",
          type: "project",
          xpReward: 20,
          duration: "35 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 24,
      title: "Scaling Operations and Processes",
      description: "Plan for scalable operations by enhancing processes for growth",
      tier: "Professional",
      unlockRequirement: 1585,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "24-1",
          title: "Operational Scaling Strategy",
          description: "Design operations that can handle exponential growth",
          type: "lesson",
          xpReward: 65,
          duration: "50 min",
          completed: false,
          locked: false,
          content: "True scaling means accommodating more customers without collapsing under complexity. Review your SOPs: can they handle double volume? Invest in systems that support growth. Consider outsourcing for non-core functions at larger scale. Standardized, replicable processes make scaling manageable. Ensure quality control measures so standards stay high during growth."
        },
        {
          id: "24-2",
          title: "Scaling Readiness Assessment",
          description: "Evaluate your business's readiness for scale",
          type: "assessment",
          xpReward: 20,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 25,
      title: "Advanced Brand Building & Marketing at Scale",
      description: "Strengthen brand strategy for broader reach and thought leadership",
      tier: "Professional",
      unlockRequirement: 1670,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "25-1",
          title: "Thought Leadership & PR Strategy",
          description: "Build authority and scale your marketing impact",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "At larger scale, consistent brand messaging and high-quality outreach are key. Develop content that positions you as an authority. Encourage customer testimonials. Consider collaborations or PR. Build loyalty programs or referral incentives. Ensure all communications reflect your brand values. Invest in branding assets to reflect your maturity."
        },
        {
          id: "25-2",
          title: "Brand Scaling Campaign",
          description: "Design and launch a major brand building initiative",
          type: "project",
          xpReward: 20,
          duration: "40 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 26,
      title: "Strategic Leadership and Vision (Institutional Thinking)",
      description: "Embrace strategic leadership with long-term vision development",
      tier: "Professional",
      unlockRequirement: 1755,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "26-1",
          title: "Visionary Leadership",
          description: "Develop institutional thinking and strategic vision",
          type: "lesson",
          xpReward: 65,
          duration: "50 min",
          completed: false,
          locked: false,
          content: "Look beyond day-to-day tasks to focus on 'big picture' strategy. Create a 3–5 year plan addressing market positioning, expansion, and team growth. Use scenario planning: consider best-case and worst-case futures. Develop habits like regular strategic reviews. Covey's habits emphasize beginning with the end in mind and sharpening the saw. Communicate vision to inspire and align efforts."
        },
        {
          id: "26-2",
          title: "Strategic Vision Workshop",
          description: "Create your comprehensive long-term strategic plan",
          type: "project",
          xpReward: 20,
          duration: "45 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 27,
      title: "Founder Psychology and Well-Being",
      description: "Focus on self-leadership and well-being for sustainable success",
      tier: "Professional",
      unlockRequirement: 1840,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "27-1",
          title: "Founder Mental Health & Performance",
          description: "Master the psychology of sustainable leadership",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Leading a growing business can be emotionally demanding. Tackle issues like imposter syndrome, perfectionism, and work-life balance. Incorporate mindfulness to manage stress. Build a support system for accountability and perspective. Practice gratitude and celebrate wins. A healthy founder is a resilient leader; neglecting well-being can undermine everything else."
        },
        {
          id: "27-2",
          title: "Well-Being Action Plan",
          description: "Design your personal well-being and performance system",
          type: "challenge",
          xpReward: 20,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 28,
      title: "Delegation Mastery & Leadership Development",
      description: "Master delegation at scale and develop others in leadership roles",
      tier: "Professional",
      unlockRequirement: 1925,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "28-1",
          title: "Advanced Delegation & Team Development",
          description: "Lead leaders and master organizational delegation",
          type: "lesson",
          xpReward: 70,
          duration: "50 min",
          completed: false,
          locked: false,
          content: "With growth, you'll manage managers or multiple contractors. Practice true delegation: entrust outcomes, not just tasks. Provide training, clear KPIs, and feedback loops. Develop accountability culture where people take initiative. Host regular check-ins to coach rather than micromanage. Empower second-in-command leaders by involving them in strategy."
        },
        {
          id: "28-2",
          title: "Leadership Development Program",
          description: "Create systems for developing others as leaders",
          type: "project",
          xpReward: 20,
          duration: "40 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 29,
      title: "Innovation and Continuous Improvement",
      description: "Embed a culture of innovation and kaizen for competitive advantage",
      tier: "Professional",
      unlockRequirement: 2015,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "29-1",
          title: "Innovation Systems & Continuous Improvement",
          description: "Build systems for ongoing innovation and improvement",
          type: "lesson",
          xpReward: 70,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Mature businesses continually refine processes and innovate. Encourage feedback loops: regularly ask customers and employees how to improve. Implement quarterly retrospectives to identify inefficiencies. Foster experimentation: allocate time for new ideas. Stay informed of industry trends. Remember: 'The only strategy guaranteed to fail is not taking risks.'"
        },
        {
          id: "29-2",
          title: "Innovation Framework Implementation",
          description: "Set up your continuous improvement and innovation systems",
          type: "project",
          xpReward: 20,
          duration: "35 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 30,
      title: "Sustainability and Legacy Planning",
      description: "Plan for long-term sustainability, social responsibility, and legacy",
      tier: "Professional",
      unlockRequirement: 2105,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "30-1",
          title: "Legacy & Sustainability Strategy",
          description: "Create plans for lasting impact and business sustainability",
          type: "lesson",
          xpReward: 50,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Consider the big picture: how will your business endure? Think about sustainable practices (financial, social, environmental). Many businesses adopt a triple bottom line (profit, people, planet). Plan your legacy: do you intend to sell, hand over, or diversify? Draft a succession plan. Sustainable businesses plan for transitions and continual impact."
        },
        {
          id: "30-2",
          title: "Legacy Planning Workshop",
          description: "Create your sustainability and succession plans",
          type: "project",
          xpReward: 20,
          duration: "30 min",
          completed: false,
          locked: false
        },
        {
          id: "30-3",
          title: "Business Operations Mastery Assessment",
          description: "Comprehensive evaluation of your business operations expertise",
          type: "assessment",
          xpReward: 20,
          duration: "60 min",
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
                  <p className="text-foreground/80 leading-relaxed">{module.content}</p>
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
                  <h3 className="text-xl font-semibold mb-2">Knowledge Quiz</h3>
                  <p className="text-muted-foreground mb-6">Test your understanding and earn XP!</p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Quiz
                  </Button>
                </div>
              </div>
            )}

            {module.type === 'challenge' && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Target className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Practical Challenge</h3>
                  <p className="text-muted-foreground mb-6">Apply your knowledge in a real-world scenario</p>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Start Challenge
                  </Button>
                </div>
              </div>
            )}

            {module.type === 'project' && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Business Project</h3>
                  <p className="text-muted-foreground mb-6">Create deliverables for your business</p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Project
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
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <Building2 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Business Operations</h1>
                  <p className="text-sm text-foreground/70">30-Level Entrepreneurial Development</p>
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
                  Master Business Operations Through
                  <span className="block gradient-text">30 Progressive Levels</span>
                </h2>
                <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                  Transform from solo entrepreneur to business leader through systematic development 
                  of entrepreneurial skills, strategic thinking, and operational excellence.
                </p>
              </div>

              {/* Tier Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <Lightbulb className="w-5 h-5 text-green-500" />
                      </div>
                      <span>Beginner Tier</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-green-500">Levels 1-10</div>
                      <p className="text-sm text-muted-foreground">
                        Entrepreneurial foundations, mission development, and basic business planning.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{getTierProgress('Beginner').toFixed(0)}%</span>
                        </div>
                        <Progress value={getTierProgress('Beginner')} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total XP Available: 605
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <Settings className="w-5 h-5 text-blue-500" />
                      </div>
                      <span>Intermediate Tier</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-blue-500">Levels 11-20</div>
                      <p className="text-sm text-muted-foreground">
                        Strategic planning, systems development, and operational excellence.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{getTierProgress('Intermediate').toFixed(0)}%</span>
                        </div>
                        <Progress value={getTierProgress('Intermediate')} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total XP Available: 740
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <Scale className="w-5 h-5 text-purple-500" />
                      </div>
                      <span>Professional Tier</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-purple-500">Levels 21-30</div>
                      <p className="text-sm text-muted-foreground">
                        Leadership mastery, scaling strategies, and legacy planning.
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
                  Build entrepreneurial foundations with mindset development, mission crafting, and basic business planning.
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
                  Develop strategic planning, operational systems, and advanced business management skills.
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
                  Master leadership, scaling strategies, innovation systems, and legacy planning.
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
                  Track your advancement through the Business Operations curriculum.
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
                    <span>Business Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <Lightbulb className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-sm font-medium">Entrepreneur</div>
                      <div className="text-xs text-muted-foreground">Complete Level 1</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                      <Target className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-medium">Strategist</div>
                      <div className="text-xs text-muted-foreground">Complete Tier 2</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                      <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-medium">Leader</div>
                      <div className="text-xs text-muted-foreground">Master Delegation</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                      <Trophy className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-medium">Visionary</div>
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