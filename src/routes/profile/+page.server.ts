import type {RequestHandler} from '@sveltejs/kit'

export const GET: RequestHandler = async ({locals: {ideasRepo, user}}) => {
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

export const POST: RequestHandler = async ({
	request,
	locals: {userRepo, user},
}) => {
	if (!user) {
		return {
			status: 401,
		}
	}

	const formData = await request.formData()
	const displayName = formData.get('display_name')

	if (!displayName || typeof displayName !== 'string') {
		return {
			status: 400,
			body: 'you need to specify a display name',
		}
	}

	const updatedUser = await userRepo.updateDisplayName(user.id, displayName)

	if (!updatedUser) {
		return {status: 500}
	}

	return {body: {user: updatedUser}}
}
