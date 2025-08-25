import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const load: LayoutLoad = async ({ url }) => {
  // Check authentication on client side
  if (browser) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      throw redirect(302, '/');
    }
    
    // Load user data
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;
    
    return {
      user,
      currentPath: url.pathname
    };
  }
  
  return {
    user: null,
    currentPath: url.pathname
  };
};