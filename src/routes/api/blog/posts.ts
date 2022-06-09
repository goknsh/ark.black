export const get = async () => {
	const postFiles = Object.entries(import.meta.glob('./../../blog/post/*.md'));

	const allPosts = await Promise.all(
		postFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const postPath = path.slice(7, -3);

			return {
				meta: metadata,
				href: postPath
			};
		})
	);

	return {
		body: allPosts.sort((a, b) => {
			return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
		})
	};
};
