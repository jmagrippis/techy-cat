import type {Cookies} from '@sveltejs/kit'

export const getHighScoreForSeed = (
	cookies: Cookies,
	seed: string | undefined
): number | null => {
	if (!seed) return null

	const highScoreCookie = cookies.get('highScore')
	const [persistedSeed, highScore] = highScoreCookie
		? highScoreCookie.split('|')
		: []

	return highScore && seed === persistedSeed ? parseInt(highScore) : null
}
