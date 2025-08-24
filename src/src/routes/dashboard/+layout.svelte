<script lang="ts">
	import { isLoggedIn } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$isLoggedIn) {
			goto('/');
		}
	});
</script>

{#if $isLoggedIn}
	<slot />
{:else}
	<div class="min-h-screen flex items-center justify-center">
		<div class="text-center">
			<h1 class="text-2xl font-bold mb-4">Access Denied</h1>
			<p class="text-muted-foreground">Please log in to access the warrior portal.</p>
		</div>
	</div>
{/if}