<script lang="ts">
	import type { Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();
</script>

<div class="file-tree image-pane">
	{@render children()}
</div>

<style>
	.file-tree {
		/* connector SVGs (1.2em × 1.6em cell, 1px stroke) */
		/* prettier-ignore */
		--tee: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='26'%3E%3Cline x1='9' y1='0' x2='9' y2='26' stroke='%239a958c' stroke-width='1'/%3E%3Cline x1='9' y1='13' x2='20' y2='13' stroke='%239a958c' stroke-width='1'/%3E%3C/svg%3E");
		/* prettier-ignore */
		--elbow: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='26'%3E%3Cline x1='9' y1='0' x2='9' y2='13' stroke='%239a958c' stroke-width='1'/%3E%3Cline x1='9' y1='13' x2='20' y2='13' stroke='%239a958c' stroke-width='1'/%3E%3C/svg%3E");
		/* prettier-ignore */
		--pipe: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='26'%3E%3Cline x1='9' y1='0' x2='9' y2='26' stroke='%239a958c' stroke-width='1'/%3E%3C/svg%3E");
		font-family: Consolas, monaco, monospace;
		font-size: 0.9em;
		padding: 0.6em 10px;
	}

	.file-tree :global(ul) {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	/* Every item is a flex row so the connector tile sits beside the label */
	.file-tree :global(li) {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		line-height: 1.6;
	}

	/* Connector tile: sized to match one indent cell */
	.file-tree :global(li::before) {
		content: "";
		display: inline-block;
		width: 1.2em;
		height: 1.6em;
		flex-shrink: 0;
		background: var(--tee) no-repeat center / 100% 100%;
	}

	.file-tree :global(li:last-child::before) {
		background-image: var(--elbow);
	}

	/* Nested lists: indent via padding, with vertical pass-through line */
	.file-tree :global(li > ul) {
		flex-basis: 100%;
		padding-left: 1.2em;
		background: var(--pipe) repeat-y left top / 1.2em 1.6em;
	}

	.file-tree :global(li:last-child > ul) {
		background-image: none;
	}

	/* Root list has no connectors */
	.file-tree > :global(ul > li::before) {
		display: none;
	}

	.file-tree > :global(ul > li > ul) {
		background-image: none;
		padding-left: 0;
	}

	/* Annotations */
	.file-tree :global(.note) {
		color: var(--text-secondary);
		font-size: 0.85em;
		margin-left: 1.5em;
	}

	/* Directory names */
	.file-tree :global(.dir) {
		color: var(--text-heading);
		font-weight: 700;
	}
</style>
