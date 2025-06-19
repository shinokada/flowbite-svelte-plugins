<script lang="ts">
	import { Tooltip } from 'flowbite-svelte';
	import type { Editor } from '@tiptap/core';
	import { type ClassValue } from 'clsx';
  import { cn } from '$lib';

	let {
		editor,
		alignment,
		tooltipText,
		buttonId,
		ariaLabel,
		class: className
	}: {
		editor: Editor | null;
		alignment: 'left' | 'center' | 'right' | 'justify';
		tooltipText: string;
		buttonId: string;
		ariaLabel: string;
		class?: ClassValue;
	} = $props();

	function handleClick() {
		editor?.chain().focus().setTextAlign(alignment).run();
	}

	// SVG paths for different alignments
	const svgPaths = {
		left: "M6 6h8m-8 4h12M6 14h8m-8 4h12",
		center: "M8 6h8M6 10h12M8 14h8M6 18h12", 
		right: "M18 6h-8m8 4H6m12 4h-8m8 4H6",
		justify: "M18 6H6m12 4H6m12 4H6m12 4H6"
	};
</script>

<button
	onclick={handleClick}
	id={buttonId}
	type="button"
	class={cn("cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white", className )}
>
	<svg
		class="h-5 w-5"
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
			d={svgPaths[alignment]}
		/>
	</svg>
	<span class="sr-only">{ariaLabel}</span>
</button>
<Tooltip>{tooltipText}</Tooltip>