import type {Cookies, Handle} from '@sveltejs/kit'
import {createClient} from '@supabase/supabase-js'

import {PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY} from '$env/static/public'
import {IdeasRepo} from '$lib/repos/ideas'
import {UserRepo} from '$lib/repos/user'
import {isTheme, type Theme} from './types'

const getThemeFromCookies = (cookies: Cookies): Theme => {
	const theme = cookies.get('theme')

	return isTheme(theme) ? theme : 'auto'
}

const getSfxOnFromCookie = (cookies: Cookies): boolean => {
	const sfxOn = cookies.get('sfxOn')

	return sfxOn === 'false' ? false : true
}

export const handle: Handle = async ({event, resolve}) => {
	event.locals.theme = getThemeFromCookies(event.cookies)
	event.locals.sfxOn = getSfxOnFromCookie(event.cookies)

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

	event.locals.user = await userRepo.findAndRefreshIfNeeded(
		event.cookies,
		event.url.protocol.startsWith('https')
	)

	const response = await resolve(event)

	return response
}
