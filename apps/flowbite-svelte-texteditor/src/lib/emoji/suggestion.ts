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

export default {
  items: ({ editor, query }: SuggestionContext): EmojiItem[] => {
    const cleanQuery = query.toLowerCase().trim().replace(/^:|:$/g, '');

    console.log('🔍 Raw query:', query);
    console.log('✨ Cleaned query:', cleanQuery);

    if (!cleanQuery) {
      return editor.storage.emoji.emojis.slice(0, 5);
    }

    const filtered = editor.storage.emoji.emojis.filter((item: EmojiItem) => {
      return item.shortcodes.find((shortcode: string) => shortcode.toLowerCase().startsWith(cleanQuery)) || item.tags?.find((tag: string) => tag.toLowerCase().startsWith(cleanQuery));
    });

    console.log('Matching emoji count:', filtered.length);
    console.log(
      'Matching shortcodes:',
      filtered.map((e: EmojiItem) => e.shortcodes[0])
    );

    return filtered.slice(0, 5);
  },

  render: () => {
    let component: any;
    let popup: TippyInstance[];
    let element: HTMLElement;

    return {
      onStart: (props: TipTapSuggestionProps) => {
        element = document.createElement('div');

        // Mount the component with initial props
        component = mount(EmojiList, {
          target: element,
          props: {
            items: props.items,
            command: props.command,
            editor: props.editor
          }
        });

        popup = [
          tippy(element, {
            getReferenceClientRect: () => {
              const rect = props.clientRect?.();
              return rect ?? new DOMRect(0, 0, 0, 0);
            },
            appendTo: () => document.body,
            content: element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start'
          })
        ];
      },

      onUpdate: (props: TipTapSuggestionProps) => {
        console.log('📝 Updating component with items:', props.items.length);

        // In Svelte 5, we need to recreate the component or use exported functions
        // Let's try calling the exported updateItems function
        if (component && component.updateItems) {
          component.updateItems(props.items);
        } else {
          // Fallback: recreate the component
          if (component) {
            unmount(component);
          }

          component = mount(EmojiList, {
            target: element,
            props: {
              items: props.items,
              command: props.command,
              editor: props.editor
            }
          });
        }

        popup[0].setProps({
          getReferenceClientRect: () => props.clientRect?.() ?? new DOMRect(0, 0, 0, 0)
        });
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
        popup[0].destroy();
        if (component) {
          unmount(component);
        }
      }
    };
  }
} satisfies Omit<SuggestionOptions<EmojiItem, any>, 'editor'>;
