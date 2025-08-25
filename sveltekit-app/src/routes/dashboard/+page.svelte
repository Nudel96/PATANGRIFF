<script lang="ts">
  import { goto } from '$app/navigation';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Progress } from '$lib/components/ui/progress';
  import { 
    Award, 
    Users, 
    Activity, 
    FileText, 
    GraduationCap,
    ArrowRight,
    TrendingUp,
    Building2,
    DollarSign,
    Brain,
    ChevronRight
  } from 'lucide-svelte';
  
  export let data;
  
  const pillarsProgress = [
    { name: 'Trading Mastery', progress: 75, color: 'primary', icon: TrendingUp, path: '/dashboard/learning/trading-mastery' },
    { name: 'Business Operations', progress: 45, color: 'secondary', icon: Building2, path: '/dashboard/learning/business-ops' },
    { name: 'Capital Management', progress: 60, color: 'primary', icon: DollarSign, path: '/dashboard/learning/capital-mgmt' },
    { name: 'Trading Psychology', progress: 30, color: 'secondary', icon: Brain, path: '/dashboard/learning/psychology' }
  ];

  const mainSections = [
    {
      id: 'learning',
      title: 'Learning Center',
      subtitle: 'Master the Four Pillars',
      description: 'Comprehensive education across Trading Mastery, Business Operations, Psychology, and Capital Management',
      icon: GraduationCap,
      color: 'primary',
      features: ['30 Levels per Pillar', 'XP Progression', 'Interactive Modules', 'Assessments'],
      action: 'Start Learning',
      path: '/dashboard/learning/trading-mastery'
    },
    {
      id: 'heatmap',
      title: 'Market Heatmap',
      subtitle: 'Real-time Market Analysis',
      description: 'Live currency strength analysis with comprehensive economic data and trading signals',
      icon: Activity,
      color: 'secondary',
      features: ['Live Data', 'Currency Strength', 'Economic Indicators', 'Trading Signals'],
      action: 'View Markets',
      path: '/dashboard/heatmap'
    },
    {
      id: 'community',
      title: 'Community Hub',
      subtitle: 'Brotherhood of Warriors',
      description: 'Connect with fellow traders, share insights, join squads, and participate in challenges',
      icon: Users,
      color: 'secondary',
      features: ['Discussion Forums', 'Trade Gallery', 'Squads & Accountability', 'Events & AMAs'],
      action: 'Enter Community',
      path: '/dashboard/community'
    },
    {
      id: 'journal',
      title: 'Trading Journal',
      subtitle: 'Track & Analyze Performance',
      description: 'Professional trade logging with pre-trade checklists, analytics, and performance tracking',
      icon: FileText,
      color: 'primary',
      features: ['Trade Logging', 'Pre-trade Checklist', 'Analytics', 'Calendar View'],
      action: 'Open Journal',
      path: '/dashboard/journal'
    }
  ];
</script>

<svelte:head>
  <title>Dashboard - PRICEACTIONTALK</title>
</svelte:head>

<div class="container-max mx-auto px-6 py-8">
  <!-- Welcome Section -->
  <div class="text-center mb-12">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">
      Welcome back, <span class="gradient-text">Warrior</span>
    </h1>
    <p class="text-xl text-foreground/70 max-w-3xl mx-auto mb-6">
      Continue your transformation from chart-watcher to market operator. 
      Choose your path to excellence.
    </p>
    <Badge class="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-lg">
      <Award class="w-5 h-5 mr-2" />
      Elite Warrior Member
    </Badge>
  </div>

  <!-- Quick Stats Overview -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
    {#each data.quickStats as stat}
      <Card class="military-card">
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground">{stat.label}</p>
              <p class="text-2xl font-bold text-{stat.color}">{stat.value}</p>
            </div>
            <div class="bg-{stat.color}/10 p-2 rounded-lg">
              <!-- Icon would be rendered here based on stat.icon -->
              <div class="w-5 h-5 bg-{stat.color} rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    {/each}
  </div>

  <!-- Main Navigation Sections -->
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
    {#each mainSections as section}
      <Card class="military-card group cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg" 
            on:click={() => goto(section.path)}>
        <CardHeader class="text-center pb-4">
          <div class="bg-{section.color}/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-{section.color}/20 transition-colors">
            <svelte:component this={section.icon} class="w-10 h-10 text-{section.color}" />
          </div>
          <CardTitle class="text-2xl mb-2">{section.title}</CardTitle>
          <p class="text-{section.color} font-semibold">{section.subtitle}</p>
        </CardHeader>
        <CardContent class="text-center">
          <p class="text-foreground/70 mb-6 leading-relaxed">
            {section.description}
          </p>
          
          <div class="grid grid-cols-2 gap-2 mb-6">
            {#each section.features as feature}
              <div class="flex items-center space-x-2 text-sm">
                <div class="w-2 h-2 bg-{section.color} rounded-full"></div>
                <span class="text-foreground/80">{feature}</span>
              </div>
            {/each}
          </div>
          
          <Button class="w-full bg-{section.color} hover:bg-{section.color}/90 text-{section.color}-foreground group" size="lg">
            {section.action}
            <ArrowRight class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    {/each}
  </div>

  <!-- Secondary Features Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Four Pillars Progress -->
    <Card class="military-card">
      <CardHeader>
        <CardTitle class="flex items-center space-x-2">
          <svelte:component this={GraduationCap} class="w-5 h-5 text-primary" />
          <span>Four Pillars Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-6">
        {#each pillarsProgress as pillar}
          <div class="space-y-3 cursor-pointer group" on:click={() => goto(pillar.path)}>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="bg-{pillar.color}/10 p-2 rounded-lg group-hover:bg-{pillar.color}/20 transition-colors">
                  <svelte:component this={pillar.icon} class="w-4 h-4 text-{pillar.color}" />
                </div>
                <span class="font-semibold group-hover:text-primary transition-colors">{pillar.name}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-{pillar.color} font-bold">{pillar.progress}%</span>
                <ChevronRight class="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
            <Progress value={pillar.progress} class="h-2" />
          </div>
        {/each}
      </CardContent>
    </Card>

    <!-- Recent Activity -->
    <Card class="military-card">
      <CardHeader>
        <CardTitle class="flex items-center space-x-2">
          <Activity class="w-5 h-5 text-secondary" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        {#each data.recentActivity as activity}
          <div class="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg hover:bg-muted/20 transition-colors">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center {
              activity.type === 'course' ? 'bg-primary/10' :
              activity.type === 'trade' ? 'bg-secondary/10' :
              activity.type === 'session' ? 'bg-primary/10' : 'bg-secondary/10'
            }">
              <!-- Icon would be rendered here based on activity.icon -->
              <div class="w-4 h-4 bg-{activity.type === 'course' ? 'primary' : 'secondary'} rounded"></div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium">{activity.action}</p>
              <p class="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        {/each}
        
        <Button variant="outline" class="w-full mt-4">
          View All Activity
          <ArrowRight class="ml-2 w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  </div>
</div>