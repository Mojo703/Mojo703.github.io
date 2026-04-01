<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import ContentLayout from '$lib/components/ContentLayout.svelte';
	import ImageGallery from '$lib/components/ImageGallery.svelte';
	import Panel from '$lib/components/Panel.svelte';
</script>

<svelte:head>
	<title>Auto Window</title>
</svelte:head>

<Banner src="/images/banner.png" title="Automatic Window" />

<ContentLayout updated="2024-01-27">
	<Panel title="Overview">
		<p>A project for ENSC 100W. An automated window actuation system.</p>
		<p>
			The goal of the class was to design a product that solves a problem in
			the world. We went through many ideas, but settled on a system to
			manage the temperature of a room. The most effective system we came up
			with was an actuator to control a window, to let cold or warm air into
			a room. We chose a sliding window, and a belt drive system.
		</p>
		<ImageGallery
			images={[
				'/images/auto window.png',
				'/images/Window/Window (Motor Assembly).png',
				'/images/auto window circuit.png',
				'/images/Window/Window (Full).png'
			]}
		/>
	</Panel>

	<Panel title="Prototyping">
		<p>
			The first major obstacle we encountered was outside weather. If it is
			raining outside, you might not want your window open. To solve this,
			our device pulls weather data from a public API (called OpenWeather)
			via HTTP and WiFi. In addition, this also keeps the microcontroller's
			internal time accurate, and provides an accurate outside temperature
			estimate. As a result, the entire device remains within the room.
		</p>
		<p>
			The second obstacle was holding a stable connection on the school's
			WiFi network. This required significant reasearch into difference
			commercial systems and standards, to allow repeated calls to the API.
			In the end, this prototype functioned most places on campus.
		</p>
		<p>
			The last major issue we encountered was reliability of the actuator.
			Occasionally the limit switches on the actuator would take too long to
			activate, and the window would try to go past its travel limits. As a
			result the motor would skip steps on its belt. To solve this, small
			springs were placed, to lengthen the avaliable actuation distance of
			the switches.
		</p>
		<ImageGallery
			images={[
				'/images/Window/Window (Sensor Circuit).png',
				'/images/Window/Window (Sensor Output).png',
				'/images/Window/Window (Weather Data).png'
			]}
		/>
	</Panel>
</ContentLayout>
