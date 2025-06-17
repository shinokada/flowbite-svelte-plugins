<script lang="ts">
  import clsx from "clsx";
  import type { TableBodyRowProps } from "$lib";

  let { children, class: className, ...restProps }: TableBodyRowProps = $props();
</script>

<tr {...restProps} class={clsx(className)}>
  {#if children}
    {@render children()}
  {/if}
</tr>
