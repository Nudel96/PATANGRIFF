import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { getStoredData, setStoredData, removeStoredData } from '$lib/utils';

export interface User {
  id: string;
  email: string;
  displayName: string;
  username: string;
  membershipLevel: 'Foundation' | 'Operator' | 'Commander';
  avatar?: string;
  joinDate: Date;
  level: 'S-Tier' | 'A-Tier' | 'B-Tier' | 'C-Tier';
  reputation: number;
  badges: string[];
}

// Authentication state
export const isLoggedIn = writable<boolean>(false);
export const currentUser = writable<User | null>(null);

// Initialize from localStorage if in browser
if (browser) {
  const storedAuth = getStoredData('auth', { isLoggedIn: false, user: null });
  isLoggedIn.set(storedAuth.isLoggedIn);
  if (storedAuth.user) {
    currentUser.set({
      ...storedAuth.user,
      joinDate: new Date(storedAuth.user.joinDate)
    });
  }
}

// Subscribe to changes and persist to localStorage
if (browser) {
  isLoggedIn.subscribe((value) => {
    const currentUserValue = getStoredData('auth', { isLoggedIn: false, user: null }).user;
    setStoredData('auth', { isLoggedIn: value, user: currentUserValue });
  });

  currentUser.subscribe((value) => {
    const currentAuthValue = getStoredData('auth', { isLoggedIn: false, user: null }).isLoggedIn;
    setStoredData('auth', { isLoggedIn: currentAuthValue, user: value });
  });
}

// Mock user data for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'warrior@example.com',
    displayName: 'Elite Warrior',
    username: 'elite_warrior',
    membershipLevel: 'Operator',
    joinDate: new Date('2023-06-15'),
    level: 'A-Tier',
    reputation: 2847,
    badges: ['Gold Specialist', 'Strategy Developer', 'Mentor']
  },
  {
    id: '2',
    email: 'trader@example.com',
    displayName: 'Pro Trader',
    username: 'pro_trader',
    membershipLevel: 'Commander',
    joinDate: new Date('2023-03-10'),
    level: 'S-Tier',
    reputation: 4567,
    badges: ['Master Trader', 'Community Leader', 'Verified Expert']
  }
];

export function login(email: string, password: string): boolean {
  // Mock authentication - in real app this would validate credentials
  const user = mockUsers.find(u => u.email === email);
  
  if (user && password === 'password123') {
    isLoggedIn.set(true);
    currentUser.set(user);
    return true;
  }
  
  return false;
}

export function logout() {
  isLoggedIn.set(false);
  currentUser.set(null);
  if (browser) {
    removeStoredData('auth');
  }
}

export function updateUserProfile(updates: Partial<User>) {
  currentUser.update(user => {
    if (!user) return user;
    const updatedUser = { ...user, ...updates };
    return updatedUser;
  });
}