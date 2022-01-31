<script context="module">
	export const load = async ({ page, fetch }) => {
		const category = page.params.id;
		const posts = await (await fetch('/api/blog/posts')).json();
		const matchingPosts = posts.filter((post) => post.meta.categories.includes(category));

		return {
			props: {
				category: category,
				posts: matchingPosts
			}
		};
	};
</script>

<script>
	import BlogPosts from '$lib/components/blog-posts.svelte';

	export let category;
	export let posts;
</script>

<BlogPosts {posts} {category} />
