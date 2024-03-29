import {error, json, type RequestHandler} from '@sveltejs/kit'

export const POST: RequestHandler = async ({request, cookies, locals}) => {
	const authHeader = request.headers.get('Authorization') || ''
	const [scheme, accessToken] = authHeader.split(' ')
	if (scheme !== 'Bearer' || !accessToken) {
		throw error(401, 'invalid authorization header')
	}

	const {refreshToken, expiresIn} = await request.json()

	const user = await locals.userRepo.findByAccessToken(accessToken)

	cookies.set('session', accessToken, {
		path: '/',
		maxAge: expiresIn,
	})
	cookies.set('refreshSession', refreshToken, {
		path: '/',
		maxAge: expiresIn,
	})

	return json({user})
}

export const DELETE: RequestHandler = ({cookies}) => {
	cookies.delete('session', {path: '/'})
	cookies.delete('refreshSession', {path: '/'})

	return json({user: null})
}
