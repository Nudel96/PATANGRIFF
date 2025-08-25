<script lang="ts">
  import { squads, squadStats, createSquad } from '$lib/stores/community';
  import { forumPosts } from '$lib/stores/community';
  import { mockForumCategories } from '$lib/data/mockData';
  import { toast } from '$lib/stores/toast';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import { goto } from '$app/navigation';
  import { 
    Users, 
    MessageCircle, 
    Shield, 
    Plus,
    Calendar,
    Target,
    Globe,
    Activity,
    BarChart3,
    Trophy,
    ArrowRight,
    Building2,
    Brain
  } from 'lucide-svelte';
  
  let activeTab = 'forums';
  let showCreateSquad = false;

  const forums = [
    { 
      id: 'gold-desk', 
      name: 'Gold Desk (XAU)', 
      icon: Trophy, 
      color: 'text-yellow-500', 
      posts: 234,
      description: 'Daily gold analysis, setups, and session behavior',
      members: 1247,
      todaysPosts: 12
    },
    { 
      id: 'fx-majors', 
      name: 'FX Majors & Crosses', 
      icon: Globe, 
      color: 'text-blue-500', 
      posts: 456,
      description: 'EUR, GBP, JPY, and cross-pair discussions',
      members: 2134,
      todaysPosts: 18
    },
    { 
      id: 'strategy', 
      name: 'Strategy & Playbooks', 
      icon: Target, 
      color: 'text-red-500', 
      posts: 298,
      description: 'System components, checklists, personal playbooks',
      members: 1834,
      todaysPosts: 15
    },
    { 
      id: 'mindset-performance', 
      name: 'Mindset & Performance', 
      icon: Brain, 
      color: 'text-pink-500', 
      posts: 345,
      description: 'Mental models, emotional regulation, habit tracking',
      members: 1923,
      todaysPosts: 11
    }
  ];

  function handleCreateSquad() {
    // Mock squad creation
    const newSquad = {
      name: 'New Squad',
      description: 'A new collaborative learning group',
      category: 'trading-strategies',
      privacy: 'open' as const,
      maxMembers: 8,
      currentMembers: 1,
      leaderId: '1',
      memberIds: ['1'],
      tags: ['new', 'learning'],
      goals: ['Learn together', 'Share knowledge'],
      meetingCadence: 'Weekly',
      timezone: 'America/New_York',
      isActive: true
    };
    
    createSquad(newSquad);
    toast.success('Squad created successfully!');
    showCreateSquad = false;
  }
</script>

<svelte:head>
  <title>Community Hub - PRICEACTIONTALK</title>
</svelte:head>

<div class="container-max mx-auto px-6 py-8">
  <Tabs bind:value={activeTab} class="space-y-6">
    <TabsList class="grid w-full grid-cols-3 bg-muted/20">
      <TabsTrigger value="forums" class="flex items-center space-x-2">
        <MessageCircle class="w-4 h-4" />
        <span>Forums</span>
      </TabsTrigger>
      <TabsTrigger value="squads" class="flex items-center space-x-2">
        <Shield class="w-4 h-4" />
        <span>Squads</span>
      </TabsTrigger>
      <TabsTrigger value="events" class="flex items-center space-x-2">
        <Calendar class="w-4 h-4" />
        <span>Events</span>
      </TabsTrigger>
    </TabsList>

    <TabsContent value="forums">
      <div class="space-y-6">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold mb-4">
            Trading & Business
            <span class="block gradient-text">Discussion Forums</span>
          </h2>
          <p class="text-xl text-foreground/70 max-w-3xl mx-auto">
            Professional discussions on trading strategies, market analysis, business development, 
            and entrepreneurship. Share knowledge, build networks, and grow together.
          </p>
        </div>

        <!-- Forum Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card class="military-card text-center">
            <CardContent class="p-6">
              <div class="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle class="w-6 h-6 text-primary" />
              </div>
              <div class="text-2xl font-bold text-primary mb-1">4,847</div>
              <div class="text-sm text-muted-foreground">Total Posts</div>
            </CardContent>
          </Card>
          
          <Card class="military-card text-center">
            <CardContent class="p-6">
              <div class="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users class="w-6 h-6 text-secondary" />
              </div>
              <div class="text-2xl font-bold text-secondary mb-1">12,456</div>
              <div class="text-sm text-muted-foreground">Active Members</div>
            </CardContent>
          </Card>
          
          <Card class="military-card text-center">
            <CardContent class="p-6">
              <div class="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Activity class="w-6 h-6 text-primary" />
              </div>
              <div class="text-2xl font-bold text-primary mb-1">132</div>
              <div class="text-sm text-muted-foreground">Posts Today</div>
            </CardContent>
          </Card>
          
          <Card class="military-card text-center">
            <CardContent class="p-6">
              <div class="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp class="w-6 h-6 text-secondary" />
              </div>
              <div class="text-2xl font-bold text-secondary mb-1">89%</div>
              <div class="text-sm text-muted-foreground">Quality Score</div>
            </CardContent>
          </Card>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {#each forums as forum}
            <Card class="military-card cursor-pointer hover:border-primary/30" 
                  on:click={() => goto(`/dashboard/community/forums/${forum.id}`)} 
                  on:keydown={(e) => e.key === 'Enter' && goto(`/dashboard/community/forums/${forum.id}`)} 
                  role="button" tabindex="0">
              <CardContent class="p-6">
                <div class="flex items-center space-x-3 mb-4">
                  <div class="bg-primary/10 p-2 rounded-lg">
                    <svelte:component this={forum.icon} class="w-5 h-5 {forum.color}" />
                  </div>
                  <div>
                    <h3 class="font-semibold">{forum.name}</h3>
                  </div>
                </div>
                
                <p class="text-sm text-muted-foreground mb-4">{forum.description}</p>
                
                <div class="space-y-2 text-xs">
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Posts:</span>
                    <span class="font-medium">{forum.posts}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Members:</span>
                    <span class="font-medium">{forum.members.toLocaleString()}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Today:</span>
                    <span class="font-medium text-primary">{forum.todaysPosts} new</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          {/each}
        </div>
      </div>
    </TabsContent>

    <TabsContent value="squads">
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold">Squads Hub</h2>
            <p class="text-muted-foreground">Collaborative Learning & Accountability Groups</p>
          </div>
          <Button 
            on:click={() => showCreateSquad = true}
            class="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus class="w-4 h-4 mr-2" />
            Create Squad
          </Button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {#each $squads as squad}
            <Card class="military-card group cursor-pointer hover:border-primary/30">
              <CardHeader>
                <div class="flex items-center justify-between">
                  <CardTitle class="text-lg">{squad.name}</CardTitle>
                  <Badge class="{squad.privacy === 'open' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}">
                    {squad.privacy === 'open' ? 'Open' : 'Invite Only'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p class="text-sm text-muted-foreground mb-4">{squad.description}</p>
                
                <div class="space-y-3">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-muted-foreground">Members:</span>
                    <span class="font-medium">{squad.currentMembers}/{squad.maxMembers}</span>
                  </div>
                  
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-muted-foreground">Meetings:</span>
                    <span class="font-medium">{squad.meetingCadence}</span>
                  </div>
                  
                  <div class="flex flex-wrap gap-1">
                    {#each squad.tags.slice(0, 3) as tag}
                      <Badge variant="outline" class="text-xs">#{tag}</Badge>
                    {/each}
                  </div>
                </div>
                
                <Button class="w-full mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  {squad.privacy === 'open' ? 'Join Squad' : 'Request to Join'}
                </Button>
              </CardContent>
            </Card>
          {/each}
        </div>

        <!-- Create Squad Modal (Simplified) -->
        {#if showCreateSquad}
          <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card class="military-card max-w-md w-full mx-4">
              <CardHeader>
                <CardTitle class="flex items-center justify-between">
                  <span>Create New Squad</span>
                  <Button variant="ghost" size="sm" on:click={() => showCreateSquad = false}>
                    <X class="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <p class="text-muted-foreground">Squad creation feature coming soon. For now, enjoy exploring existing squads!</p>
                <div class="flex justify-end space-x-2">
                  <Button variant="outline" on:click={() => showCreateSquad = false}>
                    Cancel
                  </Button>
                  <Button on:click={handleCreateSquad} class="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Create Demo Squad
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        {/if}
      </div>
    </TabsContent>

    <TabsContent value="events">
      <div class="text-center py-12">
        <Calendar class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 class="text-xl font-semibold mb-2">Events & Webinars</h3>
        <p class="text-muted-foreground mb-6">
          Community events, webinars, and meetups coming soon.
        </p>
        <Badge class="bg-secondary/10 text-secondary border-secondary/20">
          Under Development
        </Badge>
      </div>
    </TabsContent>
  </Tabs>
</div>