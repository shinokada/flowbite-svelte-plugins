<script lang="ts">
  import { type GroupEditorBasicProps, Video, VideoAdvanced } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <Video {editor} />
  <VideoAdvanced {editor} />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L70)
## Props
@prop editor
@prop showToolbar = true
-->
