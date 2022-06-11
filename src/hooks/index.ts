import type {GetSession, Handle} from '@sveltejs/kit'
import {createClient} from '@supabase/supabase-js'
import {getCookieValue} from '$lib/getCookieValue'
import {IdeasRepo} from '$lib/repos/ideas'

import {isTheme, type Theme} from '../types'
import {UserRepo} from '$lib/repos/user'

const getThemeFromCookie = (cookie: string | null): Theme => {
	const theme = getCookieValue(cookie, 'theme')
	return isTheme(theme) ? theme : 'auto'
}

export const handle: Handle = async ({event, resolve}) => {
	const cookie = event.request.headers.get('cookie')

	event.locals.theme = getThemeFromCookie(cookie)

	const supabaseClient = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_ANON_KEY
	)
	const userRepo = new UserRepo(supabaseClient)
	const ideasRepo = new IdeasRepo(supabaseClient)
	event.locals.ideasRepo = ideasRepo
	event.locals.userRepo = userRepo
	const session = getCookieValue(cookie, 'session')
	const refreshSession = getCookieValue(cookie, 'refreshSession')

	let sessionCookie
	let refreshCookie
	if (!session) {
		if (!refreshSession) {
			event.locals.user = null
		} else {
			const result = await userRepo.refreshSession(refreshSession)

			event.locals.user = result.user
			sessionCookie = result.sessionCookie
			refreshCookie = result.refreshCookie
		}
	} else {
		event.locals.user = await userRepo.findByAccessToken(session)
	}

	const response = await resolve(event)
	if (sessionCookie) {
		response.headers.set('Set-Cookie', sessionCookie)
	}
	if (refreshCookie) {
		response.headers.set('Set-Cookie', refreshCookie)
	}
	return response
}

export const getSession: GetSession = ({locals}) => {
	const theme = locals.theme
	const user = locals.user

	return {theme, user}
}
