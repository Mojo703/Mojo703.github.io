<script lang="ts">
	let { updated = '2024-12-21' }: { updated?: string } = $props();
</script>

<footer>
	<p>
		mpg3@sfu.ca,
		<a href="https://www.linkedin.com/in/matthew-goodman-b2a4bb289">linkedin</a>
	</p>
	<p>Updated {updated}</p>
</footer>

<style>
	footer {
		text-align: center;
		margin-top: 3em;
		padding-top: 1.5em;
		border-top: 1px solid var(--border-edge);
		color: var(--text-secondary);
	}

	footer :global(a) {
		color: var(--accent);
	}
</style>
