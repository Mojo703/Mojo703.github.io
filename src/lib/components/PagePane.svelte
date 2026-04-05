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
	<a class="pane-image-link" {href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} tabindex="-1">
		<img class="pane-image" src={image} {alt} />
	</a>
	<div class="pane-text">
		<h3 class="pane-title">
			<a
				{href}
				target={external ? "_blank" : undefined}
				rel={external ? "noopener noreferrer" : undefined}
			>
				{title}{#if external}<Icon name="external" size={14} />{/if}
			</a>
		</h3>
		<p>{@render children()}</p>
	</div>
</div>

<style>
	/* panel-hole-inner: no bevel border, 1px margin creates separator via parent's darker bg */
	.page-pane {
		display: flex;
		flex-direction: row-reverse;
		align-items: flex-start;
		gap: 12px;
		margin: 1px 0;
		padding: 10px;
		background-color: var(--bg-surface-inset);
		border: none;
		box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
		overflow: hidden;
	}

	/* Alternating rows — very subtle, like panel-evenodd */
	.page-pane:nth-child(odd) {
		background-color: var(--bg-surface-inset);
	}

	.page-pane:nth-child(even) {
		filter: brightness(1.04);
	}

	/* Image: top-right, fixed size, does not stretch */
	.pane-image-link {
		flex-shrink: 0;
		width: 240px;
		height: 180px;
		display: block;
	}

	.pane-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		border: 1px solid var(--border-edge);
		box-shadow:
			var(--inset-shadow),
			var(--inset-highlight);
	}

	.pane-text {
		flex: 1;
		min-width: 0;
	}

	.pane-title {
		margin: 0 0 6px 0;
		font-size: 1.05em;
		font-weight: 700;
		color: var(--text-heading);
	}

	.pane-title > a {
		color: inherit;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}

	.pane-title > a:hover {
		color: var(--accent);
	}

	.pane-text > p {
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.95em;
		line-height: 1.5;
	}

	@media (max-width: 800px) {
		.page-pane {
			flex-direction: column;
		}

		.pane-image-link {
			width: 100%;
			height: 180px;
		}
	}
</style>
