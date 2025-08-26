<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import BusinessOpsLearning from '$lib/components/learning/BusinessOpsLearning.svelte';

	function handleBack() {
		window.location.href = '/dashboard';
	}

	function handleLogout() {
		authStore.logout();
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>Business Operations - PAT ANGRIFF</title>
</svelte:head>

<BusinessOpsLearning
	on:back={handleBack}
	on:logout={handleLogout}
/>
