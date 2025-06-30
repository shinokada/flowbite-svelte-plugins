<script lang="ts">
  import { onMount, onDestroy, type Snippet } from 'svelte';
  import type { Editor } from '@tiptap/core';
  import type { Node } from '@tiptap/pm/model';
  import { DragHandlePlugin, dragHandlePluginDefaultKey, type DragHandlePluginProps } from '@tiptap/extension-drag-handle';
  import type { ComputePositionConfig } from '@floating-ui/dom';

  type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

  type DragHandleProps = Omit<Optional<DragHandlePluginProps, 'pluginKey'>, 'element'> & {
    class?: string;
    onNodeChange?: (data: { node: Node | null; editor: Editor; pos: number }) => void;
    children?: Snippet;
  };

  let { children, editor, class: className = '', pluginKey = dragHandlePluginDefaultKey, onNodeChange }: DragHandleProps = $props();

  let dragElement: HTMLDivElement;
  let pluginInstance: any = null;
  let currentNode = $state<Node | null>(null);
  let currentPos = $state<number>(-1);

  // Default drag handle appearance - remove fixed positioning, let plugin handle it
  const defaultClass = 'transition-opacity cursor-grab active:cursor-grabbing bg-gray-300 hover:bg-gray-400 rounded border border-gray-400 w-6 h-6 flex items-center justify-center shadow-sm';

  onMount(() => {
    console.log('DragHandle onMount - Editor:', editor);
    console.log('DragHandle onMount - Drag element:', dragElement);
    console.log('DragHandle onMount - Editor editable:', editor?.isEditable);
    console.log('DragHandle onMount - Editor view:', editor?.view);

    if (!editor || !dragElement) {
      console.warn('DragHandle onMount - Missing editor or dragElement');
      return;
    }

    // Wait for editor to be ready
    if (!editor.view) {
      console.log('DragHandle onMount - Editor view not ready, waiting...');
      setTimeout(() => {
        if (editor.view) {
          initializePlugin();
        } else {
          console.warn('DragHandle onMount - Editor view still not ready after delay');
        }
      }, 100);
      return;
    }

    initializePlugin();
  });

  function initializePlugin() {
    try {
      console.log('DragHandle - Initializing plugin...');
      console.log('DragHandle - Drag element parent:', dragElement.parentElement);
      console.log('DragHandle - Drag element in DOM:', document.contains(dragElement));

      // DON'T manually append to body - let the plugin handle DOM positioning

      pluginInstance = DragHandlePlugin({
        pluginKey,
        editor,
        element: dragElement,
        onNodeChange: (data) => {
          console.log('DragHandle - Node change:', data);
          console.log('DragHandle - Node type:', data.node?.type?.name);
          console.log('DragHandle - Position:', data.pos);

          currentNode = data.node;
          currentPos = data.pos;
          onNodeChange?.(data);

          // Log final state
          console.log('DragHandle - Element in DOM after update:', document.contains(dragElement));
        }
      });

      console.log('DragHandle - Plugin instance created:', pluginInstance);

      // Handle different plugin return structures
      let actualPlugin;
      let unbindFn;

      if (pluginInstance && typeof pluginInstance === 'object') {
        if ('plugin' in pluginInstance && 'unbind' in pluginInstance) {
          actualPlugin = pluginInstance.plugin;
          unbindFn = pluginInstance.unbind;
          console.log('DragHandle - Using wrapped plugin structure');
        } else if (pluginInstance.key && pluginInstance.spec) {
          actualPlugin = pluginInstance;
          unbindFn = null;
          console.log('DragHandle - Plugin returned directly');
        } else {
          console.error('DragHandle - Unexpected plugin structure:', pluginInstance);
          return;
        }
      } else {
        console.error('DragHandle - Invalid plugin instance:', pluginInstance);
        return;
      }

      if (actualPlugin) {
        console.log('DragHandle - Registering plugin:', actualPlugin);
        editor.registerPlugin(actualPlugin);
        console.log('DragHandle - Plugin registered successfully');

        pluginInstance = {
          plugin: actualPlugin,
          unbind: unbindFn
        };
      } else {
        console.error('DragHandle - No valid plugin to register');
      }
    } catch (error) {
      console.error('DragHandle - Error initializing plugin:', error);
    }
  }

  onDestroy(() => {
    console.log('DragHandle onDestroy - Cleaning up');

    if (pluginInstance) {
      if (pluginInstance.unbind) {
        console.log('DragHandle onDestroy - Calling unbind');
        try {
          pluginInstance.unbind();
        } catch (error) {
          console.warn('DragHandle onDestroy - Error during unbind:', error);
        }
      }

      if (pluginInstance.plugin && editor) {
        console.log('DragHandle onDestroy - Unregistering plugin');
        try {
          editor.unregisterPlugin(pluginKey);
        } catch (error) {
          console.warn('DragHandle onDestroy - Error unregistering plugin:', error);
        }
      }
    }
  });

  export function getCurrentNode() {
    return currentNode;
  }

  export function getCurrentPosition() {
    return currentPos;
  }
</script>

<!-- Remove the fixed positioning and manual styles - let the plugin handle positioning -->
<div bind:this={dragElement} class="drag-handle" aria-label="Drag to move content">⋮⋮</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
DragHandleProps
## Props
@prop children
@prop editor
@prop class: className = ''
@prop pluginKey = dragHandlePluginDefaultKey
@prop onNodeChange
-->
