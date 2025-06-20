<script lang="ts">
  import { type GroupEditorBasicProps, Image, ImageAdvanced } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <Image {editor} />
  <ImageAdvanced {editor} />
{/if}