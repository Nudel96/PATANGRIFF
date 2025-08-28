export interface LearningModule {
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

export interface LearningLevel {
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

export interface LearningProgress {
	pillar: string;
	currentLevel: number;
	totalXP: number;
	completedLevels: number[];
	completedModules: string[];
	lastAccessed: Date;
}

export interface LearningPillar {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	color: string;
	progress: number;
	currentLevel: number;
	totalLevels: number;
	sections: LearningSection[];
}

export interface LearningSection {
	range: string;
	title: string;
	status: 'completed' | 'current' | 'locked';
}

export interface LearningProps {
	onBack: () => void;
	onLogout: () => void;
}

// Pillar IDs constants
export const PILLAR_IDS = {
	TRADING_MASTERY: 'trading-mastery',
	PSYCHOLOGY: 'psychology',
	BUSINESS_OPERATIONS: 'business-ops',
	CAPITAL_MANAGEMENT: 'capital-management'
} as const;

export const SAMPLE_TRADING_MASTERY_LEVELS: LearningLevel[] = [
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
				content: "Trading is the art and science of buying and selling financial instruments to profit from price movements. Financial markets include forex (currencies), stocks, commodities, and cryptocurrencies. Successful traders combine technical analysis, fundamental analysis, and risk management to achieve consistent profitability."
			},
			{
				id: "1-2",
				title: "Market Basics Quiz",
				description: "Test your understanding of basic market concepts",
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
				content: "In forex trading, a 'pip' is the smallest price movement. For most currency pairs, 1 pip = 0.0001. A 'standard lot' equals 100,000 units of the base currency. 'Leverage' allows you to control larger positions with smaller capital, while 'margin' is the required deposit to open a leveraged position."
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
				xpReward: 30,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Candlestick charts show four key prices: Open, High, Low, and Close (OHLC). Each candlestick represents a specific time period. A green/white candle indicates price closed higher than it opened (bullish), while a red/black candle shows price closed lower (bearish). The body shows the open-close range, while wicks show the high-low range."
			},
			{
				id: "3-2",
				title: "Chart Reading Quiz",
				description: "Test your understanding of candlestick patterns",
				type: "quiz",
				xpReward: 20,
				duration: "10 min",
				completed: false,
				locked: false
			}
		]
	},
	{
		level: 4,
		title: "Support and Resistance",
		description: "Identify key support and resistance levels",
		tier: "Beginner",
		unlockRequirement: 175,
		completed: false,
		locked: true,
		totalXP: 60,
		modules: [
			{
				id: "4-1",
				title: "Support and Resistance Basics",
				description: "Learn to identify and draw key levels",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Support and resistance are key price levels where buying or selling pressure tends to emerge. Support is a level where price tends to find buying interest and bounce higher. Resistance is where selling pressure emerges and price tends to reverse lower. These levels are created by previous highs, lows, and areas of consolidation."
			},
			{
				id: "4-2",
				title: "Level Identification Quiz",
				description: "Practice identifying support and resistance",
				type: "quiz",
				xpReward: 25,
				duration: "15 min",
				completed: false,
				locked: false
			}
		]
	},
	{
		level: 5,
		title: "Trend Analysis",
		description: "Master trend identification and analysis",
		tier: "Beginner",
		unlockRequirement: 235,
		completed: false,
		locked: true,
		totalXP: 65,
		modules: [
			{
				id: "5-1",
				title: "Understanding Trends",
				description: "Learn to identify uptrends, downtrends, and sideways markets",
				type: "lesson",
				xpReward: 40,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Trends are the general direction of price movement over time. An uptrend consists of higher highs and higher lows. A downtrend shows lower highs and lower lows. Sideways trends move within a range. The trend is your friend - trading with the trend increases probability of success."
			},
			{
				id: "5-2",
				title: "Trend Analysis Challenge",
				description: "Identify trends on multiple charts",
				type: "challenge",
				xpReward: 25,
				duration: "20 min",
				completed: false,
				locked: false
			}
		]
	},
	{
		level: 6,
		title: "Basic Technical Indicators",
		description: "Learn essential indicators for market analysis",
		tier: "Beginner",
		unlockRequirement: 300,
		completed: false,
		locked: true,
		totalXP: 70,
		modules: [
			{
				id: "6-1",
				title: "Moving Averages",
				description: "Master simple and exponential moving averages",
				type: "lesson",
				xpReward: 40,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Moving averages smooth out price data to identify trends. Simple Moving Average (SMA) calculates the average price over a specific period. Exponential Moving Average (EMA) gives more weight to recent prices. When price is above the MA, it suggests an uptrend; below suggests a downtrend."
			},
			{
				id: "6-2",
				title: "RSI and MACD Basics",
				description: "Introduction to momentum indicators",
				type: "lesson",
				xpReward: 30,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "RSI (Relative Strength Index) measures overbought/oversold conditions on a scale of 0-100. Values above 70 suggest overbought, below 30 suggest oversold. MACD shows the relationship between two moving averages and helps identify trend changes and momentum."
			}
		]
	},
	{
		level: 7,
		title: "Risk Management Fundamentals",
		description: "Essential risk management principles for trading",
		tier: "Beginner",
		unlockRequirement: 370,
		completed: false,
		locked: true,
		totalXP: 75,
		modules: [
			{
				id: "7-1",
				title: "Position Sizing",
				description: "Learn how to size your trades properly",
				type: "lesson",
				xpReward: 45,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "Position sizing determines how much capital to risk per trade. The 1-2% rule suggests risking no more than 1-2% of your account per trade. Calculate position size by dividing risk amount by stop loss distance. Proper position sizing is crucial for long-term survival in trading."
			},
			{
				id: "7-2",
				title: "Stop Loss Strategies",
				description: "Master different stop loss techniques",
				type: "lesson",
				xpReward: 30,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Stop losses limit your downside risk. Place stops below support in uptrends, above resistance in downtrends. ATR-based stops adjust to volatility. Trailing stops lock in profits as trades move favorably. Never trade without a predetermined stop loss level."
			}
		]
	},
	{
		level: 8,
		title: "Order Types and Execution",
		description: "Master different order types and execution strategies",
		tier: "Beginner",
		unlockRequirement: 445,
		completed: false,
		locked: true,
		totalXP: 65,
		modules: [
			{
				id: "8-1",
				title: "Market vs Limit Orders",
				description: "Understand when to use different order types",
				type: "lesson",
				xpReward: 35,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Market orders execute immediately at current market price, guaranteeing fill but not price. Limit orders specify a price, guaranteeing price but not fill. Use market orders for immediate execution, limit orders for better prices in liquid markets."
			},
			{
				id: "8-2",
				title: "Advanced Order Types",
				description: "Stop orders, OCO orders, and conditional orders",
				type: "lesson",
				xpReward: 30,
				duration: "20 min",
				completed: false,
				locked: false,
				content: "Stop orders become market orders when price reaches stop level. Stop-limit orders become limit orders at stop level. OCO (One-Cancels-Other) orders allow setting both profit target and stop loss simultaneously. Use these for automated trade management."
			}
		]
	},
	{
		level: 9,
		title: "Market Sessions and Timing",
		description: "Understand global market sessions and optimal trading times",
		tier: "Beginner",
		unlockRequirement: 510,
		completed: false,
		locked: true,
		totalXP: 60,
		modules: [
			{
				id: "9-1",
				title: "Global Trading Sessions",
				description: "Learn about Asian, European, and US sessions",
				type: "lesson",
				xpReward: 35,
				duration: "30 min",
				completed: false,
				locked: false,
				content: "Markets operate 24/5 across different time zones. Asian session (Tokyo) is typically quieter with range-bound movement. European session (London) brings increased volatility. US session (New York) often sees the highest volume and volatility, especially during overlaps."
			},
			{
				id: "9-2",
				title: "Session Overlap Strategies",
				description: "Trade the high-volatility overlap periods",
				type: "lesson",
				xpReward: 25,
				duration: "20 min",
				completed: false,
				locked: false,
				content: "Session overlaps create increased liquidity and volatility. London-New York overlap (8am-12pm EST) is the most active period for EUR/USD and GBP/USD. Asian-European overlap affects AUD/JPY and EUR/JPY. Plan your trading around these high-activity periods."
			}
		]
	},
	{
		level: 10,
		title: "Basic Trading Plan Development",
		description: "Create your first systematic trading plan",
		tier: "Beginner",
		unlockRequirement: 570,
		completed: false,
		locked: true,
		totalXP: 80,
		modules: [
			{
				id: "10-1",
				title: "Trading Plan Components",
				description: "Essential elements of a trading plan",
				type: "lesson",
				xpReward: 45,
				duration: "35 min",
				completed: false,
				locked: false,
				content: "A trading plan includes: market selection, timeframes, entry/exit criteria, risk management rules, position sizing, and performance tracking. Define your trading goals, risk tolerance, and available time. Document everything to maintain consistency and discipline."
			},
			{
				id: "10-2",
				title: "Plan Development Workshop",
				description: "Create your personal trading plan",
				type: "challenge",
				xpReward: 35,
				duration: "60 min",
				completed: false,
				locked: false
			}
		]
	}
];

export const SAMPLE_PSYCHOLOGY_LEVELS: LearningLevel[] = [
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
		title: "Emotional Awareness in Trading",
		description: "Identify and understand the primary emotions that affect trading decisions",
		tier: "Beginner",
		unlockRequirement: 50,
		completed: false,
		locked: true,
		totalXP: 60,
		modules: [
			{
				id: "2-1",
				title: "The Big Four Emotions",
				description: "Fear, Greed, Hope, and Regret - how they impact your trading",
				type: "lesson",
				xpReward: 40,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "The four primary emotions in trading are Fear (causing premature exits and missed opportunities), Greed (leading to overtrading and excessive risk), Hope (preventing stop-loss execution), and Regret (causing revenge trading). Recognizing these emotions as they arise is the first step to managing them effectively."
			},
			{
				id: "2-2",
				title: "Emotional Recognition Exercise",
				description: "Practice identifying emotions in trading scenarios",
				type: "assessment",
				xpReward: 20,
				duration: "15 min",
				completed: false,
				locked: false
			}
		]
	}
];

export const SAMPLE_BUSINESS_OPS_LEVELS: LearningLevel[] = [
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
				content: "The entrepreneurial mindset is characterized by opportunity recognition, calculated risk-taking, and persistent problem-solving. As a trader, you are essentially running a business where your capital is your inventory and market movements are your revenue opportunities. This mindset shift from employee to entrepreneur is crucial for long-term trading success."
			},
			{
				id: "1-2",
				title: "Mindset Assessment",
				description: "Evaluate your current entrepreneurial thinking patterns",
				type: "assessment",
				xpReward: 20,
				duration: "15 min",
				completed: false,
				locked: false
			}
		]
	}
];

export const SAMPLE_CAPITAL_MGMT_LEVELS: LearningLevel[] = [
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
				content: "Capital management is the systematic approach to preserving and growing your trading capital through proper risk management, position sizing, and portfolio diversification. The primary goal is to survive long enough to be profitable, as even the best trading strategies will have losing streaks. Proper capital management ensures you can weather these storms and capitalize on winning periods."
			}
		]
	}
];

export function getModuleTypeColor(type: string): string {
	switch (type) {
		case 'lesson': return 'bg-primary/10 text-primary';
		case 'quiz': return 'bg-secondary/10 text-secondary';
		case 'assessment': return 'bg-primary/10 text-primary';
		case 'project': return 'bg-secondary/10 text-secondary';
		case 'challenge': return 'bg-destructive/10 text-destructive';
		case 'reflection': return 'bg-primary/10 text-primary';
		default: return 'bg-muted/10 text-muted-foreground';
	}
}

export function getTierColor(tier: string): string {
	switch (tier) {
		case 'Beginner': return 'bg-secondary/10 text-secondary';
		case 'Intermediate': return 'bg-primary/10 text-primary';
		case 'Professional': return 'bg-destructive/10 text-destructive';
		default: return 'bg-muted/10 text-muted-foreground';
	}
}

export function calculateProgress(levels: LearningLevel[]): number {
	const completedLevels = levels.filter(level => level.completed).length;
	return levels.length > 0 ? (completedLevels / levels.length) * 100 : 0;
}
