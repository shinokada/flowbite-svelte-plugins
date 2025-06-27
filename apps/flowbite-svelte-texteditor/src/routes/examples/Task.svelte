<script lang="ts">
  import { TaskListButtonGroup, TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { Button } from 'flowbite-svelte';

  let editorElement = $state<HTMLDivElement | null>(null);
  let editorInstance = $state<Editor | null>(null);

  function getEditorContent() {
    return editorInstance?.getHTML() ?? '';
  }

  function setEditorContent(content: string) {
    editorInstance?.commands.setContent(content);
  }

  const content = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi veniam nulla impedit, fugit similique nihil deserunt velit ea, laboriosam sequi!
        <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi veniam nulla impedit, fugit similique nihil deserunt velit ea, laboriosam sequi!
      `;
</script>

<TextEditor bind:element={editorElement} bind:editor={editorInstance} {content}>
  <TaskListButtonGroup editor={editorInstance} />
</TextEditor>

<div class="mt-4">
  <Button onclick={() => console.log(getEditorContent())}>Get Content</Button>
  <Button onclick={() => setEditorContent('<p>New content!</p>')}>Set Content</Button>
</div>
