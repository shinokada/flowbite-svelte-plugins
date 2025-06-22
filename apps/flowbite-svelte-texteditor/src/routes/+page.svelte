<script lang="ts">
  import { DarkMode, Heading } from 'flowbite-svelte';
  import * as Examples from './examples';
</script>

<DarkMode />
<Heading tag="h1" class="my-8">@flowbite-svelte-plugins/texteditor</Heading>

<Heading tag="h2" class="my-4">New</Heading>

<Heading tag="h3" class="my-4">Export</Heading>
<Examples.Export />

<Heading tag="h3" class="my-4">CustomTextEditor</Heading>
<Examples.CustomTextEditor />

<Heading tag="h3" class="my-4">New default Text editor</Heading>
<Examples.DefaultTextEditor />

<Heading tag="h3" class="my-4">Tables</Heading>
<Examples.Tables />

<Heading tag="h3" class="my-4">Videos</Heading>
<Examples.Videos />

<Heading tag="h3" class="my-4">Images</Heading>
<Examples.Images />

<Heading tag="h3" class="my-4">Layouts</Heading>
<Examples.Layouts />

<Heading tag="h3" class="my-4">Lists</Heading>
<Examples.Lists />

<Heading tag="h3" class="my-4">Fonts</Heading>
<Examples.Fonts />

<Heading tag="h3" class="my-4">Alignments</Heading>
<Examples.Alignments />

<Heading tag="h3" class="my-4">Formats</Heading>
<Examples.Formats />

<Heading tag="h3" class="my-4">UndoRedo</Heading>
<Examples.UndoRedo />
