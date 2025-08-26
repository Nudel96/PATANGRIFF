<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import TradingJournal from '$lib/components/TradingJournal.svelte';

	function handleBack() {
		window.location.href = '/dashboard';
	}

	function handleLogout() {
		authStore.logout();
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>Trading Journal - PAT ANGRIFF</title>
</svelte:head>

<TradingJournal
	on:back={handleBack}
	on:logout={handleLogout}
/>
