<script lang="ts">
  import { cn, type DividerProps } from '$lib';
  let { divClass, spanClass, ...restProps }: DividerProps = $props();
</script>

<div class={cn('px-1', divClass)} {...restProps}>
  <span class={cn('block h-4 w-px bg-gray-300 dark:bg-gray-600', spanClass)}></span>
</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[DividerProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L197)
## Props
@prop divClass
@prop spanClass
@prop ...restProps
-->
