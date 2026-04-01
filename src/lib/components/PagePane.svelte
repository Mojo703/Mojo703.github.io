<script lang="ts">
	import type { Snippet } from "svelte";
	import Icon from "./Icon.svelte";

	let {
		image,
		alt = "",
		title,
		href,
		external = false,
		children,
	}: {
		image: string;
		alt?: string;
		title: string;
		href: string;
		external?: boolean;
		children: Snippet;
	} = $props();
</script>

<div class="page-pane">
	<h3 class="pane-header">
		<a
			{href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
		>
			{title}<Icon name="external" size={14} />
		</a>
	</h3>
	<div class="pane-body">
		<a
			class="pane-image-link"
			{href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
		>
			<img src={image} {alt} />
		</a>
		<p>{@render children()}</p>
	</div>
</div>

<style>
	.page-pane {
		margin: 0 0 8px 0;
		border-radius: 2px;
		background-color: var(--bg-surface-raised);
		border: 4px solid transparent;
		border-image: var(--bevel-border) 4 fill;
		box-shadow: var(--panel-shadow);
		transition:
			box-shadow 50ms ease,
			transform 50ms ease;
	}

	.page-pane:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
	}

	.pane-header {
		margin: 0;
		padding: 6px 12px;
		font-size: 1.05em;
		font-weight: 700;
		color: var(--text-heading);
		background: none;
		box-shadow: none;
		border-image: none;
	}

	.pane-header > a {
		color: inherit;
		text-decoration: none;
	}

	.pane-header > a:hover {
		color: var(--accent);
		text-decoration: none;
	}

	.pane-body {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 12px;
		margin: 0 8px 8px 8px;
		padding: 12px;
		background-color: var(--bg-surface-inset);
		border: 4px solid transparent;
		border-image: var(--inset-bevel-border) 4 fill;
		box-shadow: var(--inset-shadow), var(--inset-highlight);
		align-items: center;
	}

	.pane-image-link {
		display: block;
		border-radius: 2px;
		padding: 4px;
		background-color: var(--bg-surface);
		border: 1px solid var(--border-edge);
		box-shadow: var(--inset-shadow), var(--inset-highlight);
	}

	.pane-image-link > img {
		width: 100%;
		max-width: 250px;
		display: block;
		border-radius: 1px;
	}

	.pane-body > p {
		margin: 0.4em 0.5em;
		color: var(--text-secondary);
	}

	@media (max-width: 800px) {
		.pane-body {
			display: block;
			text-align: center;
		}

		.pane-image-link {
			display: inline-block;
		}

		.pane-image-link > img {
			max-width: 280px;
		}

		.pane-body > p {
			text-align: justify;
			margin: 1em 1.5em;
		}
	}
</style>
