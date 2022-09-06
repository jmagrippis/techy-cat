import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals: {ideasRepo}, url}) => {
	const latestIdeas = await ideasRepo.getAll({limit: 3})

	return {latestIdeas, rootUrl: url.origin}
}
