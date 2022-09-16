import type {Handle} from '@sveltejs/kit'
import {createClient} from '@supabase/supabase-js'

import {PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY} from '$env/static/public'
import {getCookieValue} from '$lib/getCookieValue'
import {IdeasRepo} from '$lib/repos/ideas'
import {UserRepo} from '$lib/repos/user'
import {isTheme, type Theme} from './types'

const getThemeFromCookie = (cookie: string | null): Theme => {
	const theme = getCookieValue(cookie, 'theme')
	return isTheme(theme) ? theme : 'auto'
}

const getSfxOnFromCookie = (cookie: string | null): boolean => {
	const sfxOn = getCookieValue(cookie, 'sfxOn')
	return sfxOn === 'false' ? false : true
}

export const handle: Handle = async ({event, resolve}) => {
	const cookie = event.request.headers.get('cookie')

	event.locals.theme = getThemeFromCookie(cookie)
	event.locals.sfxOn = getSfxOnFromCookie(cookie)

	const supabaseClient = createClient(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			autoRefreshToken: false,
			persistSession: false,
		}
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
			try {
				const result = await userRepo.refreshSession(refreshSession)

				event.locals.user = result.user
				sessionCookie = result.sessionCookie
				refreshCookie = result.refreshCookie
			} catch {
				// I *think* I've fixed my bug with refreshing the session
				// but this will keep the app operational if not 😄
				event.locals.user = null
			}
		}
	} else {
		event.locals.user = await userRepo.findByAccessToken(session)
	}

	const response = await resolve(event)
	if (sessionCookie && refreshCookie) {
		response.headers.set('Set-Cookie', `${sessionCookie}, ${refreshCookie}`)
	}

	return response
}
