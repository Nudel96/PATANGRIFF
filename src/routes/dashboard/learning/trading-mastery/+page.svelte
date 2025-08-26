<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import TradingMasteryLearning from '$lib/components/learning/TradingMasteryLearning.svelte';

	function handleBack() {
		window.location.href = '/dashboard';
	}

	function handleLogout() {
		authStore.logout();
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>Trading Mastery - PAT ANGRIFF</title>
</svelte:head>

<TradingMasteryLearning
	on:back={handleBack}
	on:logout={handleLogout}
/>
