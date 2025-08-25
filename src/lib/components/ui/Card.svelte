<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	interface CardProps extends HTMLAttributes<HTMLDivElement> {
		class?: string;
	}

	let className: string = '';
	export { className as class };

	$: cardClass = cn(
		'rounded-lg border bg-card text-card-foreground shadow-sm',
		className
	);
</script>

<div class={cardClass} {...$$restProps}>
	<slot />
</div>
