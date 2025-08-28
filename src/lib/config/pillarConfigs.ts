import { 
	Briefcase, 
	TrendingUp, 
	Brain, 
	Shield,
	Target,
	Building,
	Heart,
	DollarSign,
	BarChart3,
	Users,
	Lightbulb,
	Zap,
	Lock,
	Globe,
	Calculator,
	PieChart
} from 'lucide-svelte';
import type { LearningLevel } from '$lib/types/learning';
import { SAMPLE_BUSINESS_OPS_LEVELS, SAMPLE_TRADING_MASTERY_LEVELS, SAMPLE_PSYCHOLOGY_LEVELS } from '$lib/types/learning';
import { CAPITAL_MANAGEMENT_LEVELS } from '$lib/data/capitalManagement';
import { TRADING_MASTERY_INTERMEDIATE_LEVELS, TRADING_MASTERY_PROFESSIONAL_LEVELS } from '$lib/data/tradingMasteryLevels';
import { PSYCHOLOGY_BEGINNER_LEVELS, PSYCHOLOGY_INTERMEDIATE_LEVELS, PSYCHOLOGY_PROFESSIONAL_LEVELS } from '$lib/data/psychologyLevels';
import { BUSINESS_OPS_BEGINNER_LEVELS, BUSINESS_OPS_INTERMEDIATE_LEVELS, BUSINESS_OPS_PROFESSIONAL_LEVELS } from '$lib/data/businessOpsLevels';

export interface PillarConfig {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	icon: any;
	conceptCards: Array<{
		icon: any;
		title: string;
		description: string;
	}>;
	levels: LearningLevel[];
}

export const BUSINESS_OPS_CONFIG: PillarConfig = {
	id: 'business-ops',
	title: 'Business Operations Mastery',
	subtitle: 'Trading as Professional Enterprise',
	description: 'Transform from individual trader to professional trading business. Learn systems, processes, and strategies that scale beyond personal limitations.',
	icon: Briefcase,
	conceptCards: [
		{
			icon: Target,
			title: 'Strategic Planning',
			description: 'Develop long-term vision and systematic approaches to trading success'
		},
		{
			icon: Building,
			title: 'Systems & Processes',
			description: 'Build scalable systems that work consistently without constant oversight'
		},
		{
			icon: TrendingUp,
			title: 'Growth & Scaling',
			description: 'Scale your trading operations and build sustainable competitive advantages'
		}
	],
	levels: [...SAMPLE_BUSINESS_OPS_LEVELS, ...BUSINESS_OPS_BEGINNER_LEVELS, ...BUSINESS_OPS_INTERMEDIATE_LEVELS, ...BUSINESS_OPS_PROFESSIONAL_LEVELS]
};

export const TRADING_MASTERY_CONFIG: PillarConfig = {
	id: 'trading-mastery',
	title: 'Trading Mastery',
	subtitle: 'Strategy → Macro → Technicals → Execution',
	description: 'Master the complete trading sequence from macro-economic analysis to precise execution. Develop systematic approaches to market analysis and risk-managed position sizing.',
	icon: TrendingUp,
	conceptCards: [
		{
			icon: BarChart3,
			title: 'Technical Analysis',
			description: 'Master chart patterns, indicators, and price action for precise market timing'
		},
		{
			icon: Globe,
			title: 'Macro Analysis',
			description: 'Understand economic cycles, central bank policy, and global market dynamics'
		},
		{
			icon: Target,
			title: 'Risk Management',
			description: 'Implement mathematical position sizing and systematic risk control protocols'
		}
	],
	levels: [...SAMPLE_TRADING_MASTERY_LEVELS, ...TRADING_MASTERY_INTERMEDIATE_LEVELS, ...TRADING_MASTERY_PROFESSIONAL_LEVELS]
};

export const PSYCHOLOGY_CONFIG: PillarConfig = {
	id: 'psychology',
	title: 'Trading Psychology',
	subtitle: 'Warrior Mental Conditioning',
	description: 'Forge the mental framework of elite operators: protocol development, anti-tilt strategies, ego management, and professional identity formation that commands market respect.',
	icon: Brain,
	conceptCards: [
		{
			icon: Heart,
			title: 'Emotional Mastery',
			description: 'Control fear, greed, hope, and regret to make rational trading decisions'
		},
		{
			icon: Target,
			title: 'Mental Discipline',
			description: 'Develop unwavering focus and consistency in following your trading plan'
		},
		{
			icon: Shield,
			title: 'Resilience Building',
			description: 'Build psychological armor against market stress and performance pressure'
		}
	],
	levels: [...SAMPLE_PSYCHOLOGY_LEVELS, ...PSYCHOLOGY_BEGINNER_LEVELS, ...PSYCHOLOGY_INTERMEDIATE_LEVELS, ...PSYCHOLOGY_PROFESSIONAL_LEVELS]
};

export const CAPITAL_MANAGEMENT_CONFIG: PillarConfig = {
	id: 'capital-management',
	title: 'Capital Management',
	subtitle: 'Preserve → Protect → Profit → Prosper',
	description: 'Master the art and science of capital preservation, risk management, and wealth building. Learn institutional-grade strategies for protecting and growing your trading capital.',
	icon: Shield,
	conceptCards: [
		{
			icon: DollarSign,
			title: 'Capital Preservation',
			description: 'Protect your trading capital with proven risk management strategies'
		},
		{
			icon: PieChart,
			title: 'Portfolio Optimization',
			description: 'Build diversified portfolios that maximize returns while minimizing risk'
		},
		{
			icon: Calculator,
			title: 'Risk Mathematics',
			description: 'Apply quantitative methods to measure and control portfolio risk'
		}
	],
	levels: CAPITAL_MANAGEMENT_LEVELS
};

// Export all configs for easy access
export const PILLAR_CONFIGS = {
	'business-ops': BUSINESS_OPS_CONFIG,
	'trading-mastery': TRADING_MASTERY_CONFIG,
	'psychology': PSYCHOLOGY_CONFIG,
	'capital-management': CAPITAL_MANAGEMENT_CONFIG
} as const;

// Helper function to get config by pillar ID
export function getPillarConfig(pillarId: string): PillarConfig | null {
	return PILLAR_CONFIGS[pillarId as keyof typeof PILLAR_CONFIGS] || null;
}

// Type for pillar IDs
export type PillarId = keyof typeof PILLAR_CONFIGS;
