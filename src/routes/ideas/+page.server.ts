import {error, invalid} from '@sveltejs/kit'

import type {PageServerLoad, Actions} from './$types'

export const load: PageServerLoad = async ({locals: {ideasRepo}, url}) => {
	const limit = parseInt(url.searchParams.get('limit') || '50')
	const ideas = await ideasRepo.getAll({limit})

	return {
		ideas,
		meta: {
			title: 'Latest Ideas',
			description: 'The latest ideas from the Techy Cat community',
		},
	}
}

export const actions: Actions = {
	star: async ({request, locals: {ideasRepo, user}}) => {
		if (!user) {
			return invalid(401, {error: 'You must be logged in to star ideas'})
		}

		const id = (await request.formData()).get('id')

		if (typeof id !== 'string') {
			return invalid(400, {error: 'Idea `id` must be provided'})
		}

		try {
			await ideasRepo.starIdea(id, user.id)

			return {id, starred: true}
		} catch {
			return invalid(400, {error: `Could not star idea ${id}`})
		}
	},
	unstar: async ({request, locals: {ideasRepo, user}}) => {
		if (!user) {
			return invalid(401, {error: 'You must be logged in to unstar ideas'})
		}

		const id = (await request.formData()).get('id')

		if (typeof id !== 'string') {
			return invalid(400, {error: 'Idea `id` must be provided'})
		}

		try {
			await ideasRepo.unstarIdea(id, user.id)

			return {id, starred: false}
		} catch {
			return invalid(400, {error: `Could not unstar idea ${id}`})
		}
	},
}
