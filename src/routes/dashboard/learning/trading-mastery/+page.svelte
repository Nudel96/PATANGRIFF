<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import TradingMasteryLearning from '$lib/components/learning/TradingMasteryLearning.svelte';

	function handleBack() {
		goto('/dashboard');
	}

	function handleLogout() {
		authStore.logout();
		goto('/');
	}
</script>

<svelte:head>
	<title>Trading Mastery - PAT ANGRIFF</title>
</svelte:head>

<TradingMasteryLearning
	on:back={handleBack}
	on:logout={handleLogout}
/>
