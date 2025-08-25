<script lang="ts">
  import { cn } from '$lib/utils';
  
  export let value = '';
  export let placeholder = 'Select an option';
  export let disabled = false;
  
  let className = '';
  export { className as class };
  
  let isOpen = false;
  let options: { value: string; label: string }[] = [];
  
  // Extract options from slot content (simplified implementation)
  function handleSelect(optionValue: string) {
    value = optionValue;
    isOpen = false;
  }
</script>

<div class="relative">
  <button
    type="button"
    class={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {disabled}
    on:click={() => !disabled && (isOpen = !isOpen)}
  >
    <span class={value ? '' : 'text-muted-foreground'}>
      {value || placeholder}
    </span>
    <svg class="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  {#if isOpen}
    <div class="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg">
      <slot />
    </div>
  {/if}
</div>

<!-- Select Content Component -->
<script lang="ts" context="module">
  export const SelectContent = 'SelectContent';
  export const SelectItem = 'SelectItem';
  export const SelectTrigger = 'SelectTrigger';
  export const SelectValue = 'SelectValue';
</script>