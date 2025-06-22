<script lang="ts">
  import AlignmentButton from './AlignmentButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, tooltipText = 'Align right', ariaLabel = 'Align right', id, class: className }: EditorBasicProps = $props();

  const uniqueId = id ?? generateButtonId('AlignRight');
</script>

<AlignmentButton {editor} alignment="right" {tooltipText} buttonId={uniqueId} {ariaLabel} class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L28)
## Props
@prop editor
@prop tooltipText = 'Align right'
@prop ariaLabel = 'Align right'
@prop id
@prop class: className
-->
