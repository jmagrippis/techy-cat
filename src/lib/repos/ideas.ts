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

export type DbIdeaWithFavourites = DbIdea & {
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

	getAllForAuthorId = async (authorId: string) => {
		const response = await this.#client
			.from<DbIdea>('ideas')
			.select(`id, slug, name, emoji, description`)
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
			.from<DbIdeaWithFavourites>('ideas')
			.select(
				`id, slug, name, emoji, description, profiles!ideas_author_id_fkey (display_name),
					starred_ideas (
						created_at
					)`
			)
			.match({slug})
			.maybeSingle()

		if (!response.data) return null

		const {profiles, starred_ideas, ...idea} = response.data
		return {
			...idea,
			authorDisplayName: profiles.display_name,
			starred: starred_ideas?.length > 0,
		}
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
