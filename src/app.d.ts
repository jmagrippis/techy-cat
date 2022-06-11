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
	}

	type Idea = {
		id: string
		slug: string
		name: string
		emoji: string
		description: string
		created_at: string
		starred: boolean
		authorDisplayName: string
	}

	type IdeaSnippet = Omit<Idea, 'authorDisplayName'>

	interface IdeasRepoInterface {
		getAll(options: {limit: number}): Promise<IdeaSnippet[]>
		findBySlug(slug: string): Promise<Idea | null>
		starIdea(ideaId: string, userId: string): Promise<boolean>
		unstarIdea(ideaId: string, userId: string): Promise<boolean>
	}

	interface UserRepoInterface {
		findByAccessToken(accessToken: string): Promise<User | null>
		refreshSession(refreshToken: string): Promise<{
			user: User | null
			sessionCookie: string
			refreshCookie: string
		}>
	}

	interface Locals {
		theme: Theme
		ideasRepo: IdeasRepoInterface
		userRepo: UserRepoInterface
		user: User | null
		ideasRepo: IdeasRepoInterface
	}

	interface Platform {}

	interface Session {
		theme: Theme
		user: User | null
	}

	interface Stuff {}
}
