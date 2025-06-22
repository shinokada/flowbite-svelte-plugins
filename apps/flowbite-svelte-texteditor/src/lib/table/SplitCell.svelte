<script lang="ts">
  import TableButton from './TableButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
  const uniqueId = generateButtonId('SplitCell');
</script>

<TableButton {editor} format="splitCell" tooltipText="Toggle splitCell" buttonId={uniqueId} ariaLabel="Split cell" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L28)
## Props
@prop editor
@prop class: className
-->
