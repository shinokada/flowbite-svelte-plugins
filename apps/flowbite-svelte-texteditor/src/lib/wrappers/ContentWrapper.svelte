<script lang="ts">
  import type { Snippet } from 'svelte';
  import { type ClassValue } from 'clsx';
  import { cn } from '$lib';
  let { children, containerClass, contentClass }: { children: Snippet; containerClass?: string; contentClass?: ClassValue } = $props();
</script>

<div class={cn('rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800', containerClass)}>
  <label for="wysiwyg-content" class="sr-only">Publish post</label>
  <div id="wysiwyg-content" class={cn('block w-full border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400', contentClass)}>
    {@render children()}
  </div>
</div>
