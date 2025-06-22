<script lang="ts">
  import { GroupAlignment, GroupUndoRedo, GroupFormat, GroupLayout, GroupImage, TextEditor, ToolbarRowWrapper, Divider } from '$lib';
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

  const content =
    '<p>Flowbite is an <strong>open-source library of UI components</strong> based on the utility-first Tailwind CSS framework featuring dark mode support, a Figma design system, and more.</p><p>It includes all of the commonly used components that a website requires, such as buttons, dropdowns, navigation bars, modals, datepickers, advanced charts and the list goes on.</p><p>Here is an example of a button component:</p><code>&#x3C;button type=&#x22;button&#x22; class=&#x22;text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800&#x22;&#x3E;Default&#x3C;/button&#x3E;</code><p>Learn more about all components from the <a href="https://flowbite.com/docs/getting-started/introduction/">Flowbite Docs</a>.</p>';
</script>

<TextEditor bind:element={editorElement} bind:editor={editorInstance} {content}>
  <ToolbarRowWrapper>
    <GroupFormat editor={editorInstance} />
    <Divider />
    <GroupAlignment editor={editorInstance} />
  </ToolbarRowWrapper>
  <ToolbarRowWrapper top={false}>
    <GroupUndoRedo editor={editorInstance} />
    <GroupLayout editor={editorInstance} />
    <Divider />
    <GroupImage editor={editorInstance} />
  </ToolbarRowWrapper>
</TextEditor>

<div class="mt-4">
  <Button onclick={() => console.log(getEditorContent())}>Get Content</Button>
  <Button onclick={() => setEditorContent('<p>New content!</p>')}>Set Content</Button>
</div>
