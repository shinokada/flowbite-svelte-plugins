<script lang="ts">
  import { Table } from '$lib';
  import products from '../data/products.json';
  import type { DataTableOptions } from 'simple-datatables';

  const scrollyOptions: DataTableOptions = {
    paging: false,
    scrollY: '30vh',
    rowNavigation: true,
    tabIndex: 1
  };
</script>

<Table items={products} dataTableOptions={scrollyOptions} />
