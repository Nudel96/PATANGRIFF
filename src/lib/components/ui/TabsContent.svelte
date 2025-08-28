<script lang="ts">
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';

	export let value: string;
	let className: string = '';
	export { className as class };

	// Get tabs context
	const tabsContext = getContext('tabs') as {
		activeTab: string;
	};

	$: isActive = tabsContext?.activeTab === value;

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
