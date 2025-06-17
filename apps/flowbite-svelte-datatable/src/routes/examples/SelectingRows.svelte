<script lang="ts">
  import DataTable from "$lib/DataTable.svelte";
  import items from "../data/sample.json";

  const dataTableOptions = {
    rowRender: (row: any, tr: any, _index: number) => {
      if (!tr.attributes) {
        tr.attributes = {};
      }
      if (!tr.attributes.class) {
        tr.attributes.class = "";
      }
      if (row.selected) {
        tr.attributes.class += " selected";
      } else {
        tr.attributes.class = tr.attributes.class.replace(" selected", "");
      }
      return tr;
    }
  };
</script>

<DataTable 
  selectable
  {items}
  {dataTableOptions}
/>