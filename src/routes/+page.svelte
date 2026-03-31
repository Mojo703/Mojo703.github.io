<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import PagePane from '$lib/components/PagePane.svelte';
</script>

<svelte:head>
	<title>Matthew's Website</title>
</svelte:head>

<Banner src="/images/banner.png" title="Matthew Goodman" />

<ContentLayout>
	<h2>Who am I:</h2>
	<p>
		I am a third year Computer Engineering major at Simon Fraser
		University. My largest interests are game development, hiking, and
		reading. I have a passion for solving problems, and I love programming.
	</p>
	<p>
		From my start of building cardboard forts,
		creating massive popsicle stick boats, and making lightweight gliders,
		I have progressed to working on game development, mechanical design of
		soccer playing robots, and studying to become a computer engineer at SFU.
	</p>

	<h2>My Projects:</h2>

	<PagePane
		image="/images/Digit Recognition.png"
		alt="Screenshots showing the digit classification client."
		title="Digit Classify"
		href="/projects/Digit Classify/index.html"
		external
	>
		A personal project. A client-side digit classification system. The page contains a canvas for the user to
		draw on, which gets classified locally by a convolutional neural network. It runs in real time using a WASM
		and web worker structure.
	</PagePane>

	<PagePane
		image="/images/Frontier/title.png"
		alt="A screenshot from the Frontier game."
		title="Frontier"
		href="/game-frontier"
	>
		A singleplayer management game made in 14 days for the 2024 Pirate
		Software Game Jam. Read more here, or follow this link to play the
		game in your browser on
		<a href="https://tiki720.itch.io/frontier">Itch.io</a>.
	</PagePane>

	<PagePane
		image="/images/Cover removed.png"
		alt="A render of the partially assembled Robot."
		title="Robot Soccer"
		href="/robot-soccer"
	>
		Key member of the mechanics sub-team of the Robot Soccer club at
		SFU. Our goal is to compete in the 2025 robocup small size league.
	</PagePane>

	<PagePane
		image="/images/Evolution.png"
		alt="A screenshot from the Evolution game."
		title="Evolution"
		href="/projects/Evolution/index.html"
		external
	>
		A personal project. A simulation about evolution via natural
		selection. The creatures brains and bodies evolve as they compete
		for limited resources. WASD for camera movement, scroll wheel to
		zoom, and left click for selection (to open the info panel for
		creatures).
	</PagePane>

	<PagePane
		image="/images/Cooperation_ingame.png"
		alt="A screenshot from the Break it Down game."
		title="Break it Down"
		href="https://tiki720.itch.io/break-it-down"
		external
	>
		A personal project, made for a game jam. In the arcade-like puzzle
		and finesse game, Break it Down, your goal is to deconstruct objects
		with your AI partner. Choose the right tool for the job, but be
		quick; you will get less time per deconstruction as the game
		progresses.
	</PagePane>

	<PagePane
		image="/images/Window/Window (Full).png"
		alt="A picture of a motorized window."
		title="Automatic Window System"
		href="/auto-window"
	>
		A group project for the ENSC 100W class at SFU. My team designed an
		automatic window actuation system, to control a room's temperature
		using the outside air. It uses an inside temperature sensor,
		external weather data, and the time of day to control the actuation
		of a window.
	</PagePane>
</ContentLayout>
