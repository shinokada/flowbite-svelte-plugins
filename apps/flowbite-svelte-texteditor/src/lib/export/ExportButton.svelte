<script lang="ts">
  import { Tooltip, Modal, Clipboard } from 'flowbite-svelte';
  import { exportEditorContent, type ExportAction, cn, generateButtonId } from '$lib';
  import { type ExportButtonProps } from '$lib/types';
  import { CheckOutline, ClipboardCleanSolid } from 'flowbite-svelte-icons';

  let { editor, format = 'json', tooltipText, ariaLabel, id, class: className }: ExportButtonProps = $props();

  let defaultModal = $state(false);
  let sourceCode = $state('');

  const defaults = {
    json: { tooltip: 'Get JSON', aria: 'Get JSON' },
    html: { tooltip: 'Get HTML', aria: 'Get HTML' }
  };

  const finalTooltipText = tooltipText ?? defaults[format].tooltip;
  const finalAriaLabel = ariaLabel ?? defaults[format].aria;
  const uniqueId = id ?? generateButtonId(`Align${format.charAt(0).toUpperCase() + format.slice(1)}`);

  function handleClick() {
    defaultModal = true;
    sourceCode = exportEditorContent(editor, format as ExportAction);
  }

  let value = $state('');
  let success = $state(false);
  function onclick(ev: MouseEvent): void {
    const target = ev.target as HTMLElement;
    const codeBlock = target.ownerDocument.querySelector('#sourceCode');
    if (codeBlock) {
      value = codeBlock.textContent || '';
    }
  }
</script>

<button onclick={handleClick} id={uniqueId} type="button" class={cn('cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white', className)}>
  {#if format === 'json'}
    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6-2a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm0 0h-1a5 5 0 0 1-5-5v-.5" />
    </svg>
  {:else}
    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="m3 2 1.578 17.824L12 22l7.467-2.175L21 2H3Zm14.049 6.048H9.075l.172 2.016h7.697l-.626 6.565-4.246 1.381-4.281-1.455-.288-2.932h2.024l.16 1.411 2.4.815 2.346-.763.297-3.005H7.416l-.562-6.05h10.412l-.217 2.017Z" />
    </svg>
  {/if}
  <span class="sr-only">{finalAriaLabel}</span>
</button>
<Tooltip>{finalTooltipText}</Tooltip>

<Modal title="JSON/HTML data export result" bind:open={defaultModal}>
  <div class="format lg:format-lg dark:format-invert format-blue max-w-none p-4 focus:outline-none md:p-5">
    <pre><code id="sourceCode">{@html sourceCode}</code></pre>
  </div>
  <Clipboard color={success ? 'alternative' : 'light'} bind:value bind:success size="sm" class="absolute end-20 top-4 h-8 px-2.5 font-medium focus:ring-0" {onclick}>
    {#if success}
      <CheckOutline class="h-3 w-3" /> Copied
    {:else}
      <ClipboardCleanSolid class="h-3 w-3" /> Copy code
    {/if}
  </Clipboard>
</Modal>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[ExportButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L74)
## Props
@prop editor
@prop format = 'json'
@prop tooltipText
@prop ariaLabel
@prop id
@prop class: className
-->
