<script lang="ts">
	import { cn } from '$lib/utils';

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
