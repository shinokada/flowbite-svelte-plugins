<script lang="ts">
  import { cn, type ToolbarWrapperProps } from '$lib';
  let { children, class: className, ...restProps }: ToolbarWrapperProps = $props();
</script>

<div {...restProps} class={cn('border-b border-gray-200 px-3 py-2 dark:border-gray-600', className)}>
  {@render children()}
</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[ToolbarWrapperProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L192)
## Props
@prop children
@prop class: className
@prop ...restProps
-->
