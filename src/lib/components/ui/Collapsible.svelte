<script lang="ts">
	import { cn } from '$lib/utils';

	export let open: boolean = false;
	export let onOpenChange: ((open: boolean) => void) | undefined = undefined;
	let className: string = '';
	export { className as class };

	function toggle() {
		open = !open;
		onOpenChange?.(open);
	}

	$: collapsibleClass = cn('w-full', className);
</script>

<div class={collapsibleClass} {...$$restProps}>
	<slot {toggle} {open} />
</div>
