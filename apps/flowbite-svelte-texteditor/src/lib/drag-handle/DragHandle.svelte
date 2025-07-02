<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Node } from '@tiptap/pm/model';
  import type { Editor } from '@tiptap/core';
  import { type DragHandleProps } from '$lib';
  import { DragHandlePlugin, dragHandlePluginDefaultKey } from '@tiptap/extension-drag-handle';

  // Accept editor and draghandleprops as separate props
  let { editor, draghandleprops = {} }: { 
    editor: Editor | null, 
    draghandleprops?: Omit<DragHandleProps, 'editor'> 
  } = $props();

  // Extract individual props from draghandleprops with defaults
  const { 
    class: className = '', 
    pluginKey = dragHandlePluginDefaultKey, 
    onNodeChange,
    ariaLabel = 'Drag to move content',
    ...restProps 
  } = draghandleprops;

  let dragElement: HTMLDivElement;
  let pluginInstance: any = null;
  let currentNode = $state<Node | null>(null);
  let currentPos = $state<number>(-1);

  const defaultClass = 'transition-opacity cursor-grab active:cursor-grabbing bg-gray-300 hover:bg-gray-400 rounded border border-gray-400 w-6 h-6 flex items-center justify-center shadow-sm';

  onMount(() => {
    $inspect('DragHandle onMount - Editor:', editor);
    $inspect('DragHandle onMount - Drag element:', dragElement);
    $inspect('DragHandle onMount - Editor editable:', editor?.isEditable);
    $inspect('DragHandle onMount - Editor view:', editor?.view);

    if (!editor || !dragElement) {
      console.warn('DragHandle onMount - Missing editor or dragElement');
      return;
    }

    if (!editor.view) {
      $inspect('DragHandle onMount - Editor view not ready, waiting...');
      setTimeout(() => {
        if (editor && editor.view) {
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
    if (!editor) {
      console.warn('DragHandle - Editor is null, cannot initialize plugin');
      return;
    }

    try {
      $inspect('DragHandle - Initializing plugin...');
      $inspect('DragHandle - Drag element parent:', dragElement.parentElement);
      $inspect('DragHandle - Drag element in DOM:', document.contains(dragElement));

      pluginInstance = DragHandlePlugin({
        pluginKey,
        editor, 
        element: dragElement,
        onNodeChange: (data) => {
          // console.log('DragHandle - Node change:', data);
          // console.log('DragHandle - Node type:', data.node?.type?.name);
          // console.log('DragHandle - Position:', data.pos);

          currentNode = data.node;
          currentPos = data.pos;
          onNodeChange?.(data);

          // Log final state
          // console.log('DragHandle - Element in DOM after update:', document.contains(dragElement));
        }
      });

      // console.log('DragHandle - Plugin instance created:', pluginInstance);

      let actualPlugin;
      let unbindFn;

      if (pluginInstance && typeof pluginInstance === 'object') {
        if ('plugin' in pluginInstance && 'unbind' in pluginInstance) {
          actualPlugin = pluginInstance.plugin;
          unbindFn = pluginInstance.unbind;
          // console.log('DragHandle - Using wrapped plugin structure');
        } else if (pluginInstance.key && pluginInstance.spec) {
          actualPlugin = pluginInstance;
          unbindFn = null;
          // console.log('DragHandle - Plugin returned directly');
        } else {
          // console.error('DragHandle - Unexpected plugin structure:', pluginInstance);
          return;
        }
      } else {
        // console.error('DragHandle - Invalid plugin instance:', pluginInstance);
        return;
      }

      if (actualPlugin) {
        // console.log('DragHandle - Registering plugin:', actualPlugin);
        editor.registerPlugin(actualPlugin);
        // console.log('DragHandle - Plugin registered successfully');

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
    // console.log('DragHandle onDestroy - Cleaning up');

    if (pluginInstance) {
      if (pluginInstance.unbind) {
        // console.log('DragHandle onDestroy - Calling unbind');
        try {
          pluginInstance.unbind();
        } catch (error) {
          console.warn('DragHandle onDestroy - Error during unbind:', error);
        }
      }

      if (pluginInstance.plugin && editor) {
        // console.log('DragHandle onDestroy - Unregistering plugin');
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

<div bind:this={dragElement} class="drag-handle {className}" aria-label={ariaLabel} {...restProps}>⋮⋮</div>