<script lang="ts">
  import { type GroupEditorBasicProps, ImageButtons } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <ImageButtons {editor} />
  <ImageButtons {editor} format="advanced"/>
{/if}
