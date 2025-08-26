<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
		class?: string;
	}

	let className: string = '';
	export { className as class };

	$: titleClass = cn(
		'font-semibold leading-none tracking-tight',
		className
	);
</script>

<h3 class={titleClass} {...$$restProps}>
	<slot />
</h3>
