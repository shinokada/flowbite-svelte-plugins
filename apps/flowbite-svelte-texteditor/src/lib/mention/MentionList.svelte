<script lang="ts">
  interface Props {
    items: string[];
    command: (label: string) => void;
  }

  let { items: initialItems = [], command: initialCommand }: Props = $props();

  let items = $state(initialItems);
  let command = $state(initialCommand);
  let selectedIndex = $state(0);

  $effect(() => {
    items = initialItems;
    selectedIndex = 0;
  });

  $effect(() => {
    command = initialCommand;
  });

  function selectItem(index: number) {
    const label = items[index];
    if (label) {
      command(label);
    }
  }

  export function updateItems(newItems: string[]) {
    items = newItems;
    selectedIndex = 0;
  }

  export function updateCommand(newCommand: typeof command) {
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

<div class="mention-dropdown">
  {#each items as label, index}
    <button
      type="button"
      class:is-selected={index === selectedIndex}
      onclick={() => selectItem(index)}
    >
      @{label}
    </button>
  {/each}
</div>
