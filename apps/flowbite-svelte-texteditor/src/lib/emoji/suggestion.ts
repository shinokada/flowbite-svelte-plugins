import { mount, unmount } from 'svelte';
import tippy, { type Instance as TippyInstance } from 'tippy.js';
import type { Editor } from '@tiptap/core';
import type { SuggestionOptions, SuggestionProps as TipTapSuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion';
import EmojiList from './EmojiList.svelte';

interface EmojiItem {
  name: string;
  emoji?: string;
  shortcodes: string[];
  tags?: string[];
  fallbackImage?: string;
}

interface SuggestionContext {
  editor: Editor;
  query: string;
}

function debugPositioning(editor: Editor) {
  const editorElement = editor.view.dom;
  let current = editorElement.parentElement;

  // console.log('🔍 CSS Debug - Editor element:', editorElement);
  // console.log('🔍 Editor computed style:', {
  //   position: window.getComputedStyle(editorElement).position,
  //   transform: window.getComputedStyle(editorElement).transform,
  //   zoom: window.getComputedStyle(editorElement).zoom
  // });

  // Check all ancestors for positioning contexts
  let level = 0;
  while (current && level < 10) {
    const computedStyle = window.getComputedStyle(current);
    if (computedStyle.position !== 'static' || computedStyle.transform !== 'none' || computedStyle.perspective !== 'none') {
      // console.log(`🔍 Positioned ancestor level ${level}:`, current, {
      //   position: computedStyle.position,
      //   transform: computedStyle.transform,
      //   perspective: computedStyle.perspective,
      //   zIndex: computedStyle.zIndex
      // });
    }
    current = current.parentElement;
    level++;
  }
}

export default {
  items: ({ editor, query }: SuggestionContext): EmojiItem[] => {
    const cleanQuery = query.toLowerCase().trim().replace(/^:|:$/g, '');

    // console.log('🔍 Raw query:', query);
    // console.log('✨ Cleaned query:', cleanQuery);

    if (!cleanQuery) {
      return editor.storage.emoji.emojis.slice(0, 5);
    }

    const filtered = editor.storage.emoji.emojis.filter((item: EmojiItem) => {
      return item.shortcodes.find((shortcode: string) => shortcode.toLowerCase().startsWith(cleanQuery)) || item.tags?.find((tag: string) => tag.toLowerCase().startsWith(cleanQuery));
    });

    // console.log('Matching emoji count:', filtered.length);
    // console.log(
    //   'Matching shortcodes:',
    //   filtered.map((e: EmojiItem) => e.shortcodes[0])
    // );

    return filtered.slice(0, 5);
  },

  render: () => {
    let component: any;
    let popup: TippyInstance[];
    let element: HTMLElement;

    return {
      onStart: (props: TipTapSuggestionProps) => {
        debugPositioning(props.editor);
        element = document.createElement('div');

        // Create a wrapper function that properly handles the replacement
        const wrappedCommand = (args: { name: string }) => {
          // Find the emoji item
          const emojiItem = props.items.find((item: EmojiItem) => item.name === args.name);
          if (emojiItem) {
            // Replace the entire query (including the : prefix) with the emoji
            props.command({
              name: args.name,
              emoji: emojiItem.emoji || emojiItem.fallbackImage || '😶'
            });
          }
        };

        // Mount the component with initial props
        component = mount(EmojiList, {
          target: element,
          props: {
            items: props.items,
            command: wrappedCommand,
            editor: props.editor
          }
        });

        // Get the editor's DOM element for better positioning reference
        const editorElement = props.editor.view.dom;

        popup = [
          tippy(document.body, {
            getReferenceClientRect: () => {
              const rect = props.clientRect?.();
              if (!rect) {
                console.warn('No clientRect available, using fallback');
                return new DOMRect(0, 0, 0, 0);
              }

              const absoluteRect = new DOMRect(rect.left, rect.top, rect.width, rect.height);

              // console.log('📍 Input rect:', rect);
              // console.log('📍 Returning ClientRect:', absoluteRect);

              // Also log viewport and scroll information
              // console.log('📍 Viewport info:', {
              //   scrollX: window.scrollX,
              //   scrollY: window.scrollY,
              //   innerWidth: window.innerWidth,
              //   innerHeight: window.innerHeight
              // });

              return absoluteRect;
            },
            // Append the popup to the body of the document this editor is inside, not the global document
            appendTo: () => props.editor.view.dom.ownerDocument.body,
            content: element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
            popperOptions: {
              strategy: 'fixed',
              modifiers: [
                {
                  name: 'computeStyles',
                  options: {
                    gpuAcceleration: false
                  }
                },
                {
                  name: 'preventOverflow',
                  options: {
                    boundary: 'viewport',
                    padding: 8
                  }
                },
                {
                  name: 'flip',
                  options: {
                    fallbackPlacements: ['top-start', 'bottom-end', 'top-end']
                  }
                },
                // Remove or adjust the offset
                {
                  name: 'offset',
                  options: {
                    offset: [0, 0] // Try with no offset first
                  }
                },
                // Simplified custom positioning
                {
                  name: 'customPositioning',
                  enabled: true,
                  phase: 'write',
                  fn: ({ state }) => {
                    // console.log('🎯 Final computed position:', state.elements.popper.style.transform);
                    const computedStyle = window.getComputedStyle(state.elements.popper);
                    // console.log('🎯 Computed styles:', {
                    //   top: computedStyle.top,
                    //   left: computedStyle.left,
                    //   transform: computedStyle.transform
                    // });
                  }
                }
              ]
            },
            zIndex: 99999,
            arrow: false,
            theme: 'light-border'
          })
        ];
      },

      onUpdate: (props: TipTapSuggestionProps) => {
        // console.log('📝 Updating component with items:', props.items.length);

        // Create wrapped command for updates too
        const wrappedCommand = (args: { name: string }) => {
          const emojiItem = props.items.find((item: EmojiItem) => item.name === args.name);
          if (emojiItem) {
            props.command({
              name: args.name,
              emoji: emojiItem.emoji || emojiItem.fallbackImage || '😶'
            });
          }
        };

        if (component && component.updateItems) {
          component.updateItems(props.items);
          if (component.updateCommand) {
            component.updateCommand(wrappedCommand);
          }
        } else {
          if (component) {
            unmount(component);
          }

          component = mount(EmojiList, {
            target: element,
            props: {
              items: props.items,
              command: wrappedCommand,
              editor: props.editor
            }
          });
        }

        // Update the reference rect with better positioning
        const newRect = props.clientRect?.();
        if (newRect && popup[0]) {
          const editorElement = props.editor.view.dom;
          const editorRect = editorElement.getBoundingClientRect();

          const absoluteRect = new DOMRect(newRect.left, newRect.top, newRect.width, newRect.height);

          // console.log('📍 Updating ClientRect:', absoluteRect);

          popup[0].setProps({
            getReferenceClientRect: () => absoluteRect
          });
        }
      },

      onKeyDown: (props: SuggestionKeyDownProps): boolean => {
        if (props.event.key === 'Escape') {
          popup[0].hide();
          if (component) {
            unmount(component);
          }
          return true;
        }

        // Call the exported onKeyDown function from the component
        if (component && component.onKeyDown) {
          return component.onKeyDown(props);
        }

        return false;
      },

      onExit: () => {
        if (popup && popup[0]) {
          popup[0].destroy();
        }
        if (component) {
          unmount(component);
        }
      }
    };
  }
} satisfies Omit<SuggestionOptions<EmojiItem, any>, 'editor'>;
