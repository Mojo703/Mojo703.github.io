<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		image,
		alt = '',
		title,
		href,
		external = false,
		children
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
	<a class="pane-image-link" {href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
		<img src={image} {alt} />
	</a>
	<h3>
		<a {href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
			{title}<img class="inline_icon" src="/icons/arrow-up.png" alt="" />
		</a>
	</h3>
	<p>{@render children()}</p>
</div>

<style>
	.page-pane {
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-template-rows: min-content 1fr;
		margin: 20px;
		background-color: inherit;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: var(--low-shadow);
	}

	.page-pane > .pane-image-link {
		grid-row: 1 / span 2;
	}

	.page-pane > .pane-image-link > img {
		width: 100%;
		display: block;
	}

	.page-pane > h3 {
		border-bottom: 2.5px solid #ffd966;
		width: max-content;
		display: block;
		margin: 5px 1em;
		font-family: Consolas, monaco, monospace;
	}

	.page-pane > h3 > a {
		color: inherit;
		text-decoration: inherit;
	}

	.page-pane > p {
		margin-left: 1em;
		margin-right: 1em;
	}

	@media (max-width: 800px) {
		.page-pane {
			display: block;
			text-align: center;
		}

		.page-pane > .pane-image-link > img {
			max-width: 300px;
		}

		.page-pane > h3 {
			margin: auto;
		}

		.page-pane > p {
			text-align: justify;
			margin-left: 2em;
			margin-right: 2em;
		}
	}
</style>
