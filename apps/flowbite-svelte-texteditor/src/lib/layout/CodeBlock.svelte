<script lang="ts">
  import {LayoutButton} from '$lib';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();

  const uniqueId = generateButtonId('CodeBlock');
</script>

<LayoutButton {editor} format="codeblock" tooltipText="Toggle code block" buttonId={uniqueId} ariaLabel="Code block" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L32)
## Props
@prop editor
@prop class: className
-->
