<script lang="ts">
  import TableButton from './TableButton.svelte';
  import { type EditorBasicProps } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton {editor} format="toggleHeaderColumn" tooltipText="Toggle toggleHeaderColumn" buttonId="toggleToggleHeaderColumnButton" ariaLabel="Toggle header column" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L11)
## Props
@prop editor
@prop class: className
-->
