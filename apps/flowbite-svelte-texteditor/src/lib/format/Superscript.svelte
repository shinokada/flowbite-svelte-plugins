<script lang="ts">
  import FormatButton from './FormatButton.svelte';
  import { type EditorBasicProps } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
</script>

<FormatButton {editor} format="superscript" tooltipText="Toggle superscript" buttonId="toggleSuperscriptButton" ariaLabel="Subscirpt" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L11)
## Props
@prop editor
@prop class: className
-->
