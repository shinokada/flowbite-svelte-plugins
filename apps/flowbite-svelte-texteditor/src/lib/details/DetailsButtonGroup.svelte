<script lang="ts">
  import { DetailsButton, type DetailsButtonGroupProps } from '$lib';
  
  let { 
    editor, 
    showToolbar = true, 
    set = true, 
    unset = true 
  }: DetailsButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if set}
    <DetailsButton {editor} action="set" />
  {/if}
  {#if unset}
    <DetailsButton {editor} action="unset" />
  {/if}
{/if}