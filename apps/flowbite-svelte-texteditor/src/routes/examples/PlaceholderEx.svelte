<script lang="ts">
  import { UndoRedoButtonGroup, TextEditor, ToolbarRowWrapper } from '$lib';
  import type { Editor } from '@tiptap/core';

  let editorInstance = $state<Editor | null>(null);
</script>

<TextEditor bind:editor={editorInstance}>
  <ToolbarRowWrapper>
    <UndoRedoButtonGroup editor={editorInstance} />
  </ToolbarRowWrapper>
</TextEditor>
