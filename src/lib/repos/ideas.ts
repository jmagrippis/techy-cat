import {Client} from '@notionhq/client'
import {getServerOnlyEnvVar} from '$lib/getServerOnlyEnvVar'
import type {QueryDatabaseResponse} from '@notionhq/client/build/src/api-endpoints'

export type Idea = {
	name: string
	emoji: string
	description: string
}

const IDEAS_DB_ID = '864d832403c54dc1b062376efa807f18'

type NotionIdeaResult = {
	icon: {
		emoji: string
	}
	properties: {
		Name: {
			type: 'title'
			title: {
				type: 'text'
				text: {
					content: string
				}
			}[]
		}
		Description: {
			type: 'rich_text'
			rich_text: {
				type: 'text'
				text: {content: string}
			}[]
		}
	}
}

const isNotionResult = (
	result: Record<string, unknown>
): result is NotionIdeaResult =>
	!!(
		(result as NotionIdeaResult)?.icon?.emoji &&
		(result as NotionIdeaResult)?.properties.Name.title[0].text.content &&
		(result as NotionIdeaResult)?.properties.Description.rich_text
	)

const mapResultToIdea = (notionResult: Record<string, unknown>): Idea | null =>
	isNotionResult(notionResult)
		? {
				name: notionResult.properties.Name.title[0].text.content,
				emoji: notionResult.icon.emoji,
				description: notionResult.properties.Description.rich_text
					.reduce((acc, {text: {content}}) => `${acc} ${content}`, '')
					.trim(),
		  }
		: null

class IdeasRepo {
	#client = new Client({
		auth: getServerOnlyEnvVar('NOTION_TOKEN'),
	})

	getAll = async ({limit}: {limit: number}) => {
		const {results} = await this.#client.databases.query({
			database_id: IDEAS_DB_ID,
			page_size: limit,
		})

		return results.map(mapResultToIdea).filter(Boolean)
	}
}

export const ideasRepo = new IdeasRepo()
