<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';
	import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-svelte';

	export let type: 'success' | 'error' | 'warning' | 'info' = 'info';
	export let title: string = '';
	export let description: string = '';
	export let duration: number = 5000;
	export let onClose: (() => void) | undefined = undefined;

	let visible = true;
	let timeoutId: NodeJS.Timeout;

	const icons = {
		success: CheckCircle,
		error: AlertCircle,
		warning: AlertTriangle,
		info: Info
	};

	const styles = {
		success: 'bg-primary/10 border-primary/20 text-primary',
		error: 'bg-destructive/10 border-destructive/20 text-destructive',
		warning: 'bg-orange-500/10 border-orange-500/20 text-orange-500',
		info: 'bg-secondary/10 border-secondary/20 text-secondary'
	};

	onMount(() => {
		if (duration > 0) {
			timeoutId = setTimeout(() => {
				close();
			}, duration);
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	});

	function close() {
		visible = false;
		if (onClose) onClose();
	}
</script>

{#if visible}
	<div
		class={cn(
			'fixed top-4 right-4 z-50 w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all duration-300',
			styles[type]
		)}
	>
		<div class="flex items-start space-x-3">
			<svelte:component this={icons[type]} class="w-5 h-5 mt-0.5 flex-shrink-0" />
			<div class="flex-1">
				{#if title}
					<h4 class="font-semibold mb-1">{title}</h4>
				{/if}
				{#if description}
					<p class="text-sm opacity-90">{description}</p>
				{/if}
			</div>
			<button
				on:click={close}
				class="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
			>
				<X class="w-4 h-4" />
			</button>
		</div>
	</div>
{/if}