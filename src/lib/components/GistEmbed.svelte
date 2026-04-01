<script lang="ts">
	import { theme } from '$lib/stores/theme';

	let { gistId }: { gistId: string } = $props();

	let container: HTMLDivElement;

	$effect(() => {
		const url = `https://gist.github.com/${gistId}.json`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				if (!container) return;
				if (!document.querySelector(`link[href="${data.stylesheet}"]`)) {
					const link = document.createElement('link');
					link.rel = 'stylesheet';
					link.href = data.stylesheet;
					document.head.appendChild(link);
				}
				container.innerHTML = data.div;
			});
	});
</script>

<div class="gist-wrapper" class:invert-gist={$theme === 'dark'} bind:this={container}></div>

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
