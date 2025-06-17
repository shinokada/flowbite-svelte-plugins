<script lang="ts">
	import { getContext } from 'svelte';
	import clsx from 'clsx';
	import type { TableHeadCellProps } from '$lib';

	let { children, class: className, ...restProps }: TableHeadCellProps = $props();

	const isSortable = getContext<boolean>('tableSortable');
</script>

<th {...restProps} class={clsx(className)}>
	{#if children}
		<span class="flex items-center">
			{@render children()}
			{#if isSortable}
				<svg
					class="ms-1 h-4 w-4"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m8 15 4 4 4-4m0-6-4-4-4 4"
					/>
				</svg>
			{/if}
		</span>
	{/if}
</th>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/datatables)
## Type
[TableHeadCellProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L56)
## Props
@prop children
@prop class: className
@prop ...restProps
-->
