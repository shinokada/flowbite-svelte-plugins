<script lang="ts">
  import GroupCustom from '$lib/groups/GroupCustom.svelte';
  import { TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { Button } from 'flowbite-svelte';

  let editorInstance = $state<Editor | null>(null);

  function getEditorContent() {
    return editorInstance?.getHTML() ?? '';
  }

  function setEditorContent(content: string) {
    editorInstance?.commands.setContent(content);
  }

  const content = '<p>Flowbite-Svelte is an <strong>open-source library of UI components</strong> based on the utility-first Tailwind CSS framework featuring dark mode support, a Figma ...</p>';
</script>

<TextEditor bind:editor={editorInstance} {content}>
  <GroupCustom editor={editorInstance} />
</TextEditor>

<div class="mt-4">
  <Button onclick={() => console.log(getEditorContent())}>Get Content</Button>
  <Button onclick={() => setEditorContent('<p>New content!</p>')}>Set Content</Button>
</div>
