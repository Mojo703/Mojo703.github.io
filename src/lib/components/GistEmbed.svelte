<script lang="ts">
	import { theme } from '$lib/stores/theme';

	let { gistId }: { gistId: string } = $props();

	let container: HTMLDivElement;

	$effect(() => {
		const callbackName = `gist_cb_${gistId.replace(/\W/g, '_')}_${Date.now()}`;
		const url = `https://gist.github.com/${gistId}.json?callback=${callbackName}`;

		(window as any)[callbackName] = (data: any) => {
			if (!container) return;
			if (!document.querySelector(`link[href="${data.stylesheet}"]`)) {
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = data.stylesheet;
				document.head.appendChild(link);
			}
			container.innerHTML = data.div;
			delete (window as any)[callbackName];
		};

		const script = document.createElement('script');
		script.src = url;
		document.body.appendChild(script);

		return () => {
			delete (window as any)[callbackName];
			script.remove();
		};
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
