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
			'A playground for user interactions with extra flair, thanks to Lottie! Heart your heart out 😄',
		tags: ['frontend'],
		createdAt: '2022-10-07T07:30:12.141Z',
		updatedAt: '2022-10-07T07:30:12.141Z',
		hearted: false,
	},
	{
		id: 'cfef1de4-aa93-4e23-9b22-56825976a589',
		author: 'Johnny',
		link: '/demos/dynamic-preview-images',
		title: 'Dynamic Social Preview Images',
		description:
			'When you want eye-catching Social Preview Snippets for sharing on your social networks, that integrate dynamic data!',
		tags: ['frontend'],
		createdAt: '2022-10-07T12:30:12.141Z',
		updatedAt: '2022-10-07T12:30:12.141Z',
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
			title: 'Interactive Demos',
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
