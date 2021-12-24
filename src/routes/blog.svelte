<script>
	import ComingSoon from './../components/coming-soon.svelte';
	// import Button from './../components/button.svelte';
	//
	// const posts = [
	// 	{
	// 		title: 'Boost your conversion rate',
	// 		href: '#',
	// 		description:
	// 			'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
	// 		date: 'Mar 16, 2020',
	// 		datetime: '2020-03-16'
	// 	},
	// 	{
	// 		title: 'How to use search engine optimization to drive sales',
	// 		href: '#',
	// 		description:
	// 			'Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.',
	// 		date: 'Mar 10, 2020',
	// 		datetime: '2020-03-10'
	// 	},
	// 	{
	// 		title: 'Improve your customer experience',
	// 		href: '#',
	// 		description:
	// 			'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.',
	// 		date: 'Feb 12, 2020',
	// 		datetime: '2020-02-12'
	// 	},
	// 	{
	// 		title: 'Writing effective landing page copy',
	// 		href: '#',
	// 		description:
	// 			'Ipsum voluptates quia doloremque culpa qui eius. Id qui id officia molestias quaerat deleniti. Qui facere numquam autem libero quae cupiditate asperiores vitae cupiditate. Cumque id deleniti explicabo.',
	// 		date: 'Jan 29, 2020',
	// 		datetime: '2020-01-29'
	// 	}
	// ];
</script>

<svelte:head>
	<title>Blog - Akaanksh Raj</title>
</svelte:head>

<ComingSoon />

<div class="pt-16 pb-20 lg:pt-24 lg:pb-28">
	<!--	<div class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">-->
	<div class="relative mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl">
		<div>
			<h2 class="text-3xl tracking-tight font-extrabold text-gray-100 sm:text-4xl">Blog</h2>
			<div class="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
				<p class="text-xl text-gray-300">
					Articles about things I find interesting, written and released whenever I feel like it.
				</p>
				<!--				<form class="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">-->
				<!--					<div>-->
				<!--						<label for="email-address" class="sr-only">Email address</label>-->
				<!--						<input-->
				<!--							id="email-address"-->
				<!--							name="email-address"-->
				<!--							type="email"-->
				<!--							autocomplete="email"-->
				<!--							required-->
				<!--							class="appearance-none w-full px-4 py-2 border border-gray-300 text-base rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 lg:max-w-xs"-->
				<!--							placeholder="Enter your email"-->
				<!--						/>-->
				<!--					</div>-->
				<!--					<div-->
				<!--						class="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex"-->
				<!--					>-->
				<!--						<Button href="javascript:submitNotify()">Notify Me</Button>-->
				<!--					</div>-->
				<!--				</form>-->
			</div>
		</div>
		<!--		<div class="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">-->
		<!--			{#each posts as post (post.title)}-->
		<!--				<div>-->
		<!--					<p class="text-sm text-gray-400">-->
		<!--						<time datetime={post.datetime}>{post.date}</time>-->
		<!--					</p>-->
		<!--					<a href="#" class="mt-2 block">-->
		<!--						<p class="text-xl font-semibold text-gray-100">-->
		<!--							{post.title}-->
		<!--						</p>-->
		<!--						<p class="mt-3 text-base text-gray-300">-->
		<!--							{post.description}-->
		<!--						</p>-->
		<!--					</a>-->
		<!--					<div class="mt-3">-->
		<!--						<a href={post.href} class="text-base font-semibold text-blue-600 hover:text-blue-500">-->
		<!--							Read full article-->
		<!--						</a>-->
		<!--					</div>-->
		<!--				</div>-->
		<!--			{/each}-->
		<!--		</div>-->
		<div
			class="relative block w-full border-2 border-gray-100 border-dashed rounded-2xl mt-6 pt-10 p-12 text-center"
		>
			<span class="mt-2 block font-medium text-gray-100">No articles, yet</span>
		</div>
	</div>
</div>
