import type {SupabaseClient} from '@supabase/supabase-js'

export type DbIdeaWithFavourites = {
	id: string
	slug: string
	name: string
	emoji: string
	description: string
	created_at: string
	users_to_favourite_ideas: {
		created_at: string
	}[]
}

export type IdeaSnippet = Pick<
	DbIdeaWithFavourites,
	'id' | 'slug' | 'name' | 'emoji' | 'description' | 'created_at'
> & {favourite: boolean}

export type Idea =
	| Pick<DbIdeaWithFavourites, 'id' | 'slug' | 'name' | 'emoji' | 'description'>
	| {authorDisplayName: string}

export class IdeasRepo implements App.IdeasRepoInterface {
	#client: SupabaseClient

	constructor(client: SupabaseClient) {
		this.#client = client
	}
	getAll = async ({limit}: {limit: number}): Promise<App.Idea[]> => {
		const response = await this.#client
			.from<DbIdeaWithFavourites>('ideas')
			.select(
				`id, slug, name, emoji, description,
					users_to_favourite_ideas (
						created_at
					) AS favourites`
			)
			.neq('description', 'NULL')
			.order('created_at', {ascending: false})
			.limit(limit)

		console.log(response.data?.[0])

		return (response.data || []).map(
			({users_to_favourite_ideas, ...dbIdea}) => ({
				...dbIdea,
				favourite: users_to_favourite_ideas?.length > 0,
			})
		)
	}

	findBySlug = async (slug: string): Promise<App.Idea | null> => {
		const response = await this.#client
			.from<DbIdeaWithFavourites>('ideas')
			.select('id, slug, name, emoji, description')
			.eq('slug', slug)
			.limit(1)

		if (!response.data || !response.data.length) return null

		return response.data[0]
	}

	favouriteIdea = async (ideaId: string, userId: string) =>
		this.#client
			.from('users_to_favourite_ideas')
			.insert({user_id: userId, idea_id: ideaId})

	removeFavouriteIdea = async (ideaId: string, userId: string) =>
		this.#client
			.from('users_to_favourite_ideas')
			.delete()
			.match({user_id: userId, idea_id: ideaId})
}
