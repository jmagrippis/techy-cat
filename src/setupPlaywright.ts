import dotenv from 'dotenv-flow'
import {request, type FullConfig} from '@playwright/test'

const globalSetup = async (config: FullConfig) => {
	if (!process.env.CI) {
		dotenv.config()
	}

	const {baseURL} = config.projects[0].use

	if (
		typeof process.env.VITE_SUPABASE_URL !== 'string' ||
		typeof process.env.VITE_SUPABASE_ANON_KEY !== 'string' ||
		typeof process.env.SUPABASE_PLAYWRIGHT_USER_PASSWORD !== 'string' ||
		!baseURL
	)
		return

	const requestContext = await request.newContext()
	// authorize Playwright user with Supabase first
	const {access_token, refresh_token, expires_in} = await requestContext
		.post(
			`${process.env.VITE_SUPABASE_URL}/auth/v1/token?grant_type=password`,
			{
				data: {
					email: 'playwright@techy.cat',
					password: process.env.SUPABASE_PLAYWRIGHT_USER_PASSWORD,
				},
				headers: {
					'Content-Type': 'application/json',
					apikey: process.env.VITE_SUPABASE_ANON_KEY,
				},
			}
		)
		.then((response) => response.json())

	// login with our app!
	await requestContext.post(`${baseURL}/auth/session`, {
		data: {
			refreshToken: refresh_token,
			expiresIn: expires_in,
		},
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${access_token}`,
		},
	})

	await requestContext.storageState({path: './tests/storageState/fan.json'})
	await requestContext.dispose()
}

export default globalSetup
