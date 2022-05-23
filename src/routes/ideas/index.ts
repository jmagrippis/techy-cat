import {ideasRepo} from '$lib/repos/ideas'
import type {RequestHandler} from '@sveltejs/kit'

/* GET /ideas */
export const get: RequestHandler = async ({url}) => {
	const limit = parseInt(url.searchParams.get('limit') || '50')
	const ideas = await ideasRepo.getAll({limit})

	return {
		body: {ideas},
	}
}
