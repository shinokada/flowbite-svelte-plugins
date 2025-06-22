<script lang="ts">
  import { ListButtons, type GroupFormatProps } from '$lib';

  let { editor, showToolbar = true }: GroupFormatProps = $props();
</script>

{#if editor && showToolbar}
  <ListButtons {editor} format="bullet" />
  <ListButtons {editor} format="ordered" />
{/if}
