<script lang="ts">
  import { cn } from '$lib/utils';
  import { setContext, getContext } from 'svelte';
  import { writable } from 'svelte/store';
  
  export let value = '';
  
  let className = '';
  export { className as class };
  
  const activeTab = writable(value);
  setContext('tabs', activeTab);
  
  $: activeTab.set(value);
  $: value = $activeTab;
</script>

<div class={cn('w-full', className)} {...$$restProps}>
  <slot />
</div>

<!-- Tabs List Component -->
<script lang="ts" context="module">
  export const TabsList = 'TabsList';
  export const TabsTrigger = 'TabsTrigger';
  export const TabsContent = 'TabsContent';
</script>