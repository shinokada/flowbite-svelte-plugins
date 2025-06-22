<script lang="ts">
  import AlignmentButton from './AlignmentButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, tooltipText = 'Justify text', ariaLabel = 'Justify', id, class: className }: EditorBasicProps = $props();

  const uniqueId = id ?? generateButtonId('AlignJustify');
</script>

<AlignmentButton {editor} alignment="justify" {tooltipText} buttonId={uniqueId} {ariaLabel} class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L44)
## Props
@prop editor
@prop tooltipText = 'Justify text'
@prop ariaLabel = 'Justify'
@prop id
@prop class: className
-->
