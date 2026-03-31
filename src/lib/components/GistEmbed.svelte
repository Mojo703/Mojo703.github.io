<script lang="ts">
	let { gistId }: { gistId: string } = $props();

	let container: HTMLDivElement;

	$effect(() => {
		const url = `https://gist.github.com/${gistId}.json`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				if (!container) return;
				// Inject the stylesheet if not already present
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

<div class="gist" bind:this={container}></div>

<style>
	.gist {
		max-width: 100%;
		overflow: auto;
		font-size: smaller;
	}

	:global(.gist-data) {
		height: 50vh;
	}
</style>
