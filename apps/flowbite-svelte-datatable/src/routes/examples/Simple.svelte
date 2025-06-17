<script lang="ts">
	import { Table } from '$lib';
	import items from '../data/simple.json';
	import type { DataTableOptions } from 'simple-datatables';

	const dataTableOptions: DataTableOptions = {
		perPageSelect: [5, 10, 15, ['All', -1]],
		columns: [
			{
				select: 2,
				sortSequence: ['desc', 'asc']
			},
			{
				select: 3,
				sortSequence: ['desc']
			},
			{
				select: 4,
				cellClass: 'green',
				headerClass: 'red'
			}
		]
	};
</script>

<Table {items} {dataTableOptions} />
