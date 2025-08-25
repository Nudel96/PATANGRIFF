export interface SentimentData {
	cot: number;
	retailPos: number;
}

export interface TechnicalData {
	seasonality: number;
	trend: number;
}

export interface EconomicData {
	gdp: number;
	mPMI: number;
	sPMI: number;
	retailSales: number;
	inflation: number;
	employmentChange: number;
	unemploymentRate: number;
	interestRates: number;
}

export interface CurrencyScore {
	asset: string;
	bias: 'Very Bullish' | 'Bullish' | 'Neutral' | 'Bearish' | 'Very Bearish';
	score: number;
	sentiment: SentimentData;
	technical: TechnicalData;
	economic: EconomicData;
}

export interface EconomicIndicator {
	id: string;
	name: string;
	category: 'GDP' | 'PMI' | 'Retail Sales' | 'Inflation' | 'Employment Change' | 'Unemployment' | 'Interest Rates';
	impact: 'High' | 'Mid';
	direction: 'Higher positive' | 'Lower positive' | 'Tighter positive';
	unit: 'pp' | 'k' | 'index' | '%';
	frequency: string;
	nextRelease?: Date;
	lastValue?: number;
	forecast?: number;
	previous?: number;
	change?: number;
	weight: number;
	isFlash?: boolean;
	description: string;
}

export interface CurrencyData {
	code: string;
	name: string;
	flag: string;
	overallScore: number;
	bias: 'Very Bullish' | 'Bullish' | 'Neutral' | 'Bearish' | 'Very Bearish';
	indicators: EconomicIndicator[];
	lastUpdated: Date;
}

export interface MarketHeatmapProps {
	onBack: () => void;
	onLogout: () => void;
}

export const SAMPLE_HEATMAP_DATA: CurrencyScore[] = [
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
		asset: 'USD',
		bias: 'Very Bullish',
		score: 10,
		sentiment: { cot: 1, retailPos: 2 },
		technical: { seasonality: 1, trend: 2 },
		economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 1, employmentChange: 1, unemploymentRate: 0, interestRates: 0 }
	},
	{
		asset: 'GOLD',
		bias: 'Bullish',
		score: 8,
		sentiment: { cot: 1, retailPos: 1 },
		technical: { seasonality: 2, trend: 1 },
		economic: { gdp: 1, mPMI: 1, sPMI: 1, retailSales: 0, inflation: 1, employmentChange: 0, unemploymentRate: 0, interestRates: 0 }
	},
	{
		asset: 'JPY',
		bias: 'Bullish',
		score: 6,
		sentiment: { cot: 0, retailPos: 1 },
		technical: { seasonality: 1, trend: 1 },
		economic: { gdp: 0, mPMI: 1, sPMI: 1, retailSales: 1, inflation: 0, employmentChange: 1, unemploymentRate: 0, interestRates: 0 }
	},
	{
		asset: 'CAD',
		bias: 'Bullish',
		score: 4,
		sentiment: { cot: 0, retailPos: 1 },
		technical: { seasonality: 0, trend: 1 },
		economic: { gdp: 1, mPMI: 0, sPMI: 0, retailSales: 1, inflation: 0, employmentChange: 0, unemploymentRate: 1, interestRates: 0 }
	},
	{
		asset: 'AUD',
		bias: 'Neutral',
		score: 2,
		sentiment: { cot: 0, retailPos: 0 },
		technical: { seasonality: 0, trend: 1 },
		economic: { gdp: 0, mPMI: 0, sPMI: 0, retailSales: 0, inflation: 0, employmentChange: 1, unemploymentRate: 0, interestRates: 0 }
	},
	{
		asset: 'NZD',
		bias: 'Neutral',
		score: 1,
		sentiment: { cot: 0, retailPos: 0 },
		technical: { seasonality: 0, trend: 0 },
		economic: { gdp: 0, mPMI: 0, sPMI: 0, retailSales: 0, inflation: 0, employmentChange: 1, unemploymentRate: 0, interestRates: 0 }
	},
	{
		asset: 'CHF',
		bias: 'Neutral',
		score: -1,
		sentiment: { cot: 0, retailPos: -1 },
		technical: { seasonality: 0, trend: 0 },
		economic: { gdp: 0, mPMI: 0, sPMI: 0, retailSales: 0, inflation: 0, employmentChange: 0, unemploymentRate: 0, interestRates: 0 }
	},
	{
		asset: 'EUR',
		bias: 'Bearish',
		score: -4,
		sentiment: { cot: -1, retailPos: 0 },
		technical: { seasonality: -1, trend: 0 },
		economic: { gdp: -1, mPMI: 0, sPMI: 0, retailSales: -1, inflation: 0, employmentChange: 0, unemploymentRate: 0, interestRates: 0 }
	},
	{
		asset: 'GBP',
		bias: 'Bearish',
		score: -6,
		sentiment: { cot: -1, retailPos: -1 },
		technical: { seasonality: -1, trend: 0 },
		economic: { gdp: -1, mPMI: -1, sPMI: -1, retailSales: 0, inflation: 0, employmentChange: 0, unemploymentRate: 0, interestRates: 0 }
	},
	{
		asset: 'GBPCHF',
		bias: 'Very Bearish',
		score: -9,
		sentiment: { cot: 0, retailPos: -1 },
		technical: { seasonality: -1, trend: 2 },
		economic: { gdp: -1, mPMI: -1, sPMI: -2, retailSales: 0, inflation: -1, employmentChange: 0, unemploymentRate: 1, interestRates: -1 }
	}
];

export const SAMPLE_CURRENCY_DATA: Record<string, CurrencyData> = {
	USD: {
		code: 'USD',
		name: 'US Dollar',
		flag: '🇺🇸',
		overallScore: 8.2,
		bias: 'Very Bullish',
		lastUpdated: new Date(),
		indicators: [
			{
				id: 'usd-gdp',
				name: 'GDP Annualized q/q (Advance)',
				category: 'GDP',
				impact: 'High',
				direction: 'Higher positive',
				unit: 'pp',
				frequency: 'Quarterly',
				nextRelease: new Date('2024-01-25'),
				lastValue: 3.1,
				forecast: 2.8,
				previous: 2.9,
				change: 0.2,
				weight: 1.0,
				description: 'Measures the annualized change in the value of goods and services produced (Advance estimate)'
			},
			{
				id: 'usd-cpi',
				name: 'CPI y/y',
				category: 'Inflation',
				impact: 'High',
				direction: 'Lower positive',
				unit: 'pp',
				frequency: 'Monthly',
				nextRelease: new Date('2024-01-11'),
				lastValue: 3.1,
				forecast: 3.2,
				previous: 3.7,
				change: -0.6,
				weight: 1.0,
				description: 'Consumer Price Index measures inflation by tracking price changes in a basket of goods and services'
			}
		]
	},
	EUR: {
		code: 'EUR',
		name: 'Euro',
		flag: '🇪🇺',
		overallScore: -2.1,
		bias: 'Bearish',
		lastUpdated: new Date(),
		indicators: [
			{
				id: 'eur-gdp',
				name: 'Euro Area GDP q/q',
				category: 'GDP',
				impact: 'High',
				direction: 'Higher positive',
				unit: 'pp',
				frequency: 'Quarterly',
				nextRelease: new Date('2024-01-30'),
				lastValue: 0.1,
				forecast: 0.2,
				previous: 0.1,
				change: 0,
				weight: 1.0,
				description: 'Measures quarterly change in Eurozone economic output'
			}
		]
	},
	GBP: {
		code: 'GBP',
		name: 'British Pound',
		flag: '🇬🇧',
		overallScore: -1.8,
		bias: 'Bearish',
		lastUpdated: new Date(),
		indicators: [
			{
				id: 'gbp-gdp',
				name: 'Monthly GDP m/m',
				category: 'GDP',
				impact: 'High',
				direction: 'Higher positive',
				unit: 'pp',
				frequency: 'Monthly',
				nextRelease: new Date('2024-01-26'),
				lastValue: 0.2,
				forecast: 0.1,
				previous: 0.0,
				change: 0.2,
				weight: 1.0,
				description: 'Monthly change in UK Gross Domestic Product'
			}
		]
	}
};

export function getScoreColor(score: number): string {
	if (score >= 8) return 'bg-primary text-primary-foreground';
	if (score >= 4) return 'bg-primary/70 text-primary-foreground';
	if (score >= -3) return 'bg-muted text-muted-foreground';
	if (score >= -7) return 'bg-destructive/70 text-destructive-foreground';
	return 'bg-destructive text-destructive-foreground';
}

export function getBiasColor(bias: string): string {
	switch (bias) {
		case 'Very Bullish': return 'bg-primary text-primary-foreground';
		case 'Bullish': return 'bg-primary/70 text-primary-foreground';
		case 'Neutral': return 'bg-muted text-muted-foreground';
		case 'Bearish': return 'bg-destructive/70 text-destructive-foreground';
		case 'Very Bearish': return 'bg-destructive text-destructive-foreground';
		default: return 'bg-muted text-muted-foreground';
	}
}

export function getCellColor(value: number): string {
	if (value === 2) return 'bg-primary/20 text-primary';
	if (value === 1) return 'bg-primary/10 text-primary';
	if (value === 0) return 'bg-muted/20 text-muted-foreground';
	if (value === -1) return 'bg-destructive/10 text-destructive';
	if (value === -2) return 'bg-destructive/20 text-destructive';
	return 'bg-muted/20 text-muted-foreground';
}
