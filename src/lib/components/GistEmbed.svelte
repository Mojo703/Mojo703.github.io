<script lang="ts">
	import { theme } from '$lib/stores/theme';

	let { div, stylesheet }: { div: string; stylesheet: string } = $props();

	$effect(() => {
		if (!document.querySelector(`link[href="${stylesheet}"]`)) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = stylesheet;
			document.head.appendChild(link);
		}
	});
</script>

<div class="gist-wrapper" class:invert-gist={$theme === 'dark'}>
	{@html div}
</div>

<style>
	.gist-wrapper {
		max-width: 100%;
		overflow: auto;
		font-size: smaller;
		border: 1px solid var(--border-edge);
		border-radius: 3px;
	}

	.gist-wrapper.invert-gist {
		filter: invert(0.88) hue-rotate(180deg);
	}

	:global(.gist-data) {
		height: 50vh;
	}
</style>
