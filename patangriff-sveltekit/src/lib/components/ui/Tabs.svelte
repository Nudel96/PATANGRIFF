<script lang="ts">
	import { setContext, getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { cn } from '$lib/utils';

	export let value: string;
	export let defaultValue: string = '';
	let className: string = '';
	export { className as class };

	const activeTab = writable(value || defaultValue);
	setContext('tabs', { activeTab });

	$: activeTab.set(value);

	export function onValueChange(newValue: string) {
		value = newValue;
		activeTab.set(newValue);
	}
</script>

<div class={cn('w-full', className)} {...$$restProps}>
	<slot />
</div>