import {TWO_WEEKS_IN_SECONDS} from '$lib/constants'
import type {RequestHandler} from '@sveltejs/kit'

export const POST: RequestHandler = async ({request, locals}) => {
	const authHeader = request.headers.get('Authorization') || ''
	const [scheme, accessToken] = authHeader.split(' ')
	if (scheme !== 'Bearer' || !accessToken) {
		return {status: 401, body: 'invalid authorization header'}
	}
	const {refreshToken, expiresIn} = await request.json()

	const sessionCookie = `session=${accessToken}; SameSite=Strict; Path=/; HttpOnly; Max-Age=${expiresIn}`
	const refreshCookie = `refreshSession=${refreshToken}; SameSite=Strict; Path=/; HttpOnly; Max-Age=${TWO_WEEKS_IN_SECONDS}`
	const user = await locals.userRepo.findByAccessToken(accessToken)

	return {
		status: 200,
		body: {user},
		headers: {
			'Set-Cookie': [sessionCookie, refreshCookie],
		},
	}
}

const expiredSessionCookie =
	'session=; SameSite=Strict; Path=/; HttpOnly; Max-Age=0;'
const expiredRefreshCookie =
	'refreshSession=; SameSite=Strict; Path=/; HttpOnly; Max-Age=0;'

export const DELETE: RequestHandler = () => ({
	status: 200,
	headers: {
		'Set-Cookie': [expiredSessionCookie, expiredRefreshCookie],
	},
})
