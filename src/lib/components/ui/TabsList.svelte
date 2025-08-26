<script lang="ts">
	import { cn } from '$lib/utils';

	interface TabsListProps {
		class?: string;
	}

	let className: string = '';
	export { className as class };

	$: listClass = cn(
		'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
		className
	);
</script>

<div class={listClass} {...$$restProps}>
	<slot />
</div>
