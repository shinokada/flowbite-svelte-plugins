<script lang="ts">
  import TableButton from './TableButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
  const uniqueId = generateButtonId('AddRowAfter');
</script>

<TableButton {editor} format="addRowAfter" tooltipText="Toggle addRowAfter" buttonId={uniqueId} ariaLabel="Add row after" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L32)
## Props
@prop editor
@prop class: className
-->
