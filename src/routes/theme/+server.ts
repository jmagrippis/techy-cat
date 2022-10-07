import {json} from '@sveltejs/kit'

import type {RequestHandler} from './$types'
import {isTheme} from '../../types'
import {TEN_YEARS_IN_SECONDS} from '$lib/constants'

// POST /theme
export const POST: RequestHandler = async ({request, cookies}) => {
	const formData = await request.formData()
	const theme = formData.get('theme')

	if (!isTheme(theme)) {
		return json(
			{
				errors: {theme: `not a valid theme value: ${theme}`},
			},
			{status: 400}
		)
	}

	cookies.set('theme', theme, {
		path: '/',
		maxAge: TEN_YEARS_IN_SECONDS,
	})

	return json(theme)
}

// DELETE /theme
export const DELETE: RequestHandler = async ({cookies}) => {
	cookies.delete('theme', {path: '/'})

	return new Response(null, {status: 204})
}
