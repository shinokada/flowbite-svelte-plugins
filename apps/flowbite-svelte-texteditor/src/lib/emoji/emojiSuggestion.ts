import { mount, unmount } from 'svelte';
import tippy, { type Instance as TippyInstance } from 'tippy.js';
import type { Editor } from '@tiptap/core';
import type {
  SuggestionOptions,
  SuggestionProps as TipTapSuggestionProps,
  SuggestionKeyDownProps,
} from '@tiptap/suggestion';
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

    if (!cleanQuery) {
      return editor.storage.emoji.emojis.slice(0, 5);
    }

    const filtered = editor.storage.emoji.emojis.filter((item: EmojiItem) => {
      return (
        item.shortcodes.some((shortcode: string) => shortcode.toLowerCase().startsWith(cleanQuery)) ||
        item.tags?.some((tag: string) => tag.toLowerCase().startsWith(cleanQuery))
      );
    });

    return filtered.slice(0, 5);
  },

  render: () => {
    let component: any;
    let popup: TippyInstance;
    let element: HTMLElement;

    const createWrappedCommand = (props: TipTapSuggestionProps) => (args: { name: string }) => {
      const emojiItem = props.items.find((item: EmojiItem) => item.name === args.name);
      if (emojiItem) {
        props.command({
          name: args.name,
          emoji: emojiItem.emoji || emojiItem.fallbackImage || '😶'
        });
      }
    };

    const mountComponent = (props: TipTapSuggestionProps) => {
      if (component) {
        unmount(component);
      }
      
      component = mount(EmojiList, {
        target: element,
        props: {
          items: props.items,
          command: createWrappedCommand(props),
          editor: props.editor,
        },
      });
    };

    return {
      onStart: (props: TipTapSuggestionProps) => {
        element = document.createElement('div');
        mountComponent(props);

        popup = tippy(element, {
          getReferenceClientRect: () => props.clientRect?.() ?? new DOMRect(0, 0, 0, 0),
          appendTo: () => props.editor.view.dom.ownerDocument.body,
          content: element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate: (props: TipTapSuggestionProps) => {
        if (component?.updateItems) {
          component.updateItems(props.items);
          component.updateCommand?.(createWrappedCommand(props));
        } else {
          mountComponent(props);
        }

        popup.setProps({
          getReferenceClientRect: () => props.clientRect?.() ?? new DOMRect(0, 0, 0, 0),
        });
      },

      onKeyDown: (props: SuggestionKeyDownProps): boolean => {
        if (props.event.key === 'Escape') {
          popup.hide();
          return true;
        }

        return component?.onKeyDown?.(props) ?? false;
      },

      onExit: () => {
        popup?.destroy();
        if (component) {
          unmount(component);
        }
      },
    };
  },
} satisfies Omit<SuggestionOptions<EmojiItem, any>, 'editor'>;