import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({url}) => {
	const title = 'Svelte & Tailwind Typing Animation'
	const description =
		'For a lightweight but still cool effect, with relatively little CSS & Javascript!'

	return {
		meta: {
			title,
			description,
		},
	}
}
