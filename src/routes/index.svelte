<script>
	import ComingSoon from '$lib/components/coming-soon.svelte';

	let projects = [
		{
			name: 'Name that Color',
			description:
				'Name that Color is a simple yet complex game to put your right side of the brain in war with your left side of the brain. The game has five levels with increasing difficulty, two competitive leaderboards as well, so users can signup for an account and compete for the top ten spots. Future plans include adding a store where themes and sound effects are purchasable with currency earned by playing the game. The game is currently a work in progress.',
			href: 'https://ntc.ark.black/',
			imgSrc: '/img/projects/ntc.svg',
			imgClass: 'bg-rose-100'
		},
		{
			name: 'Math Server',
			description:
				'A single-threaded server that evaluates mathematical expressions, complete with a protobuf/gRPC-like custom protocol, first-in-first-out equation evaluation, and a simple logger.',
			href: 'https://github.com/goknsh/math-server',
			imgClass: 'bg-gray-100'
		},
		{
			name: 'Aurus',
			description:
				"A discord bot that's loaded with features and fit for everyone, including for work and gamers. Has commands for moderation — like ban, unban, channel clear, kick — competitive game's ELO/MMR tracking, fun commands — 50/50, 8-ball, bird, cat, jokes — reaction-role assignment, and voice channel creation.",
			href: 'https://github.com/goknsh/aurus',
			imgSrc: '/img/projects/aurus.svg',
			imgClass: 'bg-sky-100'
		},
		{
			name: 'Hawk',
			description:
				"A service that tracks a website's uptime, latency and SSL configuration. The app collects and provides detailed information for each check and notifies the user if a website experiences downtime, high latency or an SSL certificate expiry.",
			href: 'https://github.com/goknsh?tab=repositories&q=hawk',
			imgClass: 'bg-teal-100'
		},
		{
			name: 'Threads',
			description:
				'A comments API, with authentication, domain management, comment moderation, replies, and dashboard to manage it all.',
			href: 'https://github.com/goknsh/threads-v1',
			imgClass: 'bg-indigo-100'
		},
		{
			name: 'Zori',
			description: 'A collection of random, useful apps.',
			href: 'https://github.com/goknsh/zori',
			imgSrc: '/img/projects/zori.svg',
			imgClass: 'bg-amber-100'
		}
	];
</script>

<svelte:head>
	<title>Home - Akaanksh Raj</title>
</svelte:head>

<ComingSoon />

<div class="py-4 sm:py-8 mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl">
	<div class="relative rounded-2xl pb-12 bg-cyan-600">
		<div class="relative py-10 px-4 sm:py-20 sm:px-6 lg:px-8">
			<h1 class="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
				My Projects
			</h1>
			<p class="mt-6 max-w-3xl text-xl text-gray-300">
				These are the things I make to spend my free time or learn technologies.
			</p>
		</div>
	</div>
	<div
		class="-mt-12 rounded-2xl bg-cyan-600 overflow-hidden shadow divide-y divide-cyan-600 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px"
	>
		{#each projects as project, projectIdx (project.name)}
			<div
				class="relative group bg-cyan-800 p-6
				{projectIdx === 0 ? 'rounded-tl-2xl rounded-tr-2xl sm:rounded-tr-none' : ''}
				{projectIdx === 1 ? 'sm:rounded-tr-2xl' : ''}
				{projectIdx === projects.length - 2 ? 'sm:rounded-bl-2xl' : ''}
				{projectIdx === projects.length - 1 ? 'rounded-bl-2xl rounded-br-2xl sm:rounded-bl-none' : ''}"
			>
				<div>
					<span class="rounded-lg inline-flex p-3 {project.imgClass}">
						{#if project.imgSrc}
							<img src={project.imgSrc} alt={project.name + "'s logo"} class="h-6 w-6" />
						{/if}
					</span>
				</div>
				<div class="mt-4">
					<h3 class="text-white text-lg font-medium">
						<a href={project.href} class="focus:outline-none">
							<!-- Extend touch target to entire panel -->
							<span class="absolute inset-0" aria-hidden="true" />
							{project.name}
						</a>
					</h3>
					<p class="mt-2 text-sm text-gray-300">
						{project.description}
					</p>
				</div>
				<span
					class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
					aria-hidden="true"
				>
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
						/>
					</svg>
				</span>
			</div>
		{/each}
	</div>
</div>
