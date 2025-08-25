<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
		value?: number;
		max?: number;
		class?: string;
	}

	export let value: number = 0;
	export let max: number = 100;
	let className: string = '';
	export { className as class };

	$: percentage = Math.min(Math.max((value / max) * 100, 0), 100);

	$: progressClass = cn(
		'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
		className
	);
</script>

<div class={progressClass} {...$$restProps}>
	<div 
		class="h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out"
		style="transform: translateX(-{100 - percentage}%)"
	></div>
</div>
