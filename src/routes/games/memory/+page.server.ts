import seedrandom from 'seedrandom'

import type {PageServerLoad} from './$types'
import type {Card} from './types'
import {shuffleArray} from '$lib/shuffleArray'
import {getRandomArrayItem} from '$lib/getRandomArrayItem'

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

export const load: PageServerLoad = ({url, locals}) => {
	const mode = url.searchParams.get('mode') || 'daily'
	const seedFromUrl = url.searchParams.get('seed')
	const seed =
		mode === 'daily'
			? getCurrentDateSeed()
			: mode === 'practice' && typeof seedFromUrl === 'string'
			? seedFromUrl
			: undefined
	const cardSet = url.searchParams.get('cardSet') || 'default'

	const rng = seedrandom(seed)

	const emojis = getEmojis(cardSet)
	const board = getInitialBoard(emojis, rng)

	return {
		board,
		mode,
		seed,
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
