// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = async ({ url }: Parameters<LayoutLoad>[0]) => {
	// In a real app, you'd check authentication from a server endpoint
	// For this demo, we'll check localStorage on the client side
	if (typeof window !== 'undefined') {
		const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
		if (!isLoggedIn) {
			throw redirect(302, '/');
		}
	}

	return {
		user: {
			id: '1',
			email: 'warrior@example.com',
			displayName: 'Elite Warrior',
			membershipLevel: 'Operator'
		}
	};
};