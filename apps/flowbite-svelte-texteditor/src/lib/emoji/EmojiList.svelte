<script lang="ts">
  let { items = [], command, editor } = $props()
  let selectedIndex = $state(0)
  
  $effect(() => {
    if (items) {
      selectedIndex = 0
    }
  })
  
  function onKeyDown({ event }: { event: KeyboardEvent }): boolean {
    if (event.key === 'ArrowUp') {
      upHandler()
      return true
    }

    if (event.key === 'ArrowDown') {
      downHandler()
      return true
    }

    if (event.key === 'Enter') {
      enterHandler()
      return true
    }

    return false
  }

  function upHandler() {
    selectedIndex = ((selectedIndex + items.length) - 1) % items.length
  }

  function downHandler() {
    selectedIndex = (selectedIndex + 1) % items.length
  }

  function enterHandler() {
    selectItem(selectedIndex)
  }

  function selectItem(index: number): void {
    const item = items[index]

    if (item) {
      command({ name: item.name })
    }
  }
  
  // Export the onKeyDown method so it can be called from the parent
  export { onKeyDown }
</script>

<div class="dropdown-menu">
  {#each items as item, index}
    <button
      class:is-selected={index === selectedIndex}
      onclick={() => selectItem(index)}
    >
      {#if item.fallbackImage}
        <img src={item.fallbackImage} alt={item.name} style="vertical-align: middle;" />
      {:else}
        {item.emoji}
      {/if}
      :{item.name}:
    </button>
  {/each}
</div>

<style>
/* Dropdown menu */
:global(.dropdown-menu) {
  background: var(--white);
  border: 1px solid var(--gray-1);
  border-radius: 0.7rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  overflow: auto;
  padding: 0.4rem;
  position: relative;
}

:global(.dropdown-menu button) {
  align-items: center;
  background-color: transparent;
  display: flex;
  gap: 0.25rem;
  text-align: left;
  width: 100%;
}

:global(.dropdown-menu button:hover),
:global(.dropdown-menu button:hover.is-selected) {
  background-color: var(--gray-3);
}

:global(.dropdown-menu button.is-selected) {
  background-color: var(--gray-2);
}

:global(.dropdown-menu button img) {
  height: 1em;
  width: 1em;
}
</style>