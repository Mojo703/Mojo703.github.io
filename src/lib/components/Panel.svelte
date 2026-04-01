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
		padding: 6px 12px;
		font-size: 1.1em;
		font-weight: 700;
		color: var(--panel-header-text);
		background-color: var(--bg-surface-inset);
		border-bottom: 1px solid var(--border-edge);
		text-align: left;
		border-radius: 0;
		box-shadow: var(--inset-shadow), var(--inset-highlight);
		border-image: none;
	}

	.panel-body {
		padding: 10px 4px;
		background-color: var(--panel-header-bg);
	}

	.panel-body > :global(p),
	.panel-body > :global(ul) {
		margin: 0.6em 1em;
	}

	.panel-body > :global(p:first-child) {
		margin-top: 0.3em;
	}

	.panel-body > :global(p:last-child) {
		margin-bottom: 0.3em;
	}
</style>
