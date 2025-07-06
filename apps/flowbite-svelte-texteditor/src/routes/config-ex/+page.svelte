<script lang="ts">
  import { Heading } from 'flowbite-svelte';
  import * as Examples from './examples';
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/google-dark.min.css" />
</svelte:head>

<Heading tag="h1" class="my-8">Config</Heading>

<Heading tag="h2" class="my-4">VideoConfig</Heading>
<Examples.VideoConfig />

<Heading tag="h2" class="my-4">ImageConfig</Heading>
<Examples.ImageConfig />

<Heading tag="h2" class="my-4">EmojiConfig</Heading>
<Examples.EmojiConfig />
