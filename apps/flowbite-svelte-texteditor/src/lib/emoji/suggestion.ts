import type { SuggestionOptions } from '@tiptap/suggestion';
import { SvelteRenderer } from '@tiptap/svelte';
import tippy, { type Instance as TippyInstance } from 'tippy.js';
import EmojiList from './EmojiList.svelte';

interface GitHubEmoji {
  name: string;
  fallbackImage?: string;
  url?: string;
}

interface EmojiSuggestionProps {
  editor: any;
  query: string;
  items: GitHubEmoji[];
  command: (item: GitHubEmoji) => void;
  clientRect: () => DOMRect;
}

const suggestion: Omit<SuggestionOptions, 'editor'> = {
  items: ({ editor, query }): GitHubEmoji[] => {
    return editor.storage.emoji.emojis
      .filter((emoji: GitHubEmoji) => {
        // GitHub emojis only have name property, no shortcodes or tags
        return emoji.name.toLowerCase().startsWith(query.toLowerCase());
      })
      .slice(0, 10); // Show up to 10 suggestions
  },

  render: () => {
    let component: SvelteRenderer;
    let popup: TippyInstance[];

    return {
      onStart: (props: EmojiSuggestionProps) => {
        component = new SvelteRenderer(EmojiList, {
          props,
          editor: props.editor,
        });

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
          theme: 'light-border',
          maxWidth: 'none',
        });
      },

      onUpdate(props: EmojiSuggestionProps) {
        component.updateProps(props);

        if (popup && popup[0]) {
          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        }
      },

      onKeyDown(props: { event: KeyboardEvent }) {
        if (props.event.key === 'Escape') {
          if (popup && popup[0]) {
            popup[0].hide();
          }
          if (component) {
            component.destroy();
          }
          return true;
        }

        // Forward other key events to the component
        return component.ref?.onKeyDown?.(props) || false;
      },

      onExit() {
        if (popup && popup[0]) {
          popup[0].destroy();
        }
        if (component) {
          component.destroy();
        }
      },
    };
  },
};

export default suggestion;