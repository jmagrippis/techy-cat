export type Idea = {
	name: string
	emoji: string
	description: string
}

class IdeasRepo {
	#ideas = [
		{
			name: 'Duosingo',
			emoji: '🎶',
			description:
				"I've been loving practicing piano the past few weeks, and it's because I'm being creative in a limited space that's guaranteed to sound good! Can we do a similar thing, where an AI singer \"counters\" my singing, to make an end result my neighbours enjoy? Not auto-tuning my voice, something more like Google's blob opera 🤔",
		},
		{
			name: 'Ground to perfection',
			emoji: '☕️',
			description:
				'Simple coffee grinding game, time your grinding for how coarse or fine is appropriate for your coffee-making process. Inspired by seeing Playdate promos, would be amazing with crank controls!',
		},
		{
			name: 'Good up!',
			emoji: '🏐',
			description:
				'Personal Beach Volleyball game tracker, see insights for your own matches, group them by your various partners, see trends over seasons!',
		},
		{
			name: 'Wardrobe Theory',
			emoji: '👚',
			description: 'Categorise your clothes in looks, get insights!',
		},
	]

	getAll = async ({limit}: {limit: number}) => this.#ideas.slice(0, limit)
}

export const ideasRepo = new IdeasRepo()
