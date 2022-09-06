import type {PageServerLoad} from './$types'

export const load: PageServerLoad = () => ({
	meta: {
		title: 'About',
		description:
			'About the Techy Cat project & Johnny’s free YouTube with guides for all the functionality 🙌',
	},
})
