import { mount, unmount } from 'svelte';
import type { SuggestionOptions, SuggestionProps as TipTapSuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion';
import MentionList from './MentionList.svelte';

export const createMentionSuggestion = (mentions: string[]) =>
  ({
    items: ({ query }) => mentions.filter((label) => label.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5),

    render: () => {
      let component: any;
      let popup: HTMLElement;

      const createWrappedCommand = (props: TipTapSuggestionProps) => (label: string) => {
        props.command({ label });
      };

      const mountComponent = (props: TipTapSuggestionProps) => {
        if (component) unmount(component);

        component = mount(MentionList, {
          target: popup,
          props: {
            items: props.items,
            command: createWrappedCommand(props)
          }
        });
      };

      const positionPopup = (props: TipTapSuggestionProps) => {
        const rect = props.clientRect?.();
        if (rect && popup) {
          popup.style.position = 'absolute';
          popup.style.top = `${rect.bottom + window.scrollY}px`;
          popup.style.left = `${rect.left + window.scrollX}px`;
          popup.style.zIndex = '1000';
          popup.style.backgroundColor = 'white';
          popup.style.border = '1px solid #ccc';
          popup.style.borderRadius = '4px';
          popup.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
      };

      return {
        onStart: (props: TipTapSuggestionProps) => {
          popup = document.createElement('div');
          popup.className = 'mention-suggestion-popup';
          document.body.appendChild(popup);
          
          mountComponent(props);
          positionPopup(props);
        },

        onUpdate: (props: TipTapSuggestionProps) => {
          if (component) {
            component.updateItems?.(props.items);
            component.updateCommand?.(createWrappedCommand(props));
          }
          positionPopup(props);
        },

        onKeyDown: (props: SuggestionKeyDownProps): boolean => {
          if (props.event.key === 'Escape') {
            return true;
          }

          return component?.onKeyDown?.(props) ?? false;
        },

        onExit: () => {
          if (popup && popup.parentNode) {
            popup.parentNode.removeChild(popup);
          }
          if (component) {
            unmount(component);
          }
        }
      };
    }
  }) satisfies Omit<SuggestionOptions<string, any>, 'editor'>;