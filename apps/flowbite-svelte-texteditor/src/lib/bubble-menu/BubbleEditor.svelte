<script lang="ts">
  import { onDestroy, type Snippet } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import TextAlign from '@tiptap/extension-text-align';
  import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
  import BubbleMenu from './BubbleMenu.svelte';
  import {SvelteRenderer, EditorWrapper, ToolbarWrapper, ContentWrapper, cn } from '$lib';

  interface BubbleEditorProps {
    element?: HTMLDivElement | null;
    children?: Snippet;
    editor:Editor | null;
    content: string;
    editorClass?: string;
    class?: string;
  }
  let { element = $bindable(null), children, content = '<p>Start typing...</p>', editor = $bindable(), editorClass = 'prose focus:outline-none max-w-none', class:className }: BubbleEditorProps = $props();
  
   // internal state
  let editorElement = $state<HTMLDivElement | null>(null);
  let bubbleElement: HTMLDivElement | null = null;
  let bubbleMenuRenderer: SvelteRenderer | null = null;

  $effect(() => {
    if (!editorElement || editor) return;

    editor = new Editor({
      element: editorElement,
      extensions: [
        StarterKit,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ],
      content,
      editorProps: {
        attributes: {
          class: editorClass
        }
      }
    });

      bubbleElement = document.createElement('div');
      document.body.appendChild(bubbleElement);

      const plugin = BubbleMenuPlugin({
        editor,
        element: bubbleElement,
        pluginKey: 'bubbleMenu',
        tippyOptions: {
          duration: 150,
          theme: 'light'
        }
      });

      editor.registerPlugin(plugin);

      bubbleMenuRenderer = new SvelteRenderer(BubbleMenu, {
        target: bubbleElement,
        props: { editor }
      });
    
  });

  onDestroy(() => {
    editor?.destroy();
    bubbleMenuRenderer?.destroy();
    bubbleElement?.remove();
  });
</script>


<EditorWrapper class={cn(className)}>
  {#if children && editor}
    <ToolbarWrapper>
      {@render children()}
    </ToolbarWrapper>
  {/if}

  <!-- Editor container -->
  <ContentWrapper>
    <div bind:this={editorElement}></div>
  </ContentWrapper>
</EditorWrapper>


