import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface User {
  id: string;
  email: string;
  displayName: string;
  membershipLevel: 'Foundation' | 'Operator' | 'Commander';
}

// Authentication state
export const isLoggedIn = writable<boolean>(false);
export const currentUser = writable<User | null>(null);

// Initialize from localStorage if in browser
if (browser) {
  const stored = localStorage.getItem('isLoggedIn');
  if (stored === 'true') {
    isLoggedIn.set(true);
    const userData = localStorage.getItem('userData');
    if (userData) {
      currentUser.set(JSON.parse(userData));
    }
  }
}

// Subscribe to changes and persist to localStorage
if (browser) {
  isLoggedIn.subscribe((value) => {
    localStorage.setItem('isLoggedIn', value.toString());
  });

  currentUser.subscribe((value) => {
    if (value) {
      localStorage.setItem('userData', JSON.stringify(value));
    } else {
      localStorage.removeItem('userData');
    }
  });
}

export function login(user: User) {
  isLoggedIn.set(true);
  currentUser.set(user);
}

export function logout() {
  isLoggedIn.set(false);
  currentUser.set(null);
  if (browser) {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
  }
}