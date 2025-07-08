<script lang="ts">
  import { TextEditor, UndoRedoButtonGroup } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { Heading, P } from 'flowbite-svelte';

  let editorInstance = $state<Editor | null>(null);

  const content = `<p>
        This is an example of a Medium-like editor. Enter a new line and some buttons will appear.
      </p>
      <p></p>`;
</script>

<Heading tag="h1" class="my-8">Floating menu 2</Heading>

<P class="text-xl text-red-500 dark:text-red-400 my-4">Work in progress.</P>

<TextEditor bind:editor={editorInstance} {content} floatingMenu={{ showHorizontalRule: false, showTable: false, showImage: false, showCodeBlock:false, showList:false }} contentprops={{ id: 'floating-menu-ex2' }}>
  <UndoRedoButtonGroup editor={editorInstance} />
</TextEditor>
