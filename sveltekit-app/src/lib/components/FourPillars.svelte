<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent } from '$lib/components/ui/card';
  import { TrendingUp, Building2, DollarSign, Brain, ArrowRight } from 'lucide-svelte';

  let openPillar: string | null = null;

  const pillars = [
    {
      id: 'trading-mastery',
      icon: TrendingUp,
      title: 'TRADING MASTERY',
      subtitle: 'Strategy → Macro → Technicals → Execution',
      description: 'Master the complete sequence from macro-economic analysis to precise execution. Regime reading across 6 key factors, systematic bias/timing with clear entry/exit rules, and risk mathematics that protect capital.',
      features: [
        'Macro-to-technical analysis sequence',
        'Regime reading across 6 key factors',
        'Systematic bias/timing protocols',
        'Risk mathematics and execution rules'
      ],
      color: 'primary'
    },
    {
      id: 'business-operations',
      icon: Building2,
      title: 'BUSINESS OPERATIONS',
      subtitle: 'Trading as Professional Enterprise',
      description: 'Transform trading into a systematic business operation. Develop SOPs for all activities, implement KPI tracking systems, and build assets through process documentation that scales.',
      features: [
        'Trading business framework',
        'Systems and SOPs for all activities',
        'KPI tracking and performance metrics',
        'Asset building through documentation'
      ],
      color: 'secondary'
    },
    {
      id: 'capital-management',
      icon: DollarSign,
      title: 'CAPITAL MANAGEMENT',
      subtitle: 'Survival and Growth Protocols',
      description: 'Master the financial architecture of professional trading: bankroll structure, allocation strategies, cashflow separation, and survival protocols that ensure longevity in all market conditions.',
      features: [
        'Bankroll structure and allocation',
        'Cashflow separation protocols',
        'Buffer maintenance systems',
        'Survival and recovery planning'
      ],
      color: 'primary'
    },
    {
      id: 'trading-psychology',
      icon: Brain,
      title: 'TRADING PSYCHOLOGY',
      subtitle: 'Warrior Mental Conditioning',
      description: 'Forge the mental framework of elite operators: protocol development, anti-tilt strategies, ego management, and professional identity formation that commands market respect.',
      features: [
        'Mental conditioning protocols',
        'Anti-tilt strategies and ego management',
        'Professional identity formation',
        'Pressure leadership development'
      ],
      color: 'secondary'
    }
  ];

  function togglePillar(pillarId: string) {
    openPillar = openPillar === pillarId ? null : pillarId;
  }
</script>

<section id="education" class="section-padding">
  <div class="container-max mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold mb-6">
        The Four Pillars That
        <span class="block gradient-text">Forge Warriors</span>
      </h2>
      <p class="text-xl text-foreground/70 max-w-3xl mx-auto">
        This is not typical trading education. We systematically transform chart readers into 
        operators through discipline, systems thinking, and uncompromising standards.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      {#each pillars as pillar}
        <div class="military-card group">
          <div class="flex items-start space-x-4 mb-6">
            <div class="bg-{pillar.color}/10 p-4 rounded-2xl group-hover:bg-{pillar.color}/20 transition-colors">
              <svelte:component this={pillar.icon} class="w-8 h-8 text-{pillar.color}" />
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-1">{pillar.title}</h3>
              <p class="text-{pillar.color} font-semibold">{pillar.subtitle}</p>
            </div>
          </div>
          
          <p class="text-foreground/70 mb-6 leading-relaxed">
            {pillar.description}
          </p>
          
          <ul class="space-y-3 mb-6">
            {#each pillar.features as feature}
              <li class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-{pillar.color} rounded-full" />
                <span class="text-foreground/80">{feature}</span>
              </li>
            {/each}
          </ul>
          
          <Button 
            variant="outline" 
            class="w-full border-{pillar.color}/20 hover:bg-{pillar.color}/10 group"
            on:click={() => togglePillar(pillar.id)}
          >
            Learn More
            <ArrowRight class="ml-2 w-4 h-4 transition-transform {openPillar === pillar.id ? 'rotate-90' : 'group-hover:translate-x-1'}" />
          </Button>
          
          {#if openPillar === pillar.id}
            <Card class="mt-4 border-border/50">
              <CardContent class="p-6">
                <h4 class="text-lg font-bold text-{pillar.color} mb-4">Complete Learning Path</h4>
                <p class="text-foreground/80 mb-6 leading-relaxed">
                  This pillar transforms your approach through systematic development across 30 progressive levels, 
                  building from foundational concepts to professional-grade execution capabilities.
                </p>
                
                <Button 
                  size="sm"
                  class="bg-{pillar.color} hover:bg-{pillar.color}/90 text-{pillar.color}-foreground"
                >
                  Start This Pillar
                  <ArrowRight class="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Call to Action -->
    <div class="text-center">
      <div class="military-card max-w-3xl mx-auto">
        <h3 class="text-2xl font-bold mb-4">Ready to Master All Four Pillars?</h3>
        <p class="text-foreground/70 mb-6">
          Join our comprehensive program and transform your trading approach with our proven methodology.
        </p>
        <Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground">
          Start Your Journey
        </Button>
      </div>
    </div>
  </div>
</section>