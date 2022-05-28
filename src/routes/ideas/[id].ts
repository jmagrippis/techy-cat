import {ideasRepo} from '$lib/repos/ideas'
import type {RequestHandler} from './__types/[id]'

export const get: RequestHandler = async ({params}) => {
	const idea = await ideasRepo.find(params.id)

	if (!idea) {
		return {
			status: 404,
		}
	}

	return {
		body: {idea},
	}
}
