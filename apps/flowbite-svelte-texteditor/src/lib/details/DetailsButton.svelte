<script lang="ts">
  import { runDetailsCommand, type DetailsAction, cn, generateButtonId } from '$lib';
  import { type DetailsButtonProps } from '$lib/types';

  let { editor, action, ariaLabel, id, class: className }: DetailsButtonProps = $props();

  const defaults = {
    set: { tooltip: 'Add details', aria: 'Add details' },
    unset: { tooltip: 'Remove details', aria: 'Remove details' }
  };

  const finalAriaLabel = ariaLabel ?? defaults[action].aria;
  const uniqueId = id ?? generateButtonId(`Details${action.charAt(0).toUpperCase() + action.slice(1)}`);

  function handleClick() {
    runDetailsCommand(editor, action as DetailsAction);
  }

  const titles = {
    set: 'Set details',
    unset: 'Unset details'
  };
</script>

<button onclick={handleClick} id={uniqueId} type="button" class={cn('cursor-pointer rounded-sm bg-gray-50 p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-white', className)}>
  <span class="text-sm font-medium">{titles[action]}</span>
  <span class="sr-only">{finalAriaLabel}</span>
</button>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[DetailsButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L164)
## Props
@prop editor
@prop action
@prop ariaLabel
@prop id
@prop class: className
-->
