<script lang="ts">
	import type { Snippet } from "svelte";
	import Navbar from "./Navbar.svelte";
	import Footer from "./Footer.svelte";

	let {
		updated,
		children,
	}: {
		updated: string | undefined;
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
		padding: 0 5vw;
	}

	@media (max-width: 600px) {
		.spacer {
			padding: 0;
		}
	}

	.content {
		margin: 50px auto 0 auto;
		padding: 0 10px;
		max-width: 1200px;
		color: var(--text-primary);
	}
</style>
