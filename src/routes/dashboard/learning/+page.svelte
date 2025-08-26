<script lang="ts">
	import Dashboard from '$lib/components/Dashboard.svelte';
	import DashboardLearning from '$lib/components/DashboardLearning.svelte';
	import { authStore } from '$lib/stores/auth';

	function handleLogout() {
		authStore.logout();
		window.location.href = '/';
	}

	function handleNavigateToPillar(event: CustomEvent<{ pillar: string }>) {
		window.location.href = `/dashboard/learning/${event.detail.pillar}`;
	}

	function handleStartLevel(event: CustomEvent<{ pillar: string; level: number }>) {
		window.location.href = `/dashboard/learning/${event.detail.pillar}/level/${event.detail.level}`;
	}
</script>

<svelte:head>
	<title>Learning Center - PAT ANGRIFF</title>
</svelte:head>

<Dashboard
	on:logout={handleLogout}
	let:pillarsProgress
>
	<DashboardLearning
		{pillarsProgress}
		on:navigateToPillar={handleNavigateToPillar}
		on:startLevel={handleStartLevel}
	/>
</Dashboard>
