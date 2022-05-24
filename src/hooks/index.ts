import type {GetSession, Handle} from '@sveltejs/kit'

import {getCookieValue} from '$lib/getCookieValue'

import {isTheme, type Theme} from '../types'

const getThemeFromCookie = (cookie: string | null): Theme => {
	const theme = getCookieValue(cookie, 'theme')
	return isTheme(theme) ? theme : 'auto'
}

export const handle: Handle = async ({event, resolve}) => {
	const cookie = event.request.headers.get('cookie')

	event.locals.theme = getThemeFromCookie(cookie)

	return resolve(event)
}

export const getSession: GetSession = ({locals}) => {
	const theme = locals.theme

	return {theme}
}
