<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { 
    Shield, 
    TrendingUp, 
    Home,
    GraduationCap,
    Activity,
    FileText,
    Users,
    Bell,
    Settings,
    LogOut
  } from 'lucide-svelte';
  
  export let handleLogout: () => void;
  export let currentPath: string;
  
  function isActivePath(path: string): boolean {
    return currentPath.startsWith(path);
  }
</script>

<header class="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
  <div class="container-max mx-auto px-6">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <div class="relative">
          <Shield class="w-8 h-8 text-primary" />
          <TrendingUp class="w-4 h-4 text-secondary absolute -top-1 -right-1" />
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold gradient-text">PRICEACTIONTALK</span>
          <span class="text-sm text-muted-foreground -mt-1">WARRIOR PORTAL</span>
        </div>
      </div>

      <!-- Main Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        <Button 
          variant={isActivePath('/dashboard') && currentPath === '/dashboard' ? 'default' : 'ghost'} 
          size="sm"
          on:click={() => goto('/dashboard')}
          class="flex items-center space-x-2"
        >
          <Home class="w-4 h-4" />
          <span>Dashboard</span>
        </Button>
        <Button 
          variant={isActivePath('/dashboard/learning') ? 'default' : 'ghost'} 
          size="sm"
          on:click={() => goto('/dashboard/learning/trading-mastery')}
          class="flex items-center space-x-2"
        >
          <GraduationCap class="w-4 h-4" />
          <span>Learning</span>
        </Button>
        <Button 
          variant={isActivePath('/dashboard/heatmap') ? 'default' : 'ghost'} 
          size="sm"
          on:click={() => goto('/dashboard/heatmap')}
          class="flex items-center space-x-2"
        >
          <Activity class="w-4 h-4" />
          <span>Heatmap</span>
        </Button>
        <Button 
          variant={isActivePath('/dashboard/journal') ? 'default' : 'ghost'} 
          size="sm"
          on:click={() => goto('/dashboard/journal')}
          class="flex items-center space-x-2"
        >
          <FileText class="w-4 h-4" />
          <span>Journal</span>
        </Button>
        <Button 
          variant={isActivePath('/dashboard/community') ? 'default' : 'ghost'} 
          size="sm"
          on:click={() => goto('/dashboard/community')}
          class="flex items-center space-x-2"
        >
          <Users class="w-4 h-4" />
          <span>Community</span>
        </Button>
      </nav>

      <!-- Header Actions -->
      <div class="flex items-center space-x-4">
        <Button variant="ghost" size="sm" class="relative">
          <Bell class="w-4 h-4" />
          <div class="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
            <div class="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
          </div>
        </Button>
        <Button variant="ghost" size="sm">
          <Settings class="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" on:click={handleLogout}>
          <LogOut class="w-4 h-4 mr-2" />
          Exit Portal
        </Button>
      </div>
    </div>
  </div>
</header>

<!-- Mobile Navigation -->
<div class="md:hidden bg-card/30 backdrop-blur-sm border-b border-border/50">
  <div class="container-max mx-auto px-6">
    <div class="flex items-center justify-between py-3">
      <div class="flex space-x-2">
        <Button 
          variant={isActivePath('/dashboard') && currentPath === '/dashboard' ? 'default' : 'ghost'} 
          size="sm"
          on:click={() => goto('/dashboard')}
        >
          <Home class="w-4 h-4" />
        </Button>
        <Button 
          variant={isActivePath('/dashboard/learning') ? 'default' : 'ghost'} 
          size="sm"
          on:click={() => goto('/dashboard/learning/trading-mastery')}
        >
          <GraduationCap class="w-4 h-4" />
        </Button>
        <Button 
          variant={isActivePath('/dashboard/heatmap') ? 'default' : 'ghost'} 
          size="sm"
          on:click={() => goto('/dashboard/heatmap')}
        >
          <Activity class="w-4 h-4" />
        </Button>
        <Button 
          variant={isActivePath('/dashboard/journal') ? 'default' : 'ghost'} 
          size="sm"
          on:click={() => goto('/dashboard/journal')}
        >
          <FileText class="w-4 h-4" />
        </Button>
        <Button 
          variant={isActivePath('/dashboard/community') ? 'default' : 'ghost'} 
          size="sm"
          on:click={() => goto('/dashboard/community')}
        >
          <Users class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</div>