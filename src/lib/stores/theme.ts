import {session} from '$app/stores'
import type {Theme} from 'src/types'
import type {Writable} from 'svelte/store'
import {derived} from 'svelte/store'

export const theme = derived<Writable<App.Session>, Theme>(
	session,
	($session, set) => set($session.theme)
)

export const setTheme = (theme: Theme) => {
	session.update(($session) => ({...$session, theme}))
	fetch('/theme', {method: 'PUT', body: theme})
}
