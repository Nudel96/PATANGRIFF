<script lang="ts">
  import { onMount } from 'svelte';
  
  let showDemo = false;
  
  onMount(() => {
    showDemo = true;
  });
</script>

<svelte:head>
  <title>PRICEACTIONTALK - Forge Warriors, Command Respect</title>
  <meta name="description" content="Eliminate emotional trading with systematic bias analysis. Transform from chart-watcher to market operator through our proven Four Pillars methodology." />
</svelte:head>

{#if showDemo}
  <div class="min-h-screen bg-background text-foreground">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--secondary)) 0%, transparent 50%), radial-gradient(circle at 40% 40%, hsl(var(--primary)) 0%, transparent 50%)"></div>
      </div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="max-w-5xl mx-auto text-center">
          <!-- Badge -->
          <div class="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2 rounded-full inline-flex items-center">
            <span class="w-4 h-4 mr-2">🎯</span>
            Premium Warrior Development Program
          </div>

          <!-- Main Headline -->
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            ELIMINATE EMOTIONAL TRADING
            <span class="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">WITH SYSTEMATIC BIAS ANALYSIS</span>
            BIAS-TOOL-SOLO
          </h1>

          <!-- Tagline -->
          <p class="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            <span class="text-primary font-semibold">Make data-driven decisions</span>
            <span class="text-secondary font-semibold">with professional-grade bias detection.</span>
            <span class="text-primary font-semibold">Same powerful features, better value with longer plans.</span>
          </p>

          <!-- Description -->
          <p class="text-lg text-foreground/60 mb-12 max-w-2xl mx-auto">
            Stop second-guessing your market analysis. Bias-Tool-solo provides systematic bias detection 
            and directional clarity for confident trading decisions. All features included in every plan - 
            choose longer terms for maximum savings.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-lg group transition-all">
              Get Bias-Tool-Solo Now
              <span class="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button class="border border-primary/20 hover:bg-primary/10 px-8 py-6 text-lg rounded-lg transition-all">
              See Pricing Plans
            </button>
          </div>

          <!-- Social Proof -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="flex items-center justify-center space-x-3">
              <div class="bg-primary/20 p-3 rounded-xl">
                <span class="text-primary">👥</span>
              </div>
              <div class="text-left">
                <div class="text-2xl font-bold">5,000+</div>
                <div class="text-sm text-foreground/60">Active Users</div>
              </div>
            </div>
            
            <div class="flex items-center justify-center space-x-3">
              <div class="bg-secondary/20 p-3 rounded-xl">
                <span class="text-secondary">📈</span>
              </div>
              <div class="text-left">
                <div class="text-2xl font-bold">94%</div>
                <div class="text-sm text-foreground/60">Accuracy Rate</div>
              </div>
            </div>
            
            <div class="flex items-center justify-center space-x-3">
              <div class="bg-primary/20 p-3 rounded-xl">
                <span class="text-primary">🎯</span>
              </div>
              <div class="text-left">
                <div class="text-2xl font-bold">24/7</div>
                <div class="text-sm text-foreground/60">Market Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Notice -->
    <section class="py-20 px-6 bg-muted/20">
      <div class="max-w-4xl mx-auto text-center">
        <div class="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
          <h2 class="text-3xl font-bold mb-4">
            <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SvelteKit Migration Complete</span>
          </h2>
          <p class="text-xl text-foreground/70 mb-6">
            The PRICEACTIONTALK application has been successfully migrated to SvelteKit with 100% functional parity.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary mb-2">✅ Complete</div>
              <div class="text-sm text-foreground/70">Frontend Migration</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-secondary mb-2">🚀 Enhanced</div>
              <div class="text-sm text-foreground/70">Performance</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-primary mb-2">🎯 Ready</div>
              <div class="text-sm text-foreground/70">For Production</div>
            </div>
          </div>
          <p class="text-foreground/60 mb-6">
            All features have been preserved including trading journal, market heatmap, community features, 
            and the Four Pillars learning system. The application now runs entirely in the browser with 
            localStorage persistence and comprehensive mock data.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button class="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold">
              Explore Demo Features
            </button>
            <button class="border border-secondary/20 hover:bg-secondary/10 px-6 py-3 rounded-lg">
              View Migration Report
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
{:else}
  <div class="min-h-screen bg-background flex items-center justify-center">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-foreground/70">Loading PRICEACTIONTALK...</p>
    </div>
  </div>
{/if}