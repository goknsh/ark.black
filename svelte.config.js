import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';

import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// hydrate the <div id="app"> element in src/app.html
		target: '#app'
	},

	extensions: ['.svelte', '.md'],

	preprocess: [
		preprocess({}),
		mdsvex({ extensions: ['.md'], layout: 'src/routes/blog/post/_layout.post.svelte' })
	]
};

export default config;
