<script lang="ts">
  import TableButton from './TableButton.svelte';
   import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
  const uniqueId = generateButtonId('MergeOrSplit');
</script>

<TableButton {editor} format="mergeOrSplit" tooltipText="Toggle mergeOrSplit" buttonId={uniqueId} ariaLabel="Merge or split" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L11)
## Props
@prop editor
@prop class: className
-->
