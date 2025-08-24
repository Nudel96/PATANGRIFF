<script lang="ts">
	import { cn } from '$lib/utils';

	export let value: string;
	export let selectOption: (value: string) => void;
	let className: string = '';
	export { className as class };

	function handleClick() {
		selectOption(value);
	}
</script>

<button
	type="button"
	class={cn(
		'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		className
	)}
	on:click={handleClick}
	{...$$restProps}
>
	<slot />
</button>