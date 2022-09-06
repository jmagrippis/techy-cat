import {error} from '@sveltejs/kit'

import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals: {ideasRepo, user}}) => {
	if (!user) {
		throw error(401)
	}

	const myIdeas = await ideasRepo.getAllForAuthorId(user.id)

	return {
		myIdeas,
		meta: {
			title: 'My ideas dashboard',
			description:
				'Overview of all the ideas you have submitted, and links to edit them',
		},
	}
}
