<script lang="ts">
  import AlignmentButton from './AlignmentButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, tooltipText = 'Align left', ariaLabel = 'Align left', id, class: className }: EditorBasicProps = $props();

  const uniqueId = id ?? generateButtonId('AlignLeft');
</script>

<AlignmentButton {editor} alignment="left" {tooltipText} buttonId={uniqueId} {ariaLabel} class={className} />
