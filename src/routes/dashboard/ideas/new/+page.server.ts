import {error} from '@sveltejs/kit'

import type {PageServerLoad, Action} from './$types'

export const load: PageServerLoad = async () => ({
	meta: {
		title: 'Create a new idea',
		description: 'Publish your own new idea on Techy Cat!',
	},
})

export const POST: Action = async ({request, locals: {ideasRepo, user}}) => {
	if (!user) {
		throw error(401)
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
		return {
			errors: {
				message:
					'you need to specify valid values for all of emoji, name, slug & description',
			},
		}
	}

	const ideaPartial = {
		emoji,
		name,
		slug,
		description,
	}
	const idea = await ideasRepo.createIdea(ideaPartial, user.id)

	if (!idea) {
		throw error(401)
	}

	return {location: `/dashboard/ideas/${idea.id}`}
}
