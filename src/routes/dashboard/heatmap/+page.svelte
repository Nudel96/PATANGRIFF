<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import MarketHeatmap from '$lib/components/MarketHeatmap.svelte';

	function handleBack() {
		goto('/dashboard');
	}

	function handleLogout() {
		authStore.logout();
		goto('/');
	}
</script>

<svelte:head>
	<title>Currency Heatmap - PAT ANGRIFF</title>
</svelte:head>

<MarketHeatmap
	on:back={handleBack}
	on:logout={handleLogout}
/>
