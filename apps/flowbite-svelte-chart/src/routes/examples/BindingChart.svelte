<script lang="ts">
  import type { ApexOptions } from 'apexcharts';
  import { Chart } from '$lib';
  import { onMount, onDestroy } from 'svelte';
  import { Card } from 'flowbite-svelte';

  const initialData = [6500, 6418, 6456, 6526, 6356, 6456];
  const alternateData = [5500, 5418, 5456, 4526, 4356, 3456];

  let options: ApexOptions = {
    chart: {
      height: 400,
      type: 'area',
      fontFamily: 'Inter, sans-serif',
      dropShadow: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    tooltip: {
      enabled: true,
      x: {
        show: false
      }
    },
    series: [
      {
        name: 'New users',
        data: initialData,
        color: '#1A56DB'
      }
    ]
  };

  let intervalId: ReturnType<typeof setInterval>;
  let isUsingInitialData = true;

  function toggleData() {
    // Toggle between the two datasets
    const newData = isUsingInitialData ? alternateData : initialData;
    isUsingInitialData = !isUsingInitialData;

    // Create a completely new options object to trigger reactivity
    options = {
      ...options,
      series: [
        {
          name: 'New users',
          data: newData,
          color: '#1A56DB'
        }
      ]
    };
  }

  onMount(() => {
    intervalId = setInterval(toggleData, 3000);
  });

  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<Card class="p-4 md:p-6">
  <Chart bind:options />
</Card>
