<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		open = false,
		children
	}: {
		title: string;
		open?: boolean;
		children: Snippet;
	} = $props();

	let isOpen = $state(open);
</script>

<div class="collapsible" class:closed={!isOpen}>
	<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
	<h3 onclick={() => (isOpen = !isOpen)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && (isOpen = !isOpen)}>
		{title}
	</h3>
	<div class="body">
		{@render children()}
	</div>
</div>

<style>
	.collapsible {
		padding: 5px;
		border-radius: 3px;
		margin: 0.5em 0;
		display: grid;
		background-color: var(--bg-surface-inset);
		border: 1px solid var(--border-edge);
		box-shadow:
			var(--inset-shadow),
			var(--inset-highlight);
		transition: background-color 0.15s ease;
	}

	.collapsible:hover {
		background-color: var(--bg-surface-raised);
	}

	.collapsible > h3 {
		margin: 0 0 10px 0;
		cursor: pointer;
		color: var(--text-heading);
	}

	.collapsible.closed > h3 {
		margin: 0;
	}

	.collapsible.closed > .body {
		display: none;
	}

	.collapsible.closed > h3::before {
		content: '+';
		color: var(--accent);
	}

	.collapsible > h3::before {
		content: '-';
		padding: 0 10px;
		display: inline-block;
		text-align: center;
		color: var(--accent);
	}
</style>
