import {ideasRepo} from '$lib/repos/ideas'
import type {RequestHandler} from './__types/[slug]'

export const get: RequestHandler = async ({params}) => {
	const idea = await ideasRepo.find(params.slug)

	if (!idea) {
		return {
			status: 404,
		}
	}

	return {
		body: {idea},
	}
}
