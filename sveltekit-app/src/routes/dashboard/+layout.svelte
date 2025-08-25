<script lang="ts">
  import { page } from '$app/stores';
  import { isLoggedIn, logout } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import DashboardHeader from '$lib/components/DashboardHeader.svelte';
  
  export let data;
  
  // Redirect if not logged in
  onMount(() => {
    if (!$isLoggedIn) {
      goto('/');
    }
  });
  
  function handleLogout() {
    logout();
    goto('/');
  }
</script>

{#if $isLoggedIn}
  <div class="min-h-screen bg-background">
    <DashboardHeader {handleLogout} currentPath={data.currentPath} />
    <slot />
  </div>
{:else}
  <div class="min-h-screen bg-background flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Access Denied</h1>
      <p class="text-muted-foreground mb-6">Please log in to access the warrior portal.</p>
      <button 
        class="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg"
        on:click={() => goto('/')}
      >
        Return to Login
      </button>
    </div>
  </div>
{/if}