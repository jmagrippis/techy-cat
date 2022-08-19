import {error} from '@sveltejs/kit'

import type {PageServerLoad, Action} from './$types'

export const load: PageServerLoad = async ({locals: {ideasRepo}, url}) => {
	const limit = parseInt(url.searchParams.get('limit') || '50')
	const ideas = await ideasRepo.getAll({limit})

	return {ideas}
}

export const POST: Action = async ({request, locals: {ideasRepo, user}}) => {
	if (!user) {
		throw error(401)
	}

	const id = (await request.formData()).get('id')

	if (typeof id !== 'string') {
		return {
			errors: {id: 'Idea `id` must be provided'},
		}
	}

	try {
		await ideasRepo.starIdea(id, user.id)
	} catch {
		throw error(400, `Could not star ide ${id}`)
	}
}

export const DELETE: Action = async ({request, locals: {ideasRepo, user}}) => {
	if (!user) {
		throw error(401)
	}

	const id = (await request.formData()).get('id')

	if (typeof id !== 'string') {
		return {
			errors: {id: 'Idea `id` must be provided'},
		}
	}

	try {
		await ideasRepo.unstarIdea(id, user.id)
	} catch {
		throw error(400, `Could not star ide ${id}`)
	}
}
