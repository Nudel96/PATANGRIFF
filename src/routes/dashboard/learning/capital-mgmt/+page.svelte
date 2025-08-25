<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import CapitalMgmtLearning from '$lib/components/learning/CapitalMgmtLearning.svelte';

	function handleBack() {
		goto('/dashboard');
	}

	function handleLogout() {
		authStore.logout();
		goto('/');
	}
</script>

<svelte:head>
	<title>Capital Management - PAT ANGRIFF</title>
</svelte:head>

<CapitalMgmtLearning
	on:back={handleBack}
	on:logout={handleLogout}
/>
