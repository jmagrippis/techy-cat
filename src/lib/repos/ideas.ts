import type {SupabaseClient} from '@supabase/supabase-js'

export type DbIdeaWithProfiles = {
	id: string
	slug: string
	name: string
	emoji: string
	description: string
	created_at: string
	profiles: {
		display_name: string
	}
}

export type IdeaSnippet = Pick<
	DbIdeaWithProfiles,
	'id' | 'slug' | 'name' | 'emoji' | 'description' | 'created_at'
>

export type Idea =
	| Pick<DbIdeaWithProfiles, 'id' | 'slug' | 'name' | 'emoji' | 'description'>
	| {authorDisplayName: string}

export class IdeasRepo {
	#client: SupabaseClient

	constructor(client: SupabaseClient) {
		this.#client = client
	}

	getAll = async ({limit}: {limit: number}): Promise<IdeaSnippet[]> => {
		const response = await this.#client
			.from<IdeaSnippet>('ideas')
			.select('id, slug, name, emoji, description')
			.neq('description', 'NULL')
			.order('created_at', {ascending: false})
			.limit(limit)

		return response.data || []
	}

	find = async (slug: string): Promise<Idea | null> => {
		const response = await this.#client
			.from<DbIdeaWithProfiles>('ideas')
			.select('id, slug, name, emoji, description, profiles (display_name)')
			.eq('slug', slug)
			.limit(1)

		if (!response.data) return null

		const {profiles, ...idea} = response.data[0]
		return {...idea, authorDisplayName: profiles.display_name}
	}
}
