import {error} from '@sveltejs/kit'

import type {PageServerLoad, Action} from './$types'

export const load: PageServerLoad = async ({params, locals: {ideasRepo}}) => {
	const {id} = params
	const idea = await ideasRepo.findById(id)

	if (!idea) {
		throw error(404)
	}

	return {
		idea,
		meta: {
			title: `Edit “${idea.name}”`,
			description:
				'Edit your own idea on the fly, but be cool with the content 👀',
		},
	}
}

export const POST: Action = async ({params, request, locals: {ideasRepo}}) => {
	const {id} = params
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
	const idea = await ideasRepo.updateIdea(id, ideaPartial)

	if (!idea) {
		throw error(401)
	}
}
