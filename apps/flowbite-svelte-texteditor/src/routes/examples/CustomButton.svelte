<script lang="ts">
  import { AlignmentButton } from '$lib';
  import { TextEditor } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { Heading } from 'flowbite-svelte';

  let editorInstance = $state<Editor | null>(null);

  const content = '<p>My content...</p>';
</script>

<Heading tag="h1" class="my-8">Custom</Heading>

<TextEditor bind:editor={editorInstance} {content} emoji={true} class="mb-96" contentprops={{ id: 'custom-ex' }}>
  <AlignmentButton editor={editorInstance} alignment="left" />
</TextEditor>
