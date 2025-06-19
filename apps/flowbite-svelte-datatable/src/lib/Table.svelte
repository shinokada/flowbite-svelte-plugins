<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import clsx from 'clsx';
  import { type DataTableProps, TableHead, TableBody } from '$lib';
  import type { DataTable, DataTableOptions } from 'simple-datatables';

  let {
    children,
    footerSlot,
    captionSlot,
    items,
    divClass = 'relative overflow-x-auto',
    class: className,
    dataTableOptions = {},
    multiSelect = true,
    selectable = false,
    ...restProps
  }: DataTableProps = $props();

  let headItems = $derived(items && items.length > 0 ? Object.keys(items[0]).map((key) => ({ text: key.charAt(0).toUpperCase() + key.slice(1) })) : []);
  let bodyItems = $derived(items && items.length > 0 ? items.map((item) => Object.values(item)) : []);

  let tableElement = $state<HTMLTableElement>();
  let dataTableInstance = $state<DataTable | null>(null);

  // Expose dataTableInstance to parent component
  export { dataTableInstance };

  const defaultOptions: DataTableOptions = {
    searchable: true,
    sortable: true,
    ...dataTableOptions
  };

  const isSortable = !!defaultOptions.sortable;
  setContext('tableSortable', isSortable);

  onMount(() => {
    const initDataTable = async () => {
      if (tableElement) {
        try {
          const { DataTable } = await import('simple-datatables');
          dataTableInstance = new DataTable(tableElement, defaultOptions);

          if (selectable) {
            if (dataTableInstance.data && dataTableInstance.data.data) {
              dataTableInstance.data.data.forEach((data: any) => {
                data.selected = false;
              });
            }

            dataTableInstance.on('datatable.selectrow', (rowIndex: number, event: Event) => {
              event.preventDefault();
              if (dataTableInstance?.data?.data) {
                const row = dataTableInstance.data.data[rowIndex];
                if (row.selected) {
                  row.selected = false;
                } else {
                  if (!multiSelect) {
                    dataTableInstance.data.data.forEach((data: any) => {
                      data.selected = false;
                    });
                  }
                  row.selected = true;
                }
                dataTableInstance.update();
              }
            });
          }
        } catch (error) {
          console.error('Failed to initialize DataTable:', error);
        }
      }
    };

    initDataTable();

    // Cleanup function
    return () => {
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }
    };
  });

  // React to data changes when using DataTable
  $effect(() => {
    if (dataTableInstance && items) {
      // Refresh DataTable when items change
      try {
        dataTableInstance.refresh();
      } catch (error) {
        console.error('Failed to refresh DataTable:', error);
      }
    }
  });
</script>

<div class={clsx(divClass)}>
  <table bind:this={tableElement} {...restProps}>
    {#if captionSlot}
      <caption>
        {@render captionSlot()}
      </caption>
    {/if}
    {#if items && items.length > 0}
      <TableHead {headItems} />
      <TableBody {bodyItems} />
    {:else if children}
      {@render children()}
    {/if}
    {#if footerSlot}
      <tfoot>
        {@render footerSlot()}
      </tfoot>
    {/if}
  </table>
</div>
