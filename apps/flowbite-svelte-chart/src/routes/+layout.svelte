<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="m-8 mx-auto max-w-7xl p-4">
	{@render children()}
</div>
