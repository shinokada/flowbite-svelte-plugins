<script lang="ts">
  import GroupCustom from '$lib/groups/GroupCustom.svelte';
  import { TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { Button, Heading } from 'flowbite-svelte';

  let editorInstance = $state<Editor | null>(null);

  function getEditorContent() {
    return editorInstance?.getHTML() ?? '';
  }

  function setEditorContent(content: string) {
    editorInstance?.commands.setContent(content);
  }

  const content = '<p>Flowbite-Svelte is an <strong>open-source library of UI components</strong> based on the utility-first Tailwind CSS framework featuring dark mode support, a Figma ...</p>';
</script>

<Heading tag="h1" class="my-8">Custom TextEditor</Heading>

<TextEditor bind:editor={editorInstance} {content} contentprops={{ id: 'custom-editor-ex' }}>
  <GroupCustom editor={editorInstance} />
</TextEditor>

<div class="mt-4">
  <Button onclick={() => console.log(getEditorContent())}>Get Content</Button>
  <Button onclick={() => setEditorContent('<p>New content!</p>')}>Set Content</Button>
</div>
