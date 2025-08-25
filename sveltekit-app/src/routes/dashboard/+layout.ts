import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const load: LayoutLoad = async ({ url }) => {
  // Check authentication on client side
  if (browser) {
    const authData = localStorage.getItem('auth');
    const isLoggedIn = authData ? JSON.parse(authData).isLoggedIn : false;
    
    if (!isLoggedIn) {
      throw redirect(302, '/');
    }
    
    // Load user data
    const userData = authData ? JSON.parse(authData).user : null;
    
    return {
      user: userData,
      currentPath: url.pathname
    };
  }
  
  return {
    user: null,
    currentPath: url.pathname
  };
};