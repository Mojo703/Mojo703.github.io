<script lang="ts">
	let { sections }: { sections: { id: string; label: string }[] } = $props();
</script>

<nav id="sections" aria-label="Page sections">
	<span>Jump To</span>
	<div>
		{#each sections as section}
			<a href="#{section.id}">{section.label}</a>
		{/each}
	</div>
</nav>

<style>
	#sections {
		display: grid;
		position: fixed;
		margin: 0;
		padding: 10px;
		list-style: none;
		top: 0;
		z-index: 1;
		border-radius: 0 0 5px 0;
		grid-template-rows: auto 0;
		background-color: var(--bg-surface);
		border: 1px solid var(--border-edge);
		box-shadow:
			var(--panel-shadow),
			var(--panel-highlight),
			var(--panel-depth);
		backdrop-filter: blur(6px);
	}

	#sections:hover,
	#sections:active {
		background-color: var(--bg-surface-raised);
		grid-template-rows: auto auto;
	}

	#sections > span {
		display: block;
		text-align: center;
		margin-bottom: 5px;
		color: var(--text-secondary);
		text-transform: uppercase;
		font-size: 0.8em;
		letter-spacing: 1px;
	}

	#sections > div {
		display: grid;
		grid-auto-flow: row;
		grid-gap: 2px;
		border-radius: 3px;
		overflow: hidden;
		font-size: medium;
	}

	#sections > div > a {
		padding: 4px 10px;
		display: block;
		background-color: var(--accent);
		color: white;
		text-decoration: none;
		box-shadow: var(--btn-highlight), var(--btn-depth);
		transition: box-shadow 50ms ease, background-color 50ms ease, padding 50ms ease;
	}

	#sections > div > a:hover {
		background-color: var(--accent-hover);
		text-decoration: none;
		box-shadow: var(--btn-hover-shadow);
	}

	#sections > div > a:active {
		padding-top: 6px;
		padding-bottom: 2px;
		box-shadow: var(--btn-active-shadow);
	}
</style>
