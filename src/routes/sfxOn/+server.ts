import {json} from '@sveltejs/kit'

import {TEN_YEARS_IN_SECONDS} from '$lib/constants'
import type {RequestHandler} from './$types'

// POST /sfxOn
export const POST: RequestHandler = async ({request, cookies}) => {
	const formData = await request.formData()
	const sfxOn = formData.get('sfxOn') ? 'true' : 'false'

	cookies.set('sfxOn', sfxOn, {
		path: '/',
		maxAge: TEN_YEARS_IN_SECONDS,
	})

	return json({sfxOn})
}
