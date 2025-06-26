<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { cn, generateButtonId } from '$lib';
  import { type TableButtonProps } from '$lib/types';

  let { editor, action = 'table', tooltipText, id, ariaLabel, class: className }: TableButtonProps = $props();

  const defaults = {
    table: { tooltip: 'Add table', aria: 'Add table' },
    deleteTable: { tooltip: 'Delete table', aria: 'Delete table' },
    addColumnBefore: { tooltip: 'Add column before', aria: 'Add column before' },
    addColumnAfter: { tooltip: 'Add column after', aria: 'Add column after' },
    deleteColumn: { tooltip: 'Delete column', aria: 'Delete column' },
    addRowBefore: { tooltip: 'Add row before', aria: 'Add row before' },
    addRowAfter: { tooltip: 'Add row after', aria: 'Add row after' },
    deleteRow: { tooltip: 'Delete row', aria: 'Delete row' },
    mergeCells: { tooltip: 'Merge cells', aria: 'Merge cells' },
    splitCell: { tooltip: 'Split cell', aria: 'Split cell' },
    mergeOrSplit: { tooltip: 'Merge or split', aria: 'Merge or split' },
    toggleHeaderColumn: { tooltip: 'Toggle header column', aria: 'Toggle header column' },
    toggleHeaderRow: { tooltip: 'Toggle header row', aria: 'Toggle header row' },
    toggleHeaderCell: { tooltip: 'Toggle header cell', aria: 'Toggle header cell' },
    // cellattribute: {tooltip:'Cell attribute', aria:'Cell attribute'},
    fixTables: { tooltip: 'Fix tables', aria: 'Fix tables' },
    goToPreviousCell: { tooltip: 'Go to previous cell', aria: 'Go to previous cell' },
    goToNextCell: { tooltip: 'Go to next cell', aria: 'Go to next cell' }
  };

  const finalTooltipText = tooltipText ?? defaults[action].tooltip;
  const finalAriaLabel = ariaLabel ?? defaults[action].aria;
  const uniqueId = id ?? generateButtonId(`Image${action.charAt(0).toUpperCase() + action.slice(1)}`);

  function handleClick() {
    switch (action) {
      // 'table' | 'deleteTable' | 'addColumnBefore' | 'addColumnAfter' | 'deleteColumn' | 'addRowBefore' | 'addRowAfter' | 'deleteRow' | 'mergeCells' | 'splitCell' | 'mergeOrSplit' | 'toggleHeaderColumn' | 'toggleHeaderRow' | 'toggleHeaderCell' | 'cellattribute' | 'fixTables' | 'goToPreviousCell' | 'goToNextCell';
      case 'table':
        editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        break;
      case 'deleteTable':
        editor?.chain().focus().deleteTable().run();
        break;
      case 'addColumnBefore':
        editor?.chain().focus().addColumnBefore().run();
        break;
      case 'addColumnAfter':
        editor?.chain().focus().addColumnAfter().run();
        break;
      case 'deleteColumn':
        editor?.chain().focus().deleteColumn().run();
        break;
      case 'addRowBefore':
        editor?.chain().focus().addRowBefore().run();
        break;
      case 'addRowAfter':
        editor?.chain().focus().addRowAfter().run();
        break;
      case 'deleteRow':
        editor?.chain().focus().deleteRow().run();
        break;
      case 'mergeCells':
        editor?.chain().focus().mergeCells().run();
        break;
      case 'splitCell':
        editor?.chain().focus().splitCell().run();
        break;
      case 'mergeOrSplit':
        editor?.chain().focus().mergeOrSplit().run();
        break;
      case 'toggleHeaderColumn':
        editor?.chain().focus().toggleHeaderColumn().run();
        break;
      case 'toggleHeaderRow':
        editor?.chain().focus().toggleHeaderRow().run();
        break;
      case 'toggleHeaderCell':
        editor?.chain().focus().toggleHeaderCell().run();
        break;
      // case 'cellattribute':
      //   editor?.chain().focus().setHorizontalRule().run();
      //   break;
      case 'fixTables':
        editor?.chain().focus().fixTables().run();
        break;
      case 'goToPreviousCell':
        editor?.chain().focus().goToPreviousCell().run();
        break;
      case 'goToNextCell':
        editor?.chain().focus().goToNextCell().run();
        break;
    }
  }

  // SVG paths for different formats
  const svgPaths = {
    // 'table' | 'deleteTable' | 'addColumnBefore' | 'addColumnAfter' | 'deleteColumn' | 'addRowBefore' | 'addRowAfter' | 'deleteRow' | 'mergeCells' | 'splitCell' | 'mergeOrSplit' | 'toggleHeaderColumn' | 'toggleHeaderRow' | 'toggleHeaderCell' | 'cellattribute' | 'fixTables' | 'goToPreviousCell' | 'goToNextCell';
    table: 'M3 15v3c0 .5523.44772 1 1 1h10.5M3 15v-4m0 4h11M3 11V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v5M3 11h18m0 0v1M8 11v8m4-8v8m4-8v2m1 4h2m0 0h2m-2 0v2m0-2v-2',
    deleteTable: 'M3 15.5v3c0 .5523.44772 1 1 1h10.5M3 15.5v-4m0 4h11m-11-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v5m-18 0h18m0 0v1m-13-1v8m4-8v8m4-8v2m1.8956 5.9528 1.5047-1.5047m0 0 1.5048-1.5048m-1.5048 1.5048 1.4605 1.4604m-1.4605-1.4604-1.4604-1.4605',
    addColumnBefore: 'M15 5.5v14m-8-7h2m0 0h2m-2 0v2m0-2v-2m12 1h-6m6 4h-6m-11 4h16c.5523 0 1-.4477 1-1v-12c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Z',
    addColumnAfter: 'M9 5.5v14m8-7h-2m0 0h-2m2 0v2m0-2v-2m-12 1h6m-6 4h6m11 4H4c-.55228 0-1-.4477-1-1v-12c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z',
    deleteColumn: 'M9 5.5v14m-6-8h6m-6 4h6m4.5061-1.4939L15.0123 12.5m0 0 1.5061-1.5061M15.0123 12.5l1.5061 1.5061M15.0123 12.5l-1.5062-1.5061M20 19.5H4c-.55228 0-1-.4477-1-1v-12c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z',
    addRowBefore: 'M3 15.5v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3m-18 0v-9c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9m-18 0h18m-13 0v4m4-4v4m4-4v4m-6-9h2m0 0h2m-2 0v2m0-2v-2',
    addRowAfter: 'M3 9.5v-3c0-.55228.44772-1 1-1h16c.5523 0 1 .44771 1 1v3m-18 0v9c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-9m-18 0h18m-13 0v-4m4 4v-4m4 4v-4m-6 9h2m0 0h2m-2 0v-2m0 2v2',
    deleteRow: 'M3 15.5v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3m-18 0v-9c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9m-18 0h18m-13 0v4m4-4v4m4-4v4m-5.5061-7.4939L12 10.5m0 0 1.5061-1.50614M12 10.5l1.5061 1.5061M12 10.5l-1.5061-1.50614',
    mergeCells: 'M10 18.5v2H4v-16h6v2m4 12v2h6v-16h-6v2m-6.49543 8.4954L10 12.5m0 0-2.49543-2.4954M10 12.5H4.05191m12.50199 2.5539L14 12.5m0 0 2.5539-2.55392M14 12.5h5.8319',
    splitCell: 'M4 18.5v2h6v-16H4v2m16 12v2h-6v-16h6v2M6.49545 14.9954 4.00003 12.5m0 0 2.49542-2.4954M4.00003 12.5h5.94809m7.49798 2.5539L20 12.5m0 0-2.5539-2.55392M20 12.5h-5.8319',
    mergeOrSplit: 'M18.5045 14.9954 21 12.5m0 0-2.4955-2.4954M21 12.5h-5.9481m-9.49798 2.5539L3 12.5m0 0 2.55392-2.55392M3 12.5h5.83192m.16807 7v-14H15v14H8.99999Z',
    toggleHeaderColumn: 'M15 5.5v14m6-8h-6m6 4h-6m-9-3h1.99093M4 19.5h16c.5523 0 1-.4477 1-1v-12c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Zm8-7c0 1.1046-.8954 2-2 2-1.10457 0-2-.8954-2-2s.89543-2 2-2c1.1046 0 2 .8954 2 2Z',
    toggleHeaderRow: 'M3 15.5v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3m-18 0v-9c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9m-18 0h18m-13 0v4m4-4v4m4-4v4m-7-9h1.9909M15 10.5c0 1.1046-.8954 2-2 2s-2-.8954-2-2c0-1.10457.8954-2 2-2s2 .89543 2 2Z',
    toggleHeaderCell: 'M3 15.5v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3m-18 0v-9c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9m-18 0h18m-13 0v4m4-4v4m4-4v4m-7-9h1.9909M15 10.5c0 1.1046-.8954 2-2 2s-2-.8954-2-2c0-1.10457.8954-2 2-2s2 .89543 2 2Z',
    cellattribute:
      'M3 15.5v3c0 .5523.44772 1 1 1h8v-8m-9 4v-4m0 4h9m-9-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v4m-18 1h11m6.25 5c0 1.2426-1.0073 2.25-2.25 2.25m2.25-2.25c0-1.2426-1.0073-2.25-2.25-2.25m2.25 2.25H21m-3 2.25c-1.2426 0-2.25-1.0074-2.25-2.25M18 18.75v.75m-2.25-3c0-1.2426 1.0074-2.25 2.25-2.25m-2.25 2.25H15m3-2.25v-.75m-1.591 1.409-.5303-.5303m4.2426 4.2426-.5303-.5303m-3.182 0-.5303.5303m4.2426-4.2426-.5303.5303',
    fixTables:
      'M3 15.5v3c0 .5523.44772 1 1 1h4v-4m-5 0v-4m0 4h5m-5-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v1.98935M3 11.5h5v4m9.4708 4.1718-.8696-1.4388-2.8164-.235-2.573-4.2573 1.4873-2.8362 1.4441 2.3893c.3865.6396 1.2183.8447 1.8579.4582.6396-.3866.8447-1.2184.4582-1.858l-1.444-2.38925h3.1353l2.6101 4.27715-1.0713 2.5847.8695 1.4388',
    goToPreviousCell: 'M3 15.5v3c0 .5523.44772 1 1 1h9.5M3 15.5v-4m0 4h9m-9-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v5H3Zm5 0v8m4-8v8m5.9001-1.0999L16 16.5m0 0 1.9001-1.9001M16 16.5h5',
    goToNextCell: 'M3 15.5v3c0 .5523.44772 1 1 1h9.5M3 15.5v-4m0 4h9m-9-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v5H3Zm5 0v8m4-8v8m7.0999-1.0999L21 16.5m0 0-1.9001-1.9001M21 16.5h-5'
  };
</script>

<button onclick={handleClick} id={uniqueId} type="button" class={cn('cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white', className)}>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    {#if typeof svgPaths[action] === 'string'}
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths[action]} />
    {:else}
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths[action][0]} />
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d={svgPaths[action][1]} />
    {/if}
  </svg>
  <span class="sr-only">{finalAriaLabel}</span>
</button>
<Tooltip>{finalTooltipText}</Tooltip>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[TableButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L130)
## Props
@prop editor
@prop action = 'table'
@prop tooltipText
@prop id
@prop ariaLabel
@prop class: className
-->
