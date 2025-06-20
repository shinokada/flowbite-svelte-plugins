<script lang="ts">
  import TableButton from './TableButton.svelte';
   import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
  const uniqueId = generateButtonId('DeleteTable');
</script>

<TableButton {editor} format="deleteTable" tooltipText="Toggle Delete table" buttonId={uniqueId} ariaLabel="Delete table" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L11)
## Props
@prop editor
@prop class: className
-->
