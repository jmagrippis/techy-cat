import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({url}) => {
	const title = 'Svelte & Tailwind Typing Animation'
	const description =
		'For a lightweight but still cool effect, with relatively little CSS & Javascript!'

	const sentences = [
		'SvelteKit tutorials',
		'React guides',
		'a good laugh!',
		'a good time!!!',
		'a great FRIDAY!',
		'quirky livestreams',
		'fluff-free videos',
	]

	return {
		sentences,
		meta: {
			title,
			description,
		},
	}
}
