<script lang="ts">
  import { type VideoProps, VideoButton, generateButtonId } from '$lib';

  let { editor, tooltipText = 'Add video', ariaLabel = 'Add video', id, class: className }: VideoProps = $props();

  const uniqueId = id ?? generateButtonId('Video');
</script>

<VideoButton {editor} format="default" {tooltipText} buttonId={uniqueId} {ariaLabel} class={className} />

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[VideoProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L90)
## Props
@prop editor
@prop tooltipText = 'Add video'
@prop ariaLabel = 'Add video'
@prop id
@prop class: className
-->
