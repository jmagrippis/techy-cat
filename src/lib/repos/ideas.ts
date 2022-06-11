import type {SupabaseClient} from '@supabase/supabase-js'

export type DbIdeaWithFavourites = {
	id: string
	slug: string
	name: string
	emoji: string
	description: string
	created_at: string
	profiles: {
		display_name: string
	}
	starred_ideas: {
		created_at: string
	}[]
}

export class IdeasRepo implements App.IdeasRepoInterface {
	#client: SupabaseClient

	constructor(client: SupabaseClient) {
		this.#client = client
	}

	getAll = async ({limit}: {limit: number}): Promise<App.IdeaSnippet[]> => {
		const response = await this.#client
			.from<DbIdeaWithFavourites>('ideas')
			.select(
				`id, slug, name, emoji, description,
					starred_ideas (
						created_at
					)`
			)
			.neq('description', 'NULL')
			.order('created_at', {ascending: false})
			.limit(limit)

		return (response.data || []).map(({starred_ideas, ...dbIdea}) => ({
			...dbIdea,
			starred: starred_ideas?.length > 0,
		}))
	}

	findBySlug = async (slug: string): Promise<App.Idea | null> => {
		const response = await this.#client
			.from<DbIdeaWithFavourites>('ideas')
			.select(
				`id, slug, name, emoji, description, profiles!ideas_author_id_fkey (display_name),
					starred_ideas (
						created_at
					)`
			)
			.eq('slug', slug)
			.maybeSingle()

		if (!response.data) return null

		const {profiles, starred_ideas, ...idea} = response.data
		return {
			...idea,
			authorDisplayName: profiles.display_name,
			starred: starred_ideas?.length > 0,
		}
	}

	starIdea = async (ideaId: string, userId: string) => {
		await this.#client
			.from('starred_ideas')
			.insert({user_id: userId, idea_id: ideaId})

		return true
	}

	unstarIdea = async (ideaId: string, userId: string) => {
		await this.#client
			.from('starred_ideas')
			.delete()
			.match({user_id: userId, idea_id: ideaId})

		return false
	}
}
