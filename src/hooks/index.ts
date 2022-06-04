import type {GetSession, Handle} from '@sveltejs/kit'
import {createClient, type SupabaseClient} from '@supabase/supabase-js'
import {getCookieValue} from '$lib/getCookieValue'
import {IdeasRepo} from '$lib/repos/ideas'

import {isTheme, type Theme, type User} from '../types'

const getThemeFromCookie = (cookie: string | null): Theme => {
	const theme = getCookieValue(cookie, 'theme')
	return isTheme(theme) ? theme : 'auto'
}

type DbUser = {
	id: string
	display_name: string
}

const getUserFromCookie = async (
	cookie: string | null,
	client: SupabaseClient
): Promise<User | null> => {
	const session = getCookieValue(cookie, 'session')
	if (!session) return null
	client.auth.setAuth(session)

	const result = await client
		.from<DbUser>('profiles')
		.select('id, display_name')
		.limit(1)

	if (!result.data || !result.data.length) return null

	const [dbUser] = result.data

	return {id: dbUser.id, displayName: dbUser.display_name}
}

export const handle: Handle = async ({event, resolve}) => {
	const cookie = event.request.headers.get('cookie')

	event.locals.theme = getThemeFromCookie(cookie)

	const supabaseClient = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_ANON_KEY
	)
	const ideasRepo = new IdeasRepo(supabaseClient)
	event.locals.ideasRepo = ideasRepo
	event.locals.user = await getUserFromCookie(cookie, supabaseClient)

	return resolve(event)
}

export const getSession: GetSession = ({locals}) => {
	const theme = locals.theme
	const user = locals.user

	return {theme, user}
}
