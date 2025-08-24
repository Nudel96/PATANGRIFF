<script lang="ts">
	import { toasts } from '$lib/stores/toast';
	import Toast from './ui/Toast.svelte';
</script>

<div class="fixed top-4 right-4 z-50 space-y-2">
	{#each $toasts as toast (toast.id)}
		<Toast
			type={toast.type}
			title={toast.title}
			description={toast.description}
			duration={toast.duration}
			onClose={() => {
				toasts.update(current => current.filter(t => t.id !== toast.id));
			}}
		/>
	{/each}
</div>