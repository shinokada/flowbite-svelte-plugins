<script lang="ts">
	import { DarkMode, Heading } from 'flowbite-svelte';
	import * as Examples from './examples';
</script>

<DarkMode />
<Heading tag="h1" class="my-8">@flowbite-svelte-plugins/texteditor</Heading>

<Heading tag="h2" class="my-4">Default Text Editor</Heading>
<Examples.DefaultTextEditor />

<Heading tag="h2" class="my-4">Tables</Heading>
<Examples.Tables />

<Heading tag="h2" class="my-4">Format</Heading>
<Examples.Format />

<Heading tag="h2" class="my-4">UndoRedo</Heading>
<Examples.UndoRedo />

<Heading tag="h2" class="my-4">Alignments</Heading>
<Examples.Alignment />
