<script lang="ts">
  import { cn } from '$lib/utils';
  
  let className = '';
  export { className as class };
</script>

<div class={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...$$restProps}>
  <slot />
</div>

<!-- Card Header Component -->
<script lang="ts" context="module">
  export const CardHeader = 'CardHeader';
  export const CardTitle = 'CardTitle';
  export const CardDescription = 'CardDescription';
  export const CardContent = 'CardContent';
  export const CardFooter = 'CardFooter';
</script>