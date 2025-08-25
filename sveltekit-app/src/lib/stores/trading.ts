import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { getStoredData, setStoredData, generateId } from '$lib/utils';

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
  exitReason?: string;
}

// Trading journal state
export const trades = writable<Trade[]>([]);
export const selectedTrade = writable<Trade | null>(null);

// Initialize from localStorage
if (browser) {
  const storedTrades = getStoredData<Trade[]>('trades', []);
  const parsedTrades = storedTrades.map(trade => ({
    ...trade,
    date: new Date(trade.date),
    createdAt: new Date(trade.createdAt),
    closedAt: trade.closedAt ? new Date(trade.closedAt) : undefined
  }));
  trades.set(parsedTrades);
}

// Persist to localStorage on changes
if (browser) {
  trades.subscribe((value) => {
    setStoredData('trades', value);
  });
}

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

// Sample trades for demo
const sampleTrades: Trade[] = [
  {
    id: '1',
    date: new Date('2024-01-15'),
    instrument: 'EURUSD',
    direction: 'long',
    entryPrice: 1.0850,
    stopPrice: 1.0820,
    targetPrice: 1.0910,
    exitPrice: 1.0920,
    quantity: 100000,
    riskAmount: 300,
    riskPercent: 1.0,
    plannedRR: 2.0,
    actualR: 2.3,
    status: 'closed',
    session: 'London',
    notes: 'Clean breakout above resistance with strong volume',
    checklistScore: 95,
    setup: 'breakout',
    createdAt: new Date('2024-01-15T08:30:00'),
    closedAt: new Date('2024-01-15T12:45:00'),
    exitReason: 'Target hit'
  },
  {
    id: '2',
    date: new Date('2024-01-16'),
    instrument: 'XAUUSD',
    direction: 'long',
    entryPrice: 2020.50,
    stopPrice: 2000.00,
    targetPrice: 2080.00,
    quantity: 1000,
    riskAmount: 205,
    riskPercent: 0.7,
    plannedRR: 2.9,
    status: 'open',
    session: 'NY',
    notes: 'Gold breakout setup with volume confirmation',
    checklistScore: 88,
    setup: 'breakout',
    createdAt: new Date('2024-01-16T09:15:00')
  }
];

// Initialize with sample data if no stored data exists
if (browser) {
  const currentTrades = getStoredData<Trade[]>('trades', []);
  if (currentTrades.length === 0) {
    setStoredData('trades', sampleTrades);
    trades.set(sampleTrades);
  }
}

// Actions
export function addTrade(tradeData: Omit<Trade, 'id' | 'createdAt'>) {
  const newTrade: Trade = {
    ...tradeData,
    id: generateId(),
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

export function openTrade(id: string) {
  updateTrade(id, { status: 'open' });
}

export function closeTrade(id: string, exitPrice: number, exitReason: string) {
  trades.update(current => 
    current.map(trade => {
      if (trade.id === id) {
        const risk = Math.abs(trade.entryPrice - trade.stopPrice);
        const actualReturn = trade.direction === 'long' 
          ? exitPrice - trade.entryPrice 
          : trade.entryPrice - exitPrice;
        const actualR = risk > 0 ? actualReturn / risk : 0;
        
        return {
          ...trade,
          status: 'closed' as const,
          exitPrice,
          exitReason,
          actualR,
          closedAt: new Date()
        };
      }
      return trade;
    })
  );
}