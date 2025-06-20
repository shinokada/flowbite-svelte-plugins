<script lang="ts">
  import { type EditorBasicProps, ImageButton, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();

  const uniqueId = generateButtonId('Image');
</script>

<ImageButton {editor} format="default" tooltipText="Add image" buttonId={uniqueId} ariaLabel="Add image" class={className} />