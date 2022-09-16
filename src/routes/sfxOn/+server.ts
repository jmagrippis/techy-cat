import type {RequestHandler} from './$types'

// POST /sfxOn
export const POST: RequestHandler = async ({request}) => {
	const formData = await request.formData()
	const sfxOn = formData.get('sfxOn') ? true : false

	return new Response(null, {
		status: 200,
		headers: new Headers({
			'Set-Cookie': `sfxOn=${sfxOn}; SameSite=Strict; HttpOnly; Path=/`,
		}),
	})
}
