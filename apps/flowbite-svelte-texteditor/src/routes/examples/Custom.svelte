<script lang="ts">
  import { AlignmentButton, EmojiList } from '$lib';
  import { TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';

  let editorElement = $state<HTMLDivElement | null>(null);
  let editorInstance = $state<Editor | null>(null);

  const content = '<p>My content...</p>';
</script>

<TextEditor bind:element={editorElement} bind:editor={editorInstance} {content} emoji={true} class="mb-96">
  <AlignmentButton editor={editorInstance} alignment="left" />
</TextEditor>
