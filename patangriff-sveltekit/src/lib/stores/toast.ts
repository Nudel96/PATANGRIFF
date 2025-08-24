import { writable } from 'svelte/store';

export interface Toast {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	title: string;
	description?: string;
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
export function showSuccess(title: string, description?: string) {
	return addToast({ type: 'success', title, description });
}

export function showError(title: string, description?: string) {
	return addToast({ type: 'error', title, description });
}

export function showWarning(title: string, description?: string) {
	return addToast({ type: 'warning', title, description });
}

export function showInfo(title: string, description?: string) {
	return addToast({ type: 'info', title, description });
}