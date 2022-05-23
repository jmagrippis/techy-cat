import {ideasRepo} from '$lib/repos/ideas'
import type {RequestHandler} from '@sveltejs/kit'

/* GET /ideas */
export const get: RequestHandler = async () => {
	const ideas = await ideasRepo.getAll()

	return {
		body: {ideas},
	}
}
