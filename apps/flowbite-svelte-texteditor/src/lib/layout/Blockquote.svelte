<script lang="ts">
  import { LayoutButton } from '$lib';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();

  const uniqueId = generateButtonId('Blockquote');
</script>

<LayoutButton {editor} format="blockquote" tooltipText="Toggle blockquote" buttonId={uniqueId} ariaLabel="Blockquote" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L78)
## Props
@prop editor
@prop class: className
-->
