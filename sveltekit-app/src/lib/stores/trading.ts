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
  notes: string;
  checklistScore: number;
  setup: string;
  createdAt: Date;
  closedAt?: Date;
}

// Trading journal state
export const trades = writable<Trade[]>([]);
export const selectedTrade = writable<Trade | null>(null);

// Derived statistics
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

// Actions
export function addTrade(trade: Omit<Trade, 'id' | 'createdAt'>) {
  const newTrade: Trade = {
    ...trade,
    id: Date.now().toString(),
    createdAt: new Date()
  };
  
  trades.update(current => [...current, newTrade]);
  return newTrade;
}

export function updateTrade(id: string, updates: Partial<Trade>) {
  trades.update(current => 
    current.map(trade => 
      trade.id === id 
        ? { ...trade, ...updates }
        : trade
    )
  );
}

export function deleteTrade(id: string) {
  trades.update(current => current.filter(trade => trade.id !== id));
}