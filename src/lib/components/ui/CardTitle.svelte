<script lang="ts">
	import { cn } from '$lib/utils';

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
