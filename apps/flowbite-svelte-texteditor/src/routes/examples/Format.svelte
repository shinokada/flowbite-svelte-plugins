<script lang="ts">
  import { GroupFormat, TextEditor, ToolbarRowWrapper } from '$lib';
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
    '<p>Flowbite React is an <strong>open-source library of UI components</strong> built using React and Tailwind CSS. It supports dark mode, a Figma design system, and more.</p><p>It includes essential components for web apps like buttons, dropdowns, navigation bars, modals, datepickers, and charts, all optimized for React.</p><p>Example button component in Flowbite React:</p><code>import &#123; Button &#125; from &#39;flowbite-react&#39;; &lt;Button color&#x3D;&quot;blue&quot;&gt;Default&lt;/Button&gt;</code><p>These components can also be easily customized using the theme props from the Flowbite Docs and allows you to add your own Tailwind CSS utility classes to override the default styles.</p><p>Explore more components and props values in the Flowbite Docs.</p>';
</script>

<TextEditor bind:element={editorElement} bind:editor={editorInstance} {content}>
  <ToolbarRowWrapper>
    <GroupFormat editor={editorInstance} />
  </ToolbarRowWrapper>
</TextEditor>

<div class="mt-4">
  <Button onclick={() => console.log(getEditorContent())}>Get Content</Button>
  <Button onclick={() => setEditorContent('<p>New content!</p>')}>Set Content</Button>
</div>
