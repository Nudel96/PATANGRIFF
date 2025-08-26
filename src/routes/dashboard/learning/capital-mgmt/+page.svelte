<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import CapitalMgmtLearning from '$lib/components/learning/CapitalMgmtLearning.svelte';

	function handleBack() {
		window.location.href = '/dashboard';
	}

	function handleLogout() {
		authStore.logout();
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>Capital Management - PAT ANGRIFF</title>
</svelte:head>

<CapitalMgmtLearning
	on:back={handleBack}
	on:logout={handleLogout}
/>
