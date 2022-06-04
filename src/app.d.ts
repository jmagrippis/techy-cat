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
	import type {Theme, User} from './types'

	type Idea = {
		id: string
		name: string
		emoji: string
		description: string
		slug: string
	}

	interface IdeasRepoInterface {
		getAll({limit: number}): Promise<Idea[]>
		findBySlug(slug: string): Promise<Idea | null>
	}

	interface Locals {
		theme: Theme
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
