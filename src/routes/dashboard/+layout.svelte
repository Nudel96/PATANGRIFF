<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/auth';
	
	let isAuthenticated = false;
	let loading = true;
	
	// Subscribe to auth store
	authStore.subscribe(auth => {
		isAuthenticated = auth.isAuthenticated;
		loading = auth.loading;
	});
	
	onMount(() => {
		// Initialize auth state from localStorage
		authStore.initialize();
		
		// Check authentication
		if (!isAuthenticated && !loading) {
			goto('/');
		}
	});
	
	// Reactive statement to handle auth changes
	$: if (!loading && !isAuthenticated) {
		goto('/');
	}
</script>

<svelte:head>
	<title>Dashboard - PAT ANGRIFF</title>
</svelte:head>

{#if loading}
	<div class="min-h-screen bg-background flex items-center justify-center">
		<div class="text-center">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
			<p class="text-muted-foreground">Loading...</p>
		</div>
	</div>
{:else if isAuthenticated}
	<div class="min-h-screen bg-background">
		<slot />
	</div>
{:else}
	<div class="min-h-screen bg-background flex items-center justify-center">
		<div class="text-center">
			<h1 class="text-2xl font-bold mb-4">Access Denied</h1>
			<p class="text-muted-foreground mb-4">Please log in to access the warrior portal.</p>
			<button 
				class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
				on:click={() => goto('/')}
			>
				Return to Home
			</button>
		</div>
	</div>
{/if}
