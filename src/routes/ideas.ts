import type {RequestHandler} from '@sveltejs/kit'

export const get: RequestHandler = async ({locals: {ideasRepo}, url}) => {
	const limit = parseInt(url.searchParams.get('limit') || '50')
	const ideas = await ideasRepo.getAll({limit})

	return {
		body: {ideas},
	}
}
