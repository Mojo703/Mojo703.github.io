<script lang="ts">
	import Icon from './Icon.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<nav class="navbar">
	<a href="/"><Icon name="home" />Home</a>
	<a href="/portfolio"><Icon name="portfolio" />Portfolio</a>
	<a href="/resume.pdf"><Icon name="resume" />Resume</a>
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
		padding: 6px 1px;
	}

	.navbar > a {
		color: var(--nav-text);
		text-decoration: none;
		border-right: 1px solid var(--border-edge);
		font-weight: 600;
		box-shadow: var(--btn-highlight), var(--btn-depth);
		transition: box-shadow 50ms ease, color 50ms ease, background-color 50ms ease;
	}

	.navbar > a:hover,
	.navbar > a:focus-visible {
		background-color: var(--nav-bg-hover);
		color: var(--accent);
		text-decoration: none;
		box-shadow: var(--btn-hover-shadow);
		outline: none;
	}

	.navbar > a:active {
		padding-top: 8px;
		padding-bottom: 4px;
		box-shadow: var(--btn-active-shadow);
	}
</style>
