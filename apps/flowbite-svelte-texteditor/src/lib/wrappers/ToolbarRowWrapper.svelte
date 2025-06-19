<script lang="ts">
  import type { Snippet } from 'svelte';
  import { type ClassValue } from 'clsx';
  import { cn } from '$lib';

  let {
    children,
    containerClass,
    contentClass,
    top = true
  }: {
    children: Snippet;
    containerClass?: ClassValue;
    contentClass?: ClassValue;
    top?: boolean;
  } = $props();
</script>

{#if top}
  <div class={cn('flex flex-wrap items-center', containerClass)}>
    <div class={cn('flex flex-wrap items-center space-x-1 rtl:space-x-reverse', contentClass)}>
      {@render children()}
    </div>
  </div>
{:else}
  <div class={cn('flex flex-wrap items-center gap-2 pt-2', containerClass)}>
    {@render children()}
  </div>
{/if}
