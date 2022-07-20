import type {RequestHandler} from '@sveltejs/kit'

export const GET: RequestHandler = async ({locals: {ideasRepo}}) => {
	const latestIdeas = await ideasRepo.getAll({limit: 3})

	return {
		body: {latestIdeas},
	}
}
