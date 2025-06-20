<script lang="ts">
  import FormatButton from './FormatButton.svelte';
  import { type EditorBasicProps } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
</script>

<FormatButton {editor} format="bold" tooltipText="Toggle bold" buttonId="toggleBoldButton" ariaLabel="Bold" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L11)
## Props
@prop editor
@prop class: className
-->
