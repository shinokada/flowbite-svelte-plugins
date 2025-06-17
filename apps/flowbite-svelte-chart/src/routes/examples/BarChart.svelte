<script lang="ts">
  import type { ApexOptions } from "apexcharts";
  import { Chart } from "$lib";
  import { Card, A, Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ArrowUpOutline, ChevronDownOutline, ChevronRightOutline } from "flowbite-svelte-icons";

  const options: ApexOptions = {
    series: [
      {
        name: "Income",
        color: "#31C48D",
        data: [1420, 1620, 1820, 1420, 1650, 2120]
      },
      {
        name: "Expense",
        data: [788, 810, 866, 788, 1100, 1200],
        color: "#F05252"
      }
    ],
    chart: {
      sparkline: {
        enabled: false
      },
      type: "bar",
      width: "100%",
      height: 400,
      toolbar: {
        show: false
      }
    },
    fill: {
      opacity: 1
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: {
          position: "top"
        }
      }
    },
    legend: {
      show: true,
      position: "bottom"
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400"
        },
        formatter: function (value) {
          return "$" + value;
        }
      },
      categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400"
        }
      }
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20
      }
    }
  };
</script>

<Card class="p-4 md:p-6">
  <div class="flex justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
    <dl>
      <dt class="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">Profit</dt>
      <dd class="text-3xl leading-none font-bold text-gray-900 dark:text-white">$5,405</dd>
    </dl>
    <div>
      <span class="inline-flex items-center rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
        <ArrowUpOutline class="me-1.5 h-2.5 w-2.5" />
        Profit rate 23.5%
      </span>
    </div>
  </div>

  <div class="grid grid-cols-2 py-3">
    <dl>
      <dt class="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">Income</dt>
      <dd class="text-xl leading-none font-bold text-green-500 dark:text-green-400">$23,635</dd>
    </dl>
    <dl>
      <dt class="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">Expense</dt>
      <dd class="text-xl leading-none font-bold text-red-600 dark:text-red-500">-$18,230</dd>
    </dl>
  </div>

  <Chart {options} />
  <div class="grid grid-cols-1 items-center justify-between border-t border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between pt-5">
      <Button class="inline-flex items-center bg-transparent py-0 text-center text-sm font-medium text-gray-500 hover:bg-transparent hover:text-gray-900 focus:ring-transparent dark:bg-transparent dark:text-gray-400 dark:hover:bg-transparent dark:hover:text-white dark:focus:ring-transparent">Last 7 days<ChevronDownOutline class="m-2.5 ms-1.5 w-2.5" /></Button>
      <Dropdown simple class="w-40" offset={-6}>
        <DropdownItem>Yesterday</DropdownItem>
        <DropdownItem>Today</DropdownItem>
        <DropdownItem>Last 7 days</DropdownItem>
        <DropdownItem>Last 30 days</DropdownItem>
        <DropdownItem>Last 90 days</DropdownItem>
      </Dropdown>
      <A href="/" class="hover:text-primary-700 dark:hover:text-primary-500 rounded-lg px-3 py-2 text-sm font-semibold uppercase hover:bg-gray-100 hover:no-underline dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
        Leads Report
        <ChevronRightOutline class="ms-1.5 h-2.5 w-2.5" />
      </A>
    </div>
  </div>
</Card>