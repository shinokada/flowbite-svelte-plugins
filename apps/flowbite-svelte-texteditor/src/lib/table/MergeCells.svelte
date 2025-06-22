<script lang="ts">
  import TableButton from './TableButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
  const uniqueId = generateButtonId('MergeCells');
</script>

<TableButton {editor} format="mergeCells" tooltipText="Toggle mergeCells" buttonId={uniqueId} ariaLabel="Merge cells" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L44)
## Props
@prop editor
@prop class: className
-->
