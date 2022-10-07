import type {Cookies} from '@sveltejs/kit'

export type Stats = {
	lastPlayed: string
	streak: number
	totalDailies: number
}
export const getStats = (cookies: Cookies): Stats | null => {
	const statsCookie = cookies.get('stats')

	return statsCookie ? JSON.parse(statsCookie) : null
}
