<script lang="ts">
  import { Table } from '@flowbite-svelte-plugins/datatable';
  import items from './data/stock.json';
  import type { DataTableOptions } from '@flowbite-svelte-plugins/datatable';

  const dataTableOptions: DataTableOptions = {
    searchable: true
  };
</script>

<Table {items} dataTableOptions={{ searchable: false, sortable: false }} />
