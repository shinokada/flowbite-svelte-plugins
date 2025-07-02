<script lang="ts">
  import { AlignmentButton, EmojiList } from '$lib';
  import { TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';

  let editorInstance = $state<Editor | null>(null);

  const content = '<p>My content...</p>';
</script>

<TextEditor bind:editor={editorInstance} {content} emoji={true} class="mb-96" contentprops={{id:'custom-ex'}}>
  <AlignmentButton editor={editorInstance} alignment="left" />
</TextEditor>
