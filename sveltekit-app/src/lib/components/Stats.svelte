<script lang="ts">
  import { TrendingUp, Shield, Target, Users } from 'lucide-svelte';
</script>

<section class="section-padding bg-muted/20">
  <div class="container-max mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold mb-6">
        Proven Results
        <span class="block gradient-text">Trusted by Professionals</span>
      </h2>
      <p class="text-xl text-foreground/70 max-w-3xl mx-auto">
        Bias-Tool-Solo delivers consistent, reliable bias analysis that professionals 
        depend on for systematic trading decisions. Real results, real accuracy.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="military-card text-center group">
        <div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
          <Users class="w-8 h-8 text-primary" />
        </div>
        <div class="text-4xl font-bold mb-2 gradient-text">5,000+</div>
        <div class="text-lg font-semibold mb-2">Active Users</div>
        <p class="text-sm text-foreground/60">Professional traders worldwide</p>
      </div>
      
      <div class="military-card text-center group">
        <div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
          <TrendingUp class="w-8 h-8 text-primary" />
        </div>
        <div class="text-4xl font-bold mb-2 gradient-text">94%</div>
        <div class="text-lg font-semibold mb-2">Accuracy Rate</div>
        <p class="text-sm text-foreground/60">Verified signal accuracy</p>
      </div>
      
      <div class="military-card text-center group">
        <div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
          <Target class="w-8 h-8 text-primary" />
        </div>
        <div class="text-4xl font-bold mb-2 gradient-text">24/7</div>
        <div class="text-lg font-semibold mb-2">Market Coverage</div>
        <p class="text-sm text-foreground/60">Continuous bias analysis</p>
      </div>
      
      <div class="military-card text-center group">
        <div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
          <Shield class="w-8 h-8 text-primary" />
        </div>
        <div class="text-4xl font-bold mb-2 gradient-text">&lt; 1s</div>
        <div class="text-lg font-semibold mb-2">Signal Speed</div>
        <p class="text-sm text-foreground/60">Real-time analysis delivery</p>
      </div>
    </div>

    <!-- Additional Context -->
    <div class="mt-16 text-center">
      <div class="military-card max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
            <div class="text-2xl font-bold text-primary mb-2">4 Years</div>
            <p class="text-foreground/70">of proven methodology</p>
          </div>
          <div>
            <div class="text-2xl font-bold text-secondary mb-2">24/7</div>
            <p class="text-foreground/70">community support</p>
          </div>
          <div>
            <div class="text-2xl font-bold text-primary mb-2">90 Days</div>
            <p class="text-foreground/70">to transformation</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>