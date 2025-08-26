<script lang="ts">
	import { cn } from '$lib/utils';
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	interface TabsProps {
		value?: string;
		class?: string;
	}

	export let value: string = '';
	let className: string = '';
	export { className as class };

	const dispatch = createEventDispatcher<{ valueChange: string }>();
	
	// Create a store for the active tab
	const activeTab = writable(value);
	
	// Update store when value prop changes
	$: activeTab.set(value);
	
	// Provide context for child components
	setContext('tabs', {
		activeTab,
		setActiveTab: (newValue: string) => {
			activeTab.set(newValue);
			value = newValue;
			dispatch('valueChange', newValue);
		}
	});

	$: tabsClass = cn('w-full', className);
</script>

<div class={tabsClass} {...$$restProps}>
	<slot />
</div>
