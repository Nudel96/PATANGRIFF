<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import Dashboard from '$lib/components/Dashboard.svelte';
	import DashboardHome from '$lib/components/DashboardHome.svelte';
	import DashboardLearning from '$lib/components/DashboardLearning.svelte';

	let activeSection = 'home';

	function handleLogout() {
		authStore.logout();
		goto('/');
	}

	function navigateToJournal() {
		goto('/dashboard/journal');
	}

	function navigateToHeatmap() {
		goto('/dashboard/heatmap');
	}

	function navigateToCommunity() {
		goto('/dashboard/community');
	}

	function navigateToTradingMastery() {
		goto('/dashboard/learning/trading-mastery');
	}

	function navigateToBusinessOps() {
		goto('/dashboard/learning/business-operations');
	}

	function navigateToPsychology() {
		goto('/dashboard/learning/psychology');
	}

	function navigateToCapitalMgmt() {
		goto('/dashboard/learning/capital-management');
	}

	function handleSectionClick(event: CustomEvent<{ sectionId: string }>) {
		console.log('Section clicked:', event.detail.sectionId);
	}

	function handleNavigateToPillar(event: CustomEvent<{ pillar: string }>) {
		goto(`/dashboard/learning/${event.detail.pillar}`);
	}

	function handleStartLevel(event: CustomEvent<{ pillar: string; level: number }>) {
		goto(`/dashboard/learning/${event.detail.pillar}/level/${event.detail.level}`);
	}
</script>

<svelte:head>
	<title>Dashboard - PAT ANGRIFF</title>
</svelte:head>

<Dashboard
	bind:activeSection
	on:logout={handleLogout}
	on:navigateToJournal={navigateToJournal}
	on:navigateToHeatmap={navigateToHeatmap}
	on:navigateToCommunity={navigateToCommunity}
	on:navigateToTradingMastery={navigateToTradingMastery}
	on:navigateToBusinessOps={navigateToBusinessOps}
	on:navigateToPsychology={navigateToPsychology}
	on:navigateToCapitalMgmt={navigateToCapitalMgmt}
	let:quickStats
	let:pillarsProgress
	let:updatedMainSections
>
	{#if activeSection === 'home'}
		<DashboardHome
			{quickStats}
			{updatedMainSections}
			on:sectionClick={handleSectionClick}
		/>
	{:else if activeSection === 'learning'}
		<DashboardLearning
			{pillarsProgress}
			on:navigateToPillar={handleNavigateToPillar}
			on:startLevel={handleStartLevel}
		/>
	{/if}
</Dashboard>
