<script lang="ts">
	import clsx from 'clsx';
	import { TableHeadCell } from '$lib';
	import type { TableHeadProps, HeadItemType } from '$lib';

	let {
		children,
		headerSlot,
		class: className,
		headItems,
		defaultRow = true,
		...restProps
	}: TableHeadProps = $props();

	function getItemText(item: HeadItemType): string {
		if (typeof item === 'object' && 'text' in item) {
			return item.text;
		}
		return String(item);
	}
</script>

<thead {...restProps} class={clsx(className)}>
	{#if headItems}
		{#if headerSlot}
			{@render headerSlot()}
		{/if}
		<tr>
			{#each headItems as item}
				<TableHeadCell>
					{getItemText(item)}
				</TableHeadCell>
			{/each}
		</tr>
	{:else if children}
		{#if defaultRow}
			<tr>
				{@render children()}
			</tr>
		{:else}
			{@render children()}
		{/if}
	{/if}
</thead>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/datatables)
## Type
[TableHeadProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L17)
## Props
@prop children
@prop headerSlot
@prop class: className
@prop headItems
@prop defaultRow = true
@prop ...restProps
-->
