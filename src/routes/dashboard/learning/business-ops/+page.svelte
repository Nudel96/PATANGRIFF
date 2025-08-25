<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import BusinessOpsLearning from '$lib/components/learning/BusinessOpsLearning.svelte';

	function handleBack() {
		goto('/dashboard');
	}

	function handleLogout() {
		authStore.logout();
		goto('/');
	}
</script>

<svelte:head>
	<title>Business Operations - PAT ANGRIFF</title>
</svelte:head>

<BusinessOpsLearning
	on:back={handleBack}
	on:logout={handleLogout}
/>
