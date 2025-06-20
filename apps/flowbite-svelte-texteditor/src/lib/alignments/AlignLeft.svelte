<script lang="ts">
  import AlignmentButton from './AlignmentButton.svelte';
  import { type EditorBasicProps } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();
</script>

<AlignmentButton {editor} alignment="left" tooltipText="Align left" buttonId="toggleLeftAlignButton" ariaLabel="Align left" class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L11)
## Props
@prop editor
@prop class: className
-->
