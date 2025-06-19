<script lang="ts">
  import type { Snippet } from "svelte";
  import { type ClassValue } from 'clsx';
  import { cn } from "$lib";
  let { children, class:className }: {children: Snippet, class?:ClassValue}= $props();
</script>

<div class={cn("border-b border-gray-200 px-3 py-2 dark:border-gray-600", className)}>
  {@render children()}
</div>
