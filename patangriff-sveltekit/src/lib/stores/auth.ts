import { writable } from 'svelte/store';

export interface User {
	id: string;
	email: string;
	displayName: string;
	membershipLevel: 'Foundation' | 'Operator' | 'Commander';
}

export const isLoggedIn = writable<boolean>(false);
export const currentUser = writable<User | null>(null);
export const currentView = writable<'dashboard' | 'journal' | 'heatmap' | 'community' | 'trading-mastery' | 'business-ops' | 'psychology' | 'capital-mgmt'>('dashboard');

export function login(user: User) {
	isLoggedIn.set(true);
	currentUser.set(user);
}

export function logout() {
	isLoggedIn.set(false);
	currentUser.set(null);
	currentView.set('dashboard');
}