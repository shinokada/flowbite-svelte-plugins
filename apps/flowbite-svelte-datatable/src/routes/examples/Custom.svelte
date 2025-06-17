<script lang="ts">
	import { onMount } from 'svelte';
	import { DataTable } from 'simple-datatables';

	import items from '../data/sample.json';

	onMount(() => {
		// Assuming your JSON has objects with consistent keys
		const columns = Object.keys(items[0] || {});

		new DataTable('#myTable', {
			data: {
				headings: columns,
				data: items.map((item) => Object.values(item))
			}
		});
	});
</script>

<table id="myTable"></table>
