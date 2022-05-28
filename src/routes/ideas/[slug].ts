import type {RequestHandler} from './__types/[slug]'

export const get: RequestHandler = async ({params, locals}) => {
	const idea = await locals.ideasRepo.find(params.slug)

	if (!idea) {
		return {
			status: 404,
		}
	}

	return {
		body: {idea},
	}
}
