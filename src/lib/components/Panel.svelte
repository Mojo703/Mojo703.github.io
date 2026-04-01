<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		title,
		id,
		children,
	}: {
		title?: string;
		id?: string;
		children: Snippet;
	} = $props();
</script>

<section class="panel" {id}>
	{#if title}
		<h2 class="panel-header">{title}</h2>
	{/if}
	<div class="panel-body">
		{@render children()}
	</div>
</section>

<style>
	.panel {
		margin: 1.2em 0;
		border-radius: 2px;
		background-color: var(--bg-surface-raised);
		border: 4px solid transparent;
		border-image: var(--bevel-border) 4 fill;
		box-shadow: var(--panel-shadow);
	}

	.panel-header {
		margin: 0;
		padding: 8px 12px;
		font-size: 1.1em;
		font-weight: 700;
		color: var(--text-heading);
		text-align: left;
		border-radius: 0;
		border-image: none;
		background: none;
		box-shadow: none;
	}

	.panel-body {
		margin: 0 8px 8px 8px;
		padding: 10px 12px;
		background-color: var(--bg-surface-inset);
		border: 4px solid transparent;
		border-image: var(--inset-bevel-border) 4 fill;
		box-shadow: var(--inset-shadow), var(--inset-highlight);
	}

	.panel-body > :global(p),
	.panel-body > :global(ul) {
		margin: 0.6em 0.5em;
	}

	.panel-body > :global(p:first-child) {
		margin-top: 0.3em;
	}

	.panel-body > :global(p:last-child) {
		margin-bottom: 0.3em;
	}
</style>
