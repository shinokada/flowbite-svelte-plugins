<script lang="ts">
  import { LayoutButtons, type GroupFormatProps } from '$lib';

  let { editor, showToolbar = true }: GroupFormatProps = $props();
</script>

{#if editor && showToolbar}
  <LayoutButtons {editor} format="blockquote" />
  <LayoutButtons {editor} format="codeblock" />
  <LayoutButtons {editor} format="hr" />
{/if}
