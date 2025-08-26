<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
		class?: string;
	}

	let className: string = '';
	export { className as class };

	$: contentClass = cn(
		'p-6 pt-0',
		className
	);
</script>

<div class={contentClass} {...$$restProps}>
	<slot />
</div>
