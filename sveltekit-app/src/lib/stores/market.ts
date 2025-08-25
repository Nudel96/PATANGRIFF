import { writable, derived } from 'svelte/store';

export interface CurrencyScore {
  asset: string;
  bias: string;
  score: number;
  sentiment: {
    cot: number;
    retailPos: number;
  };
  technical: {
    seasonality: number;
    trend: number;
  };
  economic: {
    gdp: number;
    mPMI: number;
    sPMI: number;
    retailSales: number;
    inflation: number;
    employmentChange: number;
    unemploymentRate: number;
    interestRates: number;
  };
}

// Market heatmap data
export const heatmapData = writable<CurrencyScore[]>([
  {
    asset: 'USOIL',
    bias: 'Very Bullish',
    score: 13,
    sentiment: { cot: 2, retailPos: 2 },
    technical: { seasonality: 1, trend: 2 },
    economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: 1 }
  },
  {
    asset: 'BITCOIN',
    bias: 'Very Bullish',
    score: 11,
    sentiment: { cot: 2, retailPos: -1 },
    technical: { seasonality: 2, trend: 2 },
    economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: -1 }
  },
  {
    asset: 'EURUSD',
    bias: 'Bearish',
    score: -8,
    sentiment: { cot: 0, retailPos: 0 },
    technical: { seasonality: 1, trend: -2 },
    economic: { gdp: -1, mPMI: -2, sPMI: 0, retailSales: -2, inflation: 0, employmentChange: 0, unemploymentRate: -1, interestRates: -1 }
  }
]);

export const lastUpdated = writable<Date>(new Date());
export const selectedTimeframe = writable<string>('daily');

// Derived market insights
export const marketSummary = derived(heatmapData, ($data) => {
  const bullishAssets = $data.filter(item => item.score > 0).length;
  const bearishAssets = $data.filter(item => item.score < 0).length;
  const neutralAssets = $data.filter(item => item.score === 0).length;
  const strongSignals = $data.filter(item => Math.abs(item.score) > 8).length;
  
  return {
    bullishAssets,
    bearishAssets,
    neutralAssets,
    strongSignals,
    totalAssets: $data.length
  };
});

// Actions
export function refreshMarketData() {
  lastUpdated.set(new Date());
  // In real implementation, this would fetch fresh data
}

export function updateTimeframe(timeframe: string) {
  selectedTimeframe.set(timeframe);
  // Trigger data refresh for new timeframe
}