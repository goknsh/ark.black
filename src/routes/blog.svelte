<script context="module">
	export const load = async ({ fetch }) => {
		return {
			props: {
				posts: await (await fetch('/api/blog/posts')).json()
			}
		};
	};
</script>

<script>
	import BlogPosts from '$lib/components/blog-posts.svelte';
	import ComingSoon from '$lib/components/coming-soon.svelte';

	export let posts;
</script>

<svelte:head>
	<title>Blog - Akaanksh Raj</title>
</svelte:head>

<ComingSoon />

<BlogPosts {posts} />
