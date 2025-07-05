<script lang="ts">
  import '../app.css';
  import { DarkMode } from 'flowbite-svelte';
  let { children } = $props();
</script>

<div class="mx-auto max-w-5xl py-16 px-2">
  <DarkMode />
  {@render children()}
</div>
