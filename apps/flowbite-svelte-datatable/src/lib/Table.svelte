<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import clsx from 'clsx';
  import { type DataTableProps, TableHead, TableBody } from '$lib';
  import type { DataTableOptions, SelectableDataRow } from 'simple-datatables';

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
    isLoading = $bindable(true),
    dataTableInstance = $bindable(null),
    onInitStart,
    onInitComplete,
    onInitError,
    onRefresh,
    onUpdate,
    onPage,
    onSort,
    onSearch,
    onSelectRow,
    onSelectAll,
    onDeselectRow,
    onDeselectAll,
    ...restProps
  }: DataTableProps = $props();

  let headItems = $derived(items && items.length > 0 ? Object.keys(items[0]).map((key) => ({ text: key.charAt(0).toUpperCase() + key.slice(1) })) : []);
  let bodyItems = $derived(items && items.length > 0 ? items.map((item) => Object.values(item)) : []);

  let tableElement = $state<HTMLTableElement>();

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
          onInitStart?.();
          isLoading = true;

          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

          const { DataTable } = await import('simple-datatables');
          dataTableInstance = new DataTable(tableElement, defaultOptions);

          // Set up all event listeners
          setupEventListeners();

          // Immediately blur the table to remove focus and restore scroll position
          if (tableElement) {
            tableElement.blur();
          }
          // Restore scroll position
          requestAnimationFrame(() => {
            window.scrollTo(scrollLeft, scrollTop);
          });

          isLoading = false;
          onInitComplete?.(dataTableInstance);
        } catch (error) {
          console.error('Failed to initialize DataTable:', error);
          isLoading = false;
          onInitError?.(error as Error);
        }
      }
    };

    const setupEventListeners = () => {
      if (!dataTableInstance) return;

      // Set up simple-datatables event listeners
      dataTableInstance.on('datatable.init', () => {
        // This might fire after our manual onInitComplete, but keeping for completeness
      });

      dataTableInstance.on('datatable.refresh', () => {
        onRefresh?.(dataTableInstance!);
      });

      dataTableInstance.on('datatable.update', () => {
        onUpdate?.(dataTableInstance!);
      });

      dataTableInstance.on('datatable.page', (page: number) => {
        onPage?.(page, dataTableInstance!);
      });

      dataTableInstance.on('datatable.sort', (column: number, direction: string) => {
        onSort?.(column, direction, dataTableInstance!);
      });

      dataTableInstance.on('datatable.search', (query: string, matched: any[]) => {
        onSearch?.(query, matched, dataTableInstance!);
      });

      dataTableInstance.on('datatable.selectall', () => {
        onSelectAll?.(dataTableInstance!);
      });

      dataTableInstance.on('datatable.deselectrow', (rowIndex: number) => {
        onDeselectRow?.(rowIndex, dataTableInstance!);
      });

      dataTableInstance.on('datatable.deselectall', () => {
        onDeselectAll?.(dataTableInstance!);
      });

      // Handle selection logic with callback
      if (selectable) {
        if (dataTableInstance.data && dataTableInstance.data.data) {
          dataTableInstance.data.data.forEach((data: any) => {
            (data as SelectableDataRow).selected = false;
          });
        }

        dataTableInstance.on('datatable.selectrow', (rowIndex: number, event: Event) => {
          event.preventDefault();

          // Call the callback first
          onSelectRow?.(rowIndex, event, dataTableInstance!);

          // Handle internal selection logic
          if (dataTableInstance?.data?.data) {
            const row = dataTableInstance.data.data[rowIndex] as SelectableDataRow;
            if (row.selected) {
              row.selected = false;
            } else {
              if (!multiSelect) {
                dataTableInstance.data.data.forEach((data: any) => {
                  (data as SelectableDataRow).selected = false;
                });
              }
              row.selected = true;
            }
            dataTableInstance.update();
          }
        });
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
