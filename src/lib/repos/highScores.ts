import type {SupabaseClient} from '@supabase/supabase-js'

type DbHighScore = {
	id: string
	player_id: string
	score: number
	game: string
	seed: string
	created_at: string
}

type DbHighScoreWithPlayer = DbHighScore & {
	player: {
		id: string
		display_name: string
	}
}

const mapDbHighScoreToHighScore = (
	dbHighScore: DbHighScoreWithPlayer
): App.HighScore => ({
	...dbHighScore,
	player: {
		id: dbHighScore.player.id,
		displayName: dbHighScore.player.display_name,
	},
})

export class HighScoresRepo implements App.HighScoresRepoInterface {
	#client: SupabaseClient

	constructor(client: SupabaseClient) {
		this.#client = client
	}

	getAll = async ({
		limit,
		match = {},
	}: {
		limit: number
		match?: Record<string, unknown>
	}): Promise<App.HighScore[]> => {
		const response = await this.#client
			.from<DbHighScoreWithPlayer>('high_scores')
			.select('id, score, seed, player:player_id ( id, display_name )')
			.match(match)
			.order('score')
			.limit(limit)

		return response.data ? response.data.map(mapDbHighScoreToHighScore) : []
	}

	retrieveHighScoreForPlayerAndSeed = async ({
		playerId,
		seed,
	}: {
		playerId: string
		seed: string
	}) => {
		const response = await this.#client
			.from<DbHighScore>('high_scores')
			.select('id, score')
			.match({seed, player_id: playerId})
			.maybeSingle()

		return response.data
	}

	submitHighScore = async (
		highScorePartial: App.HighScorePartial,
		playerId: string
	) => {
		const previousHighScore = await this.retrieveHighScoreForPlayerAndSeed({
			playerId,
			seed: highScorePartial.seed,
		})

		if (!previousHighScore) {
			await this.#client
				.from<DbHighScore>('high_scores')
				.insert({...highScorePartial, player_id: playerId})
		} else if (previousHighScore.score > highScorePartial.score) {
			await this.#client
				.from<DbHighScore>('high_scores')
				.update({score: highScorePartial.score})
				.match({id: previousHighScore.id})
		}

		return null
	}
}
