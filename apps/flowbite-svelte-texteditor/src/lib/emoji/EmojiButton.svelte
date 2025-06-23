<script lang="ts">
  import { Tooltip, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { cn, generateButtonId } from '$lib';
  
  // Define props interface
  interface EmojiButtonProps {
    editor: any;
    tooltipText?: string;
    ariaLabel?: string;
    id?: string;
    class?: string;
  }

  // GitHub emoji type (matches what TipTap extension provides)
  interface GitHubEmoji {
    name: string;
    fallbackImage?: string;
    url?: string;
  }

  let { editor, tooltipText, ariaLabel, id, class: className }: EmojiButtonProps = $props();

  let isOpen = $state(false);
  let searchQuery = $state('');
  let filteredEmojis = $state<GitHubEmoji[]>([]);

  const defaults = {
    tooltip: 'Insert emoji',
    aria: 'Insert emoji'
  };

  const finalTooltipText = tooltipText ?? defaults.tooltip;
  const finalAriaLabel = ariaLabel ?? defaults.aria;
  const uniqueId = id ?? generateButtonId('EmojiButton');

  // Get GitHub emojis from editor storage
  const emojis = $derived<GitHubEmoji[]>(editor?.storage?.emoji?.emojis || []);

  // Filter emojis based on search query
  $effect(() => {
    if (!searchQuery.trim()) {
      filteredEmojis = emojis.slice(0, 40); // Show first 40 emojis by default
    } else {
      filteredEmojis = emojis
        .filter((emoji: GitHubEmoji) => {
          const query = searchQuery.toLowerCase();
          return emoji.name.toLowerCase().includes(query);
        })
        .slice(0, 40); // Limit to 40 results
    }
  });

  function insertEmoji(emojiName: string): void {
    // Use the TipTap emoji command
    editor?.chain().focus().insertContent(`:${emojiName}:`).run();
    isOpen = false;
    searchQuery = ''; // Reset search
  }

  function handleClick(): void {
    isOpen = !isOpen;
    if (isOpen) {
      // Reset search when opening
      searchQuery = '';
    }
  }

  function handleSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
  }

  function handleKeyDown(event: KeyboardEvent): void {
    // Handle keyboard navigation if needed
    if (event.key === 'Escape') {
      isOpen = false;
      searchQuery = '';
    }
  }

  const emojiSvgPath = 'M12 2C6.477 2 2 6.484 2 12.017c0 5.533 4.477 10.017 10 10.017s10-4.484 10-10.017C22 6.484 17.523 2 12 2Zm-3.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7.5 9c0-.9.895-1.6 2-1.6h6c1.105 0 2 .7 2 1.6 0 0-.895-2.4-2-2.4h-6c-1.105 0-2 1.5-2 2.4Z';
</script>

<button 
  onclick={handleClick} 
  id={uniqueId} 
  type="button" 
  class={cn('cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white', className)}
>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d={emojiSvgPath} />
  </svg>
  <span class="sr-only">{finalAriaLabel}</span>
</button>

<Tooltip>{finalTooltipText}</Tooltip>

<Dropdown bind:isOpen simple triggeredBy="#{uniqueId}">
  <div class="p-3 w-80">
    <!-- Search input -->
    <div class="mb-3">
      <input
        type="text"
        placeholder="Search emojis..."
        value={searchQuery}
        oninput={handleSearchInput}
        onkeydown={handleKeyDown}
        class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
    </div>
    
    <!-- Emoji grid -->
    <div class="grid grid-cols-8 gap-1 max-h-64 overflow-y-auto">
      {#each filteredEmojis as emoji}
        <button
          type="button"
          onclick={() => insertEmoji(emoji.name)}
          class="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-lg transition-colors duration-150"
          title=":{emoji.name}:"
        >
          {#if emoji.fallbackImage}
            <img src={emoji.fallbackImage} alt={emoji.name} style="vertical-align: middle;" class="h-5 w-5" />
          {:else}
            <!-- Fallback to showing the shortcode if no image -->
            <span class="text-xs">:{emoji.name.slice(0, 2)}:</span>
          {/if}
        </button>
      {/each}
    </div>
    
    {#if filteredEmojis.length === 0 && searchQuery.trim()}
      <div class="p-4 text-center text-gray-500 dark:text-gray-400">
        No emojis found for "{searchQuery}"
      </div>
    {/if}
    
    {#if emojis.length === 0}
      <div class="p-4 text-center text-gray-500 dark:text-gray-400">
        Loading emojis...
      </div>
    {/if}
  </div>
</Dropdown>