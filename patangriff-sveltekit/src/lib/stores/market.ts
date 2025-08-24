import { writable } from 'svelte/store';

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

export const heatmapData = writable<CurrencyScore[]>([]);
export const selectedCurrency = writable<string>('USD');
export const lastUpdated = writable<Date>(new Date());