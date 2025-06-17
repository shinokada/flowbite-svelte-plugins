<script lang="ts">
  import { DataTable } from "$lib";
  import items from "../data/stock.json";
  import type { DataTableOptions } from "simple-datatables";

  const dataTableOptions: DataTableOptions = {
    searchable: true
  }
</script>

<DataTable {items} {dataTableOptions}/>