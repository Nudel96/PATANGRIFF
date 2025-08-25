<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { 
    TrendingUp, 
    Building2, 
    DollarSign, 
    Brain, 
    Target,
    Award,
    BookOpen,
    Users,
    BarChart3,
    Zap,
    ArrowRight,
    Star,
    Trophy,
    Activity
  } from 'lucide-svelte';

  const learningFeatures = [
    {
      icon: Target,
      title: 'XP Tracking System',
      description: 'Gamified progression through 30 levels per pillar with real-time experience points and achievement unlocks.'
    },
    {
      icon: BookOpen,
      title: 'Journal Integration',
      description: 'Seamless integration with trading journal for reflection exercises and performance correlation analysis.'
    },
    {
      icon: Activity,
      title: 'Live Market Practice',
      description: 'Real-time market sessions where you apply learned concepts under expert guidance and peer collaboration.'
    },
    {
      icon: Users,
      title: 'AI-Powered Coaching',
      description: 'Personalized learning paths with intelligent recommendations based on your progress and performance patterns.'
    }
  ];

  const progressLevels = [
    { range: '1-10', title: 'Beginner', description: 'Foundation building and core concept mastery', color: 'bg-muted' },
    { range: '11-20', title: 'Intermediate', description: 'Advanced application and systematic thinking', color: 'bg-secondary/20' },
    { range: '21-30', title: 'Professional', description: 'Expert-level execution and leadership development', color: 'bg-primary/20' }
  ];
</script>

<section class="section-padding">
  <div class="container-max mx-auto">
    <!-- Main Training Overview -->
    <div class="text-center mb-16">
      <Badge class="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
        <Trophy class="w-4 h-4 mr-2" />
        Four Pillars XP Learning System
      </Badge>
      
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        Professional Trader
        <span class="block gradient-text">Development Program</span>
      </h1>
      
      <p class="text-xl text-foreground/70 max-w-4xl mx-auto mb-8">
        Master trading through our revolutionary Four Pillars XP Learning System. Each pillar features 
        30 progressive levels designed to transform you from chart-watcher to market operator through 
        systematic skill development and measurable advancement.
      </p>

      <!-- Progress Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
        {#each progressLevels as level}
          <div class="military-card {level.color}">
            <div class="text-center">
              <div class="text-2xl font-bold mb-2">Levels {level.range}</div>
              <div class="text-lg font-semibold mb-2">{level.title}</div>
              <p class="text-sm text-foreground/70">{level.description}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold">
          Start Your Training Journey
          <ArrowRight class="ml-2 w-5 h-5" />
        </Button>
        <Button variant="outline" size="lg" class="px-8 py-6 text-lg border-primary/20 hover:bg-primary/10">
          View Curriculum Details
        </Button>
      </div>
    </div>

    <!-- Learning Experience Features -->
    <div class="mb-20">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
        Advanced Learning
        <span class="block gradient-text">Experience Features</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each learningFeatures as feature}
          <Card class="military-card text-center group">
            <CardContent class="p-6">
              <div class="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <svelte:component this={feature.icon} class="w-8 h-8 text-primary" />
              </div>
              <h3 class="text-lg font-bold mb-3">{feature.title}</h3>
              <p class="text-sm text-foreground/70 leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        {/each}
      </div>
    </div>

    <!-- Enrollment Section -->
    <div class="text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">
        Ready to Begin Your
        <span class="block gradient-text">Professional Development?</span>
      </h2>
      
      <p class="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
        Join thousands of traders who have transformed their careers through our systematic, 
        level-based approach to trading education. Start your journey from beginner to 
        professional operator today.
      </p>

      <div class="military-card max-w-2xl mx-auto mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div class="text-2xl font-bold text-primary mb-2">120</div>
            <div class="text-sm text-foreground/70">Total Levels</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-secondary mb-2">4</div>
            <div class="text-sm text-foreground/70">Core Pillars</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-primary mb-2">∞</div>
            <div class="text-sm text-foreground/70">Lifetime Access</div>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button size="lg" class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold">
          Unlock Your Potential
          <Award class="ml-2 w-5 h-5" />
        </Button>
        <Button variant="outline" size="lg" class="px-8 py-6 text-lg border-secondary/20 hover:bg-secondary/10">
          Schedule Assessment Call
        </Button>
      </div>
    </div>
  </div>
</section>