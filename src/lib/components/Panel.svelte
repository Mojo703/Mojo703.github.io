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
		margin: 16px 0;
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

	/* panel-lighter + panel-hole:
	   8px margin = panel's own padding (space between frame bevel and grid).
	   2px padding = panel-hole's padding (shows between cells as separators). */
	.panel-body {
		margin: 8px;
		background-color: var(--bg-surface-raised);
		padding: 2px;
		box-shadow:
			inset 0 2px 2px -1px rgba(0, 0, 0, 0.6),
			inset 0 0 2px 0 rgba(0, 0, 0, 0.4),
			inset 0 -2px 2px -2px rgba(255, 255, 255, 0.08);
	}

	/* Text-only content: sits in a cell-like row */
	.panel-body > :global(p),
	.panel-body > :global(ul),
	.panel-body > :global(.image-pane) {
		background-color: var(--bg-surface-inset);
		margin: 1px 0;
		padding: 0.5em 10px;
	}

	.panel-body > :global(ul) {
		padding-left: 2em;
	}
</style>
