<script lang="ts">
  import { ImageButtonGroup, TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { Button, Heading } from 'flowbite-svelte';

  let editorInstance = $state<Editor | null>(null);

  function getEditorContent() {
    return editorInstance?.getHTML() ?? '';
  }

  function setEditorContent(content: string) {
    editorInstance?.commands.setContent(content);
  }

  const content = `<p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://placehold.co/400x200" />
        <img src="https://placehold.co/400x200/6A00F5/white" />`;
</script>

<Heading tag="h1" class="my-8">Images</Heading>

<TextEditor bind:editor={editorInstance} {content} contentprops={{ id: 'image-ex' }}>
  <ImageButtonGroup editor={editorInstance} />
</TextEditor>

<div class="mt-4">
  <Button onclick={() => console.log(getEditorContent())}>Get Content</Button>
  <Button onclick={() => setEditorContent('<p>New content!</p>')}>Set Content</Button>
</div>
