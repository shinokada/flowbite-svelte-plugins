<script lang="ts">
  import { SourceButtonGroup, YoutubeButtonGroup, TextEditor, EditorConfig } from '$lib';
  import type { YoutubeOptions } from '@tiptap/extension-youtube';
  import type { Editor } from '@tiptap/core';

  let editorInstance = $state<Editor | null>(null);

  const content =
    '<p>Flowbite is an <strong>open-source library of UI components</strong> based on the utility-first Tailwind CSS framework featuring dark mode support, a Figma design system, and more.</p><p>It includes all of the commonly used components that a website requires, such as buttons, dropdowns, navigation bars, modals, datepickers, advanced charts and the list goes on.</p>';

  const youtubeOptions: Partial<YoutubeOptions> = {
    width: 256,
    height: 192,
    autoplay: true,
    modestBranding: true,
    controls:true,
    allowFullscreen: true,
  };
</script>

<EditorConfig {youtubeOptions}>
  <TextEditor bind:editor={editorInstance} {content} contentprops={{ id: 'video-config-ex' }}>
    <YoutubeButtonGroup editor={editorInstance} />
    <SourceButtonGroup editor={editorInstance} />
  </TextEditor>
</EditorConfig>
