<script lang="ts">
  import { TextEditor, AlignmentButtonGroup, HeadingButtonGroup, UndoRedoButtonGroup, EditableButton } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { Heading } from 'flowbite-svelte';

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

<Heading tag="h1" class="my-8">Editable Button</Heading>

<TextEditor bind:editor={editorInstance} {content} {isEditable} contentprops={{ id: 'editable-toggle-ex' }}>
  <EditableButton editor={editorInstance} bind:isEditable onToggle={handleEditableToggle} />
  <AlignmentButtonGroup editor={editorInstance} />
  <HeadingButtonGroup editor={editorInstance} />
  <UndoRedoButtonGroup editor={editorInstance} />
</TextEditor>
