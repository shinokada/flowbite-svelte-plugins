<script lang="ts">
  import FormatButton from './FormatButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();

  const uniqueId = generateButtonId('Superscript');
</script>

<FormatButton {editor} format="superscript" tooltipText="Toggle superscript" buttonId={uniqueId} ariaLabel="Subscirpt" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L12)
## Props
@prop editor
@prop class: className
-->
