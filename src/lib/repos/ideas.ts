import type {SupabaseClient} from '@supabase/supabase-js'

export type DbIdea = {
	id: string
	slug: string
	name: string
	emoji: string
	description: string
	created_at: string
	author_id: string
}

export type DbIdeaWithAuthorAndStarred = Omit<
	DbIdea,
	'created_at' | 'author_id'
> & {
	authorId: string
	authorDisplayName: string
	starred: boolean
}

export class IdeasRepo implements App.IdeasRepoInterface {
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
	}): Promise<App.IdeaWithAuthorAndStarred[]> => {
		const response = await this.#client
			// find the SQL which defined this function at
			// sql/ideas_with_authors_and_starred.sql
			.rpc<DbIdeaWithAuthorAndStarred>('ideas_with_authors_and_starred')
			.select('id, slug, name, emoji, description, starred')
			.match(match)
			.limit(limit)

		return response.data ?? []
	}

	getAllForAuthorId = async (authorId: string) => {
		const response = await this.#client
			.from<DbIdea>('ideas')
			.select('id, slug, name, emoji, description')
			.match({author_id: authorId})
			.order('created_at', {ascending: false})

		return response.data || []
	}

	findById = async (id: string) => {
		const response = await this.#client
			.from<DbIdea>('ideas')
			.select('id, slug, name, emoji, description')
			.match({id})
			.maybeSingle()

		return response.data
	}

	findBySlug = async (slug: string): Promise<App.Idea | null> => {
		const response = await this.#client
			.from<DbIdea>('ideas')
			.select(
				`id, slug, name, emoji, description, profiles!ideas_author_id_fkey (display_name),
					starred_ideas (
						created_at
					)`
			)
			.match({slug})
			.maybeSingle()

		if (!response.data) return null

		return response.data
	}

	createIdea = async (ideaPartial: App.IdeaPartial, authorId: string) => {
		const response = await this.#client
			.from<DbIdea>('ideas')
			.insert({...ideaPartial, author_id: authorId})
			.maybeSingle()

		return response.data
	}

	updateIdea = async (id: string, ideaPartial: App.IdeaPartial) => {
		const response = await this.#client
			.from<DbIdea>('ideas')
			.update(ideaPartial)
			.match({id})
			.maybeSingle()

		return response.data
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
