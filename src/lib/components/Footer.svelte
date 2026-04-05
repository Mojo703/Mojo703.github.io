<script lang="ts">
	let { updated = '2024-12-21' }: { updated?: string } = $props();
</script>

<footer>
	<p>
		mpg3@sfu.ca,
		<a href="https://www.linkedin.com/in/matthew-goodman-b2a4bb289">linkedin</a>
		· Updated {updated}
	</p>
</footer>

<style>
	footer {
		text-align: center;
		margin: 16px 0 0 0;
		padding: 4px 10px;
		background-color: var(--bg-surface-raised);
		border: 4px solid transparent;
		border-image: var(--bevel-border) 4 fill;
		box-shadow: var(--panel-shadow);
		color: var(--text-secondary);
	}

	footer :global(a) {
		color: var(--accent);
	}
</style>
