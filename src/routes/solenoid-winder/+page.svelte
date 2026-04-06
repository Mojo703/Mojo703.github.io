<script lang="ts">
	import Banner from "$lib/components/Banner.svelte";
	import ContentLayout from "$lib/components/ContentLayout.svelte";
	import FileTree from "$lib/components/FileTree.svelte";
	import ImageGallery from "$lib/components/ImageGallery.svelte";
	import Panel from "$lib/components/Panel.svelte";

	let { data } = $props();
</script>

<svelte:head>
	<title>Solenoid Winding Machine</title>
</svelte:head>

<Banner src="/images/banner.png" title="Solenoid Winding Machine" />

<ContentLayout updated={data.updated}>
	<Panel title="Overview">
		<p>
			A group project for ENSC 351. We built a bench top, CNC solenoid
			winding machine. The machine uses a C-axis spindle to rotate a
			bobbin and a Z-axis linear traverse to place wire in precise layers.
			Wire tension is conditioned by a brake and measured via a force
			sensor, and end-stop switches provide absolute positioning. The
			working area supports bobbins up to 150 mm radius and 130 mm length.
		</p>
		<p>
			The team consisted of four members, each responsible for a
			subsystem: motion system design, wire routing and tensioning,
			electronics and power, and the logic and control software.
		</p>
		<ImageGallery
			images={[
				"/images/Winding/milestone_img-000.png",
				"/images/Winding/milestone_img-001.png",
				"/images/Winding/winding_machine_semi_finished.jpg",
			]}
		/>
	</Panel>

	<Panel title="Design">
		<p>
			The entire machine was designed in SolidWorks. The frame is
			constructed from steel tube, cut to length with drilled mounting
			holes for the motor mounts, linear stage rails, and electronics bay.
			Both axes use closed-loop stepper motors with the same model of
			driver. The C-axis drives the spindle rotation, and the Z-axis uses
			a lead screw to position the wire feed point along the bobbin.
		</p>
		<p>
			The C-axis was originally driven by a 48V AC servo motor (as in
			pictures), controlled via Modbus over RS485. It failed due to
			electromagnetic interference conducted through the steel frame (we
			measured over 2 Vpp on the frame with an oscilloscope, despite the
			motor being electrically isolated with a plastic mount). After the
			servo failed, we replaced it with a larger stepper motor matching
			the Z-axis driver, using step and direction pulses over GPIO. The
			steppers later developed thermal issues under sustained use, which
			we resolved by adding a computer heatsink and fan.
		</p>
		<p>
			The wire routing stage includes idler pulleys, a brake drum for
			tension control, and a force gauge for real-time tension
			measurement. A spool mount holds the wire supply, and the wire is
			guided through the tensioning system before reaching the bobbin.
		</p>
		<ImageGallery
			images={[
				"/images/Winding/frame_design-1.png",
				"/images/Winding/frame_design-2.png",
			]}
		/>
	</Panel>

	<Panel title="My Work">
		<p>
			I was responsible for the logic system: the control software that
			runs the machine. The software runs on a BeagleY-AI single board
			computer and is written in Rust. It communicates with the motor
			drivers over GPIO and SPI to send position and speed commands.
		</p>
		<p>
			I built a Terminal User Interface (TUI) using the ratatui library,
			which displays real-time motor state including position, speed, and
			target values. The TUI also provides a command input for issuing
			movement commands and a log panel for debugging. The interface was
			designed to work over both local HDMI and remote SSH, which led to
			the decision to use a TUI rather than a GUI.
		</p>
		<ImageGallery
			images={[
				"/images/Winding/milestone_img-002.png",
				"/images/Winding/winding_machine_tui.png",
				"/images/Winding/winding_video_frame.png",
			]}
		/>
	</Panel>

	<Panel title="Firmware Architecture">
		<p>
			The firmware is written in Rust and runs on a BeagleY-AI single
			board computer. It uses a threaded architecture with each motor
			controller pinned to a dedicated CPU core for real-time performance.
			The system is built around trait-based hardware abstractions, a
			type-safe units system to prevent dimensional errors, and a state
			machine for managing multi-layer winding jobs. The hardware
			abstraction defines common traits for servos and spindles, so the
			higher-level machine code is agnostic to the actual motor type. This
			proved critical when the C-axis AC servo failed: we were able to
			swap it for a stepper motor with only a configuration change, with
			no restructuring of the control logic.
		</p>
		<FileTree>
			<ul>
				<li>
					<span class="dir">src/</span>
					<ul>
						<li>
							main.rs <span class="note"
								>Entry point, TUI event loop</span
							>
						</li>
						<li>
							command.rs <span class="note"
								>Command parser with validation</span
							>
						</li>
						<li>
							job.rs <span class="note"
								>Winding job state machine</span
							>
						</li>
						<li>
							units.rs <span class="note"
								>Type-safe physical units</span
							>
						</li>
						<li>
							ratio.rs <span class="note"
								>Dimensional analysis</span
							>
						</li>
						<li>
							measure.rs <span class="note"
								>Sensor caching with decay</span
							>
						</li>
						<li>
							logging.rs <span class="note"
								>Log panel for TUI</span
							>
						</li>
						<li>
							<span class="dir">machine/</span>
							<ul>
								<li>
									mod.rs <span class="note"
										>Machine orchestrator</span
									>
								</li>
								<li>
									c_axis.rs <span class="note"
										>Spindle rotation control</span
									>
								</li>
								<li>
									z_axis.rs <span class="note"
										>Linear traverse control</span
									>
								</li>
							</ul>
						</li>
						<li>
							<span class="dir">hardware/</span>
							<ul>
								<li>
									mod.rs <span class="note"
										>Hardware traits: Servo, Spindle</span
									>
								</li>
								<li>
									axis.rs <span class="note"
										>Angle-to-distance adapter</span
									>
								</li>
								<li>
									gpio_stepper.rs <span class="note"
										>GPIO pulse generation</span
									>
								</li>
								<li>
									pwm_stepper.rs <span class="note"
										>PWM frequency stepping</span
									>
								</li>
								<li>
									threaded.rs <span class="note"
										>Servo worker thread, CPU-pinned</span
									>
								</li>
								<li>
									spindle_threaded.rs <span class="note"
										>Spindle worker thread, CPU-pinned</span
									>
								</li>
								<li>
									tmc5160.rs <span class="note"
										>Stepper driver over SPI</span
									>
								</li>
								<li>
									laser.rs <span class="note"
										>Laser GPIO control</span
									>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</FileTree>
		<p>
			The winding job state machine coordinates both axes to wind wire in
			a back-and-forth pattern across layers. It calculates the Z-axis
			position from the C-axis rotation angle and a configurable stepover
			ratio, reversing direction at each layer boundary. Motor threads
			communicate with the main loop through non-blocking channels.
		</p>
	</Panel>
</ContentLayout>
