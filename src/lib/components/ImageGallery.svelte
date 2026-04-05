<script lang="ts">
	let { images }: { images: string[] } = $props();

	let scrollContainer: HTMLDivElement;
	let showPrev = $state(false);
	let showNext = $state(false);

	const SCROLL_AMOUNT = 240;

	function scroll(direction: number) {
		scrollContainer.scrollLeft += SCROLL_AMOUNT * direction;
	}

	function updateButtons() {
		if (!scrollContainer) return;
		const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
		showPrev = scrollContainer.scrollLeft > 0;
		showNext = maxScroll > 1 && scrollContainer.scrollLeft < maxScroll;
	}

	function onImageLoad() {
		updateButtons();
	}

	$effect(() => {
		if (!scrollContainer) return;
		updateButtons();
		const observer = new ResizeObserver(() => updateButtons());
		observer.observe(scrollContainer);
		return () => observer.disconnect();
	});
</script>

<div class="image-pane">
	<div class="image-pane-scroll" bind:this={scrollContainer} onscroll={updateButtons}>
		{#each images as src}
			<img {src} alt="" onload={onImageLoad} />
		{/each}
	</div>
	{#if showPrev}
		<button class="prev" onclick={() => scroll(-1)} aria-label="Scroll gallery left">&#10094;</button>
	{/if}
	{#if showNext}
		<button class="next" onclick={() => scroll(1)} aria-label="Scroll gallery right">&#10095;</button>
	{/if}
</div>

<style>
	.image-pane {
		position: relative;
	}

	.image-pane-scroll {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		overflow: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		border: 1px solid var(--border-edge);
		box-shadow:
			var(--inset-shadow),
			var(--inset-highlight);
	}

	.image-pane img {
		height: 15em;
		border-radius: 2px;
		margin: 5px;
		scroll-snap-align: center;
		flex: none;
		max-width: calc(100% - 10px);
		object-fit: contain;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
	}

	.prev,
	.next {
		cursor: pointer;
		position: absolute;
		top: 50%;
		margin-top: -22px;
		padding: 8px;
		font-weight: bold;
		font-size: 18px;
		transition: box-shadow 50ms ease, color 50ms ease, background-color 50ms ease, padding 50ms ease;
		border-radius: 0 3px 3px 0;
		user-select: none;
		border: none;
		color: var(--text-primary);
		background-color: var(--bg-surface);
		box-shadow: var(--panel-shadow), var(--btn-highlight), var(--btn-depth);
	}

	.next {
		right: 0;
		border-radius: 3px 0 0 3px;
	}

	.prev:hover,
	.next:hover,
	.prev:focus-visible,
	.next:focus-visible {
		color: white;
		background-color: var(--accent);
		box-shadow: var(--btn-hover-shadow);
		outline: none;
	}

	.prev:active,
	.next:active {
		color: white;
		background-color: var(--accent);
		padding-top: 10px;
		padding-bottom: 6px;
		box-shadow: var(--btn-active-shadow);
	}
</style>
