<script lang="ts">
  import { isLoggedIn } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import PositioningStatement from '$lib/components/PositioningStatement.svelte';
  import Stats from '$lib/components/Stats.svelte';
  import FourPillars from '$lib/components/FourPillars.svelte';
  import PlatformTools from '$lib/components/PlatformTools.svelte';
  import TrainingSection from '$lib/components/TrainingSection.svelte';
  import Community from '$lib/components/Community.svelte';
  import Pricing from '$lib/components/Pricing.svelte';
  import Footer from '$lib/components/Footer.svelte';
  
  // Redirect to dashboard if already logged in
  $: if ($isLoggedIn) {
    goto('/dashboard');
  }
</script>

<svelte:head>
  <title>PRICEACTIONTALK - Forge Warriors, Command Respect</title>
  <meta name="description" content="Eliminate emotional trading with systematic bias analysis. Transform from chart-watcher to market operator through our proven Four Pillars methodology." />
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
  <Header />
  <main>
    <Hero />
    <PositioningStatement />
    <Stats />
    <FourPillars />
    <PlatformTools />
    <TrainingSection />
    <Community />
    <Pricing />
  </main>
  <Footer />
</div>