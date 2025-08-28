<script lang="ts">
	import { cn } from '$lib/utils';
	import { setContext } from 'svelte';

	export let value: string = '';
	let className: string = '';
	export { className as class };

	// Provide context for child components
	setContext('tabs', {
		get activeTab() { return value; },
		setActiveTab: (newValue: string) => {
			value = newValue;
		}
	});

	$: tabsClass = cn('w-full', className);
</script>

<div class={tabsClass} {...$$restProps}>
	<slot />
</div>
