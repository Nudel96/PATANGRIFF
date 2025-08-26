<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import PsychologyLearning from '$lib/components/learning/PsychologyLearning.svelte';

	function handleBack() {
		window.location.href = '/dashboard';
	}

	function handleLogout() {
		authStore.logout();
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>Trading Psychology - PAT ANGRIFF</title>
</svelte:head>

<PsychologyLearning
	on:back={handleBack}
	on:logout={handleLogout}
/>
