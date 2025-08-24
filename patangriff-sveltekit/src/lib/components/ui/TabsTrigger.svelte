<script lang="ts">
	import { getContext } from 'svelte';
	import { cn } from '$lib/utils';

	export let value: string;
	let className: string = '';
	export { className as class };

	const { activeTab } = getContext('tabs');

	function handleClick() {
		activeTab.set(value);
	}
</script>

<button
	class={cn(
		'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		$activeTab === value
			? 'bg-background text-foreground shadow-sm'
			: 'hover:bg-muted/50',
		className
	)}
	on:click={handleClick}
	{...$$restProps}
>
	<slot />
</button>