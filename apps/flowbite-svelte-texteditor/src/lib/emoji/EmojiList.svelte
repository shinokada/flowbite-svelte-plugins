<script lang="ts">
  import type { Editor } from '@tiptap/core';

  interface EmojiItem {
    name: string;
    emoji?: string;
    shortcodes: string[];
    tags?: string[];
    fallbackImage?: string;
  }

  interface Props {
    items: EmojiItem[];
    command: (args: { name: string }) => void;
    editor: Editor;
  }

  // Use $props() but make items reactive with $state
  let { items: initialItems = [], command: initialCommand }: Props = $props();

  // Create reactive state for items and command
  let items = $state(initialItems);
  let command = $state(initialCommand);
  let selectedIndex = $state(0);

  // Watch for changes to initialItems and update our reactive state
  $effect(() => {
    items = initialItems;
    selectedIndex = 0; // Reset selection when items change
  });

  // Watch for command changes
  $effect(() => {
    command = initialCommand;
  });

  function selectItem(index: number) {
    const item = items[index];
    if (item) {
      command({ name: item.name });
    }
  }

  // Export functions to update from outside
  export function updateItems(newItems: EmojiItem[]) {
    items = newItems;
    selectedIndex = 0;
  }

  export function updateCommand(newCommand: (args: { name: string }) => void) {
    command = newCommand;
  }

  export function onKeyDown({ event }: { event: KeyboardEvent }) {
    if (event.key === 'ArrowUp') {
      selectedIndex = (selectedIndex + items.length - 1) % items.length;
      return true;
    } else if (event.key === 'ArrowDown') {
      selectedIndex = (selectedIndex + 1) % items.length;
      return true;
    } else if (event.key === 'Enter') {
      selectItem(selectedIndex);
      return true;
    }
    return false;
  }
</script>

<div class="dropdown-menu">
  {#each items as item, index}
    <button class:is-selected={index === selectedIndex} onclick={() => selectItem(index)} type="button">
      <span class="emoji-icon">
        {#if item.fallbackImage}
          <img src={item.fallbackImage} alt={item.name} width="20" height="20" />
        {:else if item.emoji}
          {item.emoji}
        {:else}
          😶
        {/if}
      </span>

      <span class="emoji-name">:{item.name}:</span>
    </button>
  {/each}
</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
Props
## Props
@prop items: initialItems = []
@prop command: initialCommand
-->
