<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
  // import Document from '@tiptap/extension-document'
  // import Paragraph from '@tiptap/extension-paragraph'
  // import Text from '@tiptap/extension-text'
  // import Heading from '@tiptap/extension-heading'

	let element: HTMLDivElement;
	let editor: Editor | null = null;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
      ],
			content: '<p>Hello World! 🌍️ </p>',
      autofocus: true,
      editable: true,
      injectCSS: false,
     
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<button
		onclick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		onclick={() => editor?.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>
{/if}

<div bind:this={element}></div>

<style>
	button.active {
		background: black;
		color: white;
	}
</style>