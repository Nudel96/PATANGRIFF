<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Check, Crown, Zap, Star, DollarSign, Shield } from 'lucide-svelte';
</script>

<section id="pricing" class="section-padding bg-muted/10">
  <div class="container-max mx-auto">
    <div class="text-center mb-16">
      <Badge class="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
        <Crown class="w-4 h-4 mr-2" />
        Choose Your Plan
      </Badge>
      
      <h2 class="text-4xl md:text-5xl font-bold mb-6">
        Same Powerful Features,
        <span class="block gradient-text">Better Value with Longer Plans</span>
      </h2>
      
      <p class="text-xl text-foreground/70 max-w-3xl mx-auto">
        All Bias-Tool-Solo plans include every feature. Choose longer terms to maximize your savings 
        and get the best value for professional-grade bias analysis.
      </p>
    </div>

    <!-- Standard Plans -->
    <div class="mb-16">
      <h3 class="text-2xl font-bold text-center mb-8">Standard Plans</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
        <!-- 1 Month Plan -->
        <div class="military-card relative">
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold mb-2">1 Month</h3>
            <p class="text-foreground/60 mb-4">Try it out</p>
            <div class="flex items-baseline justify-center mb-2">
              <span class="text-3xl font-bold">$39</span>
              <span class="text-foreground/60 ml-1">/month</span>
            </div>
            <div class="text-sm text-foreground/60">$39 per month</div>
          </div>
          
          <ul class="space-y-3 mb-6">
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">All bias analysis features</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">Real-time market signals</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">24/7 market coverage</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">Email support</span>
            </li>
          </ul>
          
          <Button class="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            Start 1 Month Plan
          </Button>
        </div>

        <!-- 6 Months Plan -->
        <div class="military-card relative">
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold mb-2">6 Months</h3>
            <p class="text-foreground/60 mb-4">Save $35</p>
            <div class="flex items-baseline justify-center mb-2">
              <span class="text-3xl font-bold">$199</span>
              <span class="text-foreground/60 ml-1">total</span>
            </div>
            <div class="text-sm text-primary font-semibold">$33.17 per month</div>
          </div>
          
          <ul class="space-y-3 mb-6">
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">Everything in 1 Month</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">15% savings vs monthly</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">Priority support</span>
            </li>
          </ul>
          
          <Button class="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Save with 6 Months
          </Button>
        </div>

        <!-- 12 Months Plan (Best Value) -->
        <div class="military-card relative border-primary/30">
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge class="bg-primary text-primary-foreground px-4 py-1">
              <Star class="w-3 h-3 mr-1" />
              Best Value
            </Badge>
          </div>
          
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold mb-2">12 Months</h3>
            <p class="text-foreground/60 mb-4">Save $109</p>
            <div class="flex items-baseline justify-center mb-2">
              <span class="text-3xl font-bold">$359</span>
              <span class="text-foreground/60 ml-1">total</span>
            </div>
            <div class="text-sm text-primary font-semibold">$29.92 per month</div>
          </div>
          
          <ul class="space-y-3 mb-6">
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">Everything in 6 Months</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">23% savings vs monthly</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">Premium support</span>
            </li>
          </ul>
          
          <Button class="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Maximum Savings - 12 Months
          </Button>
        </div>

        <!-- 24 Months Plan -->
        <div class="military-card relative">
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold mb-2">24 Months</h3>
            <p class="text-foreground/60 mb-4">Save $337</p>
            <div class="flex items-baseline justify-center mb-2">
              <span class="text-3xl font-bold">$599</span>
              <span class="text-foreground/60 ml-1">total</span>
            </div>
            <div class="text-sm text-primary font-semibold">$24.96 per month</div>
          </div>
          
          <ul class="space-y-3 mb-6">
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">Everything in 12 Months</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">36% savings vs monthly</span>
            </li>
            <li class="flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <Check class="w-3 h-3 text-primary" />
              </div>
              <span class="text-foreground/80">VIP support</span>
            </li>
          </ul>
          
          <Button class="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            Ultimate Value - 24 Months
          </Button>
        </div>
      </div>
    </div>

    <!-- Guarantee -->
    <div class="text-center mb-16">
      <div class="military-card max-w-4xl mx-auto">
        <div class="flex items-center justify-center mb-4">
          <div class="bg-primary/20 p-3 rounded-xl mr-4">
            <Zap class="w-8 h-8 text-primary" />
          </div>
          <h3 class="text-2xl font-bold">30-Day Money-Back Guarantee</h3>
        </div>
        <p class="text-foreground/70 leading-relaxed">
          Try Bias-Tool-Solo risk-free for 30 days. If you're not completely satisfied with the 
          systematic bias analysis and signal accuracy, we'll refund your entire purchase. 
          No questions asked.
        </p>
      </div>
    </div>

    <!-- FAQ Teaser -->
    <div class="text-center">
      <h3 class="text-xl font-semibold mb-4">Ready to Eliminate Emotional Trading?</h3>
      <p class="text-foreground/60 mb-6">
        Join thousands of traders who've upgraded to systematic bias analysis. 
        Choose your plan and start making data-driven decisions today.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
          Start with Best Value Plan
        </Button>
        <Button variant="outline" size="lg" class="border-secondary/20 hover:bg-secondary/10 px-8 py-4">
          Questions? Contact Support
        </Button>
      </div>
    </div>
  </div>
</section>