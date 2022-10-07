import seedrandom from 'seedrandom'

import type {PageServerLoad, Actions} from './$types'
import type {Card} from './types'
import {shuffleArray} from '$lib/shuffleArray'
import {getRandomArrayItem} from '$lib/getRandomArrayItem'
import {invalid} from '@sveltejs/kit'
import {ONE_DAY_IN_SECONDS, TEN_YEARS_IN_SECONDS} from '$lib/constants'
import {getHighScoreForSeed} from './getHighScoreForSeed'
import {getStats, type Stats} from './getStatsCookie'

const getInitialBoard = (
	emojis: string[],
	rng: () => number = Math.random
): Card[] =>
	shuffleArray([...emojis, ...emojis], rng).map((face) => ({
		face,
		state: 'hidden',
	}))

const emojiCollections: Record<string, string[]> = {
	default: ['🤩', '😎', '🤪', '😻', '😼', '👾', '💙', '🙌'],
	flags: ['🇬🇧', '🇬🇷', '🇪🇸', '🇦🇷', '🇺🇸', '🇲🇦', '🇧🇴', '🇧🇧'],
	popular: ['😄', '🙂', '😅', '😬', '😛', '🎨', '🥰', '🧑‍💻'],
	stuff: ['🚀', '🍿', '📷', '🎞', '👑', '📺', '📣', '🧩'],
	animals: ['🦄', '🐶', '🦊', '🐷', '🐇', '🐸', '🐍', '🐥'],
}

const getCurrentDateSeed = () => new Date().toISOString().slice(0, 10)

const getEmojis = (cardSet: string) =>
	cardSet === 'random'
		? getRandomArrayItem(Object.values(emojiCollections))
		: emojiCollections[cardSet] || emojiCollections.default

export const load: PageServerLoad = ({url, cookies, locals}) => {
	const mode = url.searchParams.get('mode') || 'daily'
	const seedFromUrl = url.searchParams.get('seed')
	const seed =
		mode === 'daily'
			? getCurrentDateSeed()
			: mode === 'practice' && typeof seedFromUrl === 'string'
			? seedFromUrl
			: undefined
	const cardSet = url.searchParams.get('cardSet') || 'default'
	const highScore = getHighScoreForSeed(cookies, seed)
	const stats = getStats(cookies)

	const rng = seedrandom(seed)

	const emojis = getEmojis(cardSet)
	const board = getInitialBoard(emojis, rng)

	return {
		board,
		mode,
		seed,
		highScore,
		stats,
		selectedCardSet: cardSet,
		cardSets: [...Object.keys(emojiCollections), 'random'],
		sfxOn: locals.sfxOn,
		meta: {
			title: 'Memory Game',
			description: 'Play the classic memory game, but with emojis 🤯',
			image: {
				url: `${url.origin}/meta/game-memory.png`,
				alt: 'Memory Game: A Techy Cat take on a classic!',
			},
		},
	}
}

export const actions: Actions = {
	persistScore: async ({request, cookies, locals}) => {
		const formData = await request.formData()
		const wrongGuesses = formData.get('wrongGuesses')
		const seed = formData.get('seed')

		if (typeof wrongGuesses !== 'string') {
			return invalid(400, {wrongGuesses, missing: true})
		}

		if (typeof seed !== 'string') {
			return invalid(400, {seed, missing: true})
		}

		const currentHighScore = getHighScoreForSeed(cookies, seed)

		const wrongGuessesCount = parseInt(wrongGuesses)

		const currentDateSeed = getCurrentDateSeed()

		const statsCookie = getStats(cookies)

		if (!statsCookie) {
			const nextStatsCookie = {
				lastPlayed: currentDateSeed,
				streak: 1,
				totalDailies: 1,
			}

			cookies.set('stats', JSON.stringify(nextStatsCookie), {
				path: '/games/memory',
				maxAge: TEN_YEARS_IN_SECONDS,
			})
		} else if (statsCookie.lastPlayed !== currentDateSeed) {
			const nextDateForStreak = new Date(statsCookie.lastPlayed)
			nextDateForStreak.setDate(nextDateForStreak.getDate() + 1)
			const seedForNextDateForStreak = nextDateForStreak
				.toISOString()
				.slice(0, 10)

			const streak =
				seedForNextDateForStreak === currentDateSeed
					? statsCookie.streak + 1
					: 1

			const nextStatsCookie: Stats = {
				streak,
				lastPlayed: currentDateSeed,
				totalDailies: statsCookie.totalDailies + 1,
			}

			cookies.set('stats', JSON.stringify(nextStatsCookie), {
				path: '/games/memory',
				maxAge: TEN_YEARS_IN_SECONDS,
			})
		}

		if (!currentHighScore || wrongGuessesCount < currentHighScore) {
			const highScoreCookie = `${seed}|${wrongGuessesCount}`

			cookies.set('highScore', highScoreCookie, {
				path: '/games/memory',
				maxAge: ONE_DAY_IN_SECONDS,
			})

			if (locals.user) {
				await locals.highScoresRepo.submitHighScore(
					{
						seed,
						score: wrongGuessesCount,
						game: 'memory',
					},
					locals.user.id
				)
			}

			return {success: true, highScore: wrongGuessesCount}
		}

		return {success: true, highScore: currentHighScore}
	},
}
