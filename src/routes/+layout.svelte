<script lang="ts">
	import '../styles/global.css';
	import '$lib/stores/theme';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/icons/icon.png" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap" rel="stylesheet" />
	{@html `<script>
		(function() {
			var theme = localStorage.getItem('theme');
			if (!theme) {
				theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			}
			document.documentElement.dataset.theme = theme;
		})();
	</script>`}
</svelte:head>

{@render children()}
