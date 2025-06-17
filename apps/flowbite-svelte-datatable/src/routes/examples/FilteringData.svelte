<script lang="ts">
  import { DataTable } from "$lib";
  import items from "../data/products.json";
  import type { DataTableOptions } from "simple-datatables";

  const dataTableOptions: DataTableOptions = {
    sortable: true,
    searchable: true,
    tableRender: (data: any[], table: any, type: string) => {
      if (type === "print") {
        return table;
      }
      
      const tHead = table.childNodes[0];
      const filterHeaders = {
        nodeName: "TR",
        attributes: {
          class: "search-filtering-row"
        },
        childNodes: tHead.childNodes[0].childNodes.map(
          (_th: any, index: number) => ({
            nodeName: "TH",
            childNodes: [
              {
                nodeName: "INPUT",
                attributes: {
                  class: "datatable-input",
                  type: "search",
                  placeholder: `Filter column ${index + 1}`,
                  "data-columns": `[${index}]`
                }
              }
            ]
          })
        )
      };
      
      tHead.childNodes.push(filterHeaders);
      return table;
    }
  };
</script>

<DataTable {items} {dataTableOptions} />