import seedrandom from 'seedrandom'

import type {PageServerLoad} from './$types'
import type {Card} from './types'
import {shuffleArray} from '$lib/shuffleArray'

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

export const load: PageServerLoad = ({url}) => {
	const seed = url.searchParams.get('seed') || getCurrentDateSeed()
	const cardSet = url.searchParams.get('cardSet') || 'default'

	const rng = seedrandom(seed)

	const emojis = emojiCollections[cardSet] || emojiCollections.default
	const board = getInitialBoard(emojis, rng)

	return {
		board,
		selectedCardSet: cardSet,
		cardSets: Object.keys(emojiCollections),
	}
}
