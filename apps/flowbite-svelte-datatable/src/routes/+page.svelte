<script lang="ts">
	import { DarkMode, Heading } from 'flowbite-svelte';
	import * as Examples from './examples';
</script>

<DarkMode />
<Heading tag="h1" class="my-8">@flowbite-svelte/datatable</Heading>

<Heading tag="h2" class="my-4">Default Datatable</Heading>
<Examples.DefaultDatatable />

<Heading tag="h2" class="my-4">Simple</Heading>
<Examples.Simple />

<Heading tag="h2" class="my-4">Table Search</Heading>
<Examples.TableSearch />

<Heading tag="h2" class="my-4">Filtering Data</Heading>
<Examples.FilteringData />

<Heading tag="h2" class="my-4">Sorting Data</Heading>
<Examples.SortingData />

<Heading tag="h2" class="my-4">Table Pagination</Heading>
<Examples.TablePagination />

<Heading tag="h2" class="my-4">Selecting Rows</Heading>
<Examples.SelectingRows />
