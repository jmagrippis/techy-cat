import {json} from '@sveltejs/kit'
import type {RequestHandler} from './$types'

export const GET: RequestHandler = async ({params, locals: {ideasRepo}}) => {
	const {slug} = params
	const idea = await ideasRepo.findBySlug(slug)

	if (!idea) {
		return new Response(undefined, {status: 404})
	}

	return json({idea})
}
