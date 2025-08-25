<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	
	// Import stores
	import { authStore } from '$lib/stores/auth';
	
	onMount(() => {
		// Initialize any global app state here
		console.log('PAT ANGRIFF SvelteKit app initialized');
	});
</script>

<div class="min-h-screen bg-background text-foreground">
	<slot />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
