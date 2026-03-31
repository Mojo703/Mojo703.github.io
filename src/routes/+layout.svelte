<script lang="ts">
	import '../styles/global.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/icons/icon.png" />
</svelte:head>

{@render children()}
