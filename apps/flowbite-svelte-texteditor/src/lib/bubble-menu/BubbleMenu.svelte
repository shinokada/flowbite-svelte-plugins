<script lang="ts">
  import type { Editor } from '@tiptap/core';
  export let editor: Editor;
</script>

<div class="rounded bg-white dark:bg-gray-800 shadow p-1 border flex gap-1 text-sm">
  <button onclick={() => editor.chain().focus().toggleBold().run()} class:active={editor.isActive('bold')}>
    <strong>B</strong>
  </button>
  <button onclick={() => editor.chain().focus().toggleItalic().run()} class:active={editor.isActive('italic')}>
    <em>I</em>
  </button>
  <button onclick={() => editor.chain().focus().toggleStrike().run()} class:active={editor.isActive('strike')}>
    <s>S</s>
  </button>
</div>

<style>
  button {
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }
  .active {
    background-color: #ddd;
  }
</style>
