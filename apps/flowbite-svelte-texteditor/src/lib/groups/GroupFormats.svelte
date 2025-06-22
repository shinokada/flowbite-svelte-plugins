<script lang="ts">
  import { FormatButtons, type GroupFormatProps } from '$lib';

  let { editor, showToolbar = true }: GroupFormatProps = $props();
</script>

{#if editor && showToolbar}
  <FormatButtons {editor} format="bold"/>
  <FormatButtons {editor} format="code"/>
  <FormatButtons {editor} format="highlight"/>
  <FormatButtons {editor} format="italic"/>
  <FormatButtons {editor} format="link"/>
  <FormatButtons {editor} format="removeLink"/>
  <FormatButtons {editor} format="strike"/>
  <FormatButtons {editor} format="subscript"/>
  <FormatButtons {editor} format="superscript"/>
  <FormatButtons {editor} format="underline"/>
{/if}
