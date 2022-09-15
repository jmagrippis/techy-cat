import {writable} from 'svelte/store'

export const user = writable<App.User | null>(null)

export const isUser = (user: unknown): user is App.User =>
	!!(
		typeof user === 'object' &&
		(user as App.User).id &&
		(user as App.User).displayName &&
		(user as App.User).role
	)
