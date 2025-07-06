<script lang="ts">
  import { SourceButtonGroup, ImageButtonGroup, TextEditor, EditorConfig } from '$lib';
  import type { Editor } from '@tiptap/core';
  import type { ImageOptions } from '@tiptap/extension-image';

  let editorInstance = $state<Editor | null>(null);
  let editorInstance2 = $state<Editor | null>(null);

  const content = `<p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://placehold.co/300x150" />
        <img src="https://placehold.co/300x150/6A00F5/white" />
        `;

  const imageOptions: Partial<ImageOptions> = {
    // inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: 'my-custom-class',
    },
  }
</script>

<h2 class="text-2xl dark:text-white">Without Config</h2>
<TextEditor bind:editor={editorInstance} {content} contentprops={{ id: 'image-ex1' }}>
  <ImageButtonGroup editor={editorInstance} />
  <SourceButtonGroup editor={editorInstance} />
</TextEditor>

<h2 class="text-2xl my-8 dark:text-white">With Config</h2>

Since using inline:true, images are wrapped inside a p-tag.
Try to add <pre class="my-4 rounded-lg p-4 bg-gray-300 font-mono text-sm text-gray-800 overflow-x-auto"><code>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAA20lEQVR4nOzRoU5CcRiGcY/7z+hmsarJ2QzmkyxmZ7GYvAMugECgspEoNLgDEo0xAndAZsDYuAJg4xre9HC255ffLzz7ytfH001iWbWj/frzNdrP/9+j/W20vkIG0AygGUAzgGYAzQCaAbTSfTxEB/vefbTvn2bR/mVcR/vGf8AAmgE0A2gG0AygGUAzgFZ+jm/RwXbwEO1X0+dov/v7jfaN/4ABNANoBtAMoBlAM4BmAK2qFyU62Hx3ov15NIz2k7tWtG/8BwygGUAzgGYAzQCaATQDaJcAAAD//yyIGB6lDf1uAAAAAElFTkSuQmCC</code></pre>

<EditorConfig {imageOptions}>
  <TextEditor bind:editor={editorInstance2} {content} contentprops={{ id: 'image-ex2' }}>
    <ImageButtonGroup editor={editorInstance2} />
    <SourceButtonGroup editor={editorInstance2} />
  </TextEditor>
</EditorConfig>
