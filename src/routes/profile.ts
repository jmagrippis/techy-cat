import type {RequestHandler} from '@sveltejs/kit'

export const get: RequestHandler = async ({locals: {ideasRepo, user}}) => {
	if (!user) {
		return {
			status: 303,
			headers: {
				location: '/login',
			},
		}
	}

	const starredIdeas = await ideasRepo.getAll({
		limit: 50,
		match: {starred: true},
	})

	return {
		body: {starredIdeas},
	}
}
