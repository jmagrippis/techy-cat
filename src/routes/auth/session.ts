import type {RequestHandler} from '@sveltejs/kit'

export const post: RequestHandler = async ({request}) => {
	const authHeader = request.headers.get('Authorization') || ''
	const [scheme, accessToken] = authHeader.split(' ')
	if (scheme !== 'Bearer' || !accessToken) {
		return {status: 401, body: 'invalid authorization header'}
	}
	const {refreshToken} = await request.json()

	const sessionCookie = `session=${accessToken}; SameSite=Strict; Path=/; HttpOnly;`
	const refreshCookie = `refreshSession=${refreshToken}; SameSite=Strict; Path=/; HttpOnly;`

	return {
		status: 200,
		headers: {
			'Set-Cookie': [sessionCookie, refreshCookie],
		},
	}
}

const expiredSessionCookie =
	'session=; SameSite=Strict; Path=/; HttpOnly; Max-Age=0;'
const expiredRefreshCookie =
	'refreshSession=; SameSite=Strict; Path=/; HttpOnly; Max-Age=0;'

export const del: RequestHandler = () => ({
	status: 200,
	headers: {
		'Set-Cookie': [expiredSessionCookie, expiredRefreshCookie],
	},
})
