<script lang="ts">
	import { Table } from '$lib';
	import aimodels from '../data/aimodels.json';
	import type { DataTableOptions } from 'simple-datatables';

	const paginationOptions: DataTableOptions = {
		paging: true,
		perPage: 5,
		perPageSelect: [5, 10, 15, 20, 25],
		sortable: false
	};
</script>

<Table items={aimodels} dataTableOptions={paginationOptions} />
