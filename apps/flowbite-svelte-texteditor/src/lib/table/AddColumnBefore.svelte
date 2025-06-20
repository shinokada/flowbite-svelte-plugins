<script lang="ts">
  import TableButton from './TableButton.svelte';
   import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
  const uniqueId = generateButtonId('AddColumnBefore');
</script>

<TableButton {editor} format="addColumnBefore" tooltipText="Toggle addColumnBefore" buttonId={uniqueId} ariaLabel="Add column before" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L11)
## Props
@prop editor
@prop class: className
-->
