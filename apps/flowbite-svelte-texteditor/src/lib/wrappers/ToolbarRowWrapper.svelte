<script lang="ts">
  import { cn, type ToolbarRowWrapperProps } from '$lib';

  let { children, toolbarrawprops, ...restProps }: ToolbarRowWrapperProps = $props();
  const { containerClass, contentClass, top = true } = toolbarrawprops ?? {};
</script>

{#if top}
  <div {...restProps} class={cn('flex flex-wrap items-center', containerClass)}>
    <div class={cn('flex flex-wrap items-center space-x-1 rtl:space-x-reverse', contentClass)}>
      {@render children()}
    </div>
  </div>
{:else}
  <div {...restProps} class={cn('flex flex-wrap items-center gap-2 pt-2', containerClass)}>
    {@render children()}
  </div>
{/if}
