<script lang="ts">
	import '../app.css';

	let menu = [
		{ name: 'Blog', href: '/blog' },
		{ name: 'Contact', href: 'mailto:work@ark.black' }
	];
</script>

<header class="bg-blue-600">
	<nav aria-label="Top" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div
			class="w-full py-3 flex items-center justify-between border-b border-indigo-500 lg:border-none"
		>
			<div class="flex items-center">
				<a href="/">
					<span class="sr-only">Akaanksh Raj</span>
					<img alt="Akaanksh Raj&apos;s Logo" class="h-10 w-auto" src="/img/logo.svg" />
				</a>
			</div>
			<div class="ml-10 space-x-6">
				{#each menu as item (item.name)}
					<a href={item.href} class="text-base font-medium text-white hover:text-indigo-50"
						>{item.name}</a
					>
				{/each}
			</div>
		</div>
	</nav>
</header>

<main class="bg-black">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<slot />
	</div>
</main>

<footer class="bg-gray-900">
	<div
		class="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8"
	>
		<div class="flex justify-center space-x-6 md:order-2">
			<a class="text-gray-400 hover:text-gray-300" href="https://github.com/goknsh">
				<span class="sr-only">GitHub</span>
				<svg aria-hidden="true" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path
						clip-rule="evenodd"
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
						fill-rule="evenodd"
					/>
				</svg>
			</a>
		</div>
		<div class="mt-8 md:mt-0 md:order-1">
			<p class="text-center text-base text-gray-400">
				&copy; {new Date().getFullYear()} Akaanksh Raj. All rights reserved.
			</p>
		</div>
	</div>
</footer>
