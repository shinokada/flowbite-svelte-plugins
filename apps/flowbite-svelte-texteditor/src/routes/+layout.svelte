<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="max-w-7xl mx-auto">
{@render children()}
</div>
