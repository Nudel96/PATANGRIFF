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

// Market heatmap data with comprehensive mock data
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
    asset: 'COPPER',
    bias: 'Very Bullish',
    score: 10,
    sentiment: { cot: 2, retailPos: -1 },
    technical: { seasonality: 1, trend: 2 },
    economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: -1 }
  },
  {
    asset: 'USDZAR',
    bias: 'Very Bullish',
    score: 10,
    sentiment: { cot: 2, retailPos: -1 },
    technical: { seasonality: -1, trend: 2 },
    economic: { gdp: 2, mPMI: 2, sPMI: 1, retailSales: 0, inflation: 1, employmentChange: 0, unemploymentRate: 0, interestRates: 0 }
  },
  {
    asset: 'PLATINUM',
    bias: 'Very Bullish',
    score: 9,
    sentiment: { cot: 2, retailPos: -1 },
    technical: { seasonality: 1, trend: 1 },
    economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: -1 }
  },
  {
    asset: 'USDCAD',
    bias: 'Very Bullish',
    score: 9,
    sentiment: { cot: 2, retailPos: 1 },
    technical: { seasonality: 1, trend: 2 },
    economic: { gdp: 2, mPMI: 0, sPMI: 1, retailSales: 2, inflation: 1, employmentChange: 0, unemploymentRate: 0, interestRates: 1 }
  },
  {
    asset: 'USDCHF',
    bias: 'Very Bullish',
    score: 9,
    sentiment: { cot: 2, retailPos: 0 },
    technical: { seasonality: -1, trend: 2 },
    economic: { gdp: 1, mPMI: 1, sPMI: 0, retailSales: 2, inflation: 0, employmentChange: 0, unemploymentRate: 2, interestRates: 0 }
  },
  {
    asset: 'EURGBP',
    bias: 'Bullish',
    score: 8,
    sentiment: { cot: 2, retailPos: 1 },
    technical: { seasonality: -1, trend: 2 },
    economic: { gdp: 1, mPMI: 0, sPMI: 2, retailSales: 0, inflation: 1, employmentChange: 0, unemploymentRate: 0, interestRates: 0 }
  },
  {
    asset: 'AUDNZD',
    bias: 'Bullish',
    score: 5,
    sentiment: { cot: 0, retailPos: 1 },
    technical: { seasonality: 1, trend: 1 },
    economic: { gdp: 0, mPMI: 0, sPMI: 1, retailSales: 2, inflation: -1, employmentChange: 2, unemploymentRate: 2, interestRates: 0 }
  },
  {
    asset: 'EURNZD',
    bias: 'Bullish',
    score: 5,
    sentiment: { cot: 2, retailPos: 1 },
    technical: { seasonality: 1, trend: -2 },
    economic: { gdp: 1, mPMI: 0, sPMI: 1, retailSales: -2, inflation: 0, employmentChange: 2, unemploymentRate: 1, interestRates: 0 }
  },
  {
    asset: 'DOW',
    bias: 'Bullish',
    score: 5,
    sentiment: { cot: 0, retailPos: -2 },
    technical: { seasonality: 2, trend: -1 },
    economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 1, interestRates: -1 }
  },
  {
    asset: 'GBPAUD',
    bias: 'Bearish',
    score: -5,
    sentiment: { cot: 0, retailPos: -1 },
    technical: { seasonality: 1, trend: -2 },
    economic: { gdp: 0, mPMI: 0, sPMI: -2, retailSales: 0, inflation: 0, employmentChange: 0, unemploymentRate: 1, interestRates: 0 }
  },
  {
    asset: 'GBPCAD',
    bias: 'Bearish',
    score: -6,
    sentiment: { cot: 0, retailPos: -1 },
    technical: { seasonality: 1, trend: -2 },
    economic: { gdp: 0, mPMI: -2, sPMI: -1, retailSales: 0, inflation: 0, employmentChange: 0, unemploymentRate: -1, interestRates: 0 }
  },
  {
    asset: 'NZDCAD',
    bias: 'Bearish',
    score: -7,
    sentiment: { cot: 0, retailPos: -1 },
    technical: { seasonality: -1, trend: -2 },
    economic: { gdp: 0, mPMI: -2, sPMI: 0, retailSales: 2, inflation: 1, employmentChange: -2, unemploymentRate: -2, interestRates: 0 }
  },
  {
    asset: 'CHFJPY',
    bias: 'Bearish',
    score: -8,
    sentiment: { cot: 0, retailPos: 0 },
    technical: { seasonality: 1, trend: -2 },
    economic: { gdp: -1, mPMI: -1, sPMI: 0, retailSales: -2, inflation: -1, employmentChange: 0, unemploymentRate: -1, interestRates: -1 }
  },
  {
    asset: 'EURUSD',
    bias: 'Bearish',
    score: -8,
    sentiment: { cot: 0, retailPos: 0 },
    technical: { seasonality: 1, trend: -2 },
    economic: { gdp: -1, mPMI: -2, sPMI: 0, retailSales: -2, inflation: 0, employmentChange: 0, unemploymentRate: -1, interestRates: -1 }
  },
  {
    asset: 'GBPCHF',
    bias: 'Very Bearish',
    score: -9,
    sentiment: { cot: 0, retailPos: -1 },
    technical: { seasonality: -1, trend: 2 },
    economic: { gdp: -1, mPMI: -1, sPMI: -2, retailSales: 0, inflation: -1, employmentChange: 0, unemploymentRate: 1, interestRates: -1 }
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
  // Simulate data refresh with slight variations
  heatmapData.update(data => 
    data.map(item => ({
      ...item,
      score: item.score + (Math.random() - 0.5) * 0.5 // Small random variation
    }))
  );
}

export function updateTimeframe(timeframe: string) {
  selectedTimeframe.set(timeframe);
  refreshMarketData();
}