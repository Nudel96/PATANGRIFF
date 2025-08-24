<script lang="ts">
	import '../app.css';
	import { isLoggedIn } from '$lib/stores/auth';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

	// Initialize authentication state from localStorage on app start
	onMount(() => {
		const savedAuthState = localStorage.getItem('isLoggedIn');
		if (savedAuthState === 'true') {
			isLoggedIn.set(true);
		}
	});
</script>

<div class="min-h-screen bg-background text-foreground">
	{#if !$isLoggedIn}
		<Header />
		<main>
			<slot />
		</main>
		<Footer />
	{:else}
		<slot />
	{/if}
</div>