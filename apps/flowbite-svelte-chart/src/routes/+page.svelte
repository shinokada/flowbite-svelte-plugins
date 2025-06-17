<script>
	import { DarkMode, Heading } from 'flowbite-svelte';
	import * as Examples from './examples';
</script>

<DarkMode />

<Heading tag="h1" class="my-8">@flowbite-svelte/chart</Heading>

<Heading tag="h2" class="my-4">Area chart</Heading>
<Examples.AreaChart />
<Heading tag="h2" class="my-4">Line chart</Heading>
<Examples.LineChart />
<Heading tag="h2" class="my-4">Column chart</Heading>
<Examples.ColumnChart />
<Heading tag="h2" class="my-4">Bar chart</Heading>
<Examples.BarChart />
<Heading tag="h2" class="my-4">Pie chart</Heading>
<Examples.PieChart />
<Heading tag="h2" class="my-4">Donut chart</Heading>
<Examples.DonutChart />
<Heading tag="h2" class="my-4">Radial chart</Heading>
<Examples.RadialChart />
<Heading tag="h2" class="my-4">Binding chart</Heading>
<Examples.BindingChart />
