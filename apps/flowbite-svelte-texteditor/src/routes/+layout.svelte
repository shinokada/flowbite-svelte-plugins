<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<div class="mx-auto max-w-5xl py-16 px-2">
  {@render children()}
</div>
