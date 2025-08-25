<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Dialog } from '$lib/components/ui/dialog';
  import { Badge } from '$lib/components/ui/badge';
  import { Shield, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-svelte';
  
  export let isOpen = false;
  export let onLogin: () => void;
  
  let showPassword = false;
  let email = 'warrior@example.com';
  let password = 'password123';
  let isLoading = false;

  async function handleLogin(event: Event) {
    event.preventDefault();
    isLoading = true;
    
    // Simulate login process
    setTimeout(() => {
      isLoading = false;
      onLogin();
    }, 1500);
  }
</script>

<Dialog bind:open={isOpen}>
  <div class="sm:max-w-md bg-card border-border/50 rounded-lg p-6">
    <div class="text-center mb-6">
      <div class="flex items-center justify-center mb-4">
        <div class="relative">
          <Shield class="w-12 h-12 text-primary" />
          <div class="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
            <div class="w-2 h-2 bg-primary-foreground rounded-full"></div>
          </div>
        </div>
      </div>
      <h2 class="text-2xl font-bold">
        <span class="gradient-text">WARRIOR ACCESS</span>
      </h2>
      <Badge class="bg-primary/10 text-primary border-primary/20 mt-2">
        Elite Operator Portal
      </Badge>
    </div>

    <form on:submit={handleLogin} class="space-y-6">
      <div class="space-y-4">
        <div class="space-y-2">
          <Label for="email" class="text-sm font-semibold">
            Email Address
          </Label>
          <div class="relative">
            <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="warrior@example.com"
              bind:value={email}
              class="pl-10 bg-muted/50 border-border/50 focus:border-primary/50"
              required
            />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="password" class="text-sm font-semibold">
            Password
          </Label>
          <div class="relative">
            <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              bind:value={password}
              class="pl-10 pr-10 bg-muted/50 border-border/50 focus:border-primary/50"
              required
            />
            <button
              type="button"
              on:click={() => showPassword = !showPassword}
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {#if showPassword}
                <EyeOff class="w-4 h-4" />
              {:else}
                <Eye class="w-4 h-4" />
              {/if}
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" class="rounded border-border/50" />
          <span class="text-muted-foreground">Remember me</span>
        </label>
        <a href="#" class="text-primary hover:text-primary/80 font-medium">
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        class="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 group"
        disabled={isLoading}
      >
        {#if isLoading}
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
            <span>Accessing Warrior Portal...</span>
          </div>
        {:else}
          Enter the Arena
          <ArrowRight class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        {/if}
      </Button>

      <div class="text-center">
        <p class="text-sm text-muted-foreground">
          Demo credentials: warrior@example.com / password123
        </p>
      </div>
    </form>

    <div class="mt-6 pt-6 border-t border-border/50">
      <div class="text-center">
        <p class="text-xs text-muted-foreground mb-2">
          "Discipline. Strategy. Results."
        </p>
        <div class="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <span class="text-primary">●</span>
          <span>Secure Access</span>
          <span class="text-secondary">●</span>
          <span>Elite Community</span>
          <span class="text-primary">●</span>
          <span>Professional Tools</span>
        </div>
      </div>
    </div>
  </div>
</Dialog>