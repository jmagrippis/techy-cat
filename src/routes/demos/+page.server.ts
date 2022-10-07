import {TEN_YEARS_IN_SECONDS} from '$lib/constants'
import {invalid} from '@sveltejs/kit'
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

export const load: PageServerLoad = async ({cookies}) => {
	const demosWithHearts = demos.map((demo) => ({
		...demo,
		hearted: !!cookies.get(`hearted-demo-${demo.id}`),
	}))

	return {
		demos: demosWithHearts,
		meta: {
			title: 'Latest Demos',
			description:
				'The latest demos by the Techy Cat community, FOR the Techy Cat community!',
		},
	}
}

export const actions: Actions = {
	heart: async ({request, cookies}) => {
		const id = (await request.formData()).get('id')

		if (typeof id !== 'string') {
			return invalid(400, {error: 'Idea `id` must be provided'})
		}

		cookies.set(`hearted-demo-${id}`, '💜', {
			path: '/demos',
			maxAge: TEN_YEARS_IN_SECONDS,
		})
	},

	unheart: async ({request, cookies}) => {
		const id = (await request.formData()).get('id')

		if (typeof id !== 'string') {
			return invalid(400, {error: 'Idea `id` must be provided'})
		}

		cookies.delete(`hearted-demo-${id}`, {path: '/demos'})
	},
}
