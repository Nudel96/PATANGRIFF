<script lang="ts">
  import { userXP, userLevel, completeModule, tradingMasteryProgress } from '$lib/stores/learning';
  import { mockLearningLevels } from '$lib/data/mockData';
  import { toast } from '$lib/stores/toast';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Progress } from '$lib/components/ui/progress';
  import { 
    BookOpen, 
    Trophy, 
    Star, 
    Lock, 
    CheckCircle, 
    PlayCircle,
    Award,
    TrendingUp,
    Coins,
    Clock
  } from 'lucide-svelte';
  
  let selectedModule: any = null;

  function handleCompleteModule(moduleId: string, xpReward: number) {
    completeModule(moduleId, xpReward);
    toast.success(`Module completed! +${xpReward} XP earned`);
    selectedModule = null;
  }

  function getTierColor(tier: string) {
    switch (tier) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-blue-500';
      case 'Professional': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  }

  function renderLevelCard(level: any) {
    const completedModules = level.modules.filter((m: any) => m.completed).length;
    const totalModules = level.modules.length;
    const progress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

    return {
      level,
      completedModules,
      totalModules,
      progress
    };
  }
</script>

<svelte:head>
  <title>Trading Mastery - PRICEACTIONTALK</title>
</svelte:head>

<div class="container-max mx-auto px-6 py-8">
  {#if selectedModule}
    <!-- Module Content View -->
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold">{selectedModule.title}</h2>
          <p class="text-muted-foreground">{selectedModule.description}</p>
        </div>
        <div class="flex items-center space-x-4">
          <Badge class="bg-primary/10 text-primary">
            <Coins class="w-3 h-3 mr-1" />
            {selectedModule.xpReward} XP
          </Badge>
          <Badge variant="outline">
            <Clock class="w-3 h-3 mr-1" />
            {selectedModule.duration}
          </Badge>
        </div>
      </div>

      <Card class="military-card">
        <CardContent class="p-6">
          {#if selectedModule.type === 'lesson'}
            <div class="space-y-4">
              <div class="prose prose-invert max-w-none">
                <p>{selectedModule.content}</p>
              </div>
              <div class="flex justify-between items-center pt-4 border-t border-border/50">
                <Button variant="outline" on:click={() => selectedModule = null}>
                  Back to Level
                </Button>
                <Button 
                  class="bg-primary hover:bg-primary/90 text-primary-foreground"
                  on:click={() => handleCompleteModule(selectedModule.id, selectedModule.xpReward)}
                >
                  Complete Lesson
                  <CheckCircle class="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          {:else if selectedModule.type === 'quiz'}
            <div class="space-y-4">
              <div class="text-center py-8">
                <Trophy class="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 class="text-xl font-semibold mb-2">Quiz Challenge</h3>
                <p class="text-muted-foreground mb-6">Test your knowledge and earn XP!</p>
                <Button 
                  class="bg-primary hover:bg-primary/90 text-primary-foreground"
                  on:click={() => handleCompleteModule(selectedModule.id, selectedModule.xpReward)}
                >
                  Start Quiz
                </Button>
              </div>
            </div>
          {/if}
        </CardContent>
      </Card>
    </div>
  {:else}
    <!-- Learning Overview -->
    <div class="space-y-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <TrendingUp class="w-10 h-10 text-primary" />
        </div>
        <h2 class="text-4xl font-bold mb-4">
          Trading Mastery
          <span class="block gradient-text">30-Level Development Path</span>
        </h2>
        <p class="text-xl text-foreground/70 max-w-3xl mx-auto">
          Master the complete trading sequence from macro-economic analysis to precise execution. 
          Progress through 30 levels of increasingly sophisticated analytical frameworks.
        </p>
      </div>

      <!-- Progress Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card class="military-card">
          <CardContent class="p-6 text-center">
            <div class="text-3xl font-bold text-primary mb-2">{$userLevel}/30</div>
            <div class="text-sm text-muted-foreground">Current Level</div>
          </CardContent>
        </Card>
        <Card class="military-card">
          <CardContent class="p-6 text-center">
            <div class="text-3xl font-bold text-secondary mb-2">{$userXP}</div>
            <div class="text-sm text-muted-foreground">Total XP</div>
          </CardContent>
        </Card>
        <Card class="military-card">
          <CardContent class="p-6 text-center">
            <div class="text-3xl font-bold text-primary mb-2">{$tradingMasteryProgress}%</div>
            <div class="text-sm text-muted-foreground">Progress</div>
          </CardContent>
        </Card>
      </div>

      <!-- Learning Levels -->
      <div class="space-y-6">
        <h3 class="text-2xl font-bold">Available Levels</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each mockLearningLevels as level}
            {@const levelData = renderLevelCard(level)}
            <Card class="military-card {level.locked ? 'opacity-50' : 'cursor-pointer hover:border-primary/30'}"
                  on:click={() => !level.locked && (selectedModule = level.modules[0])}
                  on:keydown={(e) => e.key === 'Enter' && !level.locked && (selectedModule = level.modules[0])}
                  role="button" tabindex="0">
              <CardHeader class="pb-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center {
                      level.locked ? 'bg-muted' : level.completed ? 'bg-primary/20' : 'bg-secondary/20'
                    }">
                      {#if level.locked}
                        <Lock class="w-6 h-6 text-muted-foreground" />
                      {:else if level.completed}
                        <CheckCircle class="w-6 h-6 text-primary" />
                      {:else}
                        <BookOpen class="w-6 h-6 text-secondary" />
                      {/if}
                    </div>
                    <div>
                      <CardTitle class="text-lg">Level {level.level}</CardTitle>
                      <Badge class="{getTierColor(level.tier)} text-white text-xs">
                        {level.tier}
                      </Badge>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="flex items-center space-x-1 text-primary">
                      <Coins class="w-4 h-4" />
                      <span class="font-bold">{level.totalXP} XP</span>
                    </div>
                    {#if level.unlockRequirement > 0}
                      <div class="text-xs text-muted-foreground">
                        Requires {level.unlockRequirement} XP
                      </div>
                    {/if}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 class="font-semibold mb-2">{level.title}</h3>
                <p class="text-sm text-muted-foreground mb-4">{level.description}</p>
                
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{levelData.completedModules}/{levelData.totalModules} modules</span>
                  </div>
                  <Progress value={levelData.progress} class="h-2" />
                </div>

                <div class="mt-4 flex items-center justify-between">
                  <div class="text-xs text-muted-foreground">
                    {level.modules.length} module{level.modules.length !== 1 ? 's' : ''}
                  </div>
                  {#if !level.locked}
                    <Button size="sm" variant="outline">
                      {level.completed ? 'Review' : 'Start'}
                    </Button>
                  {/if}
                </div>
              </CardContent>
            </Card>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>