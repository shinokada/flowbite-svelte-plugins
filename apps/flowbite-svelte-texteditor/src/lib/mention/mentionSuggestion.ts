import { mount, unmount } from 'svelte';
import tippy, { type Instance as TippyInstance } from 'tippy.js';
import type { SuggestionOptions, SuggestionProps as TipTapSuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion';
import MentionList from './MentionList.svelte';

export const createMentionSuggestion = (mentions: string[]) =>
  ({
    items: ({ query }) => mentions.filter((label) => label.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5),

    render: () => {
      let component: any;
      let popup: TippyInstance;
      let element: HTMLElement;

      const createWrappedCommand = (props: TipTapSuggestionProps) => (label: string) => {
        props.command({ label });
      };

      const mountComponent = (props: TipTapSuggestionProps) => {
        if (component) unmount(component);

        component = mount(MentionList, {
          target: element,
          props: {
            items: props.items,
            command: createWrappedCommand(props)
          }
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
            placement: 'bottom-start'
          });
        },

        onUpdate: (props: TipTapSuggestionProps) => {
          component?.updateItems?.(props.items);
          component?.updateCommand?.(createWrappedCommand(props));

          popup.setProps({
            getReferenceClientRect: () => props.clientRect?.() ?? new DOMRect(0, 0, 0, 0)
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
          if (component) unmount(component);
        }
      };
    }
  }) satisfies Omit<SuggestionOptions<string, any>, 'editor'>;
