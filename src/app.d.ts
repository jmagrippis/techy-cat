import type {SvelteComponentType} from 'svelte'
import type {Cookies} from '@sveltejs/kit'
import type {Theme} from './types'

declare global {
	declare module '$lib/icons/*.svg' {
		const content: SvelteComponentType
		export default content
	}

	declare module '*.svg?component' {
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

		type HighScore = {
			id: string
			score: number
			game: string
			seed: string
			player: {
				id: string
				displayName: string
			}
		}

		type HighScoreWithPlayer = HighScore & {
			player: {
				id: string
				displayName: string
			}
		}

		type HighScorePartial = Pick<HighScore, 'score' | 'game' | 'seed'>

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
			createIdea(idea: IdeaPartial, userId: string): Promise<Idea | null>
			updateIdea(id: string, ideaPartial: IdeaPartial): Promise<Idea | null>
		}

		interface HighScoresRepoInterface {
			getAll(options: {
				limit: number
				match?: Record<string, unknown>
			}): Promise<HighScore[]>
			submitHighScore(
				highScorePartial: HighScorePartial,
				userId: string
			): Promise<null>
		}

		interface UserRepoInterface {
			findByAccessToken(accessToken: string): Promise<User | null>
			findAndRefreshIfNeeded(
				cookies: Cookies,
				secureCookies: boolean
			): Promise<User | null>
			updateDisplayName(
				id: string,
				displayName: string
			): Promise<App.User | null>
		}

		interface Locals {
			theme: Theme
			sfxOn: boolean
			ideasRepo: IdeasRepoInterface
			userRepo: UserRepoInterface
			highScoresRepo: HighScoresRepoInterface
			user: User | null
		}

		interface Platform {}

		interface PrivateEnv extends Record<string, string> {}

		interface PublicEnv extends Record<string, string> {}

		interface Error {
			message: string
		}
	}
}
