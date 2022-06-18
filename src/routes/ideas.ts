import type {RequestHandler} from '@sveltejs/kit'

export const get: RequestHandler = async ({locals: {ideasRepo}, url}) => {
	const limit = parseInt(url.searchParams.get('limit') || '50')
	const ideas = await ideasRepo.getAll({limit})

	return {
		body: {ideas},
	}
}

export const post: RequestHandler = async ({
	request,
	locals: {ideasRepo, user},
}) => {
	if (!user) {
		return {
			status: 401,
		}
	}

	const id = (await request.formData()).get('id')

	if (typeof id !== 'string') {
		return {
			status: 400,
			error: 'Idea `id` must be provided',
		}
	}

	try {
		await ideasRepo.starIdea(id, user.id)
		return {
			status: 201,
		}
	} catch {
		return {
			status: 500,
		}
	}
}

export const del: RequestHandler = async ({
	request,
	locals: {ideasRepo, user},
}) => {
	if (!user) {
		return {
			status: 400,
		}
	}

	const id = (await request.formData()).get('id')

	if (typeof id !== 'string') {
		return {
			status: 401,
			error: 'Idea `id` must be provided',
		}
	}

	try {
		await ideasRepo.unstarIdea(id, user.id)
		return {
			status: 201,
		}
	} catch {
		return {
			status: 500,
		}
	}
}
