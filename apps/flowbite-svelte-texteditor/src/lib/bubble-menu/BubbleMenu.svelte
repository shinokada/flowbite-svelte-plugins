<script>
  import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu'
  import { onMount, onDestroy } from 'svelte'
  import { runFormatCommand } from '$lib'

  // Props using runes - matching the beta plugin API
  let {
    pluginKey = 'bubbleMenu',
    editor = $bindable(),
    updateDelay = 250,
    resizeDelay = 250,
    shouldShow = null,
    options = {},
    showUnderline = true, 
    showHighlight = true, 
    showBold = true, 
    showItalic = true, 
    showStrike = true,
    // Allow parent to control initialization
    autoSetup = true,
    ...restProps
  } = $props()

  let isBoldActive = $state(false);
  let isItalicActive = $state(false);
  let isStrikeActive = $state(false);
  let isUnderlineActive = $state(false);
  let isHighlightActive = $state(false);
  let menuElement = $state()
  let plugin = $state()
  let isPluginRegistered = $state(false)

  // Default shouldShow function
  const defaultShouldShow = ({ editor, view, state, from, to }) => {
    const { selection } = state
    const { empty } = selection

    // Don't show if selection is empty
    if (empty) return false

    // Don't show if editor is not editable
    if (!view.editable) return false

    // Only show for text selections
    return from !== to
  }

  // Setup function that can be called internally or from parent
  export function setup() {
    if (!menuElement || !editor || isPluginRegistered || editor?.isDestroyed) {
      return false
    }

    try {
      // Create and register the plugin
      plugin = BubbleMenuPlugin({
        pluginKey,
        editor,
        element: menuElement,
        updateDelay,
        resizeDelay,
        shouldShow: shouldShow || defaultShouldShow,
        options: {
          placement: 'top',
          flip: true,
          shift: true,
          ...options
        },
      })

      editor.registerPlugin(plugin)
      isPluginRegistered = true

      // Set up event listeners for state updates
      setupEventListeners()
      
      return true
    } catch (error) {
      console.error('Error setting up bubble menu:', error)
      return false
    }
  }

  // Cleanup function that can be called internally or from parent
  export function cleanup() {
    if (editor && !editor.isDestroyed && isPluginRegistered) {
      try {
        // Remove event listeners first
        editor.off('selectionUpdate', updateStates)
        editor.off('transaction', updateStates)
        
        // Then unregister plugin
        editor.unregisterPlugin(pluginKey)
        isPluginRegistered = false
        return true
      } catch (error) {
        console.error('Error cleaning up bubble menu:', error)
        return false
      }
    }
    return false
  }

  function setupEventListeners() {
    if (!editor) return

    // Update states on selection change
    editor.on('selectionUpdate', updateStates)
    editor.on('transaction', updateStates)
    
    // Initial state update
    updateStates()
  }

  function updateStates() {
    if (editor?.isDestroyed) return
    
    try {
      isBoldActive = editor.isActive('bold')
      isItalicActive = editor.isActive('italic')
      isStrikeActive = editor.isActive('strike')
      isUnderlineActive = editor.isActive('underline')
      isHighlightActive = editor.isActive('highlight')
    } catch (error) {
      console.error('Error updating states:', error)
    }
  }

  // Auto-setup if enabled
  $effect(() => {
    if (autoSetup && editor && menuElement && !isPluginRegistered) {
      setup()
    }
  })

  // Cleanup when editor changes or component unmounts
  $effect(() => {
    return () => {
      if (isPluginRegistered) {
        cleanup()
      }
    }
  })

  onDestroy(() => {
    cleanup()
  })
</script>

<div 
  bind:this={menuElement}
  class="bubble-menu-wrapper"
  style="position: absolute; z-index: 50; visibility: hidden;"
  {...restProps}
>
  <div class="bubble-menu">
    {#if showBold}
      <button onclick={() => runFormatCommand(editor, 'bold')} class:is-active={isBoldActive}>
        Bold
      </button>
    {/if}
    {#if showItalic}
      <button onclick={() => runFormatCommand(editor, 'italic')} class:is-active={isItalicActive}>
        Italic
      </button>
    {/if}
    {#if showStrike}
      <button onclick={() => runFormatCommand(editor, 'strike')} class:is-active={isStrikeActive}>
        Strike
      </button>
    {/if}
    {#if showUnderline}
      <button onclick={() => runFormatCommand(editor, 'underline')} class:is-active={isUnderlineActive}>
        Underline
      </button>
    {/if}
    {#if showHighlight}
      <button onclick={() => runFormatCommand(editor, 'highlight')} class:is-active={isHighlightActive}>
        Highlight
      </button>
    {/if}
  </div>
</div>