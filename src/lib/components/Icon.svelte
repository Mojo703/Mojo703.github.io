<script lang="ts">
	let {
		name,
		size = 16
	}: {
		name: 'home' | 'portfolio' | 'resume' | 'external';
		size?: number;
	} = $props();
</script>

<svg
	class="icon"
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{#if name === 'home'}
		<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
		<polyline points="9 22 9 12 15 12 15 22"/>
	{:else if name === 'portfolio'}
		<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
		<path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
	{:else if name === 'resume'}
		<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
		<polyline points="14 2 14 8 20 8"/>
		<line x1="16" y1="13" x2="8" y2="13"/>
		<line x1="16" y1="17" x2="8" y2="17"/>
	{:else if name === 'external'}
		<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
		<polyline points="15 3 21 3 21 9"/>
		<line x1="10" y1="14" x2="21" y2="3"/>
	{/if}
</svg>

<style>
	.icon {
		display: inline;
		vertical-align: -0.15em;
		margin: 0 0.2em;
		flex-shrink: 0;
	}
</style>
