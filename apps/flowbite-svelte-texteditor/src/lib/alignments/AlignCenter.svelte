<script lang="ts">
  import AlignmentButton from './AlignmentButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';

  let { editor, tooltipText = 'Align center', ariaLabel = 'Align center', id, class: className }: EditorBasicProps = $props();

  const uniqueId = id ?? generateButtonId('AlignCenter');
</script>

<AlignmentButton {editor} alignment="center" {tooltipText} buttonId={uniqueId} {ariaLabel} class={className} />
