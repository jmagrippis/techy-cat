import {invalid, redirect} from '@sveltejs/kit'

import type {PageServerLoad, Actions} from './$types'

export const load: PageServerLoad = async () => ({
	meta: {
		title: 'Create a new idea',
		description: 'Publish your own new idea on Techy Cat!',
	},
})

export const actions: Actions = {
	default: async ({request, locals: {ideasRepo, user}}) => {
		if (!user) {
			return invalid(401, {error: 'You must be logged in to star ideas'})
		}

		const formData = await request.formData()
		const emoji = formData.get('emoji')
		const name = formData.get('name')
		const slug = formData.get('slug')
		const description = formData.get('description')

		if (
			!emoji ||
			typeof emoji !== 'string' ||
			!name ||
			typeof name !== 'string' ||
			!slug ||
			typeof slug !== 'string' ||
			!description ||
			typeof description !== 'string'
		) {
			return invalid(400, {
				error:
					'you need to specify valid values for all of emoji, name, slug & description',
			})
		}

		const ideaPartial = {
			emoji,
			name,
			slug,
			description,
		}
		const idea = await ideasRepo.createIdea(ideaPartial, user.id)

		if (!idea) {
			return invalid(401, {
				error: `something went wrong creating your idea... Do you have permission to submit ideas?`,
			})
		}

		throw redirect(303, `/dashboard/ideas/${idea.id}`)
	},
}
