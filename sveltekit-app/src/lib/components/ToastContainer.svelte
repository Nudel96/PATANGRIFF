<script lang="ts">
  import { toasts, removeToast } from '$lib/stores/toast';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-svelte';
  
  function getToastIcon(type: string) {
    switch (type) {
      case 'success': return CheckCircle;
      case 'error': return AlertCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  }
  
  function getToastColor(type: string) {
    switch (type) {
      case 'success': return 'bg-primary/10 border-primary/20 text-primary';
      case 'error': return 'bg-destructive/10 border-destructive/20 text-destructive';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500';
      case 'info': return 'bg-secondary/10 border-secondary/20 text-secondary';
      default: return 'bg-muted border-border text-foreground';
    }
  }
</script>

<div class="fixed top-4 right-4 z-50 space-y-2">
  {#each $toasts as toast (toast.id)}
    <div class="bg-card border {getToastColor(toast.type)} rounded-lg p-4 shadow-lg max-w-sm animate-in slide-in-from-right">
      <div class="flex items-start space-x-3">
        <svelte:component this={getToastIcon(toast.type)} class="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div class="flex-1">
          {#if toast.title}
            <h4 class="font-semibold mb-1">{toast.title}</h4>
          {/if}
          <p class="text-sm">{toast.description}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          class="h-6 w-6 p-0"
          on:click={() => removeToast(toast.id)}
        >
          <X class="w-4 h-4" />
        </Button>
      </div>
    </div>
  {/each}
</div>