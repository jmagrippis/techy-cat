import {session} from '$app/stores'
import type {Writable} from 'svelte/store'
import {derived} from 'svelte/store'

export const user = derived<Writable<App.Session>, App.User | null>(
	session,
	($session, set) => set($session.user)
)

export const setUser = (user: App.User | null) => {
	session.update(($session) => ({...$session, user}))
}
