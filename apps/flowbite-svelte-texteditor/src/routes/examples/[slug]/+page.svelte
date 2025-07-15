<script lang="ts">
  import type { PageProps } from './$types';
  import { RunesMetaTags } from 'runes-meta-tags';

  let { data }: PageProps = $props();
  let Content = $derived(data.content);
</script>
<RunesMetaTags {...data.pageMetaTags} />
<Content />
