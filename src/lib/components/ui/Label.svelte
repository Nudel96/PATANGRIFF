<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	interface LabelProps extends HTMLLabelAttributes {
		class?: string;
	}

	let className: string = '';
	export { className as class };

	$: labelClass = cn(
		'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		className
	);
</script>

<label class={labelClass} {...$$restProps}>
	<slot />
</label>
