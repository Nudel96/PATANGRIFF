<script lang="ts">
	// This will be the main landing page
	// For now, just a placeholder - we'll migrate the React components here
	
	import { authStore } from '$lib/stores/auth';
	
	let isLoggedIn = false;
	
	// Subscribe to auth store
	authStore.subscribe(auth => {
		isLoggedIn = auth.isAuthenticated;
	});
</script>

<svelte:head>
	<title>PAT ANGRIFF - Elite Trading Platform</title>
	<meta name="description" content="Transform from chart-watcher to market operator with PAT ANGRIFF's elite trading platform." />
</svelte:head>

<main>
	{#if isLoggedIn}
		<!-- Dashboard view will go here -->
		<div class="container mx-auto px-4 py-8">
			<h1 class="text-4xl font-bold text-center mb-8">Welcome to PAT ANGRIFF Dashboard</h1>
			<p class="text-center text-muted-foreground">Dashboard components will be migrated here</p>
		</div>
	{:else}
		<!-- Landing page will go here -->
		<div class="container mx-auto px-4 py-8">
			<h1 class="text-4xl font-bold text-center mb-8">PAT ANGRIFF</h1>
			<p class="text-center text-muted-foreground">Landing page components will be migrated here</p>
		</div>
	{/if}
</main>
