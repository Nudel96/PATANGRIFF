<script lang="ts">
	import { cn } from '$lib/utils';

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
