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
		background-color: rgba(0, 0, 0, 0.1);
		padding: 5px;
		border-radius: 5px;
		margin: 0.5em 0;
		display: grid;
		box-shadow: var(--low-shadow);
	}

	.collapsible > h3 {
		margin: 0 0 10px 0;
		cursor: pointer;
		font-family: Consolas, monaco, monospace;
	}

	.collapsible.closed > h3 {
		margin: 0;
	}

	.collapsible.closed > .body {
		display: none;
	}

	.collapsible.closed > h3::before {
		content: '+';
	}

	.collapsible > h3::before {
		content: '-';
		padding: 0 10px;
		display: inline-block;
		text-align: center;
	}
</style>
