import type {GetSession, Handle} from '@sveltejs/kit'
import {createClient} from '@supabase/supabase-js'
import {getCookieValue} from '$lib/getCookieValue'
import {IdeasRepo} from '$lib/repos/ideas'

import {isTheme, type Theme} from '../types'

const getThemeFromCookie = (cookie: string | null): Theme => {
	const theme = getCookieValue(cookie, 'theme')
	return isTheme(theme) ? theme : 'auto'
}

const supabaseClient = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
)
const ideasRepo = new IdeasRepo(supabaseClient)

export const handle: Handle = async ({event, resolve}) => {
	const cookie = event.request.headers.get('cookie')

	event.locals.theme = getThemeFromCookie(cookie)
	event.locals.ideasRepo = ideasRepo

	return resolve(event)
}

export const getSession: GetSession = ({locals}) => {
	const theme = locals.theme

	return {theme}
}
