<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="max-w-7xl mx-auto m-8 p-4">
	{@render children()}
</div>
