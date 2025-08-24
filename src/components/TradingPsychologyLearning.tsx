import React, { useState, useEffect } from 'react';
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
  Activity,
  Heart,
  Shield,
  Lightbulb,
  Zap,
  Eye,
  MessageCircle,
  FileText,
  Calculator,
  Compass,
  Smile,
  TrendingUp
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

interface TradingPsychologyLearningProps {
  onBack: () => void;
  onLogout: () => void;
}

export const TradingPsychologyLearning: React.FC<TradingPsychologyLearningProps> = ({ onBack, onLogout }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Complete 30-level Trading Psychology curriculum
  const learningLevels: LearningLevel[] = [
    // TIER 1: EMOTIONAL FOUNDATIONS (Levels 1-10)
    {
      level: 1,
      title: "Introduction to Trading Psychology",
      description: "Understand the critical role of psychology in trading success and failure",
      tier: "Beginner",
      unlockRequirement: 0,
      completed: false,
      locked: false,
      totalXP: 50,
      modules: [
        {
          id: "1-1",
          title: "The Mind-Market Connection",
          description: "Discover how psychology drives 80% of trading outcomes",
          type: "lesson",
          xpReward: 30,
          duration: "20 min",
          completed: false,
          locked: false,
          content: "Trading psychology is the foundation of consistent profitability. Research shows that 80% of trading success comes from psychological factors, while only 20% comes from technical knowledge. Your mind is your most powerful trading tool - or your greatest enemy. Understanding emotions like fear, greed, hope, and regret is essential for developing the mental discipline required for long-term success."
        },
        {
          id: "1-2",
          title: "Psychology Foundations Quiz",
          description: "Test your understanding of basic trading psychology concepts",
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
      title: "Understanding Emotions in Trading",
      description: "Identify and recognize the primary emotions that affect trading decisions",
      tier: "Beginner",
      unlockRequirement: 50,
      completed: false,
      locked: true,
      totalXP: 55,
      modules: [
        {
          id: "2-1",
          title: "The Big Four: Fear, Greed, Hope, and Regret",
          description: "Learn how the four primary trading emotions manifest and impact decisions",
          type: "lesson",
          xpReward: 35,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "Fear causes premature exits and missed opportunities. Greed leads to overtrading and excessive risk-taking. Hope keeps us in losing trades too long. Regret makes us chase the market or revenge trade. Understanding these emotions is the first step to controlling them. Each emotion has physiological markers you can learn to recognize before they sabotage your trading."
        },
        {
          id: "2-2",
          title: "Emotion Recognition Exercise",
          description: "Practice identifying emotions in trading scenarios",
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
      title: "Fear and Greed Management",
      description: "Develop practical strategies to control fear and greed in trading situations",
      tier: "Beginner",
      unlockRequirement: 105,
      completed: false,
      locked: true,
      totalXP: 60,
      modules: [
        {
          id: "3-1",
          title: "Conquering Trading Fear",
          description: "Learn techniques to overcome fear of loss and fear of missing out",
          type: "lesson",
          xpReward: 35,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "Fear of loss (FOL) and fear of missing out (FOMO) are the two primary fears in trading. FOL causes hesitation and premature exits. FOMO leads to chasing trades and entering at poor prices. Combat fear through proper position sizing, pre-planned exits, and breathing techniques. Remember: every professional trader experiences fear - the difference is they have systems to manage it."
        },
        {
          id: "3-2",
          title: "Greed Control Strategies",
          description: "Understand how greed manifests and learn control techniques",
          type: "lesson",
          xpReward: 25,
          duration: "20 min",
          completed: false,
          locked: false,
          content: "Greed appears as overtrading, oversizing positions, and holding winners too long hoping for more. It's often disguised as 'confidence' or 'conviction.' Control greed through predetermined profit targets, position sizing rules, and regular profit-taking. The goal is consistent profits, not home runs."
        }
      ]
    },
    {
      level: 4,
      title: "Building Basic Discipline",
      description: "Establish fundamental trading discipline and rule-following habits",
      tier: "Beginner",
      unlockRequirement: 165,
      completed: false,
      locked: true,
      totalXP: 60,
      modules: [
        {
          id: "4-1",
          title: "The Discipline Framework",
          description: "Learn the core components of trading discipline",
          type: "lesson",
          xpReward: 40,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "Discipline is following your trading plan regardless of emotions or market conditions. It consists of three pillars: Rule Adherence (following your system), Emotional Control (managing reactions), and Consistency (repeating good behaviors). Discipline is a skill that can be developed through practice, not a personality trait you're born with."
        },
        {
          id: "4-2",
          title: "Discipline Building Challenge",
          description: "Create and follow a simple trading routine for one week",
          type: "challenge",
          xpReward: 20,
          duration: "7 days",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 5,
      title: "Stress Recognition and Response",
      description: "Learn to identify stress signals and develop healthy response mechanisms",
      tier: "Beginner",
      unlockRequirement: 225,
      completed: false,
      locked: true,
      totalXP: 65,
      modules: [
        {
          id: "5-1",
          title: "The Physiology of Trading Stress",
          description: "Understand how stress affects your body and decision-making",
          type: "lesson",
          xpReward: 40,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "Trading stress triggers the fight-or-flight response, flooding your system with cortisol and adrenaline. This impairs rational thinking and leads to impulsive decisions. Physical signs include increased heart rate, shallow breathing, and muscle tension. Recognizing these early warning signs allows you to pause and reset before making poor decisions."
        },
        {
          id: "5-2",
          title: "Stress Response Toolkit",
          description: "Learn practical techniques for managing acute trading stress",
          type: "lesson",
          xpReward: 25,
          duration: "20 min",
          completed: false,
          locked: false,
          content: "Effective stress management techniques include: Box breathing (4-4-4-4 pattern), Progressive muscle relaxation, The 5-4-3-2-1 grounding technique, and Taking a trading break. These tools help reset your nervous system and return to a calm, analytical state."
        }
      ]
    },
    {
      level: 6,
      title: "Developing Trading Routines",
      description: "Create structured pre-market, during-market, and post-market routines",
      tier: "Beginner",
      unlockRequirement: 290,
      completed: false,
      locked: true,
      totalXP: 65,
      modules: [
        {
          id: "6-1",
          title: "The Power of Trading Rituals",
          description: "Learn how routines create psychological stability and consistency",
          type: "lesson",
          xpReward: 40,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "Routines reduce decision fatigue and create psychological anchors. A pre-market routine might include market analysis, goal setting, and mental preparation. During-market routines focus on execution discipline. Post-market routines involve review and reflection. Consistent routines build confidence and reduce emotional volatility."
        },
        {
          id: "6-2",
          title: "Design Your Trading Day",
          description: "Create personalized routines for maximum psychological benefit",
          type: "project",
          xpReward: 25,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 7,
      title: "Basic Mindfulness Techniques",
      description: "Introduction to mindfulness practices for enhanced trading awareness",
      tier: "Beginner",
      unlockRequirement: 355,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "7-1",
          title: "Mindfulness for Traders",
          description: "Understand how mindfulness improves trading performance",
          type: "lesson",
          xpReward: 45,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "Mindfulness is the practice of present-moment awareness without judgment. For traders, it means observing thoughts and emotions without being controlled by them. Research shows mindfulness improves decision-making, reduces impulsivity, and increases emotional regulation. Even 10 minutes daily can significantly impact your trading psychology."
        },
        {
          id: "7-2",
          title: "Basic Meditation Practice",
          description: "Learn simple meditation techniques for daily practice",
          type: "challenge",
          xpReward: 25,
          duration: "10 min daily",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 8,
      title: "Goal Setting and Motivation",
      description: "Set psychological and performance goals that drive consistent improvement",
      tier: "Beginner",
      unlockRequirement: 425,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "8-1",
          title: "SMART Goals for Trading Psychology",
          description: "Apply goal-setting frameworks to psychological development",
          type: "lesson",
          xpReward: 45,
          duration: "25 min",
          completed: false,
          locked: false,
          content: "Psychological goals should be SMART: Specific (reduce revenge trading), Measurable (track emotional trades), Achievable (realistic timeframes), Relevant (aligned with trading success), Time-bound (30-day challenges). Examples: 'Complete daily emotional check-ins for 30 days' or 'Reduce impulsive trades by 50% this month.'"
        },
        {
          id: "8-2",
          title: "Personal Psychology Goals",
          description: "Create your personalized psychological development plan",
          type: "project",
          xpReward: 25,
          duration: "20 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 9,
      title: "Self-Awareness Development",
      description: "Build deeper self-awareness of your trading patterns and triggers",
      tier: "Beginner",
      unlockRequirement: 495,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "9-1",
          title: "Trading Personality Assessment",
          description: "Discover your natural trading tendencies and blind spots",
          type: "assessment",
          xpReward: 50,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "Understanding your trading personality helps identify strengths and weaknesses. Are you naturally patient or impulsive? Risk-averse or risk-seeking? Analytical or intuitive? This assessment reveals your psychological profile and provides personalized recommendations for development."
        },
        {
          id: "9-2",
          title: "Trigger Identification Exercise",
          description: "Map your personal emotional triggers and response patterns",
          type: "reflection",
          xpReward: 25,
          duration: "20 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 10,
      title: "Emotional Foundations Assessment",
      description: "Comprehensive evaluation of basic emotional awareness and control",
      tier: "Beginner",
      unlockRequirement: 570,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "10-1",
          title: "Emotional Foundations Exam",
          description: "Test your mastery of basic trading psychology concepts",
          type: "assessment",
          xpReward: 75,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "This comprehensive assessment evaluates your understanding of trading emotions, stress management, mindfulness basics, and self-awareness. You'll analyze trading scenarios and demonstrate your ability to recognize and manage emotional responses."
        },
        {
          id: "10-2",
          title: "Personal Psychology Plan",
          description: "Create your roadmap for continued psychological development",
          type: "project",
          xpReward: 25,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },

    // TIER 2: MENTAL RESILIENCE (Levels 11-20)
    {
      level: 11,
      title: "Cognitive Biases in Trading",
      description: "Identify and overcome the mental shortcuts that sabotage trading decisions",
      tier: "Intermediate",
      unlockRequirement: 670,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "11-1",
          title: "The Bias Catalog",
          description: "Learn the 12 most dangerous cognitive biases for traders",
          type: "lesson",
          xpReward: 50,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "Cognitive biases are systematic errors in thinking that affect decisions. Key trading biases include: Confirmation bias (seeking confirming information), Anchoring bias (fixating on first information), Overconfidence bias (overestimating abilities), Loss aversion (feeling losses more than gains), and Recency bias (overweighting recent events). Recognizing these patterns is the first step to overcoming them."
        },
        {
          id: "11-2",
          title: "Bias Detection Challenge",
          description: "Practice identifying biases in real trading scenarios",
          type: "challenge",
          xpReward: 30,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 12,
      title: "Advanced Emotional Regulation",
      description: "Master sophisticated techniques for controlling emotional responses",
      tier: "Intermediate",
      unlockRequirement: 750,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "12-1",
          title: "Emotional Regulation Mastery",
          description: "Advanced techniques for emotional control under pressure",
          type: "lesson",
          xpReward: 55,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Advanced emotional regulation involves cognitive reframing, emotional labeling, and physiological control. Techniques include: The STOP method (Stop, Take a breath, Observe, Proceed mindfully), Cognitive restructuring (challenging negative thoughts), and Emotional granularity (precisely naming emotions to reduce their power). Practice these during low-stress periods to use them effectively during high-stress trading."
        },
        {
          id: "12-2",
          title: "Pressure Testing",
          description: "Apply regulation techniques in simulated high-stress scenarios",
          type: "challenge",
          xpReward: 25,
          duration: "20 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 13,
      title: "Confidence Building Strategies",
      description: "Develop authentic confidence based on competence and preparation",
      tier: "Intermediate",
      unlockRequirement: 830,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "13-1",
          title: "True vs. False Confidence",
          description: "Distinguish between healthy confidence and dangerous overconfidence",
          type: "lesson",
          xpReward: 50,
          duration: "30 min",
          completed: false,
          locked: false,
          content: "True confidence comes from competence, preparation, and realistic self-assessment. False confidence (overconfidence) comes from recent wins or ego. Build authentic confidence through: Thorough preparation, Skill development, Realistic goal achievement, and Learning from both wins and losses. Confidence should be calibrated to your actual abilities."
        },
        {
          id: "13-2",
          title: "Confidence Building Plan",
          description: "Create a systematic approach to building trading confidence",
          type: "project",
          xpReward: 25,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 14,
      title: "Handling Losing Streaks",
      description: "Develop resilience and maintain perspective during inevitable losing periods",
      tier: "Intermediate",
      unlockRequirement: 905,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "14-1",
          title: "The Psychology of Losing Streaks",
          description: "Understand why losing streaks happen and how they affect psychology",
          type: "lesson",
          xpReward: 55,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "Losing streaks are statistically inevitable, even with profitable systems. They trigger doubt, frustration, and the urge to change strategies. The key is maintaining process focus over outcome focus. Strategies include: Reducing position size during streaks, Reviewing process not just results, Taking breaks when emotional, and Remembering that streaks are temporary. Your response to losing streaks often determines long-term success."
        },
        {
          id: "14-2",
          title: "Streak Survival Protocol",
          description: "Develop your personal plan for navigating difficult periods",
          type: "project",
          xpReward: 30,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 15,
      title: "Mental Resilience Training",
      description: "Build psychological resilience through structured mental training exercises",
      tier: "Intermediate",
      unlockRequirement: 990,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "15-1",
          title: "Resilience Science",
          description: "Learn the neuroscience and psychology behind mental resilience",
          type: "lesson",
          xpReward: 55,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "Resilience is the ability to bounce back from adversity stronger than before. Neuroscience shows resilience can be developed through: Stress inoculation (controlled exposure to manageable stress), Cognitive flexibility training, Social support systems, and Meaning-making (finding purpose in challenges). Resilient traders view setbacks as data, not personal failures."
        },
        {
          id: "15-2",
          title: "Resilience Building Exercises",
          description: "Practice specific exercises to strengthen mental resilience",
          type: "challenge",
          xpReward: 30,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 16,
      title: "Pressure Management",
      description: "Learn to perform optimally under high-pressure trading situations",
      tier: "Intermediate",
      unlockRequirement: 1075,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "16-1",
          title: "Pressure Performance Psychology",
          description: "Understand how pressure affects performance and decision-making",
          type: "lesson",
          xpReward: 55,
          duration: "35 min",
          completed: false,
          locked: false,
          content: "Pressure can enhance or impair performance depending on your response. The Yerkes-Dodson law shows optimal performance occurs at moderate arousal levels. Too little pressure leads to complacency; too much causes anxiety and poor decisions. Learn to calibrate pressure through breathing, visualization, and reframing techniques."
        },
        {
          id: "16-2",
          title: "Pressure Simulation Training",
          description: "Practice maintaining composure in high-pressure scenarios",
          type: "challenge",
          xpReward: 30,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 17,
      title: "Decision Making Under Stress",
      description: "Maintain clear thinking and good judgment during stressful market conditions",
      tier: "Intermediate",
      unlockRequirement: 1160,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "17-1",
          title: "Stress and Decision Quality",
          description: "Learn how stress impairs judgment and decision-making processes",
          type: "lesson",
          xpReward: 60,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Stress narrows attention and reduces cognitive flexibility, leading to tunnel vision and poor decisions. Combat this through: Pre-planned decision trees, Stress recognition protocols, Pause-and-breathe techniques, and Environmental controls (reducing distractions). The goal is maintaining analytical thinking even when markets are volatile."
        },
        {
          id: "17-2",
          title: "Decision Framework Practice",
          description: "Apply structured decision-making in stressful scenarios",
          type: "challenge",
          xpReward: 30,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 18,
      title: "Building Mental Toughness",
      description: "Develop the psychological strength to persist through challenges",
      tier: "Intermediate",
      unlockRequirement: 1250,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "18-1",
          title: "Mental Toughness Framework",
          description: "Learn the four pillars of mental toughness for traders",
          type: "lesson",
          xpReward: 60,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Mental toughness consists of four components: Control (managing emotions and responses), Commitment (dedication to goals despite obstacles), Challenge (viewing difficulties as opportunities), and Confidence (belief in abilities). Develop these through progressive challenges, self-talk training, and consistent practice under pressure."
        },
        {
          id: "18-2",
          title: "Toughness Training Protocol",
          description: "Implement a systematic approach to building mental strength",
          type: "project",
          xpReward: 30,
          duration: "35 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 19,
      title: "Advanced Mindfulness Practice",
      description: "Deepen mindfulness skills with advanced techniques and applications",
      tier: "Intermediate",
      unlockRequirement: 1340,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "19-1",
          title: "Mindful Trading Techniques",
          description: "Apply advanced mindfulness to real-time trading situations",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Advanced mindfulness includes: Body scanning during trades (noticing physical tension), Thought observation (watching thoughts without attachment), Emotional surfing (riding emotions without reacting), and Mindful execution (present-moment awareness during trade entry/exit). These skills create space between stimulus and response."
        },
        {
          id: "19-2",
          title: "Mindful Trading Session",
          description: "Practice mindful awareness during a complete trading session",
          type: "challenge",
          xpReward: 30,
          duration: "60 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 20,
      title: "Mental Resilience Assessment",
      description: "Comprehensive evaluation of intermediate psychological skills",
      tier: "Intermediate",
      unlockRequirement: 1435,
      completed: false,
      locked: true,
      totalXP: 150,
      modules: [
        {
          id: "20-1",
          title: "Resilience Mastery Exam",
          description: "Demonstrate mastery of cognitive biases, emotional regulation, and mental toughness",
          type: "assessment",
          xpReward: 100,
          duration: "60 min",
          completed: false,
          locked: false,
          content: "This comprehensive assessment tests your ability to: Identify and counter cognitive biases, Regulate emotions under pressure, Make sound decisions during stress, Apply mindfulness techniques, and Demonstrate mental toughness. Scenarios include losing streaks, high-pressure trades, and emotional challenges."
        },
        {
          id: "20-2",
          title: "Personal Resilience Portfolio",
          description: "Create a comprehensive toolkit of your psychological strategies",
          type: "project",
          xpReward: 50,
          duration: "45 min",
          completed: false,
          locked: false
        }
      ]
    },

    // TIER 3: 7 PILLARS MASTERY (Levels 21-30)
    {
      level: 21,
      title: "The 7 Pillars of Resilience - Introduction",
      description: "Overview of the complete resilience framework for trading excellence",
      tier: "Professional",
      unlockRequirement: 1585,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "21-1",
          title: "The Complete Resilience Framework",
          description: "Introduction to the 7 Pillars system for psychological mastery",
          type: "lesson",
          xpReward: 60,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "The 7 Pillars of Resilience provide a comprehensive framework for psychological strength: 1) Optimism, 2) Acceptance, 3) Solution Orientation, 4) Personal Responsibility, 5) Support Networks, 6) Future Planning, and 7) Self-Reflection. Each pillar reinforces the others, creating an integrated system for mental resilience that enables consistent performance under pressure."
        },
        {
          id: "21-2",
          title: "Pillar Assessment",
          description: "Evaluate your current strength in each of the 7 pillars",
          type: "assessment",
          xpReward: 30,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 22,
      title: "Pillar 1: Optimism and Positive Thinking",
      description: "Develop realistic optimism and positive thinking patterns for trading",
      tier: "Professional",
      unlockRequirement: 1675,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "22-1",
          title: "The Science of Optimism",
          description: "Learn how optimism affects performance and decision-making",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Optimism isn't blind positivity - it's realistic hope based on evidence and effort. Research by Martin Seligman shows optimists perform better under pressure and recover faster from setbacks. For traders, optimism means: Believing in your ability to improve, Viewing losses as temporary and specific, Focusing on what you can control, and Maintaining hope during difficult periods. Develop optimism through gratitude practices, success journaling, and reframing techniques."
        },
        {
          id: "22-2",
          title: "Optimism Training Protocol",
          description: "Implement daily practices to strengthen optimistic thinking",
          type: "project",
          xpReward: 30,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 23,
      title: "Pillar 2: Acceptance and Letting Go",
      description: "Master the art of accepting market outcomes and letting go of control",
      tier: "Professional",
      unlockRequirement: 1770,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "23-1",
          title: "The Power of Acceptance",
          description: "Learn why acceptance is crucial for trading psychology",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Acceptance means acknowledging reality without resistance. In trading, this means accepting: Losses as part of the process, Market unpredictability, Your limitations as a trader, and Outcomes beyond your control. Acceptance reduces emotional suffering and allows clear thinking. Practice radical acceptance: 'This loss happened, and that's okay. What can I learn?'"
        },
        {
          id: "23-2",
          title: "Letting Go Meditation",
          description: "Practice acceptance through guided meditation and reflection",
          type: "challenge",
          xpReward: 30,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 24,
      title: "Pillar 3: Solution-Oriented Mindset",
      description: "Develop a proactive, solution-focused approach to trading challenges",
      tier: "Professional",
      unlockRequirement: 1865,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "24-1",
          title: "From Problems to Solutions",
          description: "Train your mind to automatically seek solutions rather than dwell on problems",
          type: "lesson",
          xpReward: 65,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Solution-oriented thinking shifts focus from 'What went wrong?' to 'How can I improve?' This mindset includes: Rapid problem identification, Creative solution generation, Resource mobilization, and Implementation focus. When facing trading challenges, ask: 'What's the next best action?' rather than dwelling on mistakes."
        },
        {
          id: "24-2",
          title: "Solution-Finding Workshop",
          description: "Practice solution-oriented thinking with trading scenarios",
          type: "challenge",
          xpReward: 30,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 25,
      title: "Pillar 4: Personal Responsibility",
      description: "Take complete ownership of your trading results and decisions",
      tier: "Professional",
      unlockRequirement: 1960,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "25-1",
          title: "Extreme Ownership in Trading",
          description: "Learn to take complete responsibility for all trading outcomes",
          type: "lesson",
          xpReward: 70,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Personal responsibility means owning every aspect of your trading: Your preparation (or lack thereof), Your emotional state, Your risk management, Your decision-making process, and Your results. This eliminates victim mentality and empowers improvement. When you own everything, you can change everything. Practice saying 'I chose this outcome' instead of blaming external factors."
        },
        {
          id: "25-2",
          title: "Responsibility Audit",
          description: "Examine your trading for areas where you avoid responsibility",
          type: "reflection",
          xpReward: 30,
          duration: "25 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 26,
      title: "Pillar 5: Building Support Networks",
      description: "Create and maintain relationships that support your trading psychology",
      tier: "Professional",
      unlockRequirement: 2060,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "26-1",
          title: "The Psychology of Support",
          description: "Understand how relationships impact trading performance",
          type: "lesson",
          xpReward: 70,
          duration: "40 min",
          completed: false,
          locked: false,
          content: "Strong support networks provide: Emotional stability during difficult periods, Objective perspective when you're too close to problems, Accountability for maintaining standards, and Celebration of achievements. Build networks with: Fellow traders, Mentors, Mental health professionals, and Supportive family/friends. Quality matters more than quantity."
        },
        {
          id: "26-2",
          title: "Network Building Strategy",
          description: "Create a plan for building and maintaining your support network",
          type: "project",
          xpReward: 30,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 27,
      title: "Pillar 6: Future Planning and Vision",
      description: "Develop long-term vision and planning skills for sustained motivation",
      tier: "Professional",
      unlockRequirement: 2160,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "27-1",
          title: "Vision-Driven Trading",
          description: "Create compelling long-term visions that sustain motivation",
          type: "lesson",
          xpReward: 70,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "A clear vision provides direction and motivation during difficult periods. Effective visions are: Specific and detailed, Emotionally compelling, Aligned with values, and Achievable but challenging. Your trading vision should encompass: Financial goals, Lifestyle objectives, Skill development targets, and Personal growth aspirations. Review and refine your vision regularly."
        },
        {
          id: "27-2",
          title: "Personal Vision Creation",
          description: "Craft your comprehensive trading and life vision",
          type: "project",
          xpReward: 30,
          duration: "40 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 28,
      title: "Pillar 7: Self-Reflection and Growth",
      description: "Master the practice of continuous self-improvement through reflection",
      tier: "Professional",
      unlockRequirement: 2260,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "28-1",
          title: "The Reflective Trader",
          description: "Learn systematic approaches to self-reflection and growth",
          type: "lesson",
          xpReward: 70,
          duration: "45 min",
          completed: false,
          locked: false,
          content: "Self-reflection is the engine of continuous improvement. Effective reflection includes: Regular review of decisions and outcomes, Honest assessment of strengths and weaknesses, Identification of patterns and trends, and Planning for improvement. Use structured reflection frameworks: What went well? What could improve? What will I do differently? Make reflection a daily habit, not just after losses."
        },
        {
          id: "28-2",
          title: "Reflection Mastery System",
          description: "Design your personal system for ongoing self-improvement",
          type: "project",
          xpReward: 30,
          duration: "35 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 29,
      title: "Peak Performance Psychology",
      description: "Achieve and maintain peak psychological performance in trading",
      tier: "Professional",
      unlockRequirement: 2360,
      completed: false,
      locked: true,
      totalXP: 110,
      modules: [
        {
          id: "29-1",
          title: "Flow State Trading",
          description: "Learn to achieve and maintain flow states during trading",
          type: "lesson",
          xpReward: 80,
          duration: "50 min",
          completed: false,
          locked: false,
          content: "Flow state is optimal performance where action and awareness merge. Characteristics include: Complete focus on the task, Clear goals and immediate feedback, Balance between challenge and skill, and Loss of self-consciousness. Achieve flow through: Proper preparation, Clear objectives, Minimizing distractions, and Matching challenge to skill level. Flow states lead to peak trading performance."
        },
        {
          id: "29-2",
          title: "Peak Performance Protocol",
          description: "Develop your personal system for achieving peak states",
          type: "project",
          xpReward: 30,
          duration: "30 min",
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 30,
      title: "Psychology Mastery Assessment",
      description: "Final comprehensive evaluation and certification in trading psychology",
      tier: "Professional",
      unlockRequirement: 2470,
      completed: false,
      locked: true,
      totalXP: 200,
      modules: [
        {
          id: "30-1",
          title: "Master Psychology Examination",
          description: "Comprehensive assessment of all psychological skills and knowledge",
          type: "assessment",
          xpReward: 150,
          duration: "90 min",
          completed: false,
          locked: false,
          content: "This final examination tests mastery across all areas: Emotional regulation under extreme pressure, Cognitive bias identification and correction, Application of all 7 Pillars of Resilience, Peak performance achievement, and Integration of psychological skills with trading execution. Successful completion certifies you as a master of trading psychology."
        },
        {
          id: "30-2",
          title: "Psychology Mastery Thesis",
          description: "Create your comprehensive trading psychology framework",
          type: "project",
          xpReward: 50,
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
                  <Brain className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Psychology Quiz</h3>
                  <p className="text-muted-foreground mb-6">Test your understanding and earn XP!</p>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Start Quiz
                  </Button>
                </div>
              </div>
            )}

            {module.type === 'assessment' && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Psychological Assessment</h3>
                  <p className="text-muted-foreground mb-6">Comprehensive evaluation of your psychological skills</p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Begin Assessment
                  </Button>
                </div>
              </div>
            )}

            {module.type === 'project' && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Psychology Project</h3>
                  <p className="text-muted-foreground mb-6">Apply psychological concepts in practical exercises</p>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Start Project
                  </Button>
                </div>
              </div>
            )}

            {module.type === 'challenge' && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Target className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Psychology Challenge</h3>
                  <p className="text-muted-foreground mb-6">Practice psychological skills in real scenarios</p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Accept Challenge
                  </Button>
                </div>
              </div>
            )}

            {module.type === 'reflection' && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Compass className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Self-Reflection</h3>
                  <p className="text-muted-foreground mb-6">Guided introspection for personal growth</p>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Begin Reflection
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
        {selectedModule ? (
          renderModuleContent(selectedModule)
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-muted/20">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="beginner">Emotional Foundations</TabsTrigger>
              <TabsTrigger value="intermediate">Mental Resilience</TabsTrigger>
              <TabsTrigger value="professional">7 Pillars Mastery</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Learning Path Overview */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  Master Trading Psychology Through
                  <span className="block gradient-text">30 Progressive Levels</span>
                </h2>
                <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                  Develop the mental framework and emotional discipline required for consistent trading success 
                  through systematic psychological training combining neuroscience, positive psychology, and habit-building.
                </p>
              </div>

              {/* Tier Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <Heart className="w-5 h-5 text-green-500" />
                      </div>
                      <span>Emotional Foundations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-green-500">Levels 1-10</div>
                      <p className="text-sm text-muted-foreground">
                        Build emotional awareness, basic discipline, and fundamental psychological skills.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{getTierProgress('Beginner').toFixed(0)}%</span>
                        </div>
                        <Progress value={getTierProgress('Beginner')} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total XP Available: 670
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="military-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <Shield className="w-5 h-5 text-blue-500" />
                      </div>
                      <span>Mental Resilience</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-blue-500">Levels 11-20</div>
                      <p className="text-sm text-muted-foreground">
                        Advanced emotional regulation, cognitive bias mastery, and mental toughness.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{getTierProgress('Intermediate').toFixed(0)}%</span>
                        </div>
                        <Progress value={getTierProgress('Intermediate')} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total XP Available: 835
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
                      <span>7 Pillars Mastery</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-purple-500">Levels 21-30</div>
                      <p className="text-sm text-muted-foreground">
                        Master the 7 Pillars of Resilience and achieve peak performance psychology.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{getTierProgress('Professional').toFixed(0)}%</span>
                        </div>
                        <Progress value={getTierProgress('Professional')} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total XP Available: 980
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
                      <span>Continue Your Psychological Development</span>
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
                          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                          onClick={() => setSelectedModule(currentLevelData.modules[0])}
                        >
                          Continue Learning
                          <Brain className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Psychology Skills Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="military-card text-center">
                  <CardContent className="p-6">
                    <div className="bg-green-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Smile className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Emotional Control</h3>
                    <p className="text-sm text-muted-foreground">Master fear, greed, hope, and regret</p>
                  </CardContent>
                </Card>

                <Card className="military-card text-center">
                  <CardContent className="p-6">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Cognitive Clarity</h3>
                    <p className="text-sm text-muted-foreground">Overcome biases and think clearly</p>
                  </CardContent>
                </Card>

                <Card className="military-card text-center">
                  <CardContent className="p-6">
                    <div className="bg-purple-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-purple-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Mental Resilience</h3>
                    <p className="text-sm text-muted-foreground">Bounce back stronger from setbacks</p>
                  </CardContent>
                </Card>

                <Card className="military-card text-center">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Peak Performance</h3>
                    <p className="text-sm text-muted-foreground">Achieve flow states and optimal execution</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="beginner" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Emotional Foundations (Levels 1-10)</h2>
                <p className="text-lg text-muted-foreground">
                  Build emotional awareness, basic discipline, and fundamental psychological skills for trading success.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningLevels.filter(level => level.tier === 'Beginner').map(renderLevelCard)}
              </div>
            </TabsContent>

            <TabsContent value="intermediate" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Mental Resilience (Levels 11-20)</h2>
                <p className="text-lg text-muted-foreground">
                  Develop advanced emotional regulation, cognitive bias mastery, and mental toughness under pressure.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningLevels.filter(level => level.tier === 'Intermediate').map(renderLevelCard)}
              </div>
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">7 Pillars Mastery (Levels 21-30)</h2>
                <p className="text-lg text-muted-foreground">
                  Master the 7 Pillars of Resilience and achieve peak performance psychology for elite trading.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningLevels.filter(level => level.tier === 'Professional').map(renderLevelCard)}
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Your Psychological Development</h2>
                <p className="text-lg text-muted-foreground">
                  Track your advancement through the Trading Psychology curriculum and psychological growth.
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

              {/* Psychological Achievements */}
              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-secondary" />
                    <span>Psychological Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-sm font-medium">Emotional Awareness</div>
                      <div className="text-xs text-muted-foreground">Complete Level 2</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                      <Shield className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-medium">Bias Buster</div>
                      <div className="text-xs text-muted-foreground">Master Cognitive Biases</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                      <Brain className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-medium">Resilience Master</div>
                      <div className="text-xs text-muted-foreground">Complete 7 Pillars</div>
                    </div>
                    <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                      <Trophy className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-sm font-medium">Psychology Expert</div>
                      <div className="text-xs text-muted-foreground">Complete Level 30</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skill Development Tracking */}
              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <span>Psychological Skill Development</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Emotional Regulation</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Cognitive Bias Control</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Mental Resilience</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Peak Performance</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
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