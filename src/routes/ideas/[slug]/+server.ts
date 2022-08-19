import type {RequestHandler} from './__types/[slug]'

export const GET: RequestHandler = async ({params, locals: {ideasRepo}}) => {
	const {slug} = params
	const idea = await ideasRepo.findBySlug(slug)

	if (!idea) {
		return {status: 404}
	}

	return {body: {idea}}
}
