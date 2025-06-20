<script lang="ts">
  import TableButton from './TableButton.svelte';
  import { type EditorBasicProps } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton {editor} format="toggleHeaderCell" tooltipText="Toggle toggleHeaderCell" buttonId="toggleToggleHeaderCellButton" ariaLabel="Toggle header cell" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L11)
## Props
@prop editor
@prop class: className
-->
