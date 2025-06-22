<script lang="ts">
  import AlignmentButton from './AlignmentButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, tooltipText = 'Align right', ariaLabel = 'Align right', id, class: className }: EditorBasicProps = $props();

  const uniqueId = id ?? generateButtonId('AlignRight');
</script>

<AlignmentButton {editor} alignment="right" {tooltipText} buttonId={uniqueId} {ariaLabel} class={className} />
