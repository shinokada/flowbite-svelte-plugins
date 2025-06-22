<script lang="ts">
  import AlignmentButton from './AlignmentButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, tooltipText = 'Align center', ariaLabel = 'Align center', id, class: className }: EditorBasicProps = $props();

  const uniqueId = id ?? generateButtonId('AlignCenter');
</script>

<AlignmentButton {editor} alignment="center" {tooltipText} buttonId={uniqueId} {ariaLabel} class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L32)
## Props
@prop editor
@prop tooltipText = 'Align center'
@prop ariaLabel = 'Align center'
@prop id
@prop class: className
-->
