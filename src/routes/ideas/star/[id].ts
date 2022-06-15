import type {RequestHandler} from './__types/[id]'

export const post: RequestHandler = async ({
	params,
	locals: {ideasRepo, user},
}) => {
	const {id} = params

	if (!user) {
		return {
			status: 401,
		}
	}

	try {
		await ideasRepo.starIdea(id, user.id)
		return {
			status: 201,
		}
	} catch {
		return {
			status: 400,
		}
	}
}

export const del: RequestHandler = async ({
	params,
	locals: {ideasRepo, user},
}) => {
	const {id} = params

	if (!user) {
		return {
			status: 401,
		}
	}

	try {
		await ideasRepo.unstarIdea(id, user.id)
		return {
			status: 201,
		}
	} catch {
		return {
			status: 400,
		}
	}
}
