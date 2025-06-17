<script lang="ts">
	import { Table } from '$lib';
	import items from '../data/aimodels.json';
	import type { DataTableOptions } from 'simple-datatables';

	const dataTableOptions: DataTableOptions = {
		paging: true,
		perPage: 5,
		perPageSelect: [5, 10, 15, 20, 25],
		sortable: false
	};
</script>

<Table {items} {dataTableOptions} />
