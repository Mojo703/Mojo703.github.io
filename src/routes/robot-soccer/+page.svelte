<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import ImageGallery from '$lib/components/ImageGallery.svelte';
</script>

<svelte:head>
	<title>Robot Soccer</title>
</svelte:head>

<Banner src="/images/banner.png" title="Mechanics Team" />

<ContentLayout updated="2024-01-27">
	<h2>Overview</h2>
	<p>
		I am a key member of the Mechanics team for the SFU Robot Soccer club.
	</p>
	<p>
		The club is split into 4 design teams: Software, Firmware,
		Electronics, and Mechanics. The mechanics team's role is to design the
		physical robot. Some examples of our design work are: the drive
		system, the kicker and dribbler assemblies, and mounting solutions for
		electronics parts. Below are some SolidWorks renders of the team's
		work on the robot. The team's prototyping is done with 3D printing
		since it is rapid and strong enough to do limited testing. To meet our
		goals, I printed the yellow parts with PETG.
	</p>
	<ImageGallery
		images={[
			'/images/Dissasembled Robot 3.png',
			'/images/Full render.png',
			'/images/Kicker.png',
			'/images/Dissasembled Robot 2.png'
		]}
	/>

	<h2>My Work</h2>
	<p>
		I have personally designed or revised many of the mechanical
		components of the robot, most notably the spiral-shaped dribbler, its
		drive train assembly, the horizontal structural plates, and the main
		electronics mounting brackets.
	</p>
	<ImageGallery
		images={[
			'/images/Cover removed.png',
			'/images/Dribbler Assembly.png'
		]}
	/>
</ContentLayout>
