<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';
	import MemberCommunity from '$lib/components/MemberCommunity.svelte';

	function handleBack() {
		goto('/dashboard');
	}

	function handleLogout() {
		authStore.logout();
		goto('/');
	}
</script>

<svelte:head>
	<title>Community - PAT ANGRIFF</title>
</svelte:head>

<MemberCommunity
	on:back={handleBack}
	on:logout={handleLogout}
/>
