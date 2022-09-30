import type {Actions, PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals}) => {
	const highScores: App.HighScore[] = await locals.highScoresRepo.getAll({
		limit: 100,
	})

	return {highScores}
}

export const actions: Actions = {}
