<script lang="ts">
  import AlignmentButton from './AlignmentButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, tooltipText = 'Align left', ariaLabel = 'Align left', id, class: className }: EditorBasicProps = $props();

  const uniqueId = id ?? generateButtonId('AlignLeft');
</script>

<AlignmentButton {editor} alignment="left" {tooltipText} buttonId={uniqueId} {ariaLabel} class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L28)
## Props
@prop editor
@prop tooltipText = 'Align left'
@prop ariaLabel = 'Align left'
@prop id
@prop class: className
-->
