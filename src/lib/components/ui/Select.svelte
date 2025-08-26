<script lang="ts">
	import { cn } from '$lib/utils';
	import { ChevronDown } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	interface SelectOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface SelectProps {
		value?: string;
		placeholder?: string;
		options: SelectOption[];
		disabled?: boolean;
		class?: string;
	}

	export let value: string = '';
	export let placeholder: string = 'Select an option...';
	export let options: SelectOption[] = [];
	export let disabled: boolean = false;
	let className: string = '';
	export { className as class };

	const dispatch = createEventDispatcher<{ change: string }>();

	let isOpen = false;
	let selectElement: HTMLDivElement;

	function toggleOpen() {
		if (!disabled) {
			isOpen = !isOpen;
		}
	}

	function selectOption(option: SelectOption) {
		if (!option.disabled) {
			value = option.value;
			isOpen = false;
			dispatch('change', value);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (selectElement && !selectElement.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	$: selectedOption = options.find(opt => opt.value === value);
	$: displayText = selectedOption?.label || placeholder;

	$: selectClass = cn(
		'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	);
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />

<div class="relative" bind:this={selectElement}>
	<div
		class={selectClass}
		class:cursor-pointer={!disabled}
		class:cursor-not-allowed={disabled}
		on:click={toggleOpen}
		on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? toggleOpen() : null}
		role="combobox"
		aria-expanded={isOpen}
		aria-controls="select-options"
		tabindex="0"
	>
		<span class:text-muted-foreground={!selectedOption}>
			{displayText}
		</span>
		<ChevronDown class="h-4 w-4 opacity-50 {isOpen ? 'rotate-180' : ''}" />
	</div>

	{#if isOpen}
		<div id="select-options" class="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
			{#each options as option}
				<div
					class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
					class:opacity-50={option.disabled}
					class:cursor-not-allowed={option.disabled}
					class:bg-accent={option.value === value}
					on:click={() => selectOption(option)}
					on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? selectOption(option) : null}
					role="option"
					aria-selected={option.value === value}
					tabindex="-1"
				>
					{option.label}
				</div>
			{/each}
		</div>
	{/if}
</div>
