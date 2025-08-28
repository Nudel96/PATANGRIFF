<script lang="ts">
	import { cn } from '$lib/utils';

	export let value: string = '';
	let className: string = '';
	export { className as class };

	$: textareaClass = cn(
		'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	);
</script>

<textarea
	bind:value
	class={textareaClass}
	{...$$restProps}
	on:input
	on:change
	on:focus
	on:blur
	on:keydown
	on:keyup
	on:keypress
></textarea>
