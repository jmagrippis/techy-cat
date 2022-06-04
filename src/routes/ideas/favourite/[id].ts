import type {RequestHandler} from './__types/[id]'

export const post: RequestHandler = async ({
	params,
	locals: {ideasRepo, user},
}) => {
	const {id} = params

	try {
		await ideasRepo.favouriteIdea(id, user.id)
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

	try {
		await ideasRepo.removeFavouriteIdea(id, user.id)
		return {
			status: 201,
		}
	} catch {
		return {
			status: 400,
		}
	}
}
