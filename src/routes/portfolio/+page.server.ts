const GIST_IDS = [
	"Mojo703/12816c678890a888e36741870daec1bd",
	"Mojo703/4c4558e85b1816ca14689754d6322eec",
	"Mojo703/19a13c2bb5eed3f46a02995b6add66e2",
	"Mojo703/cec130a04f755f2255418c24ed04f8a9",
	"Mojo703/eb519629244808fcecee608ca5d7f94f",
];

export async function load() {
	const results = await Promise.all(
		GIST_IDS.map(async (id) => {
			const res = await fetch(`https://gist.github.com/${id}.json`);
			if (!res.ok) throw new Error(`Failed to fetch gist ${id}: ${res.status}`);
			const data = await res.json();
			const div = data.div.replace(/href="?\{\{[^}]*\}\}"?/g, "");
			return [id, { div, stylesheet: data.stylesheet }] as const;
		}),
	);

	return { gists: Object.fromEntries(results) };
}
