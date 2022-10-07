import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async () => ({
	meta: {
		title: 'Lottie + SvelteKit Interactive Demo',
		description:
			'A dedicated showcase of how to use Lottie for idle looping animations, as well as in response to user actions.',
	},
})
