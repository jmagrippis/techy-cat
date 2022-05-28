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
	import type {IdeasRepo} from '$lib/repos/ideas'

	interface Locals {
		theme: Theme
		ideasRepo: IdeasRepo
	}

	interface Platform {}

	interface Session {
		theme: Theme
	}

	interface Stuff {}
}
