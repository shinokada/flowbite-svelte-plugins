<script lang="ts">
  import { type GroupEditorBasicProps, VideoButtons } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <VideoButtons {editor} />
  <VideoButtons {editor} format="advanced"/>
{/if}
