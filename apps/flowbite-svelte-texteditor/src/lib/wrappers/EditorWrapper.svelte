<script lang="ts">
  import type { Snippet } from 'svelte';
  import { type ClassValue } from 'clsx';
  import { cn } from '$lib';
  let { children, class: className }: { children: Snippet; class?: ClassValue } = $props();
</script>

<div class={cn('w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700', className)}>
  {@render children()}
</div>
