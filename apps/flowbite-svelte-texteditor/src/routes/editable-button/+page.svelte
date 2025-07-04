<script lang="ts">
  import {
    TextEditor,
    ToolbarRowWrapper,
    AlignmentButtonGroup,
    CharacterCount,
    DetailsButtonGroup,
    Divider,
    EditableButton,
    ExportButtonGroup,
    FormatButtonGroup,
    HeadingButtonGroup,
    ImageButtonGroup,
    InvisibleButtonGroup,
    LayoutButtonGroup,
    ListButtonGroup,
    SourceButtonGroup,
    TableButtonGroup1,
    TableButtonGroup2,
    TaskListButtonGroup,
    UndoRedoButtonGroup,
    VideoButtonGroup
  } from '$lib';
  import type { Editor } from '@tiptap/core';

  let editorInstance = $state<Editor | null>(null);
  let isEditable = $state(true);

  const content = `
    <h1>H1 Title</h1>
      <p>
        This is an example of a Medium-like editor. Try toggling the editable state with the button below.
      </p>
      <p>This is an example of a Medium-like editor. Try toggling the editable state with the button below.</p>
      <p></p>`;

  function handleEditableToggle(editable: boolean) {
    isEditable = editable;
    console.log('Editor is now:', editable ? 'editable' : 'read-only');
  }

  const mentions = [
    'Lea Thompson',
    'Cyndi Lauper',
    'Tom Cruise',
    'Madonna',
    'Jerry Hall',
    'Joan Collins',
    'Winona Ryder',
    'Christina Applegate',
    'Alyssa Milano',
    'Molly Ringwald',
    'Ally Sheedy',
    'Debbie Harry',
    'Olivia Newton-John',
    'Elton John',
    'Michael J. Fox',
    'Axl Rose',
    'Emilio Estevez',
    'Ralph Macchio',
    'Rob Lowe',
    'Jennifer Grey',
    'Mickey Rourke',
    'John Cusack',
    'Matthew Broderick',
    'Justine Bateman',
    'Lisa Bonet'
  ];
</script>

<TextEditor bind:editor={editorInstance} {content} {mentions} floatingMenu bubbleMenu draghandle file {isEditable} contentprops={{ id: 'drag-handle-editable' }}>
  <ToolbarRowWrapper>
    <EditableButton editor={editorInstance} bind:isEditable onToggle={handleEditableToggle} />
    <Divider />
    <FormatButtonGroup editor={editorInstance} />
    <Divider />
    <HeadingButtonGroup editor={editorInstance} />
  </ToolbarRowWrapper>

  <ToolbarRowWrapper toolbarrawprops={{ top: false }}>
    <UndoRedoButtonGroup editor={editorInstance} />
    <Divider />
    <LayoutButtonGroup editor={editorInstance} />
    <Divider />
    <ImageButtonGroup editor={editorInstance} />
    <Divider />
    <VideoButtonGroup editor={editorInstance} />
    <Divider />
    <InvisibleButtonGroup editor={editorInstance} />
    <Divider />
    <SourceButtonGroup editor={editorInstance} />
  </ToolbarRowWrapper>

  <ToolbarRowWrapper toolbarrawprops={{ top: false }}>
    <DetailsButtonGroup editor={editorInstance} />
    <Divider />
    <ListButtonGroup editor={editorInstance} />
    <Divider />
    <AlignmentButtonGroup editor={editorInstance} />
    <Divider />
    <ExportButtonGroup editor={editorInstance} />
  </ToolbarRowWrapper>

  <ToolbarRowWrapper toolbarrawprops={{ top: false }}>
    <TaskListButtonGroup editor={editorInstance} />
  </ToolbarRowWrapper>
  
  <ToolbarRowWrapper toolbarrawprops={{ top: false }}>
    <TableButtonGroup1 editor={editorInstance} />
    <TableButtonGroup2 editor={editorInstance} />
  </ToolbarRowWrapper>

  {#snippet footer()}
    {#if editorInstance}
      <CharacterCount editor={editorInstance} limit={280} />
    {/if}
  {/snippet}
</TextEditor>
