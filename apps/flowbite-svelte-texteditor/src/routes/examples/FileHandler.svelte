<script lang="ts">
  import { SourceButtonGroup, TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { Heading } from 'flowbite-svelte';

  let editorInstance = $state<Editor | null>(null);

  const content = `<h1>
        Try to paste or drop files into this editor
      </h1>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>`;
</script>

<Heading tag="h1" class="my-8">File handler</Heading>

<TextEditor bind:editor={editorInstance} {content} file contentprops={{ id: 'file-handler-ex' }}>
  <SourceButtonGroup editor={editorInstance} html={false} />
</TextEditor>
