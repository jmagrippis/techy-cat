/// <reference types="@sveltejs/kit" />

declare module '$lib/icons/*.svg' {
	import type {SvelteComponentType} from 'svelte'

	const content: SvelteComponentType
	export default content
}

declare module '*.svg?component' {
	import type {SvelteComponentType} from 'svelte'

	const content: SvelteComponentType
	export default content
}

declare module '*.svg?src' {
	const content: string
	export default content
}

declare module '*.svg?url' {
	const content: string
	export default content
}

// See https://kit.svelte.dev/docs#typescript
// for information about these interfaces
declare namespace App {
	import type {Theme} from './types'

	type User = {
		id: string
		displayName: string
		role: 'fan' | 'contributor'
	}

	type Idea = {
		id: string
		slug: string
		name: string
		emoji: string
		description: string
	}

	type IdeaWithAuthorAndStarred = Idea & {
		authorId: string
		authorDisplayName: string
		starred: boolean
	}

	type IdeaPartial = Pick<Idea, 'slug' | 'name' | 'emoji' | 'description'>

	interface IdeasRepoInterface {
		getAll(options: {
			limit: number
			match?: Record<string, unknown>
		}): Promise<IdeaWithAuthorAndStarred[]>
		getAllForAuthorId(authorId: string): Promise<Idea[]>
		findById(id: string): Promise<Idea | null>
		findBySlug(slug: string): Promise<Idea | null>
		starIdea(ideaId: string, userId: string): Promise<boolean>
		unstarIdea(ideaId: string, userId: string): Promise<boolean>
		createIdea(idea: IdeaPartial, userId): Promise<Idea | null>
		updateIdea(id: string, ideaPartial: IdeaPartial): Promise<Idea | null>
	}

	interface UserRepoInterface {
		findByAccessToken(accessToken: string): Promise<User | null>
		refreshSession(refreshToken: string): Promise<{
			user: User | null
			sessionCookie: string
			refreshCookie: string
		}>
		updateDisplayName(id: string, displayName: string): Promise<App.User | null>
	}

	interface Locals {
		theme: Theme
		ideasRepo: IdeasRepoInterface
		userRepo: UserRepoInterface
		user: User | null
		ideasRepo: IdeasRepoInterface
	}

	interface Platform {}

	interface PrivateEnv extends Record<string, string> {}

	interface PublicEnv extends Record<string, string> {}

	interface PageError {
		message: string
	}
}
