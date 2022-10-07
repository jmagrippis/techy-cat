import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({url}) => {
	return {
		title: url.searchParams.get('title') || 'Title',
		subtitle: url.searchParams.get('subtitle') || 'subtitle',
		heartCount: parseInt(url.searchParams.get('heartCount') || '0'),
	}
}
