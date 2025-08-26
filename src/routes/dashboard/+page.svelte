<script lang="ts">
	import Dashboard from '$lib/components/Dashboard.svelte';
	import DashboardHome from '$lib/components/DashboardHome.svelte';

	function handleLogout() {
		// Temporarily use window.location instead of goto to avoid SSR issues
		window.location.href = '/';
	}

	function handleSectionClick(event: CustomEvent<{ sectionId: string }>) {
		console.log('Section clicked:', event.detail.sectionId);
	}
</script>

<svelte:head>
	<title>Dashboard - PAT ANGRIFF</title>
</svelte:head>

<Dashboard
	on:logout={handleLogout}
	let:quickStats
	let:updatedMainSections
>
	<DashboardHome
		{quickStats}
		{updatedMainSections}
		on:sectionClick={handleSectionClick}
	/>
</Dashboard>
