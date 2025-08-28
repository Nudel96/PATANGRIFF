<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string = '';
	export { className as class };

	$: headerClass = cn(
		'flex flex-col space-y-1.5 p-6',
		className
	);
</script>

<div class={headerClass} {...$$restProps}>
	<slot />
</div>
