<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { isLoggedIn } from '$lib/stores/auth';
  import ToastContainer from '$lib/components/ToastContainer.svelte';
  
  // Initialize theme and other global setup
  onMount(() => {
    // Theme initialization would go here
    // Any global setup logic
  });
</script>

<svelte:head>
  <title>Priceactiontalk - Forge Warriors, Command Respect</title>
  <meta name="description" content="Transform from chart-watcher to market operator through systematic trading education and warrior brotherhood." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<main class="min-h-screen bg-background text-foreground">
  <slot />
</main>

<ToastContainer />

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>