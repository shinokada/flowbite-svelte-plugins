<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<div class="mx-auto max-w-5xl p-8">
  {@render children()}
</div>
