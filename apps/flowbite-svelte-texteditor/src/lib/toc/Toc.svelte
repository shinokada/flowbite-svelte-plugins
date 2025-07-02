<script lang="ts">
  import { tocItems } from '$lib/TextEditor.svelte';
  import { TextSelection } from '@tiptap/pm/state';
  import type { Editor } from '@tiptap/core';

  let { editor }: { editor: Editor } = $props();

  let items = $derived($tocItems);
</script>

{#if items.length === 0}
  <p class="select-none text-gray-500">Start editing to see a table of contents …</p>
{:else}
  <div class="sidebar">
    <div class="sidebar-options">
      <div class="label-large">Table of contents</div>
      <div class="table-of-contents">
        {#each items as item (item.id)}
          <div
            class={`
          ${item.isActive && !item.isScrolledOver ? 'is-active' : ''}
          ${item.isScrolledOver ? 'is-scrolled-over' : ''}`}
            style={`--level: ${item.level};`}
          >
            <a
              href={`#${item.id}`}
              data-item-index={item.itemIndex}
              onclick={(e) => {
                e.preventDefault();
                const el = editor.view.dom.querySelector(`[data-toc-id="${item.id}"]`);
                if (!el) return;
                const pos = editor.view.posAtDOM(el, 0);
                const tr = editor.state.tr.setSelection(new TextSelection(editor.state.doc.resolve(pos)));
                editor.view.dispatch(tr);
                editor.view.focus();
                history.pushState(null, '', `#${item.id}`);
                window.scrollTo({
                  top: el.getBoundingClientRect().top + window.scrollY,
                  behavior: 'smooth'
                });
              }}
            >
              {item.textContent}
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
