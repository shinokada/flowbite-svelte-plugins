<script lang="ts">
  import TableButton from './TableButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
  const uniqueId = generateButtonId('FixTables');
</script>

<TableButton {editor} format="fixTables" tooltipText="Toggle fixTables" buttonId={uniqueId} ariaLabel="Fix tables" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L78)
## Props
@prop editor
@prop class: className
-->
