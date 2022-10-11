import type {RequestHandler} from './$types'

export const GET: RequestHandler = async () =>
	new Response(null, {
		status: 404,
	})
