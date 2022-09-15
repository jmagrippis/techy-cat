import {invalid, redirect} from '@sveltejs/kit'

import type {PageServerLoad, Actions} from './$types'

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

export const actions: Actions = {
	default: async ({request, locals: {userRepo, user}}) => {
		if (!user) {
			return invalid(401, {
				error:
					'You must be logged in to change your display name! To HAVE a display name even.',
			})
		}

		const formData = await request.formData()
		const displayName = formData.get('display_name')

		if (!displayName || typeof displayName !== 'string') {
			return invalid(400, {error: 'You need to specify a display name'})
		}

		const updatedUser = await userRepo.updateDisplayName(user.id, displayName)

		if (!updatedUser) {
			return invalid(400, {
				error: `Could not update display name to ${displayName}... Maybe it's taken?`,
			})
		}

		return updatedUser
	},
}
