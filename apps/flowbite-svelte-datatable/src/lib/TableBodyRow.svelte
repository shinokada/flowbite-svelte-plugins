<script lang="ts">
  import clsx from 'clsx';
  import type { TableBodyRowProps } from '$lib';

  let { children, class: className, ...restProps }: TableBodyRowProps = $props();
</script>

<tr {...restProps} class={clsx(className)}>
  {#if children}
    {@render children()}
  {/if}
</tr>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/datatables)
## Type
[TableBodyRowProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L37)
## Props
@prop children
@prop class: className
@prop ...restProps
-->
