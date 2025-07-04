<script lang="ts">
  import { AlignmentButtonGroup, TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';

  let editorInstance = $state<Editor | null>(null);

  const content =
    '<p>Flowbite-Svelte is an <strong>open-source library of UI components</strong> based on the utility-first Tailwind CSS framework featuring dark mode support, a Figma design system, and more.</p><p>It includes all of the commonly used components that a website requires, such as buttons, dropdowns, navigation bars, modals, datepickers, advanced charts and the list goes on.</p>';
</script>

## autofocusPosition Controls the initial cursor position when the editor loads. Set to 'start' to focus at the beginning, 'end' to focus at the end, 'all' to select all content, or a number for a specific character position. Use false or null to disable autofocus entirely. Default: false Type:
'start' | 'end' | 'all' | number | boolean | null

<TextEditor bind:editor={editorInstance} {content} autofocusPosition="end" contentprops={{ id: 'autofocus-ex' }}>
  <AlignmentButtonGroup editor={editorInstance} />
</TextEditor>
