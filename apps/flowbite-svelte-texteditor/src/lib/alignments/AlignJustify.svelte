<script lang="ts">
  import AlignmentButton from './AlignmentButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, tooltipText = 'Justify text', ariaLabel = 'Justify', id, class: className }: EditorBasicProps = $props();

  const uniqueId = id ?? generateButtonId('AlignJustify');

</script>

<AlignmentButton {editor} alignment="justify" {tooltipText} buttonId={uniqueId} {ariaLabel} class={className} />

