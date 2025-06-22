<script lang="ts">
  import { type GroupEditorBasicProps, Video, VideoAdvanced } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <Video {editor} />
  <VideoAdvanced {editor} />
{/if}
