<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

	interface ButtonProps extends HTMLButtonAttributes {
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
	}

	export let variant: ButtonVariant = 'default';
	export let size: ButtonSize = 'default';
	let className: string = '';
	export { className as class };

	// Button variant styles
	const variants = {
		default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
		destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
		outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
		secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
		ghost: 'hover:bg-accent hover:text-accent-foreground',
		link: 'text-primary underline-offset-4 hover:underline'
	};

	// Button size styles
	const sizes = {
		default: 'h-9 px-4 py-2',
		sm: 'h-8 rounded-md px-3 text-xs',
		lg: 'h-10 rounded-md px-8',
		icon: 'h-9 w-9'
	};

	// Base button styles
	const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

	$: buttonClass = cn(
		baseStyles,
		variants[variant],
		sizes[size],
		className
	);
</script>

<button class={buttonClass} {...$$restProps} on:click>
	<slot />
</button>
