<script lang="ts">
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';

	interface TabsContentProps {
		value: string;
		class?: string;
	}

	export let value: string;
	let className: string = '';
	export { className as class };

	// Get tabs context
	const tabsContext = getContext('tabs') as {
		activeTab: any;
	};

	let isActive = false;

	// Subscribe to active tab changes
	if (tabsContext) {
		tabsContext.activeTab.subscribe((activeValue: string) => {
			isActive = activeValue === value;
		});
	}

	$: contentClass = cn(
		'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
		className
	);
</script>

{#if isActive}
	<div class={contentClass} {...$$restProps}>
		<slot />
	</div>
{/if}
