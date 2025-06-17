<script lang="ts">
  import { DataTable } from "$lib";
  import items from "../data/gdp.json";
  import type { DataTableOptions } from "simple-datatables";

  const dataTableOptions: DataTableOptions = {
    searchable: false,
    perPageSelect: false,
    sortable: true
  }
</script>

<DataTable {items} {dataTableOptions}/>