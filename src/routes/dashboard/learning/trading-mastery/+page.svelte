<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import TradingLearning from '$lib/components/learning/TradingLearning.svelte';

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

<TradingLearning
	on:back={handleBack}
	on:logout={handleLogout}
/>
