<script lang="ts">
  import type { PageProps } from './$types';
  import { MetaTags } from 'runes-meta-tags';

  let { data }: PageProps = $props();
  let Content = $derived(data.content);
</script>

<MetaTags {...data.pageMetaTags} />
<Content />
