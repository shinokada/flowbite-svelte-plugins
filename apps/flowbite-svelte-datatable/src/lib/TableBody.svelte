<script lang="ts">
  import clsx from "clsx";
  import { TableBodyRow, TableBodyCell } from "$lib";
  import type { TableBodyProps, CellValue, BodyRow } from "$lib";

  let { children, bodyItems, class: className, ...restProps }: TableBodyProps = $props();

  function getCellValues(row: BodyRow): CellValue[] {
    if (Array.isArray(row)) {
      return row;
    } else {
      return Object.values(row);
    }
  }
</script>

<tbody {...restProps} class={clsx(className)}>
  {#if bodyItems}
    {#each bodyItems as row}
      <TableBodyRow>
        {#each getCellValues(row) as cellValue}
          <TableBodyCell>{cellValue ?? ""}</TableBodyCell>
        {/each}
      </TableBodyRow>
    {/each}
  {:else if children}
    {@render children()}
  {/if}
</tbody>
