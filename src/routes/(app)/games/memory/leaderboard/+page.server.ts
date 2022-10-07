import type {Actions, PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals, url}) => {
	const highScores: App.HighScore[] = await locals.highScoresRepo.getAll({
		limit: 100,
	})

	return {
		highScores,
		meta: {
			title: 'Memory Game Leaderboard',
			description:
				'Check out the high scores of logged-in users playing the Techy Cat Memory Game 😸',
			image: {
				url: `${url.origin}/meta/game-memory.png`,
				alt: 'Memory Game: A Techy Cat take on a classic!',
			},
		},
	}
}

export const actions: Actions = {}
