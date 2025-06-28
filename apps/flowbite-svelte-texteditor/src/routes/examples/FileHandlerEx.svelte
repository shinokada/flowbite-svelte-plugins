<script lang="ts">
  import { SourceButtonGroup, TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';

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

<TextEditor bind:editor={editorInstance} {content} file>
  <SourceButtonGroup editor={editorInstance} html={false} />
</TextEditor>
