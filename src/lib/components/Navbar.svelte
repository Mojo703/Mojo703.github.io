<nav class="navbar">
	<a href="/"><img class="inline_icon" src="/icons/home.png" alt="" />Home</a>
	<a href="/portfolio"><img class="inline_icon" src="/icons/class_projects.png" alt="" />Portfolio</a>
	<a href="/resume.pdf"><img class="inline_icon" src="/icons/resume.png" alt="" />Resume</a>
</nav>

<style>
	.navbar {
		margin-bottom: 20px;
		display: grid;
		grid-auto-flow: column;
		text-align: center;
		grid-gap: 2px;
		border-radius: 5px;
		overflow: hidden;
		font-size: large;
		box-shadow: var(--low-shadow);
		font-family: Consolas, monaco, monospace;
	}

	.navbar > a {
		background-color: var(--nav-bg);
		color: white;
		padding: 1px;
		text-decoration: none;
	}

	.navbar > a:hover,
	.navbar > a:active {
		background-color: var(--nav-bg-hover);
	}
</style>
