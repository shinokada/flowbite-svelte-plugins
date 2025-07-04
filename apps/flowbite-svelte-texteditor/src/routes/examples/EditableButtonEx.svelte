<script lang="ts">
  import { TextEditor, AlignmentButtonGroup, FormatButtonGroup, UndoRedoButtonGroup, EditableButton } from '$lib';
  import type { Editor } from '@tiptap/core';

  let editorInstance = $state<Editor | null>(null);
  let isEditable = $state(true);

  const content = `<p>
        This is an example of a Medium-like editor. Try toggling the editable state with the button below.
      </p>
      <p></p>`;

  function handleEditableToggle(editable: boolean) {
    isEditable = editable;
    console.log('Editor is now:', editable ? 'editable' : 'read-only');
  }
</script>

<TextEditor 
  bind:editor={editorInstance} 
  {content} 
  floatingMenu
  bubbleMenu
  {isEditable}
  contentprops={{ id: 'editable-toggle-ex' }}
>
  <AlignmentButtonGroup editor={editorInstance} />
  <FormatButtonGroup editor={editorInstance} />
  <UndoRedoButtonGroup editor={editorInstance} />
  <EditableButton 
    editor={editorInstance} 
    bind:isEditable={isEditable}
    onToggle={handleEditableToggle}
  />
</TextEditor>
