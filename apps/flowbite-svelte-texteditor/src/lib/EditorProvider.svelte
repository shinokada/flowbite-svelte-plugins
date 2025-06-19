<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import TextAlign from '@tiptap/extension-text-align';
	import Underline from '@tiptap/extension-underline';
	import Highlight from '@tiptap/extension-highlight';
	import Link from '@tiptap/extension-link';

	let {
		element = $bindable<HTMLDivElement | null>(null),
		content = '<p>Start typing...</p>',
		editorClass = 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none',
		editor = $bindable<Editor | null>(null)
	}: {
		element?: HTMLDivElement | null;
		content?: string;
		editorClass?: string;
		editor?: Editor | null;
	} = $props();

	// Use effect to watch for element changes only
	$effect(() => {
		if (element && !editor) {
			editor = new Editor({
				element: element,
				extensions: [
					StarterKit,
					TextAlign.configure({
						types: ['heading', 'paragraph']
					}),
					Underline,
					Highlight,
					Link.configure({
						openOnClick: false,
					})
				],
				content,
				editorProps: {
					attributes: {
						class: editorClass
					}
				}
			});
		}
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>