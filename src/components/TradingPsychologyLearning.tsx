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
  Target, 
  Shield, 
  Award, 
  CheckCircle, 
  Lock, 
  PlayCircle,
  Trophy,
  Star,
  Zap,
  Activity,
  BarChart3,
  Heart,
  Eye,
  Lightbulb,
  Flame,
  Coins
} from 'lucide-react';

interface TradingPsychologyLearningProps {
  onBack: () => void;
  onLogout: () => void;
}

export const TradingPsychologyLearning: React.FC<TradingPsychologyLearningProps> = ({ onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userLevel, setUserLevel] = useState(3);
  const [userXP, setUserXP] = useState(185);

  // Trading Psychology Learning Path (30 levels)
  const learningLevels = [
    // TIER 1: EMOTIONAL (Levels 1-10)
    {
      level: 1,
      title: "Understanding Trading Emotions",
      description: "Recognize and identify the primary emotions that affect trading decisions",
      tier: "Emotional",
      unlockRequirement: 0,
      completed: true,
      locked: false,
      totalXP: 50,
      modules: [
        {
          id: "tp-1-1",
          title: "Fear and Greed in Trading",
          description: "Understanding how fear and greed drive market behavior and personal decisions",
          type: "lesson",
          xpReward: 30,
          duration: "20 min",
          completed: true,
          content: "Fear and greed are the two primary emotions that destroy trading accounts. Fear causes premature exits from winning trades and prevents entries on good setups. Greed leads to overtrading, oversizing positions, and holding losing trades too long..."
        },
        {
          id: "tp-1-2",
          title: "Emotion Recognition Quiz",
          description: "Test your ability to identify emotional trading patterns",
          type: "quiz",
          xpReward: 20,
          duration: "10 min",
          completed: true
        }
      ]
    },
    {
      level: 2,
      title: "Cognitive Biases in Trading",
      description: "Identify and understand common cognitive biases that affect trading performance",
      tier: "Emotional",
      unlockRequirement: 50,
      completed: true,
      locked: false,
      totalXP: 60,
      modules: [
        {
          id: "tp-2-1",
          title: "Common Trading Biases",
          description: "Confirmation bias, overconfidence, anchoring, and availability heuristic",
          type: "lesson",
          xpReward: 40,
          duration: "25 min",
          completed: true,
          content: "Confirmation bias makes us seek information that confirms our existing beliefs while ignoring contradictory evidence. In trading, this leads to holding losing positions too long and missing exit signals..."
        },
        {
          id: "tp-2-2",
          title: "Bias Assessment",
          description: "Evaluate your personal susceptibility to cognitive biases",
          type: "assessment",
          xpReward: 20,
          duration: "15 min",
          completed: true
        }
      ]
    },
    {
      level: 3,
      title: "Emotional Regulation Techniques",
      description: "Learn practical techniques for managing emotions during trading",
      tier: "Emotional",
      unlockRequirement: 110,
      completed: false,
      locked: false,
      totalXP: 65,
      modules: [
        {
          id: "tp-3-1",
          title: "Breathing and Mindfulness",
          description: "Practical techniques for maintaining emotional control",
          type: "lesson",
          xpReward: 45,
          duration: "30 min",
          completed: false,
          content: "Controlled breathing activates the parasympathetic nervous system, reducing stress and improving decision-making. The 4-7-8 technique: inhale for 4, hold for 7, exhale for 8..."
        },
        {
          id: "tp-3-2",
          title: "Emotional Control Practice",
          description: "Practice emotional regulation techniques in simulated scenarios",
          type: "project",
          xpReward: 20,
          duration: "45 min",
          completed: false
        }
      ]
    },
    {
      level: 4,
      title: "Developing Trading Discipline",
      description: "Build systematic discipline and rule-following capabilities",
      tier: "Emotional",
      unlockRequirement: 175,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "tp-4-1",
          title: "Discipline Framework",
          description: "Systematic approach to building and maintaining trading discipline",
          type: "lesson",
          xpReward: 50,
          duration: "35 min",
          completed: false,
          content: "Discipline is following your plan when emotions suggest otherwise. Create pre-market routines, use checklists, maintain detailed records, and implement accountability systems..."
        },
        {
          id: "tp-4-2",
          title: "Discipline Challenge",
          description: "30-day discipline building challenge with daily exercises",
          type: "project",
          xpReward: 20,
          duration: "30 days",
          completed: false
        }
      ]
    },
    {
      level: 5,
      title: "Stress Management Under Pressure",
      description: "Maintain performance under high-pressure trading situations",
      tier: "Emotional",
      unlockRequirement: 245,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "tp-5-1",
          title: "Pressure Performance",
          description: "Techniques for maintaining clarity during high-stress trading",
          type: "lesson",
          xpReward: 55,
          duration: "40 min",
          completed: false,
          content: "High-pressure situations reveal character. Develop pre-planned responses to common stress scenarios: large losses, missed opportunities, and system failures..."
        },
        {
          id: "tp-5-2",
          title: "Stress Testing Exercise",
          description: "Practice decision-making under simulated pressure",
          type: "project",
          xpReward: 20,
          duration: "60 min",
          completed: false
        }
      ]
    },
    {
      level: 6,
      title: "Confidence Building & Self-Efficacy",
      description: "Develop genuine confidence based on competence and preparation",
      tier: "Emotional",
      unlockRequirement: 320,
      completed: false,
      locked: true,
      totalXP: 70,
      modules: [
        {
          id: "tp-6-1",
          title: "Competence-Based Confidence",
          description: "Building genuine confidence through systematic skill development",
          type: "lesson",
          xpReward: 50,
          duration: "30 min",
          completed: false,
          content: "True confidence comes from competence, not positive thinking. Document your edge, track your performance, and build confidence through systematic skill development..."
        },
        {
          id: "tp-6-2",
          title: "Confidence Assessment",
          description: "Evaluate and strengthen your trading confidence",
          type: "assessment",
          xpReward: 20,
          duration: "25 min",
          completed: false
        }
      ]
    },
    {
      level: 7,
      title: "Patience & Timing Mastery",
      description: "Develop the patience required for optimal trade timing",
      tier: "Emotional",
      unlockRequirement: 390,
      completed: false,
      locked: true,
      totalXP: 75,
      modules: [
        {
          id: "tp-7-1",
          title: "Strategic Patience",
          description: "The competitive advantage of patience in trading",
          type: "lesson",
          xpReward: 55,
          duration: "35 min",
          completed: false,
          content: "Patience is a competitive advantage. Most traders act too quickly, missing optimal entries and exits. Develop systematic waiting protocols and opportunity recognition..."
        },
        {
          id: "tp-7-2",
          title: "Patience Training",
          description: "Practical exercises for developing trading patience",
          type: "project",
          xpReward: 20,
          duration: "50 min",
          completed: false
        }
      ]
    },
    {
      level: 8,
      title: "Focus & Concentration Enhancement",
      description: "Optimize mental focus and concentration for trading performance",
      tier: "Emotional",
      unlockRequirement: 465,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "tp-8-1",
          title: "Attention Management",
          description: "Techniques for maintaining focus during trading sessions",
          type: "lesson",
          xpReward: 60,
          duration: "40 min",
          completed: false,
          content: "Sustained attention is crucial for trading success. Eliminate distractions, use time-blocking, practice meditation, and develop single-tasking capabilities..."
        },
        {
          id: "tp-8-2",
          title: "Focus Enhancement Program",
          description: "Implement systematic focus improvement techniques",
          type: "project",
          xpReward: 20,
          duration: "60 min",
          completed: false
        }
      ]
    },
    {
      level: 9,
      title: "Habit Formation & Routine Development",
      description: "Create powerful habits and routines that support trading success",
      tier: "Emotional",
      unlockRequirement: 545,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "tp-9-1",
          title: "Trading Habits & Routines",
          description: "Design and implement powerful trading habits",
          type: "lesson",
          xpReward: 60,
          duration: "35 min",
          completed: false,
          content: "Habits reduce decision fatigue and ensure consistency. Develop pre-market routines, post-trade reviews, and systematic preparation protocols..."
        },
        {
          id: "tp-9-2",
          title: "Habit Implementation",
          description: "Build your personal trading habit system",
          type: "project",
          xpReward: 20,
          duration: "21 days",
          completed: false
        }
      ]
    },
    {
      level: 10,
      title: "Emotional Tier Assessment",
      description: "Comprehensive evaluation of emotional trading mastery",
      tier: "Emotional",
      unlockRequirement: 625,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "tp-10-1",
          title: "Emotional Mastery Exam",
          description: "Test all emotional regulation and psychological concepts",
          type: "assessment",
          xpReward: 100,
          duration: "75 min",
          completed: false,
          content: "Comprehensive assessment covering emotion recognition, bias awareness, regulation techniques, discipline, stress management, confidence, patience, focus, and habits..."
        }
      ]
    },

    // TIER 2: RESILIENCE (Levels 11-20)
    {
      level: 11,
      title: "Introduction to the 7 Pillars of Resilience",
      description: "Overview of the complete resilience framework for traders",
      tier: "Resilience",
      unlockRequirement: 725,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "tp-11-1",
          title: "The 7 Pillars Framework",
          description: "Comprehensive introduction to resilience pillars",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          content: "The 7 Pillars of Resilience: 1) Optimism, 2) Acceptance, 3) Solution Orientation, 4) Responsibility, 5) Support Network, 6) Future Planning, 7) Self-Reflection..."
        },
        {
          id: "tp-11-2",
          title: "Resilience Assessment",
          description: "Evaluate your current resilience across all pillars",
          type: "assessment",
          xpReward: 20,
          duration: "30 min",
          completed: false
        }
      ]
    },
    {
      level: 12,
      title: "Pillar 1: Optimism & Positive Mindset",
      description: "Develop realistic optimism and positive thinking patterns",
      tier: "Resilience",
      unlockRequirement: 810,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "tp-12-1",
          title: "Realistic Optimism",
          description: "Balanced optimism that acknowledges reality while maintaining hope",
          type: "lesson",
          xpReward: 60,
          duration: "40 min",
          completed: false,
          content: "Realistic optimism acknowledges challenges while maintaining belief in positive outcomes. This isn't blind positivity but evidence-based confidence in your ability to adapt and overcome..."
        },
        {
          id: "tp-12-2",
          title: "Optimism Practice",
          description: "Daily exercises for developing optimistic thinking patterns",
          type: "project",
          xpReward: 20,
          duration: "14 days",
          completed: false
        }
      ]
    },
    {
      level: 13,
      title: "Pillar 2: Acceptance & Letting Go",
      description: "Master acceptance of market uncertainty and uncontrollable factors",
      tier: "Resilience",
      unlockRequirement: 890,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "tp-13-1",
          title: "Radical Acceptance",
          description: "Accepting market reality without resistance or denial",
          type: "lesson",
          xpReward: 60,
          duration: "35 min",
          completed: false,
          content: "Acceptance doesn't mean passivity. It means acknowledging reality without wasting energy on resistance. Accept losses, market volatility, and uncertainty as part of trading..."
        },
        {
          id: "tp-13-2",
          title: "Acceptance Meditation",
          description: "Guided meditation practices for developing acceptance",
          type: "project",
          xpReward: 20,
          duration: "21 days",
          completed: false
        }
      ]
    },
    {
      level: 14,
      title: "Pillar 3: Solution Orientation",
      description: "Focus on solutions rather than problems in trading challenges",
      tier: "Resilience",
      unlockRequirement: 970,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "tp-14-1",
          title: "Solution-Focused Thinking",
          description: "Systematic approach to problem-solving in trading",
          type: "lesson",
          xpReward: 65,
          duration: "40 min",
          completed: false,
          content: "Solution orientation shifts focus from what went wrong to what can be done. When facing trading challenges, immediately ask: 'What can I learn?' and 'How can I improve?'..."
        },
        {
          id: "tp-14-2",
          title: "Problem-Solving Framework",
          description: "Develop systematic problem-solving protocols",
          type: "project",
          xpReward: 20,
          duration: "45 min",
          completed: false
        }
      ]
    },
    {
      level: 15,
      title: "Pillar 4: Personal Responsibility",
      description: "Take complete ownership of trading results and decisions",
      tier: "Resilience",
      unlockRequirement: 1055,
      completed: false,
      locked: true,
      totalXP: 80,
      modules: [
        {
          id: "tp-15-1",
          title: "Extreme Ownership",
          description: "Taking complete responsibility for all trading outcomes",
          type: "lesson",
          xpReward: 60,
          duration: "35 min",
          completed: false,
          content: "Extreme ownership means taking responsibility for everything in your trading: losses, missed opportunities, system failures, and external events. This mindset creates power and control..."
        },
        {
          id: "tp-15-2",
          title: "Responsibility Practice",
          description: "Exercises for developing ownership mindset",
          type: "project",
          xpReward: 20,
          duration: "30 min",
          completed: false
        }
      ]
    },
    {
      level: 16,
      title: "Pillar 5: Support Network Development",
      description: "Build and maintain supportive relationships for trading success",
      tier: "Resilience",
      unlockRequirement: 1135,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "tp-16-1",
          title: "Building Support Systems",
          description: "Creating networks of support for trading challenges",
          type: "lesson",
          xpReward: 65,
          duration: "40 min",
          completed: false,
          content: "Trading can be isolating. Build support networks: mentors for guidance, peers for accountability, family for emotional support, and professionals for specialized help..."
        },
        {
          id: "tp-16-2",
          title: "Network Development Plan",
          description: "Create your personal support network strategy",
          type: "project",
          xpReward: 20,
          duration: "60 min",
          completed: false
        }
      ]
    },
    {
      level: 17,
      title: "Pillar 6: Future Planning & Vision",
      description: "Develop clear vision and systematic planning for trading success",
      tier: "Resilience",
      unlockRequirement: 1220,
      completed: false,
      locked: true,
      totalXP: 85,
      modules: [
        {
          id: "tp-17-1",
          title: "Vision Development",
          description: "Creating compelling vision for your trading future",
          type: "lesson",
          xpReward: 65,
          duration: "45 min",
          completed: false,
          content: "Clear vision provides direction and motivation during difficult periods. Define your trading goals, lifestyle objectives, and long-term aspirations with specific detail..."
        },
        {
          id: "tp-17-2",
          title: "Vision Board Creation",
          description: "Create visual representation of your trading goals",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false
        }
      ]
    },
    {
      level: 18,
      title: "Pillar 7: Self-Reflection & Continuous Improvement",
      description: "Master self-reflection and systematic improvement processes",
      tier: "Resilience",
      unlockRequirement: 1305,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "tp-18-1",
          title: "Systematic Self-Reflection",
          description: "Structured approaches to self-analysis and improvement",
          type: "lesson",
          xpReward: 70,
          duration: "50 min",
          completed: false,
          content: "Self-reflection accelerates learning. Implement daily reviews, weekly assessments, monthly evaluations, and quarterly strategic planning sessions..."
        },
        {
          id: "tp-18-2",
          title: "Reflection System",
          description: "Implement comprehensive self-reflection protocols",
          type: "project",
          xpReward: 20,
          duration: "75 min",
          completed: false
        }
      ]
    },
    {
      level: 19,
      title: "Integrating the 7 Pillars",
      description: "Combine all pillars into a cohesive resilience framework",
      tier: "Resilience",
      unlockRequirement: 1395,
      completed: false,
      locked: true,
      totalXP: 90,
      modules: [
        {
          id: "tp-19-1",
          title: "Pillar Integration",
          description: "Combining all resilience pillars into daily practice",
          type: "lesson",
          xpReward: 70,
          duration: "45 min",
          completed: false,
          content: "The 7 Pillars work synergistically. Optimism supports acceptance, solution orientation requires responsibility, support networks enable future planning, and self-reflection strengthens all pillars..."
        },
        {
          id: "tp-19-2",
          title: "Integrated Practice",
          description: "Implement complete 7 Pillars daily practice",
          type: "project",
          xpReward: 20,
          duration: "30 days",
          completed: false
        }
      ]
    },
    {
      level: 20,
      title: "Resilience Tier Assessment",
      description: "Comprehensive evaluation of resilience mastery",
      tier: "Resilience",
      unlockRequirement: 1485,
      completed: false,
      locked: true,
      totalXP: 150,
      modules: [
        {
          id: "tp-20-1",
          title: "Resilience Mastery Exam",
          description: "Test complete understanding and application of 7 Pillars",
          type: "assessment",
          xpReward: 100,
          duration: "90 min",
          completed: false,
          content: "Comprehensive assessment of all 7 Pillars through practical scenarios, case studies, and application exercises..."
        },
        {
          id: "tp-20-2",
          title: "Resilience Case Study",
          description: "Present personal resilience development journey",
          type: "project",
          xpReward: 50,
          duration: "120 min",
          completed: false
        }
      ]
    },

    // TIER 3: MASTERY (Levels 21-30)
    {
      level: 21,
      title: "Advanced Mental Models",
      description: "Sophisticated mental frameworks for trading decision-making",
      tier: "Mastery",
      unlockRequirement: 1635,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "tp-21-1",
          title: "Mental Model Development",
          description: "Creating and using advanced mental models for trading",
          type: "lesson",
          xpReward: 75,
          duration: "50 min",
          completed: false,
          content: "Mental models are thinking tools that help process complex information quickly and accurately. Develop models for: risk assessment, opportunity evaluation, and decision-making under uncertainty..."
        },
        {
          id: "tp-21-2",
          title: "Personal Mental Models",
          description: "Create your personal mental model toolkit",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false
        }
      ]
    },
    {
      level: 22,
      title: "Peak Performance Psychology",
      description: "Achieve and maintain peak psychological performance",
      tier: "Mastery",
      unlockRequirement: 1730,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "tp-22-1",
          title: "Flow State Mastery",
          description: "Achieving and maintaining flow states during trading",
          type: "lesson",
          xpReward: 80,
          duration: "55 min",
          completed: false,
          content: "Flow states optimize performance through complete focus and effortless execution. Develop triggers for entering flow: environmental cues, mental preparation, and systematic routines..."
        },
        {
          id: "tp-22-2",
          title: "Flow State Training",
          description: "Practice achieving flow states consistently",
          type: "project",
          xpReward: 20,
          duration: "60 min",
          completed: false
        }
      ]
    },
    {
      level: 23,
      title: "Leadership Psychology",
      description: "Develop leadership mindset and influence capabilities",
      tier: "Mastery",
      unlockRequirement: 1830,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "tp-23-1",
          title: "Trading Leadership",
          description: "Leadership principles applied to trading and team management",
          type: "lesson",
          xpReward: 75,
          duration: "50 min",
          completed: false,
          content: "Leadership in trading means taking charge of your development, influencing others positively, and creating value for the community. Develop influence through competence and character..."
        },
        {
          id: "tp-23-2",
          title: "Leadership Development",
          description: "Implement leadership practices in your trading",
          type: "project",
          xpReward: 20,
          duration: "75 min",
          completed: false
        }
      ]
    },
    {
      level: 24,
      title: "Advanced Stress Optimization",
      description: "Transform stress into competitive advantage",
      tier: "Mastery",
      unlockRequirement: 1925,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "tp-24-1",
          title: "Stress as Advantage",
          description: "Using stress and pressure as performance enhancers",
          type: "lesson",
          xpReward: 80,
          duration: "45 min",
          completed: false,
          content: "Elite performers use stress as fuel. Learn to reframe pressure as opportunity, use adrenaline for enhanced focus, and maintain clarity under extreme conditions..."
        },
        {
          id: "tp-24-2",
          title: "Stress Optimization Protocol",
          description: "Develop personal stress optimization system",
          type: "project",
          xpReward: 20,
          duration: "60 min",
          completed: false
        }
      ]
    },
    {
      level: 25,
      title: "Intuition Development & Market Feel",
      description: "Develop and trust your trading intuition and market sense",
      tier: "Mastery",
      unlockRequirement: 2025,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "tp-25-1",
          title: "Trading Intuition",
          description: "Developing and trusting your market intuition",
          type: "lesson",
          xpReward: 75,
          duration: "50 min",
          completed: false,
          content: "Intuition is pattern recognition operating below conscious awareness. Develop market feel through extensive screen time, systematic observation, and trusting your subconscious processing..."
        },
        {
          id: "tp-25-2",
          title: "Intuition Training",
          description: "Exercises for developing trading intuition",
          type: "project",
          xpReward: 20,
          duration: "90 min",
          completed: false
        }
      ]
    },
    {
      level: 26,
      title: "Identity Formation & Professional Self",
      description: "Forge your identity as a professional trader and market operator",
      tier: "Mastery",
      unlockRequirement: 2120,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "tp-26-1",
          title: "Professional Identity",
          description: "Developing identity as professional trader and market operator",
          type: "lesson",
          xpReward: 80,
          duration: "55 min",
          completed: false,
          content: "Identity shapes behavior. Transform from 'someone who trades' to 'professional trader.' This identity shift affects decision-making, risk tolerance, and long-term commitment..."
        },
        {
          id: "tp-26-2",
          title: "Identity Integration",
          description: "Integrate professional trader identity into daily life",
          type: "project",
          xpReward: 20,
          duration: "60 days",
          completed: false
        }
      ]
    },
    {
      level: 27,
      title: "Mastery Mindset & Continuous Learning",
      description: "Develop the mindset of continuous improvement and mastery pursuit",
      tier: "Mastery",
      unlockRequirement: 2220,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "tp-27-1",
          title: "Mastery Psychology",
          description: "The psychology of continuous improvement and skill development",
          type: "lesson",
          xpReward: 75,
          duration: "50 min",
          completed: false,
          content: "Mastery is a journey, not a destination. Embrace the beginner's mind, seek feedback actively, practice deliberately, and maintain curiosity about markets and yourself..."
        },
        {
          id: "tp-27-2",
          title: "Mastery Plan",
          description: "Create your lifelong learning and mastery plan",
          type: "project",
          xpReward: 20,
          duration: "120 min",
          completed: false
        }
      ]
    },
    {
      level: 28,
      title: "Teaching & Mentorship Psychology",
      description: "Develop the psychology of teaching and mentoring others",
      tier: "Mastery",
      unlockRequirement: 2315,
      completed: false,
      locked: true,
      totalXP: 100,
      modules: [
        {
          id: "tp-28-1",
          title: "Mentorship Mindset",
          description: "Psychology of effective teaching and mentorship",
          type: "lesson",
          xpReward: 80,
          duration: "45 min",
          completed: false,
          content: "Teaching others deepens your own understanding. Develop patience, empathy, and systematic teaching methods. Great traders often become great teachers..."
        },
        {
          id: "tp-28-2",
          title: "Mentorship Practice",
          description: "Begin mentoring junior traders",
          type: "project",
          xpReward: 20,
          duration: "ongoing",
          completed: false
        }
      ]
    },
    {
      level: 29,
      title: "Legacy & Impact Psychology",
      description: "Develop psychology of creating lasting impact and legacy",
      tier: "Mastery",
      unlockRequirement: 2415,
      completed: false,
      locked: true,
      totalXP: 95,
      modules: [
        {
          id: "tp-29-1",
          title: "Legacy Thinking",
          description: "Psychology of creating lasting impact in trading and life",
          type: "lesson",
          xpReward: 75,
          duration: "50 min",
          completed: false,
          content: "Legacy thinking extends beyond personal success to community impact. Consider how your trading journey can inspire, educate, and elevate others in the trading community..."
        },
        {
          id: "tp-29-2",
          title: "Legacy Project",
          description: "Design your contribution to the trading community",
          type: "project",
          xpReward: 20,
          duration: "180 min",
          completed: false
        }
      ]
    },
    {
      level: 30,
      title: "Psychology Mastery Certification",
      description: "Final assessment and certification in trading psychology mastery",
      tier: "Mastery",
      unlockRequirement: 2510,
      completed: false,
      locked: true,
      totalXP: 200,
      modules: [
        {
          id: "tp-30-1",
          title: "Psychology Mastery Exam",
          description: "Comprehensive master-level psychology assessment",
          type: "assessment",
          xpReward: 150,
          duration: "120 min",
          completed: false,
          content: "Final examination testing complete mastery of trading psychology: emotional regulation, resilience, mental models, peak performance, leadership, and legacy thinking..."
        },
        {
          id: "tp-30-2",
          title: "Psychology Mastery Thesis",
          description: "Present comprehensive psychology development case study",
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
      case 'Emotional': return 'bg-red-500';
      case 'Resilience': return 'bg-blue-500';
      case 'Mastery': return 'bg-purple-500';
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
                  <Brain className="w-6 h-6 text-secondary" />
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
              <div className="flex items-center space-x-1 text-secondary">
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
                  <Brain className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">Trading Psychology</h1>
                  <p className="text-sm text-foreground/70">Mental Framework & Discipline</p>
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
            <TabsTrigger value="emotional">Emotional</TabsTrigger>
            <TabsTrigger value="resilience">Resilience</TabsTrigger>
            <TabsTrigger value="mastery">Mastery</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Learning Path Overview */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Trading Psychology Mastery
                <span className="block gradient-text">Mental Framework & Discipline</span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Forge the mental conditioning required for consistent market success. Master the 7 Pillars of Resilience 
                and develop the psychological edge that separates professionals from amateurs.
              </p>
            </div>

            {/* Tier Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="military-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="bg-red-500/20 p-2 rounded-lg">
                      <Heart className="w-5 h-5 text-red-500" />
                    </div>
                    <span>Emotional Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-red-500">Levels 1-10</div>
                    <p className="text-sm text-muted-foreground">
                      Emotional awareness, bias recognition, regulation techniques, and discipline building.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{getTierProgress('Emotional').toFixed(0)}%</span>
                      </div>
                      <Progress value={getTierProgress('Emotional')} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total XP Available: 725
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
                    <span>Resilience Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-blue-500">Levels 11-20</div>
                    <p className="text-sm text-muted-foreground">
                      The 7 Pillars of Resilience framework for psychological strength and recovery.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{getTierProgress('Resilience').toFixed(0)}%</span>
                      </div>
                      <Progress value={getTierProgress('Resilience')} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total XP Available: 910
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
                    <span>Mastery Tier</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-purple-500">Levels 21-30</div>
                    <p className="text-sm text-muted-foreground">
                      Advanced mental models, peak performance, leadership psychology, and legacy thinking.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{getTierProgress('Mastery').toFixed(0)}%</span>
                      </div>
                      <Progress value={getTierProgress('Mastery')} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total XP Available: 975
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 7 Pillars Overview */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>The 7 Pillars of Resilience</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Optimism', description: 'Realistic positive outlook', icon: Lightbulb, level: 12 },
                    { name: 'Acceptance', description: 'Embracing market reality', icon: Eye, level: 13 },
                    { name: 'Solution Focus', description: 'Problem-solving mindset', icon: Target, level: 14 },
                    { name: 'Responsibility', description: 'Extreme ownership', icon: Shield, level: 15 },
                    { name: 'Support Network', description: 'Building relationships', icon: Heart, level: 16 },
                    { name: 'Future Planning', description: 'Vision and goals', icon: Star, level: 17 },
                    { name: 'Self-Reflection', description: 'Continuous improvement', icon: Brain, level: 18 }
                  ].map((pillar, index) => (
                    <div key={index} className="text-center p-4 bg-muted/10 rounded-lg">
                      <pillar.icon className="w-8 h-8 text-secondary mx-auto mb-2" />
                      <div className="font-semibold text-sm mb-1">{pillar.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">{pillar.description}</div>
                      <Badge variant="outline" className="text-xs">
                        Level {pillar.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emotional" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Emotional Tier (Levels 1-10)</h2>
              <p className="text-lg text-muted-foreground">
                Master emotional awareness, regulation, and the foundation of trading psychology.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningLevels.filter(level => level.tier === 'Emotional').map(renderLevelCard)}
            </div>
          </TabsContent>

          <TabsContent value="resilience" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Resilience Tier (Levels 11-20)</h2>
              <p className="text-lg text-muted-foreground">
                Develop the 7 Pillars of Resilience for psychological strength and recovery.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningLevels.filter(level => level.tier === 'Resilience').map(renderLevelCard)}
            </div>
          </TabsContent>

          <TabsContent value="mastery" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Mastery Tier (Levels 21-30)</h2>
              <p className="text-lg text-muted-foreground">
                Achieve complete psychological mastery and develop leadership psychology.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningLevels.filter(level => level.tier === 'Mastery').map(renderLevelCard)}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Psychology Development Progress</h2>
              <p className="text-lg text-muted-foreground">
                Track your advancement through the complete Trading Psychology curriculum.
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

            {/* Psychological Achievements */}
            <Card className="military-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Psychology Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <Brain className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <div className="text-sm font-medium">Emotion Aware</div>
                    <div className="text-xs text-muted-foreground">Complete Level 1</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">Bias Hunter</div>
                    <div className="text-xs text-muted-foreground">Complete Level 2</div>
                  </div>
                  <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                    <Shield className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <div className="text-sm font-medium">Discipline Warrior</div>
                    <div className="text-xs text-muted-foreground">Complete Level 4</div>
                  </div>
                  <div className="text-center p-4 bg-muted/10 rounded-lg opacity-50">
                    <Crown className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <div className="text-sm font-medium">Resilience Master</div>
                    <div className="text-xs text-muted-foreground">Complete Level 20</div>
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