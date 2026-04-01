<script lang="ts">
	let { src, title }: { src: string; title: string } = $props();
</script>

<img class="banner" {src} alt="" />
<h1>{title}</h1>

<style>
	.banner {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		filter: brightness(var(--banner-brightness));
	}

	h1 {
		margin: 150px auto 10px auto;
		width: fit-content;
		padding: 4px 16px;
		border-radius: 3px;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 2px;
		background-color: var(--bg-surface);
		color: var(--text-heading);
		border: 1px solid var(--border-edge);
		box-shadow:
			var(--panel-shadow),
			var(--panel-highlight),
			var(--panel-depth);
	}
</style>
