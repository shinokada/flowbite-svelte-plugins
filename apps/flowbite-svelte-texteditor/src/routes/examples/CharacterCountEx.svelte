<script lang="ts">
  import { CharacterCount, UndoRedoButtonGroup, TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';

  let editorInstance = $state<Editor | null>(null);

  const content = `<p>
    Let‘s make sure people can’t write more than 280 characters. I bet you could build one of the biggest social networks on that idea.
  </p>`;
</script>

<TextEditor bind:editor={editorInstance} {content} contentprops={{id:'character-count-ex'}}>
  <UndoRedoButtonGroup editor={editorInstance} />
  {#snippet footer()}
    {#if editorInstance}
      <CharacterCount editor={editorInstance} limit={280} />
    {/if}
  {/snippet}
</TextEditor>
