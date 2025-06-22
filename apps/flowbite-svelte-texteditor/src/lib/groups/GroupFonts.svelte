<script lang="ts">
  import { FontButtons, type GroupFormatProps } from '$lib';

  let { editor, showToolbar = true }: GroupFormatProps = $props();
</script>

{#if editor && showToolbar}
<FontButtons {editor} format="fontFamily" />
<FontButtons {editor} format="fontSize" />
<FontButtons {editor} format="textColor" />
{/if}
