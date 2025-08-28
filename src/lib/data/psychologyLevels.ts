import type { LearningLevel } from '$lib/types/learning';

// Psychology Beginner Levels (3-10)
export const PSYCHOLOGY_BEGINNER_LEVELS: LearningLevel[] = [
	{
		level: 3,
		title: "Fear and Greed Management",
		description: "Master the two primary emotions that destroy trading accounts",
		tier: "Beginner",
		unlockRequirement: 125,
		completed: false,
		locked: true,
		totalXP: 60,
		modules: [
			{
				id: "3-1",
				title: "Understanding Fear in Trading",
				description: "Recognize and overcome fear-based decisions",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Fear manifests as hesitation to enter trades, early exits, and avoiding losses. Fear of missing out (FOMO) leads to chasing prices. Fear of loss prevents taking necessary risks. Recognize fear signals and develop systematic responses."
			},
			{
				id: "3-2",
				title: "Controlling Greed",
				description: "Prevent greed from sabotaging profitable trades",
				type: "lesson",
				xpReward: 25,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Greed causes overtrading, oversized positions, and holding winners too long. Set profit targets in advance and stick to them. Use systematic position sizing to prevent greed-driven decisions."
			}
		]
	},
	{
		level: 4,
		title: "Discipline and Consistency",
		description: "Develop the discipline to follow your trading plan",
		tier: "Beginner",
		unlockRequirement: 185,
		completed: false,
		locked: true,
		totalXP: 65,
		modules: [
			{
				id: "4-1",
				title: "Building Trading Discipline",
				description: "Create habits that support consistent execution",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Discipline is following your plan regardless of emotions. Start with small positions to build confidence. Use checklists to ensure consistent execution. Track rule violations and their consequences to reinforce discipline."
			},
			{
				id: "4-2",
				title: "Consistency Framework",
				description: "Develop systematic approaches to trading decisions",
				type: "lesson",
				xpReward: 25,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Consistency comes from systematic processes. Define clear entry/exit criteria, position sizing rules, and risk management protocols. Document everything and review regularly to maintain consistency."
			}
		]
	},
	{
		level: 5,
		title: "Patience and Timing",
		description: "Learn to wait for high-probability setups",
		tier: "Beginner",
		unlockRequirement: 250,
		completed: false,
		locked: true,
		totalXP: 60,
		modules: [
			{
				id: "5-1",
				title: "Developing Trading Patience",
				description: "Wait for your setups instead of forcing trades",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Patience is waiting for your specific setup criteria to align. Forced trades have lower probability and higher risk. Better to miss a trade than take a bad trade. Quality over quantity always wins long-term."
			},
			{
				id: "5-2",
				title: "Market Timing Psychology",
				description: "Understand when to be active vs passive",
				type: "lesson",
				xpReward: 25,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Markets have periods of opportunity and periods of uncertainty. Be more active during trending markets, more selective during choppy markets. Recognize when to step aside and preserve capital."
			}
		]
	},
	{
		level: 6,
		title: "Confidence and Self-Efficacy",
		description: "Build unshakeable confidence in your trading abilities",
		tier: "Beginner",
		unlockRequirement: 310,
		completed: false,
		locked: false,
		totalXP: 65,
		modules: [
			{
				id: "6-1",
				title: "Building Trading Confidence",
				description: "Develop genuine confidence through competence",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "True confidence comes from competence and preparation. Build confidence through education, practice, and small wins. Start with smaller positions to build confidence gradually."
			},
			{
				id: "6-2",
				title: "Overcoming Self-Doubt",
				description: "Eliminate limiting beliefs and self-sabotage",
				type: "lesson",
				xpReward: 25,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Self-doubt can paralyze decision-making. Identify limiting beliefs, challenge negative self-talk, and focus on evidence-based thinking. Keep a success journal to reinforce positive experiences."
			}
		]
	},
	{
		level: 7,
		title: "Stress Management",
		description: "Manage trading stress and maintain peak performance",
		tier: "Beginner",
		unlockRequirement: 375,
		completed: false,
		locked: false,
		totalXP: 70,
		modules: [
			{
				id: "7-1",
				title: "Stress Recognition",
				description: "Identify stress signals and their impact on trading",
				type: "lesson",
				xpReward: 40,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Stress affects decision-making, risk perception, and execution. Learn to recognize physical, emotional, and behavioral stress signals. Monitor stress levels throughout trading sessions."
			},
			{
				id: "7-2",
				title: "Stress Reduction Techniques",
				description: "Implement practical stress management strategies",
				type: "lesson",
				xpReward: 30,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Stress reduction techniques include deep breathing, progressive muscle relaxation, and mindfulness. Develop pre-trading routines and take regular breaks during trading sessions."
			}
		]
	},
	{
		level: 8,
		title: "Focus and Concentration",
		description: "Develop laser-sharp focus for trading success",
		tier: "Beginner",
		unlockRequirement: 445,
		completed: false,
		locked: false,
		totalXP: 65,
		modules: [
			{
				id: "8-1",
				title: "Attention Management",
				description: "Control your attention and eliminate distractions",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Attention is your most valuable resource. Eliminate distractions, create focused work environments, and practice single-tasking. Use time-blocking to maintain concentration."
			},
			{
				id: "8-2",
				title: "Flow State Achievement",
				description: "Enter and maintain peak performance states",
				type: "lesson",
				xpReward: 30,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Flow state is characterized by complete absorption and peak performance. Create conditions for flow: clear goals, immediate feedback, and balanced challenge-skill ratio."
			}
		]
	},
	{
		level: 9,
		title: "Habit Formation",
		description: "Build positive trading habits and break negative ones",
		tier: "Beginner",
		unlockRequirement: 510,
		completed: false,
		locked: false,
		totalXP: 70,
		modules: [
			{
				id: "9-1",
				title: "Habit Science",
				description: "Understand how habits form and change",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Habits follow a cue-routine-reward loop. Identify triggers for bad habits and design new routines. Use habit stacking to build positive trading behaviors."
			},
			{
				id: "9-2",
				title: "Trading Routines",
				description: "Develop consistent pre-trading and post-trading routines",
				type: "lesson",
				xpReward: 30,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Routines create consistency and reduce decision fatigue. Develop pre-trading routines for preparation and post-trading routines for review and improvement."
			}
		]
	},
	{
		level: 10,
		title: "Mental Resilience",
		description: "Build psychological resilience for long-term success",
		tier: "Beginner",
		unlockRequirement: 580,
		completed: false,
		locked: false,
		totalXP: 75,
		modules: [
			{
				id: "10-1",
				title: "Resilience Building",
				description: "Develop the ability to bounce back from setbacks",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Resilience is the ability to recover from adversity. Build resilience through optimistic thinking, social support, and learning from failures. View setbacks as learning opportunities."
			},
			{
				id: "10-2",
				title: "Growth Mindset",
				description: "Adopt a growth mindset for continuous improvement",
				type: "lesson",
				xpReward: 30,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Growth mindset believes abilities can be developed through effort and learning. Embrace challenges, persist through obstacles, and learn from criticism and failures."
			}
		]
	}
];

// Psychology Intermediate Levels (11-20)
export const PSYCHOLOGY_INTERMEDIATE_LEVELS: LearningLevel[] = [
	{
		level: 11,
		title: "Advanced Emotional Control",
		description: "Master complex emotional states in trading",
		tier: "Intermediate",
		unlockRequirement: 650,
		completed: false,
		locked: true,
		totalXP: 85,
		modules: [
			{
				id: "11-1",
				title: "Emotional Regulation Techniques",
				description: "Advanced methods for managing trading emotions",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Advanced emotional regulation includes breathing techniques, visualization, and cognitive reframing. Practice these techniques outside of trading to build muscle memory. Use them during high-stress trading situations."
			},
			{
				id: "11-2",
				title: "Stress Management",
				description: "Handle high-pressure trading situations",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Trading stress comes from uncertainty, time pressure, and financial risk. Develop pre-trade routines to reduce stress. Use position sizing to keep stress manageable. Take breaks when stress levels become counterproductive."
			}
		]
	},
	{
		level: 12,
		title: "Mental Models and Biases",
		description: "Understand cognitive biases that affect trading",
		tier: "Intermediate",
		unlockRequirement: 735,
		completed: false,
		locked: true,
		totalXP: 90,
		modules: [
			{
				id: "12-1",
				title: "Cognitive Biases in Trading",
				description: "Identify and overcome common mental traps",
				type: "lesson",
				xpReward: 55,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Common biases include confirmation bias (seeking confirming information), anchoring bias (fixating on first information), and recency bias (overweighting recent events). Systematic processes help overcome these biases."
			},
			{
				id: "12-2",
				title: "Building Better Mental Models",
				description: "Develop accurate frameworks for market understanding",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Mental models are frameworks for understanding market behavior. Build models based on evidence, not wishful thinking. Continuously update models as new information becomes available. Test models against reality."
			}
		]
	},
	{
		level: 13,
		title: "Mindfulness and Awareness",
		description: "Develop present-moment awareness for better trading decisions",
		tier: "Intermediate",
		unlockRequirement: 825,
		completed: false,
		locked: false,
		totalXP: 85,
		modules: [
			{
				id: "13-1",
				title: "Mindfulness Practice",
				description: "Develop mindfulness skills for trading",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Mindfulness is present-moment awareness without judgment. Practice mindfulness meditation, body awareness, and mindful trading. Use mindfulness to recognize emotional states and make conscious decisions."
			},
			{
				id: "13-2",
				title: "Self-Awareness Development",
				description: "Increase awareness of thoughts, emotions, and behaviors",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Self-awareness is the foundation of emotional intelligence. Monitor your thoughts, emotions, and behaviors during trading. Use journaling and reflection to increase self-awareness."
			}
		]
	},
	{
		level: 14,
		title: "Visualization and Mental Rehearsal",
		description: "Use mental imagery to improve trading performance",
		tier: "Intermediate",
		unlockRequirement: 910,
		completed: false,
		locked: false,
		totalXP: 80,
		modules: [
			{
				id: "14-1",
				title: "Visualization Techniques",
				description: "Master mental imagery for trading success",
				type: "lesson",
				xpReward: 45,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Visualization involves creating detailed mental images of successful trading. Practice visualizing perfect trade execution, handling losses gracefully, and achieving trading goals."
			},
			{
				id: "14-2",
				title: "Mental Rehearsal",
				description: "Rehearse trading scenarios mentally",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Mental rehearsal prepares you for various trading scenarios. Practice handling different market conditions, unexpected events, and challenging situations through mental simulation."
			}
		]
	},
	{
		level: 15,
		title: "Goal Setting and Motivation",
		description: "Set compelling goals and maintain long-term motivation",
		tier: "Intermediate",
		unlockRequirement: 990,
		completed: false,
		locked: false,
		totalXP: 85,
		modules: [
			{
				id: "15-1",
				title: "Goal Setting Psychology",
				description: "Set goals that motivate and inspire action",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Effective goals are specific, challenging, and personally meaningful. Set process goals (what you control) rather than outcome goals (what you don't control). Break large goals into smaller milestones."
			},
			{
				id: "15-2",
				title: "Motivation Maintenance",
				description: "Sustain motivation through ups and downs",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Motivation fluctuates naturally. Create systems that work regardless of motivation levels. Use intrinsic motivators (autonomy, mastery, purpose) rather than extrinsic rewards."
			}
		]
	},
	{
		level: 16,
		title: "Perfectionism and Acceptance",
		description: "Balance high standards with realistic expectations",
		tier: "Intermediate",
		unlockRequirement: 1075,
		completed: false,
		locked: false,
		totalXP: 90,
		modules: [
			{
				id: "16-1",
				title: "Healthy Perfectionism",
				description: "Channel perfectionism productively",
				type: "lesson",
				xpReward: 55,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Healthy perfectionism drives excellence without paralysis. Set high standards while accepting that perfection is impossible. Focus on continuous improvement rather than flawless execution."
			},
			{
				id: "16-2",
				title: "Radical Acceptance",
				description: "Accept market reality and trading outcomes",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Radical acceptance means fully accepting reality without resistance. Accept that losses are part of trading, markets are unpredictable, and you can't control outcomes."
			}
		]
	},
	{
		level: 17,
		title: "Social Psychology and Influence",
		description: "Understand how social factors affect trading decisions",
		tier: "Intermediate",
		unlockRequirement: 1165,
		completed: false,
		locked: false,
		totalXP: 85,
		modules: [
			{
				id: "17-1",
				title: "Social Influence",
				description: "Recognize and resist social pressure in trading",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Social influence affects trading decisions through conformity, authority, and social proof. Develop independent thinking and resist herd mentality. Make decisions based on analysis, not social pressure."
			},
			{
				id: "17-2",
				title: "Trading Communities",
				description: "Navigate trading communities effectively",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Trading communities can provide support and learning opportunities but also create pressure and misinformation. Choose communities carefully and maintain independent judgment."
			}
		]
	},
	{
		level: 18,
		title: "Time Management and Productivity",
		description: "Optimize time management for trading success",
		tier: "Intermediate",
		unlockRequirement: 1250,
		completed: false,
		locked: false,
		totalXP: 80,
		modules: [
			{
				id: "18-1",
				title: "Time Management Systems",
				description: "Implement effective time management for traders",
				type: "lesson",
				xpReward: 45,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Effective time management balances market analysis, trading execution, and personal development. Use time-blocking, prioritization, and energy management to optimize productivity."
			},
			{
				id: "18-2",
				title: "Work-Life Balance",
				description: "Maintain healthy balance between trading and life",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Work-life balance prevents burnout and maintains perspective. Set boundaries, take regular breaks, and maintain relationships outside of trading. Trading is part of life, not all of it."
			}
		]
	},
	{
		level: 19,
		title: "Learning and Adaptation",
		description: "Develop continuous learning and adaptation skills",
		tier: "Intermediate",
		unlockRequirement: 1330,
		completed: false,
		locked: false,
		totalXP: 85,
		modules: [
			{
				id: "19-1",
				title: "Learning Strategies",
				description: "Optimize learning and skill development",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Effective learning involves deliberate practice, spaced repetition, and active recall. Focus on weaknesses, seek feedback, and practice consistently. Learn from both successes and failures."
			},
			{
				id: "19-2",
				title: "Adaptation Skills",
				description: "Adapt to changing market conditions",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Markets constantly evolve, requiring continuous adaptation. Stay flexible, monitor performance, and adjust strategies based on changing conditions. Embrace change as opportunity."
			}
		]
	},
	{
		level: 20,
		title: "Mental Models and Frameworks",
		description: "Develop robust mental models for trading decisions",
		tier: "Intermediate",
		unlockRequirement: 1415,
		completed: false,
		locked: false,
		totalXP: 90,
		modules: [
			{
				id: "20-1",
				title: "Mental Model Development",
				description: "Build accurate mental models of market behavior",
				type: "lesson",
				xpReward: 55,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Mental models are frameworks for understanding market behavior. Build models based on evidence, test them against reality, and update them as new information emerges."
			},
			{
				id: "20-2",
				title: "Decision Frameworks",
				description: "Create systematic frameworks for trading decisions",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Decision frameworks provide structure for complex decisions. Develop checklists, decision trees, and evaluation criteria to improve decision quality and consistency."
			}
		]
	}
];

// Psychology Professional Levels (21-30)
export const PSYCHOLOGY_PROFESSIONAL_LEVELS: LearningLevel[] = [
	{
		level: 21,
		title: "Elite Mindset Development",
		description: "Develop the mindset of professional traders",
		tier: "Professional",
		unlockRequirement: 1450,
		completed: false,
		locked: true,
		totalXP: 110,
		modules: [
			{
				id: "21-1",
				title: "Professional Identity Formation",
				description: "Think and act like a professional trader",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "Professional traders view trading as a business, not gambling. They focus on process over profits, maintain detailed records, and continuously improve their methods. Develop professional habits and standards."
			},
			{
				id: "21-2",
				title: "Performance Under Pressure",
				description: "Maintain peak performance in high-stress situations",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Elite performers thrive under pressure through preparation and practice. Develop pre-performance routines, practice stress inoculation, and maintain focus on process rather than outcomes during high-pressure situations."
			}
		]
	},
	{
		level: 22,
		title: "Advanced Emotional Intelligence",
		description: "Master emotional intelligence for trading excellence",
		tier: "Professional",
		unlockRequirement: 1560,
		completed: false,
		locked: false,
		totalXP: 115,
		modules: [
			{
				id: "22-1",
				title: "Emotional Mastery",
				description: "Achieve mastery over emotional responses",
				type: "lesson",
				xpReward: 70,
				duration: "55 min",
				completed: false,
				locked: false,
				content: "Emotional mastery involves understanding, managing, and leveraging emotions for optimal performance. Develop emotional granularity, regulation skills, and emotional leverage techniques."
			},
			{
				id: "22-2",
				title: "Social Emotional Skills",
				description: "Navigate social and interpersonal aspects of trading",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Social emotional skills help navigate trading communities, mentorship relationships, and team dynamics. Develop empathy, communication skills, and relationship management abilities."
			}
		]
	},
	{
		level: 23,
		title: "Peak Performance Psychology",
		description: "Achieve and maintain peak performance states",
		tier: "Professional",
		unlockRequirement: 1675,
		completed: false,
		locked: false,
		totalXP: 120,
		modules: [
			{
				id: "23-1",
				title: "Flow State Mastery",
				description: "Consistently access flow states for optimal performance",
				type: "lesson",
				xpReward: 70,
				duration: "55 min",
				completed: false,
				locked: false,
				content: "Flow state mastery involves creating conditions for peak performance on demand. Develop triggers, maintain optimal arousal levels, and sustain flow through challenging conditions."
			},
			{
				id: "23-2",
				title: "Performance Optimization",
				description: "Optimize all aspects of performance",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Performance optimization involves physical, mental, and emotional preparation. Optimize sleep, nutrition, exercise, and recovery for sustained high performance."
			}
		]
	},
	{
		level: 24,
		title: "Warrior Mindset Development",
		description: "Develop the mindset of an elite trading warrior",
		tier: "Professional",
		unlockRequirement: 1795,
		completed: false,
		locked: false,
		totalXP: 125,
		modules: [
			{
				id: "24-1",
				title: "Mental Toughness",
				description: "Develop unbreakable mental toughness",
				type: "lesson",
				xpReward: 75,
				duration: "60 min",
				completed: false,
				locked: false,
				content: "Mental toughness is the ability to perform under pressure, overcome adversity, and maintain focus despite challenges. Develop grit, perseverance, and mental resilience."
			},
			{
				id: "24-2",
				title: "Competitive Excellence",
				description: "Develop a competitive edge in trading",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Competitive excellence involves striving for superiority while maintaining ethical standards. Develop competitive drive, strategic thinking, and performance under pressure."
			}
		]
	},
	{
		level: 25,
		title: "Identity and Purpose",
		description: "Develop a strong trading identity and sense of purpose",
		tier: "Professional",
		unlockRequirement: 1920,
		completed: false,
		locked: false,
		totalXP: 115,
		modules: [
			{
				id: "25-1",
				title: "Trading Identity Formation",
				description: "Develop a strong, positive trading identity",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "Trading identity shapes behavior and performance. Develop an identity as a professional, disciplined, and successful trader. Align actions with identity for consistent performance."
			},
			{
				id: "25-2",
				title: "Purpose and Meaning",
				description: "Find deeper purpose and meaning in trading",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Purpose provides motivation and resilience during difficult times. Connect trading to larger life goals, values, and contribution to others. Find meaning beyond profit."
			}
		]
	},
	{
		level: 26,
		title: "Intuition and Instinct",
		description: "Develop and trust trading intuition",
		tier: "Professional",
		unlockRequirement: 2035,
		completed: false,
		locked: false,
		totalXP: 110,
		modules: [
			{
				id: "26-1",
				title: "Intuition Development",
				description: "Develop reliable trading intuition",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "Intuition is rapid, unconscious processing of complex information. Develop intuition through experience, pattern recognition, and mindful awareness. Learn to distinguish intuition from emotion."
			},
			{
				id: "26-2",
				title: "Instinct Integration",
				description: "Integrate instinct with analytical thinking",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Integrate instinctive responses with analytical thinking for optimal decision-making. Use both system 1 (fast, intuitive) and system 2 (slow, analytical) thinking appropriately."
			}
		]
	},
	{
		level: 27,
		title: "Mastery and Expertise",
		description: "Achieve mastery-level psychological skills",
		tier: "Professional",
		unlockRequirement: 2145,
		completed: false,
		locked: false,
		totalXP: 120,
		modules: [
			{
				id: "27-1",
				title: "Expertise Development",
				description: "Develop expert-level psychological skills",
				type: "lesson",
				xpReward: 70,
				duration: "55 min",
				completed: false,
				locked: false,
				content: "Expertise involves automatic, effortless performance of complex skills. Develop expertise through deliberate practice, pattern recognition, and unconscious competence."
			},
			{
				id: "27-2",
				title: "Mastery Mindset",
				description: "Adopt the mindset of a master trader",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Mastery mindset involves continuous learning, humility, and dedication to excellence. Masters never stop learning and always seek to improve their craft."
			}
		]
	},
	{
		level: 28,
		title: "Teaching and Mentorship",
		description: "Develop skills to teach and mentor others",
		tier: "Professional",
		unlockRequirement: 2265,
		completed: false,
		locked: false,
		totalXP: 115,
		modules: [
			{
				id: "28-1",
				title: "Teaching Psychology",
				description: "Learn to teach psychological skills to others",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "Teaching deepens your own understanding while helping others. Develop communication skills, empathy, and the ability to break down complex concepts into understandable parts."
			},
			{
				id: "28-2",
				title: "Mentorship Skills",
				description: "Become an effective mentor to developing traders",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				content: "Mentorship involves guiding others' development through support, challenge, and wisdom sharing. Develop patience, listening skills, and the ability to provide constructive feedback."
			}
		]
	},
	{
		level: 29,
		title: "Legacy and Contribution",
		description: "Create lasting impact and contribution through trading",
		tier: "Professional",
		unlockRequirement: 2380,
		completed: false,
		locked: false,
		totalXP: 110,
		modules: [
			{
				id: "29-1",
				title: "Legacy Building",
				description: "Build a lasting legacy through trading excellence",
				type: "lesson",
				xpReward: 65,
				duration: "50 min",
				completed: false,
				locked: false,
				content: "Legacy involves the lasting impact you make on others and the trading community. Focus on contribution, ethical behavior, and positive influence on others."
			},
			{
				id: "29-2",
				title: "Giving Back",
				description: "Contribute to the trading community and society",
				type: "lesson",
				xpReward: 45,
				duration: "40 min",
				completed: false,
				locked: false,
				content: "Giving back creates meaning and fulfillment beyond personal success. Share knowledge, mentor others, and use trading success to contribute to causes you care about."
			}
		]
	},
	{
		level: 30,
		title: "Master Trader Psychology",
		description: "Achieve psychological mastery in trading",
		tier: "Professional",
		unlockRequirement: 2505,
		completed: false,
		locked: true,
		totalXP: 150,
		modules: [
			{
				id: "30-1",
				title: "Psychological Integration",
				description: "Integrate all psychological skills into trading",
				type: "lesson",
				xpReward: 80,
				duration: "60 min",
				completed: false,
				locked: false,
				content: "Master traders have integrated emotional control, discipline, patience, and professional identity into their trading approach. They maintain consistency regardless of market conditions or recent performance."
			},
			{
				id: "30-2",
				title: "Psychology Mastery Assessment",
				description: "Comprehensive evaluation of trading psychology",
				type: "challenge",
				xpReward: 70,
				duration: "120 min",
				completed: false,
				locked: false
			}
		]
	}
];

// Combine all Psychology levels
export const COMPLETE_PSYCHOLOGY_LEVELS: LearningLevel[] = [
	// Levels 1-2 are defined in learning.ts
	...PSYCHOLOGY_BEGINNER_LEVELS,
	...PSYCHOLOGY_INTERMEDIATE_LEVELS,
	...PSYCHOLOGY_PROFESSIONAL_LEVELS
];
