import type {SupabaseClient} from '@supabase/supabase-js'

export type DbIdea = {
	id: string
	slug: string
	name: string
	emoji: string
	description: string
	created_at: string
}

export class IdeasRepo implements App.IdeasRepoInterface {
	#client: SupabaseClient

	constructor(client: SupabaseClient) {
		this.#client = client
	}
	getAll = async ({limit}: {limit: number}): Promise<App.Idea[]> => {
		const response = await this.#client
			.from<DbIdea>('ideas')
			.select('id, slug, name, emoji, description')
			.neq('description', 'NULL')
			.order('created_at', {ascending: false})
			.limit(limit)

		return response.data || []
	}

	findBySlug = async (slug: string): Promise<App.Idea | null> => {
		const response = await this.#client
			.from<DbIdea>('ideas')
			.select('id, slug, name, emoji, description')
			.eq('slug', slug)
			.limit(1)

		if (!response.data || !response.data.length) return null

		return response.data[0]
	}
}
