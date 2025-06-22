<script lang="ts">
  import TableButton from './TableButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
  const uniqueId = generateButtonId('GoToPreviousCell');
</script>

<TableButton {editor} format="goToPreviousCell" tooltipText="Toggle goToPreviousCell" buttonId={uniqueId} ariaLabel="Go to previous cell" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L13)
## Props
@prop editor
@prop class: className
-->
