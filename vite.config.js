import {sveltekit} from '@sveltejs/kit/vite'
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

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), svgPlugin],
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
}

export default config
