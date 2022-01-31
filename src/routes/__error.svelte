<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: { error, status }
		};
	}
</script>

<script>
	import Button from '$lib/components/button.svelte';

	export let status;
	export let error;

	// we don't want to use <svelte:window bind:online> here,
	// because we only care about the online state when
	// the page first loads
	const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
</script>

<svelte:head>
	{#if online}
		<title>Error {status} - Akaanksh Raj</title>
	{:else}
		<title>You're Offline - Akaanksh Raj</title>
	{/if}
</svelte:head>

<div class="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
	<div class="max-w-max mx-auto">
		<main class="sm:flex">
			<p class="text-4xl font-extrabold text-blue-600 sm:text-5xl">{online ? status : 'X_X'}</p>
			<div class="sm:ml-6">
				<div class="sm:border-l sm:border-gray-200 sm:pl-6">
					<h1 class="text-4xl font-extrabold text-gray-100 tracking-tight sm:text-5xl">
						{#if online}
							Error has Occurred
						{:else}
							You&rsquo;re Offline
						{/if}
					</h1>
					<p class="mt-1 text-base text-gray-300">
						{#if error.message && online}
							{error.message}
						{:else}
							Check your internet connection, and refresh when online.
						{/if}
					</p>
				</div>
				<div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
					{#if online}
						<Button href="/">Go back home</Button>
					{:else if !online || status >= 500}
						<Button href="javascript:location.reload(true)">Refresh</Button>
					{/if}
				</div>
			</div>
		</main>
	</div>
</div>
