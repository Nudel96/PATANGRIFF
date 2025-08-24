<script lang="ts">
	import { cn } from '$lib/utils';
	import { X } from 'lucide-svelte';

	export let open = false;
	export let onClose: (() => void) | undefined = undefined;
	let className: string = '';
	export { className as class };

	function handleClose() {
		open = false;
		if (onClose) onClose();
	}

	function handleBackdropClick() {
		handleClose();
	}

	function handleContentClick(event: MouseEvent) {
		event.stopPropagation();
	}
</script>

{#if open}
	<!-- Backdrop -->
	<div 
		class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
		on:click={handleBackdropClick}
	>
		<!-- Dialog Content -->
		<div 
			class={cn(
				'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
				className
			)}
			on:click={handleContentClick}
			{...$$restProps}
		>
			<slot />
		</div>
	</div>
{/if}