<!-- EditorConfig.svelte -->
<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import type { EditorExtensionConfigs } from '$lib';

  let {
    children,
    blockquoteOptions,
    bulletListOptions,
    codeBlockLowlightOptions,
    detailsOptions,
    detailsContentOptions,
    detailsSummaryOptions,
    emojiOptions,
    hardBreakOptions,
    headingOptions,
    horizontalRuleOptions,
    imageOptions,
    listItemOptions,
    mathematicsOptions,
    mentionOptions,
    orderedListOptions,
    paragraphOptions,
    tableKitOptions,
    taskListOptions,
    taskItemOptions,
    youtubeOptions,
    // marks
    boldOptions,
    codeOptions,
    highlightOptions,
    italicOptions,
    linkOptions,
    strikeOptions,
    subscriptOptions,
    superscriptOptions,
    underlineOptions,
    // functionality
    bubbleMenuOptions,
    characterCountOptions,
    backgroundColorOptions,
    colorOptions,
    dragHandleOptions,
    dropcursorOptions,
    fileHandlerOptions,
    floatingMenuOptions,
    focusOptions,
    fontFamilyOptions,
    fontSizeOptions,
    invisibleCharactersOptions,
    lineHeightOptions,
    listKeymapOptions,
    placeholderOptions,
    selectionOptions,
    tableOfContentsOptions,
    textStyleKitOptions,
    textAlignOptions,
    trailingNodeOptions,
    typographyOptions,
    undoRedoOptions
  }: { children: Snippet } & EditorExtensionConfigs = $props();

  const extensionConfigs: EditorExtensionConfigs = {
    blockquoteOptions,
    bulletListOptions,
    codeBlockLowlightOptions,
    detailsOptions,
    detailsContentOptions,
    detailsSummaryOptions,
    emojiOptions,
    hardBreakOptions,
    headingOptions,
    horizontalRuleOptions,
    imageOptions,
    listItemOptions,
    mathematicsOptions,
    mentionOptions,
    orderedListOptions,
    paragraphOptions,
    tableKitOptions,
    taskListOptions,
    taskItemOptions,
    youtubeOptions,
    // marks
    boldOptions,
    codeOptions,
    highlightOptions,
    italicOptions,
    linkOptions,
    strikeOptions,
    subscriptOptions,
    superscriptOptions,
    underlineOptions,
    // functionality
    bubbleMenuOptions,
    characterCountOptions,
    backgroundColorOptions,
    colorOptions,
    dragHandleOptions,
    dropcursorOptions,
    fileHandlerOptions,
    floatingMenuOptions,
    focusOptions,
    fontFamilyOptions,
    fontSizeOptions,
    invisibleCharactersOptions,
    lineHeightOptions,
    listKeymapOptions,
    placeholderOptions,
    selectionOptions,
    tableOfContentsOptions,
    textStyleKitOptions,
    textAlignOptions,
    trailingNodeOptions,
    typographyOptions,
    undoRedoOptions
  };

  setContext('editorExtensionConfigs', extensionConfigs);
</script>

{@render children()}
