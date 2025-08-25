<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import PsychologyLearning from '$lib/components/learning/PsychologyLearning.svelte';

	function handleBack() {
		goto('/dashboard');
	}

	function handleLogout() {
		authStore.logout();
		goto('/');
	}
</script>

<svelte:head>
	<title>Trading Psychology - PAT ANGRIFF</title>
</svelte:head>

<PsychologyLearning
	on:back={handleBack}
	on:logout={handleLogout}
/>
