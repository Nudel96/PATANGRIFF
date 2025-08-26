export interface ChecklistItem {
	id: string;
	text: string;
	checked: boolean;
	weight: number;
}

export interface ChecklistTemplate {
	id: string;
	name: string;
	items: ChecklistItem[];
}

export interface PartialClose {
	id: string;
	percentage: number;
	price: number;
	timestamp: Date;
	reason: string;
}

export interface Trade {
	id: string;
	date: Date;
	instrument: string;
	direction: 'long' | 'short';
	entryPrice: number;
	stopPrice: number;
	targetPrice?: number;
	exitPrice?: number;
	quantity: number;
	riskAmount: number;
	riskPercent: number;
	plannedRR: number;
	actualR?: number;
	status: 'pending' | 'open' | 'closed' | 'invalidated';
	session: 'Asia' | 'London' | 'NY';
	macroEvents: string[];
	redNewsNext15: boolean;
	atrPercentile?: number;
	beforeImage?: string;
	afterImage?: string;
	mae?: number; // Maximum Adverse Excursion
	mfe?: number; // Maximum Favorable Excursion
	highestPrice?: number;
	lowestPrice?: number;
	notes: string;
	exitReason?: string;
	checklistScore: number;
	checklistItems: ChecklistItem[];
	setup: string;
	mistakes: string[];
	partialCloses: PartialClose[];
	createdAt: Date;
	closedAt?: Date;
}

export interface TradingStats {
	totalTrades: number;
	totalR: number;
	winRate: number;
	avgWin: number;
	avgLoss: number;
	expectancy: number;
	avgDisciplineScore: number;
}

export interface TradingJournalProps {
	onBack: () => void;
	onLogout: () => void;
}

export type TradeStatus = 'pending' | 'open' | 'closed' | 'invalidated';
export type TradeDirection = 'long' | 'short';
export type TradingSession = 'Asia' | 'London' | 'NY';
export type TradeSetup = 'breakout' | 'pullback' | 'reversal' | 'continuation' | 'range' | 'news';

export const TRADE_SETUPS: TradeSetup[] = ['breakout', 'pullback', 'reversal', 'continuation', 'range', 'news'];
export const TRADING_SESSIONS: TradingSession[] = ['Asia', 'London', 'NY'];
export const MACRO_EVENTS = ['ECB', 'Fed', 'BOE', 'BOJ', 'RBA', 'RBNZ', 'SNB', 'BOC', 'NFP', 'CPI', 'GDP', 'PMI'];

export const DEFAULT_CHECKLIST_TEMPLATES: ChecklistTemplate[] = [
	{
		id: 'breakout',
		name: 'Breakout Setup',
		items: [
			{ id: '1', text: 'Clear resistance/support level identified', checked: false, weight: 20 },
			{ id: '2', text: 'Volume confirmation on breakout', checked: false, weight: 15 },
			{ id: '3', text: 'No major news in next 15 minutes', checked: false, weight: 10 },
			{ id: '4', text: 'ATR above 50th percentile', checked: false, weight: 10 },
			{ id: '5', text: 'Risk/Reward ratio >= 1:2', checked: false, weight: 15 },
			{ id: '6', text: 'Position size calculated correctly', checked: false, weight: 10 },
			{ id: '7', text: 'Stop loss placed beyond structure', checked: false, weight: 20 }
		]
	},
	{
		id: 'pullback',
		name: 'Pullback Setup',
		items: [
			{ id: '1', text: 'Clear trend direction established', checked: false, weight: 25 },
			{ id: '2', text: 'Pullback to key support/resistance', checked: false, weight: 20 },
			{ id: '3', text: 'Confluence with moving averages', checked: false, weight: 15 },
			{ id: '4', text: 'Risk/Reward ratio >= 1:2', checked: false, weight: 15 },
			{ id: '5', text: 'Position size calculated correctly', checked: false, weight: 10 },
			{ id: '6', text: 'Stop loss beyond pullback low/high', checked: false, weight: 15 }
		]
	}
];

export function getSetupChecklist(setup: string): ChecklistItem[] {
	const template = DEFAULT_CHECKLIST_TEMPLATES.find(t => t.id === setup);
	return template ? template.items.map(item => ({ ...item, checked: false })) : [];
}

export function calculateChecklistScore(items: ChecklistItem[]): number {
	const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
	const checkedWeight = items.filter(item => item.checked).reduce((sum, item) => sum + item.weight, 0);
	return totalWeight > 0 ? Math.round((checkedWeight / totalWeight) * 100) : 0;
}
