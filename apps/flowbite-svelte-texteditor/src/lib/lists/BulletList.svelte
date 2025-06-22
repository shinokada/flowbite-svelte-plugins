<script lang="ts">
  import { type EditorBasicProps, ListButton, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();

  const uniqueId = generateButtonId('Image');
</script>

<ListButton {editor} format="bullet" tooltipText="Add image" buttonId={uniqueId} ariaLabel="Add image" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L28)
## Props
@prop editor
@prop class: className
-->
