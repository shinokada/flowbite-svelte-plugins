import { mount, unmount } from 'svelte';
import type { Editor } from '@tiptap/core';
import type { SuggestionOptions, SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion';
import EmojiList from './EmojiList.svelte';

interface EmojiItem {
  name: string;
  emoji?: string;
  shortcodes: string[];
  tags?: string[];
  fallbackImage?: string;
}

export default {
  items: ({ editor, query }: { editor: Editor; query: string }): EmojiItem[] => {
    const cleanQuery = query.toLowerCase().trim().replace(/^:|:$/g, '');

    // Type assertion to access emoji storage
    const emojiStorage = (editor.storage as any).emoji;

    if (!emojiStorage?.emojis) {
      return [];
    }

    if (!cleanQuery) {
      return emojiStorage.emojis.slice(0, 5);
    }

    const filtered = emojiStorage.emojis.filter((item: EmojiItem) => {
      return item.shortcodes.some((shortcode: string) => shortcode.toLowerCase().startsWith(cleanQuery)) || item.tags?.some((tag: string) => tag.toLowerCase().startsWith(cleanQuery));
    });

    return filtered.slice(0, 5);
  },

  render: () => {
    let component: any;
    let element: HTMLElement;

    const createWrappedCommand = (props: SuggestionProps<EmojiItem>) => (args: { name: string }) => {
      const emojiItem = props.items.find((item: EmojiItem) => item.name === args.name);
      if (emojiItem) {
        props.command({
          name: args.name,
          emoji: emojiItem.emoji || emojiItem.fallbackImage || '😶'
        });
      }
    };

    const mountComponent = (props: SuggestionProps<EmojiItem>) => {
      if (component) {
        unmount(component);
      }

      component = mount(EmojiList, {
        target: element,
        props: {
          items: props.items,
          command: createWrappedCommand(props),
          editor: props.editor
        }
      });
    };

    const positionElement = (props: SuggestionProps<EmojiItem>) => {
      const rect = props.clientRect?.();
      if (rect && element) {
        element.style.position = 'absolute';
        element.style.top = `${rect.bottom + window.scrollY}px`;
        element.style.left = `${rect.left + window.scrollX}px`;
        element.style.zIndex = '1000';
      }
    };

    return {
      onStart: (props: SuggestionProps<EmojiItem>) => {
        element = document.createElement('div');
        element.className = 'emoji-suggestion-popup';

        mountComponent(props);

        // Append to body and position
        document.body.appendChild(element);
        positionElement(props);
      },

      onUpdate: (props: SuggestionProps<EmojiItem>) => {
        if (component?.updateItems) {
          component.updateItems(props.items);
          component.updateCommand?.(createWrappedCommand(props));
        } else {
          mountComponent(props);
        }

        positionElement(props);
      },

      onKeyDown: (props: SuggestionKeyDownProps): boolean => {
        if (props.event.key === 'Escape') {
          return true;
        }

        return component?.onKeyDown?.(props) ?? false;
      },

      onExit: () => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
        if (component) {
          unmount(component);
        }
      }
    };
  }
} satisfies Omit<SuggestionOptions<EmojiItem, any>, 'editor'>;
