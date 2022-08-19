import {json} from '@sveltejs/kit'

import type {RequestHandler} from './$types'
import {isTheme} from '../../types'

// POST /theme
export const POST: RequestHandler = async ({request}) => {
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

	return new Response(null, {
		status: 200,
		headers: new Headers({
			'Set-Cookie': `theme=${theme}; SameSite=Strict; HttpOnly; Path=/`,
		}),
	})
}

const expiredThemeCookie =
	'theme= ; Max-Age=0; SameSite=Strict; HttpOnly; Path=/'
// DELETE /theme
export const DELETE: RequestHandler = async () =>
	new Response(null, {
		status: 204,
		headers: new Headers({
			'Set-Cookie': expiredThemeCookie,
		}),
	})
