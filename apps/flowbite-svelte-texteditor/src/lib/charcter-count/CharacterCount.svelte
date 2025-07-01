<script lang="ts">
  import { onMount } from 'svelte';
  import { cn } from '$lib';
  import type { Editor } from '@tiptap/core';

  interface CharacterCountProps {
    editor: Editor | null;
    limit: number;
    showWords?: boolean;
    showCircle?: boolean;
    class?: string;
  }

  let { editor, limit, showWords = true, showCircle = true, class: className }: CharacterCountProps = $props();

  let characterCount = $state(0);
  let wordCount = $state(0);

  const percentage = $derived(editor ? Math.round((100 / limit) * characterCount) : 0);

  const isAtLimit = $derived(characterCount >= limit);
  const isOverLimit = $derived(characterCount > limit);

  function updateCounts() {
    if (editor?.storage?.characterCount) {
      characterCount = editor.storage.characterCount.characters();
      wordCount = editor.storage.characterCount.words();
    }
  }

  onMount(() => {
    if (editor) {
      updateCounts();

      const handleTransaction = () => {
        updateCounts();
      };

      editor.on('transaction', handleTransaction);

      return () => {
        editor.off('transaction', handleTransaction);
      };
    }
  });

  const strokeDasharray = $derived(`calc(${percentage} * 31.4 / 100) 31.4`);
</script>

<div class={cn('character-count flex items-center gap-2 text-sm ', isAtLimit && 'character-count--warning text-amber-600 dark:text-amber-400', isOverLimit && 'character-count--error text-red-600 dark:text-red-400', className)}>
  {#if showCircle}
    <svg height="20" width="20" viewBox="0 0 20 20" class="flex-shrink-0">
      <!-- Background circle -->
      <circle r="10" cx="10" cy="10" fill="#e9ecef" class="dark:fill-gray-600" />
      <!-- Progress circle -->
      <circle
        r="5"
        cx="10"
        cy="10"
        fill="transparent"
        stroke="currentColor"
        stroke-width="10"
        stroke-dasharray={strokeDasharray}
        transform="rotate(-90) translate(-20)"
        class={cn('transition-all duration-200', isOverLimit && 'stroke-red-500 dark:stroke-red-400', isAtLimit && !isOverLimit && 'stroke-amber-500 dark:stroke-amber-400')}
      />
      <!-- Inner white circle -->
      <circle r="6" cx="10" cy="10" fill="white" class="dark:fill-gray-800" />
    </svg>
  {/if}

  <div class="flex flex-col">
    <div class="font-medium">
      <span class={cn(isOverLimit && 'font-bold')}>
        {characterCount}
      </span>
      <span class="text-gray-400 dark:text-gray-500"> / {limit}</span>
      <span class="ml-1 text-xs">characters</span>
    </div>

    {#if showWords}
      <div class="text-xs text-gray-500 dark:text-gray-400">
        {wordCount} words
      </div>
    {/if}
  </div>
</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[CharacterCountProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L95)
## Props
@prop editor
@prop limit
@prop showWords = true
@prop showCircle = true
@prop class: className
-->
