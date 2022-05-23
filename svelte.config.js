import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({edge: false}),

		methodOverride: {
			allowed: ['PUT', 'PATCH', 'DELETE'],
		},

		vite: {
			plugins: [],
			test: {
				mockReset: true,
				environment: 'jsdom',
				globals: true,
				setupFiles: 'src/setupTests.ts',
			},
		},
	},
}

export default config
