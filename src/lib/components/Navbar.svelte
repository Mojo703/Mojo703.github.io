<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<nav class="navbar">
	<a href="/"><img class="inline_icon" src="/icons/home.png" alt="" />Home</a>
	<a href="/portfolio"><img class="inline_icon" src="/icons/class_projects.png" alt="" />Portfolio</a>
	<a href="/resume.pdf"><img class="inline_icon" src="/icons/resume.png" alt="" />Resume</a>
	<ThemeToggle />
</nav>

<style>
	.navbar {
		margin-bottom: 20px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr auto;
		text-align: center;
		border-radius: 3px;
		overflow: hidden;
		font-size: large;
		background-color: var(--nav-bg);
		border: 1px solid var(--border-edge);
		box-shadow:
			var(--panel-shadow),
			var(--panel-highlight),
			var(--panel-depth);
	}

	.navbar > :global(*) {
		padding: 4px 1px;
	}

	.navbar > a {
		color: var(--nav-text);
		text-decoration: none;
		border-right: 1px solid var(--border-edge);
		transition: background-color 0.15s ease, color 0.15s ease;
	}

	.navbar > a:hover,
	.navbar > a:active {
		background-color: var(--nav-bg-hover);
		color: var(--accent);
		text-decoration: none;
	}
</style>
