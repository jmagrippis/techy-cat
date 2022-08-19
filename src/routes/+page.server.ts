import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals: {ideasRepo}}) => {
	const latestIdeas = await ideasRepo.getAll({limit: 3})

	return {latestIdeas}
}
