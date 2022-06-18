import type {RequestHandler} from '@sveltejs/kit'

export const get: RequestHandler = async ({locals: {ideasRepo}, url}) => {
	const latestIdeas = await ideasRepo.getAll({limit: 3})

	return {
		body: {latestIdeas},
	}
}
