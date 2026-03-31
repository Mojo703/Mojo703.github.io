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
	}

	h1 {
		margin: 150px auto 10px auto;
		background-color: white;
		color: black;
		width: fit-content;
		padding: 0 10px;
		border-radius: 5px;
		text-align: center;
		box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
		font-family: Consolas, monaco, monospace;
	}
</style>
