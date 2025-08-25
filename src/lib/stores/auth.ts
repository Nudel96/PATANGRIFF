import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface AuthState {
	isAuthenticated: boolean;
	user: {
		id?: string;
		name?: string;
		email?: string;
		avatar?: string;
	} | null;
	loading: boolean;
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	loading: false
};

// Create the auth store
function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(initialState);

	return {
		subscribe,
		login: (userData: { id: string; name: string; email: string; avatar?: string }) => {
			update(state => ({
				...state,
				isAuthenticated: true,
				user: userData,
				loading: false
			}));
			
			// Store in localStorage if in browser
			if (browser) {
				localStorage.setItem('auth', JSON.stringify({
					isAuthenticated: true,
					user: userData
				}));
			}
		},
		logout: () => {
			set({
				isAuthenticated: false,
				user: null,
				loading: false
			});
			
			// Clear localStorage if in browser
			if (browser) {
				localStorage.removeItem('auth');
			}
		},
		setLoading: (loading: boolean) => {
			update(state => ({ ...state, loading }));
		},
		initialize: () => {
			// Initialize auth state from localStorage
			if (browser) {
				const stored = localStorage.getItem('auth');
				if (stored) {
					try {
						const authData = JSON.parse(stored);
						if (authData.isAuthenticated && authData.user) {
							update(state => ({
								...state,
								isAuthenticated: true,
								user: authData.user
							}));
						}
					} catch (error) {
						console.error('Error parsing stored auth data:', error);
						localStorage.removeItem('auth');
					}
				}
			}
		}
	};
}

export const authStore = createAuthStore();
