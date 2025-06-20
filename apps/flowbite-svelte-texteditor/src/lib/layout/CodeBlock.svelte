<script lang="ts">
  import LayoutButton from './LayoutButton.svelte';
  import { type EditorBasicProps } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
</script>

<LayoutButton {editor} format="codeblock" tooltipText="Toggle code block" buttonId="toggleCodeBlockButton" ariaLabel="Code block" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L11)
## Props
@prop editor
@prop class: className
-->
