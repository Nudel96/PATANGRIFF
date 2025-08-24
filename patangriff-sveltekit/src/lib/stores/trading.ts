import { writable, derived } from 'svelte/store';

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
	mae?: number;
	mfe?: number;
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

export interface ChecklistItem {
	id: string;
	category: string;
	item: string;
	checked: boolean;
	required: boolean;
	weight: number;
}

export interface PartialClose {
	id: string;
	percentage: number;
	price: number;
	reason: string;
	timestamp: Date;
}

export const trades = writable<Trade[]>([]);
export const selectedTrade = writable<Trade | null>(null);

export const tradingStats = derived(trades, ($trades) => {
	const closedTrades = $trades.filter(trade => trade.status === 'closed');
	const totalR = closedTrades.reduce((sum, trade) => sum + (trade.actualR || 0), 0);
	const winningTrades = closedTrades.filter(trade => (trade.actualR || 0) > 0);
	const losingTrades = closedTrades.filter(trade => (trade.actualR || 0) < 0);
	
	const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0;
	const avgWin = winningTrades.length > 0 ? winningTrades.reduce((sum, trade) => sum + (trade.actualR || 0), 0) / winningTrades.length : 0;
	const avgLoss = losingTrades.length > 0 ? Math.abs(losingTrades.reduce((sum, trade) => sum + (trade.actualR || 0), 0) / losingTrades.length) : 0;
	const expectancy = (winRate / 100 * avgWin) - ((100 - winRate) / 100 * avgLoss);
	const avgDisciplineScore = closedTrades.length > 0 ? closedTrades.reduce((sum, trade) => sum + trade.checklistScore, 0) / closedTrades.length : 0;

	return {
		totalTrades: closedTrades.length,
		totalR,
		winRate,
		avgWin,
		avgLoss,
		expectancy,
		avgDisciplineScore
	};
});