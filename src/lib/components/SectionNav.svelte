<script lang="ts">
	let { sections }: { sections: { id: string; label: string }[] } = $props();
</script>

<nav id="sections">
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
		background-color: rgba(255, 255, 255, 0.788);
		border-radius: 0 0 7px 0;
		box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
		grid-template-rows: auto 0;
		font-family: Consolas, monaco, monospace;
	}

	#sections:hover,
	#sections:active {
		background-color: rgb(255, 255, 255);
		grid-template-rows: auto auto;
	}

	#sections > span {
		display: block;
		text-align: center;
		margin-bottom: 5px;
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
		padding: 2px 10px;
		display: block;
		background-color: var(--accent);
		color: white;
		text-decoration: none;
	}

	#sections > div > a:hover {
		background-color: var(--accent-hover);
	}
</style>
