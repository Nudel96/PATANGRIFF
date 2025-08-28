import type { LearningLevel, QuizQuestion } from '$lib/types/learning';
import { PILLAR_IDS } from '$lib/types/learning';

/**
 * Capital Management Pillar: 30-Level Curriculum
 * Comprehensive XP-based curriculum for capital preservation and risk management
 */

// Quiz questions for Level 1: Defining Capital and Risk
const level1QuizQuestions: QuizQuestion[] = [
	{
		id: 'cm-1-q1',
		question: 'What is capital in the context of investing?',
		type: 'multiple_choice',
		options: [
			'Only cash in your bank account',
			'Money and assets at your disposal for investment',
			'Just stocks and bonds',
			'Your monthly income'
		],
		correctAnswer: 1,
		explanation: 'Capital refers to all money and assets available for investment, not just cash.',
		points: 4
	},
	{
		id: 'cm-1-q2',
		question: 'How do we define risk when managing a portfolio?',
		type: 'multiple_choice',
		options: [
			'The certainty of making profits',
			'The uncertainty of returns and possibility of loss',
			'Only the chance of total loss',
			'Market volatility alone'
		],
		correctAnswer: 1,
		explanation: 'Risk encompasses both uncertainty of returns and the potential for losses.',
		points: 4
	},
	{
		id: 'cm-1-q3',
		question: 'Why is capital preservation important for long-term success?',
		type: 'multiple_choice',
		options: [
			'It guarantees profits',
			'It allows you to survive losses and capitalize on opportunities',
			'It eliminates all risk',
			'It maximizes short-term gains'
		],
		correctAnswer: 1,
		explanation: 'Capital preservation ensures you can weather downturns and take advantage of future opportunities.',
		points: 4
	},
	{
		id: 'cm-1-q4',
		question: 'True or False: Ignoring risk can lead to significant wealth destruction.',
		type: 'true_false',
		correctAnswer: 'true',
		explanation: 'Ignoring risk management principles can result in catastrophic losses that destroy wealth.',
		points: 4
	},
	{
		id: 'cm-1-q5',
		question: 'What does an empowered approach to capital involve?',
		type: 'multiple_choice',
		options: [
			'Taking maximum risk for maximum reward',
			'Treating capital as a precious resource requiring protection',
			'Investing everything in one opportunity',
			'Avoiding all investments'
		],
		correctAnswer: 1,
		explanation: 'An empowered approach treats capital as precious and implements systematic protection measures.',
		points: 4
	}
];

// Quiz questions for Level 2: Understanding Drawdown
const level2QuizQuestions: QuizQuestion[] = [
	{
		id: 'cm-2-q1',
		question: 'Define drawdown in your own words.',
		type: 'short_answer',
		correctAnswer: 'peak-to-trough decline',
		explanation: 'Drawdown is the peak-to-trough decline of an investment\'s value over a timeframe.',
		points: 4
	},
	{
		id: 'cm-2-q2',
		question: 'How is drawdown different from a simple loss?',
		type: 'multiple_choice',
		options: [
			'There is no difference',
			'Drawdown measures decline from peak, loss is just negative return',
			'Drawdown is permanent, losses are temporary',
			'Drawdown only applies to stocks'
		],
		correctAnswer: 1,
		explanation: 'Drawdown specifically measures the decline from a peak value, while loss can be any negative return.',
		points: 4
	},
	{
		id: 'cm-2-q3',
		question: 'Why is tracking drawdowns important for investors?',
		type: 'multiple_choice',
		options: [
			'To predict future returns',
			'To prepare mentally and strategically for market swings',
			'To eliminate all losses',
			'To time the market perfectly'
		],
		correctAnswer: 1,
		explanation: 'Tracking drawdowns helps investors prepare both mentally and strategically for inevitable market volatility.',
		points: 4
	},
	{
		id: 'cm-2-q4',
		question: 'What do the depth and duration of a drawdown tell us?',
		type: 'multiple_choice',
		options: [
			'Nothing useful',
			'The severity and recovery time of losses',
			'Future market direction',
			'When to buy more'
		],
		correctAnswer: 1,
		explanation: 'Depth shows severity of loss, duration shows how long recovery takes - both crucial for planning.',
		points: 4
	},
	{
		id: 'cm-2-q5',
		question: 'How might you set a personal drawdown limit?',
		type: 'multiple_choice',
		options: [
			'Based on your risk tolerance and financial situation',
			'Always set it at 50%',
			'Never set limits',
			'Copy what others do'
		],
		correctAnswer: 0,
		explanation: 'Personal drawdown limits should reflect your individual risk tolerance and financial capacity.',
		points: 4
	}
];

// Quiz questions for Level 11: Introduction to Diversification
const level11QuizQuestions: QuizQuestion[] = [
	{
		id: 'cm-11-q1',
		question: 'Define diversification in investment terms.',
		type: 'short_answer',
		correctAnswer: 'spreading investments',
		explanation: 'Diversification means spreading investments across different assets to limit exposure to any single investment.',
		points: 4
	},
	{
		id: 'cm-11-q2',
		question: 'How does diversification mitigate risk?',
		type: 'multiple_choice',
		options: [
			'By guaranteeing profits',
			'By combining uncorrelated assets to smooth returns',
			'By eliminating all investment risk',
			'By concentrating in the best assets'
		],
		correctAnswer: 1,
		explanation: 'Diversification works by combining assets that don\'t move together, which smooths overall portfolio returns.',
		points: 4
	},
	{
		id: 'cm-11-q3',
		question: 'Why is it beneficial to mix assets that don\'t move in tandem?',
		type: 'multiple_choice',
		options: [
			'It increases total returns',
			'When one falls, others may rise or remain stable',
			'It reduces transaction costs',
			'It simplifies portfolio management'
		],
		correctAnswer: 1,
		explanation: 'When assets are uncorrelated, losses in one may be offset by stability or gains in others.',
		points: 4
	},
	{
		id: 'cm-11-q4',
		question: 'What is correlation, and how does it affect diversification?',
		type: 'multiple_choice',
		options: [
			'Correlation measures how assets move together; lower correlation provides better diversification',
			'Correlation is irrelevant to diversification',
			'High correlation always provides the best diversification',
			'Correlation only matters for stocks'
		],
		correctAnswer: 0,
		explanation: 'Correlation measures how assets move relative to each other. Lower correlation provides better diversification benefits.',
		points: 4
	},
	{
		id: 'cm-11-q5',
		question: 'Does diversification guarantee profit? Why or why not?',
		type: 'true_false',
		correctAnswer: 'false',
		explanation: 'Diversification reduces risk but does not guarantee profits. It helps manage risk, not eliminate it entirely.',
		points: 4
	}
];

// Quiz questions for Level 12: Equities
const level12QuizQuestions: QuizQuestion[] = [
	{
		id: 'cm-12-q1',
		question: 'What is an equity?',
		type: 'multiple_choice',
		options: [
			'A loan to a company',
			'Ownership stake in a company',
			'A government bond',
			'A commodity investment'
		],
		correctAnswer: 1,
		explanation: 'An equity represents an ownership stake in a company, making you a shareholder.',
		points: 4
	},
	{
		id: 'cm-12-q2',
		question: 'How do companies generate returns for stock investors?',
		type: 'multiple_choice',
		options: [
			'Only through dividends',
			'Only through stock price appreciation',
			'Through dividends and stock price appreciation',
			'Through interest payments'
		],
		correctAnswer: 2,
		explanation: 'Companies can provide returns through both dividend payments and stock price appreciation.',
		points: 4
	},
	{
		id: 'cm-12-q3',
		question: 'Why might owning a diverse mix of stocks across sectors be beneficial?',
		type: 'multiple_choice',
		options: [
			'It guarantees higher returns',
			'Different sectors perform differently in various economic conditions',
			'It eliminates all risk',
			'It reduces transaction costs'
		],
		correctAnswer: 1,
		explanation: 'Different sectors respond differently to economic conditions, providing natural diversification.',
		points: 4
	},
	{
		id: 'cm-12-q4',
		question: 'What is the relationship between risk and potential return in equities?',
		type: 'multiple_choice',
		options: [
			'Higher risk typically offers potential for higher returns',
			'Risk and return are unrelated',
			'Lower risk always provides higher returns',
			'Risk eliminates all potential returns'
		],
		correctAnswer: 0,
		explanation: 'In general, higher-risk investments offer the potential for higher returns to compensate investors.',
		points: 4
	},
	{
		id: 'cm-12-q5',
		question: 'How do indices like the S&P 500 help achieve diversification?',
		type: 'multiple_choice',
		options: [
			'They focus on single companies',
			'They provide exposure to many companies across different sectors',
			'They only invest in bonds',
			'They eliminate all market risk'
		],
		correctAnswer: 1,
		explanation: 'Indices like the S&P 500 provide instant diversification across many companies and sectors.',
		points: 4
	}
];

export const CAPITAL_MANAGEMENT_LEVELS: LearningLevel[] = [
	// Level 1: Defining Capital and Risk
	{
		level: 1,
		title: "Defining Capital and Risk",
		description: "Grasp the core concepts of capital, wealth, and risk in investing",
		learningObjective: "Grasp the core concepts of capital, wealth, and risk in investing",
		tier: "Beginner",
		unlockRequirement: 0,
		completed: false,
		locked: false,
		totalXP: 50,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-1-lesson",
				title: "Understanding Capital and Risk",
				description: "Learn the fundamental concepts of capital preservation and risk management",
				type: "lesson",
				xpReward: 25,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Define capital as the money and assets at your disposal. Understand investment risk as the uncertainty of returns and the possibility of loss. Learn why preserving capital is essential for long-term wealth. An empowered investor treats capital as a precious resource. Capital is not just cash - it includes all assets available for investment. Risk encompasses both the uncertainty of returns and the potential for loss. The key principle: you must preserve capital to build wealth over time."
			},
			{
				id: "cm-1-quiz",
				title: "Capital and Risk Quiz",
				description: "Test your understanding of capital and risk concepts",
				type: "quiz",
				xpReward: 15,
				duration: "10 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-1-challenge",
				title: "Portfolio Risk Assessment",
				description: "Review a portfolio and identify one risk factor that threatens capital",
				type: "challenge",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-1-reflection",
				title: "Risk Understanding Reflection",
				description: "Reflect on your current understanding of risk",
				type: "reflection",
				xpReward: 5,
				duration: "10 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 2: Understanding Drawdown
	{
		level: 2,
		title: "Understanding Drawdown",
		description: "Learn what drawdown means and how to measure it",
		learningObjective: "Learn what drawdown means and how to measure it",
		tier: "Beginner",
		unlockRequirement: 50,
		completed: false,
		locked: true,
		totalXP: 50,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-2-lesson",
				title: "Drawdown Fundamentals",
				description: "Master the concept of drawdown and its implications",
				type: "lesson",
				xpReward: 25,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "A drawdown is the peak-to-trough decline of an investment's value over a certain timeframe. It represents how much value an asset or portfolio loses before recovering. All investments have drawdowns; the key is knowing your comfort level. Tracking drawdowns helps you prepare mentally and strategically for market swings. Understanding both the depth (how much you lose) and duration (how long it takes to recover) is crucial for proper capital management."
			},
			{
				id: "cm-2-quiz",
				title: "Drawdown Knowledge Quiz",
				description: "Test your understanding of drawdown concepts",
				type: "quiz",
				xpReward: 15,
				duration: "10 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-2-challenge",
				title: "Drawdown Simulation",
				description: "Simulate a 20% drawdown and analyze recovery phases",
				type: "challenge",
				xpReward: 5,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-2-reflection",
				title: "Drawdown Comfort Reflection",
				description: "Reflect on your comfort with capital decline",
				type: "reflection",
				xpReward: 5,
				duration: "10 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 3: Risk Tolerance and Capacity
	{
		level: 3,
		title: "Risk Tolerance and Capacity",
		description: "Assess personal risk tolerance and capacity",
		learningObjective: "Assess personal risk tolerance and capacity",
		tier: "Beginner",
		unlockRequirement: 100,
		completed: false,
		locked: true,
		totalXP: 50,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-3-lesson",
				title: "Risk Assessment Fundamentals",
				description: "Learn to distinguish between risk tolerance and capacity",
				type: "lesson",
				xpReward: 25,
				duration: "25 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Risk tolerance is your willingness to accept volatility, while risk capacity is the level of risk you can afford given your financial situation. Factors include time horizon, income stability, and dependents. We create a personal risk profile to match strategies to your goals. Honest self-assessment empowers disciplined decisions. Your risk capacity may be higher than your tolerance, or vice versa - both matter for proper capital allocation."
			},
			{
				id: "cm-3-quiz",
				title: "Risk Profile Quiz",
				description: "Test your knowledge of risk tolerance vs capacity",
				type: "quiz",
				xpReward: 15,
				duration: "12 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-3-challenge",
				title: "Personal Risk Assessment",
				description: "Complete a comprehensive risk assessment exercise",
				type: "challenge",
				xpReward: 5,
				duration: "25 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-3-reflection",
				title: "Risk Behavior Reflection",
				description: "Reflect on your risk-taking patterns",
				type: "reflection",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 4: Position Sizing and Leverage
	{
		level: 4,
		title: "Position Sizing and Leverage",
		description: "Master position sizing and prudent use of leverage",
		learningObjective: "Master position sizing and prudent use of leverage",
		tier: "Beginner",
		unlockRequirement: 150,
		completed: false,
		locked: true,
		totalXP: 50,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-4-lesson",
				title: "Position Sizing Fundamentals",
				description: "Learn proper position sizing and leverage principles",
				type: "lesson",
				xpReward: 25,
				duration: "25 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Position sizing determines how much capital to allocate to each investment or trade. Proper sizing limits losses if positions move against you. Understand leverage: borrowed funds can amplify both returns and losses. We emphasize scaling into positions and avoiding over-leverage to protect capital under pressure. The 1% rule: never risk more than 1% of your account on any single trade."
			},
			{
				id: "cm-4-quiz",
				title: "Position Sizing Quiz",
				description: "Test your position sizing knowledge",
				type: "quiz",
				xpReward: 15,
				duration: "12 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-4-challenge",
				title: "Position Size Calculator",
				description: "Plan position sizes for a $10,000 portfolio",
				type: "challenge",
				xpReward: 5,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-4-reflection",
				title: "Position Sizing Reflection",
				description: "Reflect on your position sizing habits",
				type: "reflection",
				xpReward: 5,
				duration: "10 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 5: Loss Prevention and Stop Strategies
	{
		level: 5,
		title: "Loss Prevention and Stop Strategies",
		description: "Learn tools to limit losses and protect capital",
		learningObjective: "Learn tools to limit losses and protect capital",
		tier: "Beginner",
		unlockRequirement: 200,
		completed: false,
		locked: true,
		totalXP: 50,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-5-lesson",
				title: "Stop-Loss Strategies",
				description: "Master stop-loss orders and exit strategies",
				type: "lesson",
				xpReward: 25,
				duration: "25 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Effective capital protection uses stop-loss orders, hedging, and pre-defined exit strategies. Set stop levels based on risk tolerance and market volatility. Understand emotional vs. strategic stops. Practice routine reviews to enforce discipline. Safeguarding capital through loss control is a cornerstone of responsible investing."
			},
			{
				id: "cm-5-quiz",
				title: "Stop Strategies Quiz",
				description: "Test your knowledge of loss prevention",
				type: "quiz",
				xpReward: 15,
				duration: "12 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-5-challenge",
				title: "Stop-Loss Implementation",
				description: "Design stop-loss rules for a recent trade",
				type: "challenge",
				xpReward: 5,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-5-reflection",
				title: "Emotional Control Reflection",
				description: "Reflect on emotional vs strategic decision making",
				type: "reflection",
				xpReward: 5,
				duration: "10 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 6: Liquidity Fundamentals
	{
		level: 6,
		title: "Liquidity Fundamentals",
		description: "Understand liquidity and why it matters in capital planning",
		learningObjective: "Understand liquidity and why it matters in capital planning",
		tier: "Beginner",
		unlockRequirement: 250,
		completed: false,
		locked: true,
		totalXP: 50,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-6-lesson",
				title: "Understanding Liquidity",
				description: "Learn the importance of liquidity in capital management",
				type: "lesson",
				xpReward: 25,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Liquidity is how easily assets can be converted to cash. Highly liquid assets (like major stocks or government bonds) can be sold quickly with minimal price impact, whereas illiquid assets (like real estate or collectibles) cannot. Liquid assets can be sold for their full value and with little cost, protecting you in emergencies. Balance growth investments with sufficient cash or equivalents to meet obligations."
			},
			{
				id: "cm-6-quiz",
				title: "Liquidity Knowledge Quiz",
				description: "Test your understanding of liquidity concepts",
				type: "quiz",
				xpReward: 15,
				duration: "10 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-6-challenge",
				title: "Cash Flow Analysis",
				description: "Prepare a 30-day cash flow analysis",
				type: "challenge",
				xpReward: 5,
				duration: "25 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-6-reflection",
				title: "Liquidity Needs Reflection",
				description: "Reflect on your liquidity requirements",
				type: "reflection",
				xpReward: 5,
				duration: "10 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 7: Managing Liquidity Risk
	{
		level: 7,
		title: "Managing Liquidity Risk",
		description: "Learn strategies to ensure sufficient liquidity",
		learningObjective: "Learn strategies to ensure sufficient liquidity",
		tier: "Beginner",
		unlockRequirement: 300,
		completed: false,
		locked: true,
		totalXP: 50,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-7-lesson",
				title: "Liquidity Risk Management",
				description: "Master liquidity risk and mitigation strategies",
				type: "lesson",
				xpReward: 25,
				duration: "25 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Liquidity risk occurs when you cannot access cash when needed. Explore cash buffers and emergency funds. Understand the trade-off: more liquidity often means lower return, but protects you in crises. Use techniques like laddered bond or CD maturities to align cash flow. This level highlights how to meet obligations or seize opportunities without disrupting long-term plans."
			},
			{
				id: "cm-7-quiz",
				title: "Liquidity Risk Quiz",
				description: "Test your liquidity risk management knowledge",
				type: "quiz",
				xpReward: 15,
				duration: "12 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-7-challenge",
				title: "Liquidity Planning",
				description: "Create a 12-month liquidity plan",
				type: "challenge",
				xpReward: 5,
				duration: "30 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-7-reflection",
				title: "Emergency Preparedness Reflection",
				description: "Reflect on unexpected expenses and their impact",
				type: "reflection",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 8: Risk Allocation vs. Asset Allocation
	{
		level: 8,
		title: "Risk Allocation vs. Asset Allocation",
		description: "Distinguish between risk allocation and asset allocation, and apply a risk budget",
		learningObjective: "Distinguish between risk allocation and asset allocation, and apply a risk budget",
		tier: "Beginner",
		unlockRequirement: 350,
		completed: false,
		locked: true,
		totalXP: 50,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-8-lesson",
				title: "Risk vs Asset Allocation",
				description: "Learn the critical difference between risk and asset allocation",
				type: "lesson",
				xpReward: 25,
				duration: "30 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Asset allocation divides capital among asset classes (stocks, bonds, etc.). Risk allocation assigns portions of overall risk instead. For example, a volatile tech stock and a stable bond might each represent 10% of your portfolio but contribute very different risk. Learn to create a risk budget: decide how much total risk to take and allocate it across positions. This ensures no single investment dominates potential losses."
			},
			{
				id: "cm-8-quiz",
				title: "Risk Allocation Quiz",
				description: "Test your understanding of risk budgeting",
				type: "quiz",
				xpReward: 15,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-8-challenge",
				title: "Risk Budget Analysis",
				description: "Analyze and rebalance a portfolio's risk contributions",
				type: "challenge",
				xpReward: 5,
				duration: "35 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-8-reflection",
				title: "Risk Concentration Reflection",
				description: "Reflect on investments that feel too risky for their reward",
				type: "reflection",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 9: Stress Testing and Drawdown Planning
	{
		level: 9,
		title: "Stress Testing and Drawdown Planning",
		description: "Prepare for worst-case scenarios with stress testing",
		learningObjective: "Prepare for worst-case scenarios with stress testing",
		tier: "Beginner",
		unlockRequirement: 400,
		completed: false,
		locked: true,
		totalXP: 50,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-9-lesson",
				title: "Portfolio Stress Testing",
				description: "Learn to stress test your portfolio against market scenarios",
				type: "lesson",
				xpReward: 25,
				duration: "30 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Use hypothetical scenarios (market crashes, rate spikes) to test your portfolio's resilience. Compare with historical events (like 2008). Plan for maximum tolerable drawdowns: decide in advance what loss is acceptable. Stress testing builds confidence and highlights where to adjust strategies before a real crisis hits."
			},
			{
				id: "cm-9-quiz",
				title: "Stress Testing Quiz",
				description: "Test your stress testing knowledge",
				type: "quiz",
				xpReward: 15,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-9-challenge",
				title: "Market Crash Simulation",
				description: "Simulate a severe market downturn and analyze portfolio impact",
				type: "challenge",
				xpReward: 5,
				duration: "40 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-9-reflection",
				title: "Crisis Preparedness Reflection",
				description: "Reflect on which part of your capital worries you most in a crisis",
				type: "reflection",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 10: Personal Risk Plan and Review
	{
		level: 10,
		title: "Personal Risk Plan and Review",
		description: "Synthesize lessons into a coherent risk management plan",
		learningObjective: "Synthesize lessons into a coherent risk management plan",
		tier: "Beginner",
		unlockRequirement: 450,
		completed: false,
		locked: true,
		totalXP: 50,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-10-lesson",
				title: "Creating Your Risk Management Plan",
				description: "Synthesize all risk management concepts into a personal plan",
				type: "lesson",
				xpReward: 25,
				duration: "35 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Review and finalize your risk foundations. Develop a written risk management plan including position sizing rules, stop losses, liquidity reserves, and risk budgets. Use this plan as a personal guideline. Periodically reassess it as circumstances change. A documented plan transforms knowledge into disciplined action."
			},
			{
				id: "cm-10-quiz",
				title: "Risk Management Plan Quiz",
				description: "Test your comprehensive risk management knowledge",
				type: "quiz",
				xpReward: 15,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-10-challenge",
				title: "Risk Management Blueprint",
				description: "Write a comprehensive one-page risk management blueprint",
				type: "challenge",
				xpReward: 5,
				duration: "45 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-10-reflection",
				title: "Risk Perspective Reflection",
				description: "Reflect on how your view of risk has changed",
				type: "reflection",
				xpReward: 5,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 11: Introduction to Diversification
	{
		level: 11,
		title: "Introduction to Diversification",
		description: "Grasp the benefits and principles of diversification",
		learningObjective: "Grasp the benefits and principles of diversification",
		tier: "Intermediate",
		unlockRequirement: 500,
		completed: false,
		locked: true,
		totalXP: 75,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-11-lesson",
				title: "Diversification Fundamentals",
				description: "Learn how spreading investments reduces risk and smooths returns",
				type: "lesson",
				xpReward: 40,
				duration: "25 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Diversification means spreading investments so your exposure to any one asset is limited. Combining uncorrelated assets smooths returns and reduces portfolio volatility. The idea is: 'Don't put all your eggs in one basket.' A diversified portfolio is more resilient to market ups and downs. When one asset falls, others may rise or remain stable, protecting your overall wealth."
			},
			{
				id: "cm-11-quiz",
				title: "Diversification Knowledge Quiz",
				description: "Test your understanding of diversification principles",
				type: "quiz",
				xpReward: 20,
				duration: "12 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-11-challenge",
				title: "Multi-Asset Diversification Analysis",
				description: "Analyze how combining 5 different investments provides diversification benefits",
				type: "challenge",
				xpReward: 10,
				duration: "25 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-11-reflection",
				title: "Single-Asset Dependency Reflection",
				description: "Reflect on past over-reliance on single investments",
				type: "reflection",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 12: Equities (Stocks and Shares)
	{
		level: 12,
		title: "Equities (Stocks and Shares)",
		description: "Learn fundamentals of investing in equities",
		learningObjective: "Learn fundamentals of investing in equities",
		tier: "Intermediate",
		unlockRequirement: 575,
		completed: false,
		locked: true,
		totalXP: 75,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-12-lesson",
				title: "Equity Investment Fundamentals",
				description: "Master stock market basics, sectors, and indices",
				type: "lesson",
				xpReward: 40,
				duration: "30 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Equities represent ownership in companies and typically offer higher growth over the long run. Study stock market cycles, industry sectors (technology, healthcare, etc.), and major indices (S&P 500, MSCI World). Understand how company earnings, valuation (P/E ratios), and broader trends drive stock prices. Stocks form the growth engine of many portfolios."
			},
			{
				id: "cm-12-quiz",
				title: "Equity Investment Quiz",
				description: "Test your knowledge of stocks and equity investing",
				type: "quiz",
				xpReward: 20,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-12-challenge",
				title: "Sector Analysis Research",
				description: "Research 3 stock sectors and their ETF performance over 5 years",
				type: "challenge",
				xpReward: 10,
				duration: "35 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-12-reflection",
				title: "Industry Interest Reflection",
				description: "Reflect on which industries or companies interest you most",
				type: "reflection",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 13: Bonds and Fixed Income
	{
		level: 13,
		title: "Bonds and Fixed Income",
		description: "Understand bonds and fixed-income investments",
		learningObjective: "Understand bonds and fixed-income investments",
		tier: "Intermediate",
		unlockRequirement: 650,
		completed: false,
		locked: true,
		totalXP: 75,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-13-lesson",
				title: "Bond Investment Fundamentals",
				description: "Learn about bonds, yields, and their role in portfolios",
				type: "lesson",
				xpReward: 40,
				duration: "30 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Bonds are loans to governments or corporations that pay periodic interest. They tend to be less volatile than stocks and provide income. Learn key terms: yield (interest rate), maturity, and credit quality. Recognize bonds' role as diversifiers and income sources. Understand how interest rate changes impact bond prices (inverse relationship)."
			},
			{
				id: "cm-13-quiz",
				title: "Bond Knowledge Quiz",
				description: "Test your understanding of bonds and fixed income",
				type: "quiz",
				xpReward: 20,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-13-challenge",
				title: "Bond Ladder Construction",
				description: "Build a bond ladder with short, medium, and long-term bonds",
				type: "challenge",
				xpReward: 10,
				duration: "30 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-13-reflection",
				title: "Bond Portfolio Role Reflection",
				description: "Reflect on the role of bonds in your portfolio goals",
				type: "reflection",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 14: Commodities and Real Assets
	{
		level: 14,
		title: "Commodities and Real Assets",
		description: "Explore commodity and real asset investments",
		learningObjective: "Explore commodity and real asset investments",
		tier: "Intermediate",
		unlockRequirement: 725,
		completed: false,
		locked: true,
		totalXP: 75,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-14-lesson",
				title: "Commodities and Real Assets Overview",
				description: "Learn about raw materials, real estate, and inflation hedges",
				type: "lesson",
				xpReward: 40,
				duration: "30 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Commodities include raw materials like gold, oil, and agricultural products; real assets include property and infrastructure. These often hedge against inflation and provide non-correlated returns. Learn how commodity prices respond to global demand and geopolitics. Understand vehicles like commodity ETFs and real estate investment trusts (REITs) for exposure."
			},
			{
				id: "cm-14-quiz",
				title: "Commodities Knowledge Quiz",
				description: "Test your understanding of commodities and real assets",
				type: "quiz",
				xpReward: 20,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-14-challenge",
				title: "Commodity and Real Estate Analysis",
				description: "Analyze how commodity and real estate investments complement traditional holdings",
				type: "challenge",
				xpReward: 10,
				duration: "30 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-14-reflection",
				title: "Hard Assets Comfort Reflection",
				description: "Reflect on your comfort with owning physical commodities and real assets",
				type: "reflection",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 15: Alternative and Structured Investments
	{
		level: 15,
		title: "Alternative and Structured Investments",
		description: "Introduce hedge funds, private equity, structured products, and other alternatives",
		learningObjective: "Introduce hedge funds, private equity, structured products, and other alternatives",
		tier: "Intermediate",
		unlockRequirement: 800,
		completed: false,
		locked: true,
		totalXP: 75,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-15-lesson",
				title: "Alternative Investment Strategies",
				description: "Explore hedge funds, private equity, and structured products",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Alternatives include hedge funds, private equity, and structured notes. These often have unique return profiles uncorrelated to public markets. Understand basics: hedge funds may use leverage or special strategies; private equity invests in private companies; structured products combine derivatives with bonds. Learn why some investors allocate a small portion to alternatives for additional diversification."
			},
			{
				id: "cm-15-quiz",
				title: "Alternative Investments Quiz",
				description: "Test your knowledge of alternative investment strategies",
				type: "quiz",
				xpReward: 20,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-15-challenge",
				title: "Alternative Investment Research",
				description: "Research a hedge fund index or private equity ETF and analyze its strategy",
				type: "challenge",
				xpReward: 10,
				duration: "35 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-15-reflection",
				title: "High-Risk Strategy Reflection",
				description: "Reflect on your willingness to invest in high-risk, high-reward alternatives",
				type: "reflection",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 16: Asset Correlations and Portfolio Construction
	{
		level: 16,
		title: "Asset Correlations and Portfolio Construction",
		description: "Understand how different assets interact and construct a multi-asset portfolio",
		learningObjective: "Understand how different assets interact and construct a multi-asset portfolio",
		tier: "Intermediate",
		unlockRequirement: 875,
		completed: false,
		locked: true,
		totalXP: 75,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-16-lesson",
				title: "Asset Correlation Analysis",
				description: "Learn how assets interact and use correlation for portfolio construction",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Assets have varying correlations: some move together, others move independently. Study examples: stocks vs bonds often have low or negative correlation. Learn to use correlation to spread risk. Explore portfolio construction principles: mix assets to match risk/return goals, then rebalance periodically to maintain target allocation."
			},
			{
				id: "cm-16-quiz",
				title: "Correlation and Construction Quiz",
				description: "Test your understanding of asset correlations and portfolio building",
				type: "quiz",
				xpReward: 20,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-16-challenge",
				title: "Correlation Calculation Exercise",
				description: "Calculate correlation between two asset classes and interpret results",
				type: "challenge",
				xpReward: 10,
				duration: "40 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-16-reflection",
				title: "Opposite Movement Assets Reflection",
				description: "Reflect on assets that move opposite to your main holdings",
				type: "reflection",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 17: Global Portfolio and Diversification
	{
		level: 17,
		title: "Global Portfolio and Diversification",
		description: "Expand diversification across regions and currencies",
		learningObjective: "Expand diversification across regions and currencies",
		tier: "Intermediate",
		unlockRequirement: 950,
		completed: false,
		locked: true,
		totalXP: 75,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-17-lesson",
				title: "Global Investment Strategies",
				description: "Learn international diversification and currency considerations",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Global diversification means investing in multiple countries and regions. This guards against local economic downturns. Learn about developed vs emerging markets. Recognize that currency movements affect returns; a diversified global portfolio often naturally hedges some currency risk. By holding foreign stocks and bonds, you access growth opportunities worldwide and reduce dependence on any single economy."
			},
			{
				id: "cm-17-quiz",
				title: "Global Diversification Quiz",
				description: "Test your knowledge of international investing",
				type: "quiz",
				xpReward: 20,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-17-challenge",
				title: "International ETF Comparison",
				description: "Compare U.S. and international ETF performance over 3 years",
				type: "challenge",
				xpReward: 10,
				duration: "30 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-17-reflection",
				title: "Global Economic Preparedness Reflection",
				description: "Reflect on preparing for home country economic decline",
				type: "reflection",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 18: Portfolio Balancing and Strategy
	{
		level: 18,
		title: "Portfolio Balancing and Strategy",
		description: "Learn strategic vs. tactical allocation and rebalancing rules",
		learningObjective: "Learn strategic vs. tactical allocation and rebalancing rules",
		tier: "Professional",
		unlockRequirement: 1025,
		completed: false,
		locked: true,
		totalXP: 75,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-18-lesson",
				title: "Strategic Portfolio Management",
				description: "Master allocation strategies and rebalancing techniques",
				type: "lesson",
				xpReward: 40,
				duration: "35 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Decide your portfolio strategy: conservative, balanced, or aggressive, aligning with goals. Distinguish strategic (long-term target allocation) from tactical (short-term shifts). Learn rebalancing triggers (e.g., time-based or threshold-based). Emphasize long-term consistency; regular rebalancing locks in profits from winners and forces buy on underperformers. An intentional allocation plan anchors emotional decisions."
			},
			{
				id: "cm-18-quiz",
				title: "Portfolio Strategy Quiz",
				description: "Test your knowledge of allocation and rebalancing strategies",
				type: "quiz",
				xpReward: 20,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-18-challenge",
				title: "60/40 Portfolio Rebalancing Exercise",
				description: "Demonstrate rebalancing a 60/40 portfolio after market movements",
				type: "challenge",
				xpReward: 10,
				duration: "35 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-18-reflection",
				title: "Market Swing Discipline Reflection",
				description: "Reflect on sticking to your plan during market volatility",
				type: "reflection",
				xpReward: 5,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 19: Building a Diversified Portfolio
	{
		level: 19,
		title: "Building a Diversified Portfolio",
		description: "Apply knowledge by constructing a model portfolio",
		learningObjective: "Apply knowledge by constructing a model portfolio",
		tier: "Professional",
		unlockRequirement: 1100,
		completed: false,
		locked: true,
		totalXP: 75,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-19-lesson",
				title: "Portfolio Construction Mastery",
				description: "Synthesize all asset classes into a comprehensive portfolio",
				type: "lesson",
				xpReward: 40,
				duration: "40 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Synthesize the assets learned: decide target allocations for each class. Use your risk budget and profile. Consider factors like age, goals, and market conditions. Learn layering (e.g., core-satellite approach): a core portfolio of low-cost index funds plus satellite investments for extra yield or growth. A documented allocation plan helps you review and adjust over time."
			},
			{
				id: "cm-19-quiz",
				title: "Portfolio Construction Quiz",
				description: "Test your comprehensive portfolio building knowledge",
				type: "quiz",
				xpReward: 20,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-19-challenge",
				title: "Personal Portfolio Design",
				description: "Draft a complete diversified portfolio with specific allocations",
				type: "challenge",
				xpReward: 10,
				duration: "45 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-19-reflection",
				title: "Portfolio Goal Alignment Reflection",
				description: "Reflect on whether your model portfolio matches your goals and risk comfort",
				type: "reflection",
				xpReward: 5,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 20: Portfolio Simulation Challenge
	{
		level: 20,
		title: "Portfolio Simulation Challenge",
		description: "Test portfolio building through a simulation or paper trading",
		learningObjective: "Test portfolio building through a simulation or paper trading",
		tier: "Professional",
		unlockRequirement: 1175,
		completed: false,
		locked: true,
		totalXP: 75,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-20-lesson",
				title: "Portfolio Simulation Preparation",
				description: "Prepare for hands-on portfolio management simulation",
				type: "lesson",
				xpReward: 40,
				duration: "30 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Apply what you've learned by using a simulated platform or spreadsheet to manage a mock portfolio. Practice building positions in different assets, implement rebalancing, and track performance. This hands-on challenge solidifies concepts of diversification, allocation, and risk management in a low-stakes environment."
			},
			{
				id: "cm-20-quiz",
				title: "Simulation Learning Quiz",
				description: "Reflect on lessons learned from portfolio simulation",
				type: "quiz",
				xpReward: 20,
				duration: "15 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-20-challenge",
				title: "Month-Long Portfolio Simulation",
				description: "Maintain a virtual portfolio across multiple asset classes with decision journal",
				type: "challenge",
				xpReward: 10,
				duration: "60 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-20-reflection",
				title: "Simulation Decision Reflection",
				description: "Reflect on the hardest decisions in your portfolio simulation",
				type: "reflection",
				xpReward: 5,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 21: Institutional Capital Mindset
	{
		level: 21,
		title: "Institutional Capital Mindset",
		description: "Shift perspective to that of an institutional or high-net-worth capital manager",
		learningObjective: "Shift perspective to that of an institutional or high-net-worth capital manager",
		tier: "Professional",
		unlockRequirement: 1250,
		completed: false,
		locked: true,
		totalXP: 100,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-21-lesson",
				title: "Institutional Investment Approach",
				description: "Learn long-term strategic thinking and wealth stewardship",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Institutions view capital through a long-term strategic lens. They emphasize governance, tax planning, and structure. Learn basic organizational elements: trusts, legal entities, family offices. Understand fiduciary duties and alignment with multi-generational goals. Begin thinking beyond personal investing to systemic wealth stewardship."
			},
			{
				id: "cm-21-quiz",
				title: "Institutional Mindset Quiz",
				description: "Test your understanding of institutional capital management",
				type: "quiz",
				xpReward: 30,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-21-challenge",
				title: "Investment Policy Statement Draft",
				description: "Create an Investment Policy Statement for a family trust",
				type: "challenge",
				xpReward: 15,
				duration: "50 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-21-reflection",
				title: "Long-Term Discipline Reflection",
				description: "Reflect on adopting institutional-level discipline",
				type: "reflection",
				xpReward: 5,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 22: Tax-Advantaged Accounts and Vehicles
	{
		level: 22,
		title: "Tax-Advantaged Accounts and Vehicles",
		description: "Review retirement accounts and tax-sheltered investments",
		learningObjective: "Review retirement accounts and tax-sheltered investments",
		tier: "Professional",
		unlockRequirement: 1350,
		completed: false,
		locked: true,
		totalXP: 100,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-22-lesson",
				title: "Tax-Sheltered Investment Vehicles",
				description: "Master retirement accounts and tax-efficient investing",
				type: "lesson",
				xpReward: 50,
				duration: "40 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Examine tax-efficient vehicles: 401(k)s, IRAs, HSAs, 529 plans (or local equivalents), annuities, etc. Understand contribution limits, tax deferral versus tax-free growth. We learn to maximize these accounts for long-term wealth building. Using these tools effectively can dramatically enhance after-tax returns."
			},
			{
				id: "cm-22-quiz",
				title: "Tax-Advantaged Accounts Quiz",
				description: "Test your knowledge of retirement and tax-sheltered accounts",
				type: "quiz",
				xpReward: 30,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-22-challenge",
				title: "5-Year Tax Optimization Plan",
				description: "Create a plan to maximize tax-advantaged account contributions",
				type: "challenge",
				xpReward: 15,
				duration: "45 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-22-reflection",
				title: "Tax Tool Utilization Reflection",
				description: "Reflect on underutilized tax-advantaged opportunities",
				type: "reflection",
				xpReward: 5,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 23: Tax-Efficient Investing Strategies
	{
		level: 23,
		title: "Tax-Efficient Investing Strategies",
		description: "Learn portfolio-level tax strategies beyond accounts",
		learningObjective: "Learn portfolio-level tax strategies beyond accounts",
		tier: "Professional",
		unlockRequirement: 1450,
		completed: false,
		locked: true,
		totalXP: 100,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-23-lesson",
				title: "Advanced Tax Strategy Implementation",
				description: "Master asset location, tax-loss harvesting, and municipal bonds",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Explore strategies like asset location (holding tax-inefficient assets in sheltered accounts), tax-loss harvesting, and using municipal bonds for tax-free income. Even small annual adjustments can compound into significant tax savings. Different techniques apply to different parts of your portfolio. This level emphasizes thinking ahead for tax seasons."
			},
			{
				id: "cm-23-quiz",
				title: "Tax Strategy Quiz",
				description: "Test your understanding of advanced tax strategies",
				type: "quiz",
				xpReward: 30,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-23-challenge",
				title: "Portfolio Tax Optimization",
				description: "Optimize portfolio allocation across account types for tax efficiency",
				type: "challenge",
				xpReward: 15,
				duration: "50 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-23-reflection",
				title: "Tax Integration Reflection",
				description: "Reflect on integrating tax strategy into investment decisions",
				type: "reflection",
				xpReward: 5,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 24: International Capital Allocation
	{
		level: 24,
		title: "International Capital Allocation",
		description: "Plan multi-country capital deployment",
		learningObjective: "Plan multi-country capital deployment",
		tier: "Professional",
		unlockRequirement: 1550,
		completed: false,
		locked: true,
		totalXP: 100,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-24-lesson",
				title: "Global Capital Deployment",
				description: "Master international investing and geopolitical considerations",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Consider global economic cycles and geopolitical factors in allocating capital. Learn about emerging market risks, currency regimes, and regional diversification. Understand basic international tax issues (like foreign tax credits). We emphasize due diligence when investing abroad and aligning allocations with global growth opportunities."
			},
			{
				id: "cm-24-quiz",
				title: "International Allocation Quiz",
				description: "Test your knowledge of global capital deployment",
				type: "quiz",
				xpReward: 30,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-24-challenge",
				title: "Foreign Market Analysis",
				description: "Analyze capital allocation to a specific foreign market",
				type: "challenge",
				xpReward: 15,
				duration: "50 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-24-reflection",
				title: "International Risk Comfort Reflection",
				description: "Reflect on comfort with currency and regulatory risks",
				type: "reflection",
				xpReward: 5,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 25: Offshore Asset Protection
	{
		level: 25,
		title: "Offshore Asset Protection",
		description: "Understand the basics of offshore trusts and shelters",
		learningObjective: "Understand the basics of offshore trusts and shelters",
		tier: "Professional",
		unlockRequirement: 1650,
		completed: false,
		locked: true,
		totalXP: 100,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-25-lesson",
				title: "Offshore Asset Protection Structures",
				description: "Learn offshore trusts and legal asset protection strategies",
				type: "lesson",
				xpReward: 50,
				duration: "50 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Offshore asset protection involves using foreign legal structures to safeguard assets from domestic legal claims. For example, an offshore asset protection trust is an irrevocable trust set up in another jurisdiction. In this arrangement, the assets are owned by a trustee (not the grantor), effectively shielding them from creditors. Compliance and transparency remain essential; illegal evasion can negate these benefits."
			},
			{
				id: "cm-25-quiz",
				title: "Offshore Protection Quiz",
				description: "Test your understanding of offshore asset protection",
				type: "quiz",
				xpReward: 30,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-25-challenge",
				title: "Jurisdiction Comparison Analysis",
				description: "Compare two offshore jurisdictions for asset protection",
				type: "challenge",
				xpReward: 15,
				duration: "55 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-25-reflection",
				title: "Offshore Structure Consideration Reflection",
				description: "Reflect on whether offshore structures are appropriate for you",
				type: "reflection",
				xpReward: 5,
				duration: "25 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 26: Trusts and Legal Structures
	{
		level: 26,
		title: "Trusts and Legal Structures",
		description: "Learn trust structures, LLCs, and estate basics",
		learningObjective: "Learn trust structures, LLCs, and estate basics",
		tier: "Professional",
		unlockRequirement: 1750,
		completed: false,
		locked: true,
		totalXP: 100,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-26-lesson",
				title: "Trust and Entity Structures",
				description: "Master trusts, LLCs, and estate planning fundamentals",
				type: "lesson",
				xpReward: 50,
				duration: "50 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "A trust is a legal entity set up to hold assets for beneficiaries. Revocable (living) trusts can be changed by the grantor, whereas irrevocable trusts cannot. Trusts often bypass probate and can offer tax or asset protection benefits. In many cases, the grantor's assets move outside their taxable estate when placed in a trust. Trustees manage trust assets according to your instructions."
			},
			{
				id: "cm-26-quiz",
				title: "Trust Structures Quiz",
				description: "Test your knowledge of trusts and legal entities",
				type: "quiz",
				xpReward: 30,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-26-challenge",
				title: "Estate Plan Flowchart",
				description: "Design a comprehensive estate planning structure",
				type: "challenge",
				xpReward: 15,
				duration: "60 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-26-reflection",
				title: "Estate Planning Concerns Reflection",
				description: "Reflect on estate planning and inheritance concerns",
				type: "reflection",
				xpReward: 5,
				duration: "25 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 27: Currency Risk and Hedging
	{
		level: 27,
		title: "Currency Risk and Hedging",
		description: "Master currency risk and hedging techniques",
		learningObjective: "Master currency risk and hedging techniques",
		tier: "Professional",
		unlockRequirement: 1850,
		completed: false,
		locked: true,
		totalXP: 100,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-27-lesson",
				title: "Currency Risk Management",
				description: "Learn currency hedging strategies and instruments",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Investing globally brings currency risk: a foreign investment's value can change with exchange rates. Currency hedging uses financial instruments (forwards, futures, options) to reduce this risk. Learn examples of forward contracts and currency options. Understand the trade-off: hedging can smooth returns by removing currency fluctuations, but it may reduce gains if the home currency moves favorably."
			},
			{
				id: "cm-27-quiz",
				title: "Currency Hedging Quiz",
				description: "Test your understanding of currency risk management",
				type: "quiz",
				xpReward: 30,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-27-challenge",
				title: "Currency Hedge Simulation",
				description: "Simulate hedged vs unhedged international investment outcomes",
				type: "challenge",
				xpReward: 15,
				duration: "50 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-27-reflection",
				title: "Currency Exposure Preference Reflection",
				description: "Reflect on your preference for currency hedging vs exposure",
				type: "reflection",
				xpReward: 5,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 28: Generating Long-Term Cashflow
	{
		level: 28,
		title: "Generating Long-Term Cashflow",
		description: "Plan for sustainable income streams from capital",
		learningObjective: "Plan for sustainable income streams from capital",
		tier: "Professional",
		unlockRequirement: 1950,
		completed: false,
		locked: true,
		totalXP: 100,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-28-lesson",
				title: "Sustainable Income Generation",
				description: "Master dividend, rental, and passive income strategies",
				type: "lesson",
				xpReward: 50,
				duration: "45 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Explore how to create cashflows: dividends from stocks, interest from bonds, rental income from real estate, annuities, and royalties. Consider also business ownership or royalties on intellectual property. Understand the yield vs. growth balance. A disciplined steward ensures cashflow needs are met without depleting principal. Diversify income sources to withstand market changes."
			},
			{
				id: "cm-28-quiz",
				title: "Cashflow Generation Quiz",
				description: "Test your knowledge of income-generating strategies",
				type: "quiz",
				xpReward: 30,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-28-challenge",
				title: "Income Portfolio Design",
				description: "Calculate a portfolio to meet specific annual income targets",
				type: "challenge",
				xpReward: 15,
				duration: "55 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-28-reflection",
				title: "Income Source Preference Reflection",
				description: "Reflect on preferred reliable income sources for your future",
				type: "reflection",
				xpReward: 5,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 29: Succession and Legacy Planning
	{
		level: 29,
		title: "Succession and Legacy Planning",
		description: "Establish plans for estate and legacy",
		learningObjective: "Establish plans for estate and legacy",
		tier: "Professional",
		unlockRequirement: 2050,
		completed: false,
		locked: true,
		totalXP: 100,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-29-lesson",
				title: "Estate and Legacy Strategy",
				description: "Master succession planning and wealth transfer strategies",
				type: "lesson",
				xpReward: 50,
				duration: "50 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "Review wills, trusts, and gifts for transferring wealth. Understand estate taxes and how to minimize them legally (e.g., gifting allowances, charitable trusts). Plan for heirs: designate roles (executors, trustees) and beneficiaries. Explore insurance strategies for liquidity. The goal is to ensure your wealth serves your intentions and family after you're gone."
			},
			{
				id: "cm-29-quiz",
				title: "Legacy Planning Quiz",
				description: "Test your understanding of estate and succession planning",
				type: "quiz",
				xpReward: 30,
				duration: "20 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-29-challenge",
				title: "Legacy Mission Statement",
				description: "Draft a comprehensive legacy mission and actionable plan",
				type: "challenge",
				xpReward: 15,
				duration: "60 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-29-reflection",
				title: "Financial Legacy Reflection",
				description: "Reflect on the financial legacy you want to leave",
				type: "reflection",
				xpReward: 5,
				duration: "25 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	},

	// Level 30: Capstone – Global Wealth Strategy
	{
		level: 30,
		title: "Capstone – Global Wealth Strategy",
		description: "Integrate all pillars into a final comprehensive plan",
		learningObjective: "Integrate all pillars into a final comprehensive plan",
		tier: "Professional",
		unlockRequirement: 2150,
		completed: false,
		locked: true,
		totalXP: 100,
		pillarId: PILLAR_IDS.CAPITAL_MANAGEMENT,
		modules: [
			{
				id: "cm-30-lesson",
				title: "Comprehensive Wealth Strategy Integration",
				description: "Synthesize all capital management concepts into a master plan",
				type: "lesson",
				xpReward: 50,
				duration: "60 min",
				completed: false,
				locked: false,
				orderIndex: 1,
				content: "As the capstone, draft a full Capital Management Plan: include your risk policy, diversified portfolio, tax strategy, asset protection, and income plan. Create an actionable roadmap with goals and timelines (e.g., a 5-year plan). Present your strategy as if advising a client or family office. This final project cements knowledge and shows readiness as a disciplined steward."
			},
			{
				id: "cm-30-quiz",
				title: "Capstone Knowledge Quiz",
				description: "Comprehensive assessment of all capital management concepts",
				type: "quiz",
				xpReward: 30,
				duration: "25 min",
				completed: false,
				locked: false,
				orderIndex: 2
			},
			{
				id: "cm-30-challenge",
				title: "Master Capital Management Plan",
				description: "Compile a complete actionable capital management strategy document",
				type: "challenge",
				xpReward: 15,
				duration: "90 min",
				completed: false,
				locked: false,
				orderIndex: 3
			},
			{
				id: "cm-30-reflection",
				title: "Capital Stewardship Transformation Reflection",
				description: "Reflect on your transformation as a capital steward",
				type: "reflection",
				xpReward: 5,
				duration: "30 min",
				completed: false,
				locked: false,
				orderIndex: 4
			}
		]
	}
];

// Export quiz questions for use in quiz components
export const CAPITAL_MANAGEMENT_QUIZ_QUESTIONS = {
	'cm-1-quiz': level1QuizQuestions,
	'cm-2-quiz': level2QuizQuestions,
	'cm-11-quiz': level11QuizQuestions,
	'cm-12-quiz': level12QuizQuestions
};
