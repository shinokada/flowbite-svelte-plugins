<script lang="ts">
  import { UndoRedoButtonGroup, TextEditor, ToolbarRowWrapper, EditorConfig } from '$lib';
  import type { Editor } from '@tiptap/core';
  import type { EmojiOptions } from '@tiptap/extension-emoji';
  import { emojis } from '@tiptap/extension-emoji';

  let editorInstance = $state<Editor | null>(null);
  let editorInstance2 = $state<Editor | null>(null);

  let content = `
        <p>
          These <span data-type="emoji" data-name="smiley"></span>
          are <span data-type="emoji" data-name="fire"></span>
          some <span data-type="emoji" data-name="smiley_cat"></span>
          emojis <span data-type="emoji" data-name="exploding_head"></span>
          rendered <span data-type="emoji" data-name="ghost"></span>
          as <span data-type="emoji" data-name="massage"></span>
          inline <span data-type="emoji" data-name="v"></span>
          nodes.
        </p>
        <p>
          Type <code>:</code> to open the autocomplete.
        </p>
        <p>
          Even <span data-type="emoji" data-name="octocat"></span>
          custom <span data-type="emoji" data-name="trollface"></span>
          emojis <span data-type="emoji" data-name="neckbeard"></span>
          are <span data-type="emoji" data-name="rage1"></span>
          supported.
        </p>
        <p>
          And unsupported emojis (without a fallback image) are rendered as just the shortcode <span data-type="emoji" data-name="this_does_not_exist"></span>.
        </p>
        <pre><code>In code blocks all emojis are rendered as plain text. 👩‍💻👨‍💻</code></pre>
      `;

  const customEmojis = [
    {
      // A unique name of the emoji which will be stored as attribute
      name: 'octocat',
      // A list of unique shortcodes that are used by input rules to find the emoji
      shortcodes: ['octocat'],
      // A list of tags that can help for searching emojis
      tags: ['cat', 'meow'],
      // A name that can help to group emojis
      group: 'My custom group of emojis',
      // The image to be rendered
      fallbackImage: 'https://github.githubassets.com/images/icons/emoji/octocat.png'
    }
  ];
  const emojiOptions: Partial<EmojiOptions> = {
    emojis: [...emojis, ...customEmojis],
    HTMLAttributes: {
      class: 'my-custom-class'
    }
  };
</script>

<TextEditor bind:editor={editorInstance} {content} contentprops={{ id: 'emoji-ex' }}>
  <ToolbarRowWrapper>
    <UndoRedoButtonGroup editor={editorInstance} />
  </ToolbarRowWrapper>
</TextEditor>

<EditorConfig {emojiOptions}>
  <TextEditor bind:editor={editorInstance2} {content} contentprops={{ id: 'emoji-ex' }}>
    <ToolbarRowWrapper>
      <UndoRedoButtonGroup editor={editorInstance2} />
    </ToolbarRowWrapper>
  </TextEditor>
</EditorConfig>
