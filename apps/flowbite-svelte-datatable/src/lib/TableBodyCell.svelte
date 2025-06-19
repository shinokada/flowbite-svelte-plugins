<script lang="ts">
  import clsx from 'clsx';
  import type { TableBodyCellProps } from '$lib';

  let { children, class: className, colspan, onclick, ...restProps }: TableBodyCellProps = $props();
</script>

<td {...restProps} colspan={colspan ?? 1} class={clsx(className)}>
  {#if onclick}
    <button {onclick}>
      {#if children}
        {@render children()}
      {/if}
    </button>
  {:else if children}
    {@render children()}
  {/if}
</td>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/datatables)
## Type
[TableBodyCellProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L41)
## Props
@prop children
@prop class: className
@prop colspan
@prop onclick
@prop ...restProps
-->
