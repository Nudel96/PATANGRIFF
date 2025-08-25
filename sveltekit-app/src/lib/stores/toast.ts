import { writable } from 'svelte/store';

export interface Toast {
  id: string;
  title?: string;
  description: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const toasts = writable<Toast[]>([]);

export function addToast(toast: Omit<Toast, 'id'>) {
  const id = Date.now().toString();
  const newToast: Toast = {
    id,
    duration: 5000,
    ...toast
  };
  
  toasts.update(current => [...current, newToast]);
  
  // Auto-remove after duration
  if (newToast.duration && newToast.duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, newToast.duration);
  }
  
  return id;
}

export function removeToast(id: string) {
  toasts.update(current => current.filter(toast => toast.id !== id));
}

export function clearToasts() {
  toasts.set([]);
}

// Convenience functions
export const toast = {
  success: (description: string, title?: string) => 
    addToast({ type: 'success', description, title }),
  
  error: (description: string, title?: string) => 
    addToast({ type: 'error', description, title }),
  
  warning: (description: string, title?: string) => 
    addToast({ type: 'warning', description, title }),
  
  info: (description: string, title?: string) => 
    addToast({ type: 'info', description, title })
};