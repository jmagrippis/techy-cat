import {error, json, type RequestHandler} from '@sveltejs/kit'

import {TWO_WEEKS_IN_SECONDS} from '$lib/constants'

export const POST: RequestHandler = async ({request, locals}) => {
	const authHeader = request.headers.get('Authorization') || ''
	const [scheme, accessToken] = authHeader.split(' ')
	if (scheme !== 'Bearer' || !accessToken) {
		throw error(401, 'invalid authorization header')
	}

	const {refreshToken, expiresIn} = await request.json()

	const sessionCookie = `session=${accessToken}; SameSite=Strict; Path=/; HttpOnly; Max-Age=${expiresIn}`
	const refreshCookie = `refreshSession=${refreshToken}; SameSite=Strict; Path=/; HttpOnly; Max-Age=${TWO_WEEKS_IN_SECONDS}`
	const user = await locals.userRepo.findByAccessToken(accessToken)

	const headers = new Headers()
	headers.append('set-cookie', sessionCookie)
	headers.append('set-cookie', refreshCookie)

	return json({user}, {headers})
}

const expiredSessionCookie =
	'session=; SameSite=Strict; Path=/; HttpOnly; Max-Age=0;'
const expiredRefreshCookie =
	'refreshSession=; SameSite=Strict; Path=/; HttpOnly; Max-Age=0;'

export const DELETE: RequestHandler = () => {
	const headers = new Headers()
	headers.append('set-cookie', expiredSessionCookie)
	headers.append('set-cookie', expiredRefreshCookie)

	return new Response(null, {headers})
}
