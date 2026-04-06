import { execSync } from "child_process";

export function load({ route }) {
	const suffix = route.id === "/" ? "" : route.id;
	const pagePath = `src/routes${suffix}/+page.svelte`;
	try {
		const updated = execSync(`git log -1 --format=%cs -- ${pagePath}`)
			.toString()
			.trim();
		return { updated: updated || undefined };
	} catch {
		return {};
	}
}
