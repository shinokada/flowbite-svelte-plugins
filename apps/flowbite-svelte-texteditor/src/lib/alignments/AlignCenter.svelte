<script lang="ts">
  import AlignmentButton from './AlignmentButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();

  const uniqueId = generateButtonId('AlignCenter');
</script>

<AlignmentButton {editor} alignment="center" tooltipText="Align center" buttonId={uniqueId} ariaLabel="Align center" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L12)
## Props
@prop editor
@prop class: className
-->
