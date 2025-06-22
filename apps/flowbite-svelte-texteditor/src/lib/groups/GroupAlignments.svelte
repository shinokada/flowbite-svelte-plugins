<script lang="ts">
  import {AlignmentButtons, type GroupEditorBasicProps } from '$lib';
  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
<AlignmentButtons {editor} alignment="left" />
<AlignmentButtons {editor} alignment="center" />
<AlignmentButtons {editor} alignment="right" />
<AlignmentButtons {editor} alignment="justify" />
{/if}