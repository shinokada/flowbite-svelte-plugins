<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { type ImageButtonProps } from '$lib';
  import { cn } from '$lib';

  let { editor, format, tooltipText, buttonId, ariaLabel, class: className, onAdvancedClick, ...restProps }: ImageButtonProps = $props();

  function handleClick() {
    switch (format) {
      case 'default':
        const url = window.prompt('Enter image URL:', 'https://placehold.co/600x400');
        if (url) {
          editor?.chain().focus().setImage({ src: url }).run();
        }
        break;
      case 'advanced':
        onAdvancedClick?.();
        break;
    }
  }

  // SVG paths for different formats
  const svgPaths = {
    default: [
      'M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z',
      'M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z'
    ],
    advanced:
      'M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z'
  };
</script>

<button
  onclick={handleClick}
  {...restProps}
  id={buttonId}
  type="button"
  class={cn('cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white', className)}
>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    {#if typeof svgPaths[format] === 'string'}
      <path fill-rule="evenodd" d={svgPaths[format]} clip-rule="evenodd" />
    {:else}
      <path fill-rule="evenodd" d={svgPaths[format][0]} clip-rule="evenodd" />
      <path fill-rule="evenodd" d={svgPaths[format][1]} clip-rule="evenodd" />
    {/if}
  </svg>
  <span class="sr-only">{ariaLabel}</span>
</button>
<Tooltip>{tooltipText}</Tooltip>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[ImageButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L67)
## Props
@prop editor
@prop format
@prop tooltipText
@prop buttonId
@prop ariaLabel
@prop class: className
@prop onAdvancedClick
@prop ...restProps
-->
