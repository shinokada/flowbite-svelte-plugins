<script lang="ts">
  import { DarkMode, Heading, P } from 'flowbite-svelte';
  import * as Examples from './examples';
</script>

<DarkMode />
<Heading tag="h1" class="my-8">@flowbite-svelte-plugins/datatable</Heading>

<Heading tag="h2" class="my-4">AND Search</Heading>

<P class="my-8"
  >Try to search for "blossom 2014" in the two boxes. The OR-search will give you results that contain "2014" OR "Blossom", while the AND-search will only return results including both "2014" and
  "Blossom". The search item separator for the extension column is ";" so that searching for "3147;5018" will return no results, but searching for "3147" or "5018" will return the row that contains
  that value.</P
>
<Examples.Andsearch />

<Heading tag="h2" class="my-4">Callback</Heading>
<Examples.Callback />

<Heading tag="h2" class="my-4">CustomCellRenderer</Heading>
<Examples.CustomCellRenderer />

<Heading tag="h2" class="my-4">Default Datatable</Heading>
<Examples.DefaultDatatable />
<P>Use this example to show table data with default sorting and pagination functionalities.</P>

<Heading tag="h2" class="my-4">Export</Heading>
<Examples.Export />

<Heading tag="h2" class="my-4">Filtering Data</Heading>
<Examples.FilteringData />

<Heading tag="h2" class="my-4">Simple</Heading>
<Examples.Simple />

<Heading tag="h2" class="my-4">Slots/Snippets</Heading>
<P class="my-8">Use captionSlot and footerSlot snippets.</P>
<Examples.Slots />

<Heading tag="h2" class="my-4">Sorting Data</Heading>
<Examples.SortingData />

<Heading tag="h2" class="my-4">Table Search</Heading>
<Examples.TableSearch />

<Heading tag="h2" class="my-4">Table Pagination</Heading>
<Examples.TablePagination />

<Heading tag="h2" class="my-4">Selecting Rows</Heading>
<Examples.SelectingRows />

<Heading tag="h2" class="my-4">Scroll-y</Heading>
<Examples.Scrolly />
