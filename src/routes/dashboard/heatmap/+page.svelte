<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import MarketHeatmap from '$lib/components/MarketHeatmap.svelte';

	function handleBack() {
		window.location.href = '/dashboard';
	}

	function handleLogout() {
		authStore.logout();
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>Currency Heatmap - PAT ANGRIFF</title>
</svelte:head>

<MarketHeatmap
	on:back={handleBack}
	on:logout={handleLogout}
/>
