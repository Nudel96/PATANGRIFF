<script lang="ts">
	import { cn } from '$lib/utils';
	import { ChevronDown } from 'lucide-svelte';

	export let value: string = '';
	export let placeholder: string = 'Select...';
	export let disabled: boolean = false;
	let className: string = '';
	export { className as class };

	let isOpen = false;
	let selectElement: HTMLDivElement;

	function toggleOpen() {
		if (!disabled) {
			isOpen = !isOpen;
		}
	}

	function selectOption(optionValue: string) {
		value = optionValue;
		isOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (selectElement && !selectElement.contains(event.target as Node)) {
			isOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative" bind:this={selectElement}>
	<button
		type="button"
		class={cn(
			'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		on:click={toggleOpen}
		{disabled}
		{...$$restProps}
	>
		<span class={value ? '' : 'text-muted-foreground'}>
			{value || placeholder}
		</span>
		<ChevronDown class="h-4 w-4 opacity-50" />
	</button>

	{#if isOpen}
		<div class="absolute top-full z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md">
			<slot {selectOption} />
		</div>
	{/if}
</div>