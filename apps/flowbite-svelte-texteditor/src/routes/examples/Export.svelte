<script lang="ts">
  import { ExportButtonGroup, TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { Heading } from 'flowbite-svelte';

  let editorInstance = $state<Editor | null>(null);

  const content =
    '<p>Flowbite-Svelte is an <strong>open-source library of UI components</strong> based on the utility-first Tailwind CSS framework featuring dark mode support, a Figma design system, and more.</p><p>It includes all of the commonly used components that a website requires, such as buttons, dropdowns, navigation bars, modals, datepickers, advanced charts and the list goes on.</p>';
</script>

<Heading tag="h1" class="my-8">Export</Heading>

<TextEditor bind:editor={editorInstance} {content} contentprops={{ id: 'export-ex' }}>
  <ExportButtonGroup editor={editorInstance} />
</TextEditor>
