<script lang="ts">
  import { UndoRedoButtonGroup, TextEditor, ToolbarRowWrapper } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { bookContent } from './contents/bookContent.js';
  import { Heading } from 'flowbite-svelte';

  let editorInstance = $state<Editor | null>(null);
</script>

<Heading tag="h1" class="my-8">Toc</Heading>

<TextEditor bind:editor={editorInstance} content={bookContent} toc floatingMenu={{ headingsOnly: true }} contentprops={{ id: 'toc-ex' }}>
  <ToolbarRowWrapper>
    <UndoRedoButtonGroup editor={editorInstance} />
  </ToolbarRowWrapper>
</TextEditor>
