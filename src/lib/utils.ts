import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility functions for the trading platform
export function formatCurrency(amount: number, currency = 'USD'): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(amount);
}

export function formatPercentage(value: number, decimals = 2): string {
	return `${value.toFixed(decimals)}%`;
}

export function formatDate(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

export function formatDateTime(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return d.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

export function calculateRiskReward(entry: number, stop: number, target: number): number {
	const risk = Math.abs(entry - stop);
	const reward = Math.abs(target - entry);
	return reward / risk;
}

export function calculatePositionSize(
	accountSize: number,
	riskPercent: number,
	entryPrice: number,
	stopPrice: number
): number {
	const riskAmount = accountSize * (riskPercent / 100);
	const riskPerShare = Math.abs(entryPrice - stopPrice);
	return riskAmount / riskPerShare;
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

// Generate unique IDs
export function generateId(): string {
	return Math.random().toString(36).substr(2, 9);
}

// Validate email format
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Sleep function for async operations
export function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}
