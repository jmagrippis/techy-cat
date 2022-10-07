import {redirect} from '@sveltejs/kit'

import type {PageServerLoad} from './$types'

export const load: PageServerLoad = ({locals}) => {
	if (locals.user) {
		throw redirect(307, '/profile')
	}

	return {
		meta: {
			title: 'Login',
			description: 'Login to Techy Cat to star and create your own ideas!',
		},
	}
}
