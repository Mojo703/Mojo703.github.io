<script lang="ts">
	let { images }: { images: string[] } = $props();

	let scrollContainer: HTMLDivElement;
	let showPrev = $state(false);
	let showNext = $state(true);

	const SCROLL_AMOUNT = 240;

	function scroll(direction: number) {
		scrollContainer.scrollLeft += SCROLL_AMOUNT * direction;
	}

	function handleScroll() {
		const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
		showPrev = scrollContainer.scrollLeft > 0;
		showNext = scrollContainer.scrollLeft < maxScroll;
	}
</script>

<div class="center">
	<div class="image-pane">
		<div class="image-pane-scroll" bind:this={scrollContainer} onscroll={handleScroll}>
			{#each images as src}
				<img {src} alt="" />
			{/each}
		</div>
		{#if showPrev}
			<button class="prev" onclick={() => scroll(-1)}>&#10094;</button>
		{/if}
		{#if showNext}
			<button class="next" onclick={() => scroll(1)}>&#10095;</button>
		{/if}
	</div>
</div>

<style>
	.center {
		margin: 0 auto;
		max-width: fit-content;
	}

	.image-pane {
		position: relative;
		margin: 2em 10vw;
		max-width: fit-content;
	}

	.image-pane-scroll {
		padding: 10px;
		display: flex;
		flex-direction: row;
		overflow: auto;
		scroll-snap-type: x mandatory;
		background-color: inherit;
		border-radius: 5px;
		align-items: center;
		box-shadow: var(--low-shadow);
		scroll-behavior: smooth;
		max-width: fit-content;
	}

	.image-pane img {
		height: 15em;
		border-radius: 5px;
		margin: 5px;
		text-align: center;
		scroll-snap-align: center;
		flex: none;
		max-width: calc(100% - 10px);
	}

	.prev,
	.next {
		cursor: pointer;
		position: absolute;
		top: 50%;
		width: auto;
		margin-top: -22px;
		padding: 8px;
		font-weight: bold;
		font-size: 18px;
		transition: 0.1s ease;
		border-radius: 0 3px 3px 0;
		user-select: none;
		color: rgba(0, 0, 0, 0.5);
		background-color: rgba(255, 255, 255, 0.5);
		border: none;
	}

	.next {
		right: 0;
		border-radius: 3px 0 0 3px;
	}

	.prev:hover,
	.next:hover,
	.prev:active,
	.next:active {
		color: white;
		background-color: rgba(0, 0, 0, 0.8);
	}

	@media (max-width: 800px) {
		.image-pane {
			margin: 2em 0;
		}
	}
</style>
