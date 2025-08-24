<script lang="ts">
	import { cn } from '$lib/utils';
	import { Check } from 'lucide-svelte';

	export let checked: boolean = false;
	export let disabled: boolean = false;
	let className: string = '';
	export { className as class };

	function toggle() {
		if (!disabled) {
			checked = !checked;
		}
	}
</script>

<button
	type="button"
	role="checkbox"
	aria-checked={checked}
	class={cn(
		'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		checked ? 'bg-primary text-primary-foreground' : 'bg-background',
		className
	)}
	on:click={toggle}
	{disabled}
	{...$$restProps}
>
	{#if checked}
		<Check class="h-4 w-4" />
	{/if}
</button>