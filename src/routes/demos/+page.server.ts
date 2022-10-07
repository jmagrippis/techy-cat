import type {PageServerLoad, Actions} from './$types'

const demos = [
	{
		id: '732b43c8-3f6e-4c2c-92cb-ac8b9e0cf7bb',
		author: 'Johnny',
		link: '/demos/lottie',
		title: 'Animations with Lottie',
		description:
			'A playground for user interactions with extra flair, thanks to Lottie!',
		tags: ['frontend'],
		createdAt: '2022-10-07T07:30:12.141Z',
		updatedAt: '2022-10-07T07:30:12.141Z',
		hearted: false,
	},
]

export const load: PageServerLoad = async () => ({
	demos,
	meta: {
		title: 'Latest Demos',
		description:
			'The latest demos by the Techy Cat community, FOR the Techy Cat community!',
	},
})

export const actions: Actions = {
	heart: async () => {
		// TODO: allow hearting with cookies?
	},
	unheart: async () => {
		// TODO: allow... un-hearting with cookies?
	},
}
