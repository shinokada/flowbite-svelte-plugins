<script lang="ts">
  import { type EditorBasicProps, ListButton, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();

  const uniqueId = generateButtonId('Image');
</script>

<ListButton {editor} format="bullet" tooltipText="Add image" buttonId={uniqueId} ariaLabel="Add image" class={className} />

