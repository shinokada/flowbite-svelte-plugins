<script lang="ts">
  import { FormatButton, type FormatButtonGroupProps } from '$lib';

  let { editor, showToolbar = true, bold = true, code = true, highlight = true, italic = true, link = true, removeLink = true, strike = true, subscript = true, superscript = true, underline = true }: FormatButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if bold}
    <FormatButton {editor} format="bold" />
  {/if}
  {#if code}
    <FormatButton {editor} format="code" />
  {/if}
  {#if highlight}
    <FormatButton {editor} format="highlight" />
  {/if}
  {#if italic}
    <FormatButton {editor} format="italic" />
  {/if}
  {#if link}
    <FormatButton {editor} format="link" />
  {/if}
  {#if removeLink}
    <FormatButton {editor} format="removeLink" />
  {/if}
  {#if strike}
    <FormatButton {editor} format="strike" />
  {/if}
  {#if subscript}
    <FormatButton {editor} format="subscript" />
  {/if}
  {#if superscript}
    <FormatButton {editor} format="superscript" />
  {/if}
  {#if underline}
    <FormatButton {editor} format="underline" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[FormatButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L122)
## Props
@prop editor
@prop showToolbar = true
@prop bold = true
@prop code = true
@prop highlight = true
@prop italic = true
@prop link = true
@prop removeLink = true
@prop strike = true
@prop subscript = true
@prop superscript = true
@prop underline = true
-->
