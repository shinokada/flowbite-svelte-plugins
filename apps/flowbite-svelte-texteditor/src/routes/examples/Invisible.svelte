<script lang="ts">
  import { InvisibleButtonGroup, TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { Button, Heading } from 'flowbite-svelte';

  let editorInstance = $state<Editor | null>(null);

  function getEditorContent() {
    return editorInstance?.getHTML() ?? '';
  }

  function setEditorContent(content: string) {
    editorInstance?.commands.setContent(content);
  }

  const content = `
      <h1>
        This is a heading.
      </h1>
      <p>
        This<br>is<br>a<br>paragraph.
      </p>
      <p>
        This is a paragraph, but without breaks.
      </p>
    `;
</script>

<Heading tag="h1" class="my-8">Invisible</Heading>

<TextEditor bind:editor={editorInstance} {content} contentprops={{ id: 'invisible-ex' }}>
  <InvisibleButtonGroup editor={editorInstance} />
</TextEditor>

<div class="mt-4">
  <Button onclick={() => console.log(getEditorContent())}>Get Content</Button>
  <Button onclick={() => setEditorContent('<p>New content!</p>')}>Set Content</Button>
</div>
