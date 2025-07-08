<script lang="ts">
  import { UndoRedoButtonGroup, TextEditor, ToolbarRowWrapper } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { Heading } from 'flowbite-svelte';

  let editorInstance = $state<Editor | null>(null);
</script>

<Heading tag="h1" class="my-8">Placeholder</Heading>

<TextEditor bind:editor={editorInstance} contentprops={{ id: 'placeholder-ex' }}>
  <ToolbarRowWrapper>
    <UndoRedoButtonGroup editor={editorInstance} />
  </ToolbarRowWrapper>
</TextEditor>
