<script lang="ts">
  import { cn, type ContentWrapperProps } from '$lib';
  let { children, contentprops, ...restProps }: ContentWrapperProps = $props();

  const { containerClass, contentClass, id = 'wysiwyg-content' } = contentprops ?? {};
</script>

<div class={cn('rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800', containerClass)}>
  <label for={id} class="sr-only">Publish post</label>
  <div {id} class={cn('block w-full border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400', contentClass)} data-toc={contentprops?.dataToc} {...restProps}>
    {@render children()}
  </div>
</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[ContentWrapperProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L63)
## Props
@prop children
@prop contentprops
@prop ...restProps
-->
