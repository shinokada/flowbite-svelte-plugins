<script lang="ts">
  import { type GroupEditorBasicProps, Link, RemoveLink } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <Link {editor} />
  <RemoveLink {editor} />
{/if}
