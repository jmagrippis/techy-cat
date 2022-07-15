import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import svg from '@poppanator/sveltekit-svg'

const svgPlugin = svg({
	svgoOptions: {
		multipass: true,
		plugins: [
			{
				name: 'preset-default',
				params: {
					overrides: {
						removeViewBox: false,
					},
				},
			},
			'removeDimensions',
		],
	},
})

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
			plugins: [svgPlugin],
			test: {
				mockReset: true,
				environment: 'jsdom',
				globals: true,
				setupFiles: 'src/setupTests.ts',
				include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
				deps: {
					inline: ['unique-names-generator'],
				},
			},
		},
	},
}

export default config
