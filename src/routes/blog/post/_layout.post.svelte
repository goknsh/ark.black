<script>
	export let title;
	export let date;
	export let description;

	import 'prism-themes/themes/prism-nord.css';
</script>

<svelte:head>
	<title>{title} - Blog - Akaanksh Raj</title>
</svelte:head>

<div class="w-full flex justify-center">
	<article class="w-full my-10">
		<div class="w-full text-lg max-w-prose mx-auto">
			<h1>
				<span
					class="block text-base text-center text-blue-600 font-semibold tracking-wide uppercase"
					>{date}</span
				>
				<span
					class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
					>{title}</span
				>
			</h1>
			{#if description}
				<p class="mt-4 text-xl text-center text-gray-400 leading-8">
					{description}
				</p>
			{/if}
		</div>
		<div
			class="mt-6 prose prose-invert prose-blue prose-lg !prose-pre:bg-gray-800 prose-code:bg-gray-800 prose-code:p-0.5 prose-code:rounded-md prose-a:text-blue-400 mx-auto"
		>
			<slot />
		</div>
	</article>
</div>
