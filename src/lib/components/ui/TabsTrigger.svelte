<script lang="ts">
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';



	export let value: string;
	let className: string = '';
	export { className as class };

	// Get tabs context
	const tabsContext = getContext('tabs') as {
		activeTab: string;
		setActiveTab: (value: string) => void;
	};

	$: isActive = tabsContext?.activeTab === value;

	function handleClick() {
		if (tabsContext) {
			tabsContext.setActiveTab(value);
		}
	}

	$: triggerClass = cn(
		'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		isActive 
			? 'bg-background text-foreground shadow' 
			: 'text-muted-foreground hover:text-foreground',
		className
	);
</script>

<button class={triggerClass} on:click={handleClick} {...$$restProps}>
	<slot />
</button>
