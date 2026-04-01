<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import ImageGallery from '$lib/components/ImageGallery.svelte';
	import Panel from '$lib/components/Panel.svelte';
</script>

<svelte:head>
	<title>Frontier Game</title>
</svelte:head>

<Banner src="/images/banner.png" title="Frontier Project" />

<ContentLayout updated="2024-01-27">
	<Panel title="Overview">
		<p>
			A singleplayer management game made in 14 days for the 2024 Pirate
			Software Game Jam. It can be played in the browser
			<a href="https://tiki720.itch.io/frontier">here</a>.
		</p>
		<p>
			Frontier was designed around the game jam's theme of "It's Spreading."
			As such, you represent the main computer of a sleeper ship, destined
			to colonize the TRAPPIST-1 solar system. To accomplish this goal, you
			need to balance the inputs and outputs of the various systems on the
			ship. The Pathfinder IV must survive dangerous encouters in open
			space.
		</p>
		<p>
			In retrospect, the concept was overambitious, however I learned the
			limits of what I can complete as a solo developer.
		</p>
		<ImageGallery images={['/images/Frontier/unity_title.png']} />
	</Panel>

	<Panel title="Gameplay">
		<p>
			The premise behind the gameplay was that the player should be guided
			into dilemmas, where they have to make a decision that will impact the
			course of the game. With this in mind, the game was structured around
			an event timeline system, which allows the player to select a reaction
			to the event's effects. For example, one of the suspension decks
			fails, waking a large amount of crew who were prepared to sleep the
			entire journey. The options for this scenario are to put them all back
			to sleep, or make use of their skills in maintaining the ship.
		</p>
		<p>
			To accomplish this premise, an in-depth UI system was required, the
			current implemented functionality is:
		</p>
		<ul>
			<li>Resource network view, with input and output statistics.</li>
			<li>Ship system inspection, with boosting minigames.</li>
			<li>Crew management and relocation between systems.</li>
			<li>Event popup section and detailed view avaliable.</li>
			<li>Timeline showing future events.</li>
			<li>And lastly, a play, pause, and fast forward system.</li>
		</ul>
		<p>
			To create the dynamic UI, over 6,000 lines of custom code were needed,
			in addition to the unique 2D art assets, and interaction sound
			effects. The result is lacking a tutorial, and the depth of events
			that I had planned, but most of the core gameplay is in place.
		</p>
		<ImageGallery
			images={[
				'/images/Frontier/unity_ingame.png',
				'/images/Frontier/unity_targeting.png',
				'/images/Frontier/visual studio_structure.png'
			]}
		/>
	</Panel>

	<Panel title="Art">
		<p>
			The facet of making the game that I learned the most from was the 3D
			art. I have significant experience with modelling software like
			SolidWorks, but Blender has a very different workflow. However, I
			think the end result fits in well with what I wanted out of Frontier.
		</p>
		<p>
			I am most proud of the suble emission textures and lighting effects,
			that help the model feel real, within the detail limits imposed by
			browser rendering with OpenGL.
		</p>
		<ImageGallery
			images={[
				'/images/Frontier/blender_materials.png',
				'/images/Frontier/blender_unshaded.png'
			]}
		/>
		<p>
			Another challenge I encountered was making the icons legible on the
			target resolution of 960x600. This took a lot of trial and error, and
			designing distinct shaped an geometries for important sprites.
		</p>
		<ImageGallery
			images={[
				'/images/Frontier/inkscape_crew icons.png',
				'/images/Frontier/unity_final resolution.png'
			]}
		/>
	</Panel>
</ContentLayout>
