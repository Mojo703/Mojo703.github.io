import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
	if (!browser) return 'light';
	const stored = localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark') return stored;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
	if (!browser) return;
	document.documentElement.dataset.theme = theme;
	localStorage.setItem('theme', theme);
}

export const theme = writable<Theme>(getInitialTheme());

theme.subscribe((value) => {
	applyTheme(value);
});

export function toggleTheme() {
	theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
}

// Listen to system preference changes (only when no explicit override)
if (browser) {
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		if (!localStorage.getItem('theme')) {
			theme.set(e.matches ? 'dark' : 'light');
		}
	});
}
