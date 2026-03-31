<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import ImageGallery from '$lib/components/ImageGallery.svelte';
	import Collapsible from '$lib/components/Collapsible.svelte';
	import GistEmbed from '$lib/components/GistEmbed.svelte';
	import SectionNav from '$lib/components/SectionNav.svelte';

	const sections = [
		{ id: 'robot-soccer', label: 'Robot Soccer' },
		{ id: 'software', label: 'Software' },
		{ id: 'code-samples', label: 'Code Samples' },
		{ id: 'class-projects', label: 'Class Projects' },
		{ id: 'mechanical', label: 'Mechanical' }
	];
</script>

<svelte:head>
	<title>Matthew's Portfolio</title>
</svelte:head>

<SectionNav {sections} />
<Banner src="/images/banner.png" title="Matthew's Portfolio" />

<ContentLayout updated="2024-01-27">
	<h2 id="robot-soccer">Robot Soccer Mechanics Team</h2>
	<p>
		Designed to compete in the 2024
		<a href="https://ssl.robocup.org/">robocup small size league</a>. Our
		team's website is
		<a href="https://www.sfurobotsoccer.com/">SFU Robot Soccer</a>
	</p>
	<p>
		I rendered the robot soccer mechanical components in SolidWorks. I
		have personally designed or revised many of the mechanical components
		of the robot, most notably the spiral-shaped dribbler, its drive train
		assembly, the horizontal structural plates, and the main mounting
		brackets.
	</p>
	<p>
		The team's prototyping is done with 3D printing since it is rapid and
		strong enough to do limited testing. To meet our goals, I printed the
		yellow parts with PETG.
	</p>
	<ImageGallery
		images={[
			'/images/Cover removed.png',
			'/images/Dissasembled Robot.png',
			'/images/Dribbler Assembly.png',
			'/images/Full render.png',
			'/images/Kicker.png',
			'/images/Dissasembled Robot 2.png'
		]}
	/>

	<h2 id="software">Personal Software Projects</h2>
	<p>
		Below are some screenshots of my game development projects. The first
		image showcases a fog of war shaders and robust selection tools. The
		second is a game with fully developed gameplay. And finally, the third
		project was developed with my friends, with a limited colour palette
		and procedural animations.
	</p>
	<ImageGallery
		images={[
			'/images/Solar Belt.png',
			'/images/Cooperation.png',
			'/images/Group Project.png'
		]}
	/>

	<h2 id="code-samples">Code Samples</h2>
	<p>
		Below are some code samples for several languages I have learned. They
		are files taken from some of my projects.
	</p>
	<Collapsible title="JavaScript: Evolution project.">
		<GistEmbed gistId="Mojo703/4c4558e85b1816ca14689754d6322eec" />
	</Collapsible>
	<Collapsible title="C#: Unity game project.">
		<GistEmbed gistId="Mojo703/19a13c2bb5eed3f46a02995b6add66e2" />
	</Collapsible>
	<Collapsible title="MATLAB: Stock plotter.">
		<GistEmbed gistId="Mojo703/cec130a04f755f2255418c24ed04f8a9" />
	</Collapsible>
	<Collapsible title="VHDL: Alarm system.">
		<GistEmbed gistId="Mojo703/eb519629244808fcecee608ca5d7f94f" />
	</Collapsible>
	<p>
		This website is a good example of my skill with HTML, JS, and CSS.
	</p>

	<h2 id="class-projects">Class Projects</h2>
	<p>
		The first image is a hand-soldered digital dice circuit (for the SFU
		class ENSC 220) with through-hole and surface mount components. The
		end result simulates rolling a die when you press the capacitive
		button.
	</p>
	<p>
		The second and third images are of an automatic window actuation
		system controlled by weather forecast (for the SFU classes ENSC 100
		and ENSC 105W). The project was completed from the ground up in a
		small team, with the goal of solving a problem we encounter in the
		world.
	</p>
	<ImageGallery
		images={[
			'/images/soldering.png',
			'/images/auto window circuit.png',
			'/images/auto window.png'
		]}
	/>

	<h2 id="mechanical">Personal Mechanical Projects</h2>
	<p>
		These images show some iterations of a tiny pocket-watch-like
		mechanism. As a design requirement, 3D printing was the manufacturing
		method.
	</p>
	<ImageGallery
		images={[
			'/images/watch escapement.png',
			'/images/gear test 2.png',
			'/images/gear test.png',
			'/images/watch escapement early.png'
		]}
	/>
	<p>Below are a few photos of some old and small personal projects:</p>
	<ul>
		<li>Prototypes for a mechanical iris mechanism.</li>
		<li>A mechanism that follows the same motion as a Strandbeest.</li>
		<li>And a practical set of hangers for the back of my old door.</li>
	</ul>
	<ImageGallery
		images={[
			'/images/Mini Projects/Iris.jpg',
			'/images/Mini Projects/Strandbeest.jpg'
		]}
	/>
</ContentLayout>

