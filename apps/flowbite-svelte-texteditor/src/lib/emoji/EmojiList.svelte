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
  let { items: initialItems = [], command, editor }: Props = $props();
  
  // Create reactive state for items
  let items = $state(initialItems);
  let selectedIndex = $state(0);

  // Watch for changes to initialItems and update our reactive state
  $effect(() => {
    items = initialItems;
    selectedIndex = 0; // Reset selection when items change
  });

  function selectItem(index: number) {
    const item = items[index];
    if (item) {
      command({ name: item.name });
    }
  }

  // Export a function to update items from outside
  export function updateItems(newItems: EmojiItem[]) {
    items = newItems;
    selectedIndex = 0;
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
    <button class:is-selected={index === selectedIndex} onclick={() => selectItem(index)}>
      {#if item.fallbackImage}
        <img src={item.fallbackImage} alt={item.name} width="25" height="25"/>
      {:else if item.emoji}
        {item.emoji}
      {:else}
        😶
      {/if}

      :{item.name}:
    </button>
  {/each}
</div>