import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = ({locals, url}) => ({
	theme: locals.theme,
	user: locals.user,
	meta: {
		title: 'Techy Cat: Get inspired & do more tech!',
		ogTitle: 'Get inspired & do more tech!',
		description: 'Tech content and ideas for free, to help inspire you!',
		image: {
			url: `${url.origin}/meta/index-preview.png`,
			alt: 'Cat playing with yarn',
		},
	},
})
