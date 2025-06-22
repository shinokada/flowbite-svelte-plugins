<script lang="ts">
  import { LayoutButton } from '$lib';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();

  const uniqueId = generateButtonId('HorizontalRule');
</script>

<LayoutButton {editor} format="horizontalrule" tooltipText="Toggle horizontal rule" buttonId={uniqueId} ariaLabel="Horizontal rule" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L44)
## Props
@prop editor
@prop class: className
-->
