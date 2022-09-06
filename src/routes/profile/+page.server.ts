import {error, redirect} from '@sveltejs/kit'

import type {PageServerLoad, Action} from './$types'

export const load: PageServerLoad = async ({locals: {ideasRepo, user}}) => {
	if (!user) {
		throw redirect(307, '/login')
	}

	const starredIdeas = await ideasRepo.getAll({
		limit: 50,
		match: {starred: true},
	})

	return {
		starredIdeas,
		meta: {
			title: 'My Profile',
			description:
				'Your profile on Techy Cat, including the ideas you have starred',
		},
	}
}

export const POST: Action = async ({request, locals: {userRepo, user}}) => {
	if (!user) {
		throw error(401)
	}

	const formData = await request.formData()
	const displayName = formData.get('display_name')

	if (!displayName || typeof displayName !== 'string') {
		return {errors: {displayName: 'You need to specify a display name'}}
	}

	const updatedUser = await userRepo.updateDisplayName(user.id, displayName)

	if (!updatedUser) {
		throw error(400, `Could not update display name to ${displayName}`)
	}
}
