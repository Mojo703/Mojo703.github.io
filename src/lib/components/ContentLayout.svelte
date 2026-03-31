<script lang="ts">
	import type { Snippet } from 'svelte';
	import Navbar from './Navbar.svelte';
	import Footer from './Footer.svelte';

	let {
		updated = '2024-12-21',
		children
	}: {
		updated?: string;
		children: Snippet;
	} = $props();
</script>

<div class="spacer">
	<div class="content">
		<Navbar />
		{@render children()}
		<Footer {updated} />
	</div>
</div>

<style>
	.spacer {
		padding: 0 5vw 5vw 5vw;
	}

	.content {
		margin: 50px auto 0 auto;
		padding: 10px;
		background-color: var(--content-bg);
		border-radius: 5px;
		max-width: 1200px;
		box-shadow: var(--high-shadow);
	}
</style>
