<script lang="ts">
  import FormatButton from './FormatButton.svelte';
   import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();

  const uniqueId = generateButtonId('Underline');
</script>

<FormatButton {editor} format="underline" tooltipText="Toggle underline" buttonId={uniqueId} ariaLabel="Underline" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L11)
## Props
@prop editor
@prop class: className
-->
