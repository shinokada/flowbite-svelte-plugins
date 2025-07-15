<script lang="ts">
  import { cn, type EditorWrapperProps } from '$lib';
  let { children, class: className, ...restProps }: EditorWrapperProps = $props();
</script>

<div {...restProps} class={cn('w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700', className)}>
  {@render children()}
</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[EditorWrapperProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L186)
## Props
@prop children
@prop class: className
@prop ...restProps
-->
