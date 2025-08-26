<script lang="ts">
	import { authStore } from '$lib/stores/auth';
	import MemberCommunity from '$lib/components/MemberCommunity.svelte';

	function handleBack() {
		window.location.href = '/dashboard';
	}

	function handleLogout() {
		authStore.logout();
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>Community - PAT ANGRIFF</title>
</svelte:head>

<MemberCommunity
	on:back={handleBack}
	on:logout={handleLogout}
/>
