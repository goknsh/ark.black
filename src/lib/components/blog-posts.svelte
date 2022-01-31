<script>
	// import Button from '$lib/components/button.svelte';

	export let category;
	export let posts = [];
</script>

<div class="pt-16 pb-20 lg:pt-24 lg:pb-28">
	<div class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
		<div class="relative mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl">
			<div>
				<h2 class="text-3xl tracking-tight font-extrabold text-gray-100 sm:text-4xl">
					{#if category}
						Category: {category}
					{:else}
						Blog
					{/if}
				</h2>
				<div class="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
					<p class="text-xl text-gray-300">
						{#if category}
							Articles with the category &ldquo;{category}&rdquo;
						{:else}
							Articles about things I find interesting, written and released whenever I feel like
							it.
						{/if}
					</p>
					<!--					<form class="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">-->
					<!--						<div>-->
					<!--							<label for="email-address" class="sr-only">Email address</label>-->
					<!--							<input-->
					<!--								id="email-address"-->
					<!--								name="email-address"-->
					<!--								type="email"-->
					<!--								autocomplete="email"-->
					<!--								required-->
					<!--								class="appearance-none w-full px-4 py-2 border border-gray-300 text-base rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 lg:max-w-xs"-->
					<!--								placeholder="Enter your email"-->
					<!--							/>-->
					<!--						</div>-->
					<!--						<div-->
					<!--							class="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex"-->
					<!--						>-->
					<!--							<Button href="javascript:submitNotify()">Notify Me</Button>-->
					<!--						</div>-->
					<!--					</form>-->
				</div>
			</div>
			{#if posts.length > 0}
				<div class="grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
					{#each posts as post}
						<div class="bg-gray-800 p-4 rounded-xl">
							<div>
								{#each post.meta.categories as category, i}
									<a href="/blog/category/{category}" class="inline-block">
										<span
											class="{i === 0 ? 'bg-blue-300 text-blue-800' : ''} {i === 1
												? 'ml-2 bg-green-300 text-green-800'
												: ''} inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
										>
											{category}
										</span>
									</a>
								{/each}
							</div>
							<a href={post.href} class="block mt-4">
								<p class="text-xl font-semibold text-white">
									{post.meta.title}
								</p>
								<p class="mt-3 text-base text-gray-300">
									{post.meta.description}
								</p>
							</a>
						</div>
					{/each}
				</div>
			{:else}
				<div
					class="relative block w-full border-2 border-gray-100 border-dashed rounded-2xl mt-6 pt-10 p-12 text-center"
				>
					<span class="mt-2 block font-medium text-gray-100">No articles, yet</span>
				</div>
			{/if}
		</div>
	</div>
</div>
