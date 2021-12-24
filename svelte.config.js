import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// hydrate the <div id="app"> element in src/app.html
		target: '#app'
	},

	preprocess: [preprocess({})]
};

export default config;
