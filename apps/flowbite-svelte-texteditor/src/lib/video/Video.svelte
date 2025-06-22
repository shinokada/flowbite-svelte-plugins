<script lang="ts">
  import { type VideoProps, VideoButton, generateButtonId } from '$lib';

  let { editor, tooltipText = "Add video", ariaLabel = "Add video", id, class: className }: VideoProps = $props();

  const uniqueId = id ?? generateButtonId('Video');
  
</script>

<VideoButton {editor} format="default" {tooltipText} buttonId={uniqueId} {ariaLabel} class={className} />
