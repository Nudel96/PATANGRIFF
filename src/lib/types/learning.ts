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
				xpReward: 50,
				duration: "25 min",
				completed: false,
				locked: false,
				content: "Candlestick charts show four key prices: Open, High, Low, and Close (OHLC). Each candlestick represents a specific time period. A green/white candle indicates price closed higher than it opened (bullish), while a red/black candle shows price closed lower (bearish). The body shows the open-close range, while wicks show the high-low range."
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
