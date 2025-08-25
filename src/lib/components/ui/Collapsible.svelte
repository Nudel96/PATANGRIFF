<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { cn } from '$lib/utils';

	interface CollapsibleProps {
		open?: boolean;
		class?: string;
	}

	export let open: boolean = false;
	let className: string = '';
	export { className as class };

	const dispatch = createEventDispatcher<{ openChange: boolean }>();

	function toggle() {
		open = !open;
		dispatch('openChange', open);
	}

	$: collapsibleClass = cn('w-full', className);
</script>

<div class={collapsibleClass} {...$$restProps}>
	<slot {toggle} {open} />
</div>
