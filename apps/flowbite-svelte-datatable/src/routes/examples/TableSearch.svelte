<script lang="ts">
  import { Table } from '$lib';
  import items from './data/stock.json';
  import type { DataTableOptions } from 'simple-datatables';

  const dataTableOptions: DataTableOptions = {
    searchable: true
  };
</script>

<Table {items} dataTableOptions={{ searchable: false, sortable: false }} />
