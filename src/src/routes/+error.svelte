<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/Button.svelte';
	import { Home, ArrowLeft, AlertTriangle } from 'lucide-svelte';

	function goHome() {
		window.location.href = '/';
	}

	function goBack() {
		window.history.back();
	}
</script>

<svelte:head>
	<title>Error - Priceactiontalk</title>
</svelte:head>

<div class="min-h-screen bg-background flex items-center justify-center">
	<div class="text-center max-w-md mx-auto px-6">
		<div class="bg-destructive/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
			<AlertTriangle class="w-10 h-10 text-destructive" />
		</div>
		
		<h1 class="text-4xl font-bold mb-4">
			{#if $page.status === 404}
				Page Not Found
			{:else if $page.status >= 500}
				Server Error
			{:else}
				Something Went Wrong
			{/if}
		</h1>
		
		<p class="text-muted-foreground mb-8">
			{#if $page.status === 404}
				The page you're looking for doesn't exist or has been moved.
			{:else if $page.status >= 500}
				We're experiencing technical difficulties. Please try again later.
			{:else}
				An unexpected error occurred. Please try refreshing the page.
			{/if}
		</p>

		<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			<Button on:click={goBack} variant="outline" class="flex items-center space-x-2">
				<ArrowLeft class="w-4 h-4" />
				<span>Go Back</span>
			</Button>
			<Button on:click={goHome} class="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center space-x-2">
				<Home class="w-4 h-4" />
				<span>Return Home</span>
			</Button>
		</div>

		{#if $page.status >= 500}
			<div class="mt-8 p-4 bg-muted/20 rounded-lg">
				<p class="text-xs text-muted-foreground">
					Error ID: {$page.error?.message || 'Unknown error'}
				</p>
			</div>
		{/if}
	</div>
</div>