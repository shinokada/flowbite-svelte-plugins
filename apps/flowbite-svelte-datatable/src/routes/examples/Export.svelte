<script lang="ts">
  import { Table } from '$lib';
  import { Button } from 'flowbite-svelte';
  import { exportJSON, exportCSV, exportTXT, exportSQL } from 'simple-datatables';

  import items from './data/sample.json';

  let tableComponent: any;

  const handleCSV = () => {
    if (tableComponent?.dataTableInstance) {
      exportCSV(tableComponent.dataTableInstance, {
        download: true,
        lineDelimiter: '\n',
        columnDelimiter: ';'
      });
    }
  };

  const handleSQL = () => {
    if (tableComponent?.dataTableInstance) {
      exportSQL(tableComponent.dataTableInstance, {
        download: true,
        tableName: 'export_table'
      });
    }
  };

  const handleTXT = () => {
    if (tableComponent?.dataTableInstance) {
      exportTXT(tableComponent.dataTableInstance, {
        download: true
      });
    }
  };

  const handleJSON = () => {
    if (tableComponent?.dataTableInstance) {
      exportJSON(tableComponent.dataTableInstance, {
        download: true,
        space: 3
      });
    }
  };
</script>

<Table bind:this={tableComponent} {items} />

<div class="mt-4 space-x-2">
  <Button onclick={handleCSV}>Export CSV</Button>
  <Button onclick={handleSQL}>Export SQL</Button>
  <Button onclick={handleTXT}>Export TXT</Button>
  <Button onclick={handleJSON}>Export JSON</Button>
</div>
