<script lang="ts">
  import TableButton from './TableButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
  const uniqueId = generateButtonId('AddRowBefore');
</script>

<TableButton {editor} format="addRowBefore" tooltipText="Toggle addRowBefore" buttonId={uniqueId} ariaLabel="Add row before" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L28)
## Props
@prop editor
@prop class: className
-->
