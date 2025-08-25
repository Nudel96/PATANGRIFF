<script lang="ts">
  import { cn } from '$lib/utils';
  
  export let open = false;
  
  let className = '';
  export { className as class };
  
  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      open = false;
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      open = false;
    }
  }
</script>

{#if open}
  <div 
    class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
    on:click={handleBackdropClick}
    on:keydown={handleKeydown}
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
      <slot />
    </div>
  </div>
{/if}

<!-- Dialog Components -->
<script lang="ts" context="module">
  export const DialogContent = 'DialogContent';
  export const DialogHeader = 'DialogHeader';
  export const DialogTitle = 'DialogTitle';
  export const DialogDescription = 'DialogDescription';
</script>