import type {RequestHandler} from '@sveltejs/kit'

export const get: RequestHandler = async ({locals: {ideasRepo, user}}) => {
	if (!user) {
		return {
			status: 401,
		}
	}

	const myIdeas = await ideasRepo.getAllForAuthorId(user.id)

	return {
		body: {myIdeas},
	}
}

export const post: RequestHandler = async ({
	request,
	locals: {ideasRepo, user},
}) => {
	if (!user) {
		return {
			status: 401,
		}
	}

	const formData = await request.formData()
	const emoji = formData.get('emoji')
	const name = formData.get('name')
	const slug = formData.get('slug')
	const description = formData.get('description')

	if (
		!emoji ||
		typeof emoji !== 'string' ||
		!name ||
		typeof name !== 'string' ||
		!slug ||
		typeof slug !== 'string' ||
		!description ||
		typeof description !== 'string'
	) {
		return {
			status: 400,
			body: 'you need to specify valid values for all of emoji, name, slug & description',
		}
	}
	const ideaPartial = {
		emoji,
		name,
		slug,
		description,
	}
	const idea = await ideasRepo.createIdea(ideaPartial, user.id)

	if (!idea) {
		return {status: 401}
	}

	return {body: {idea}}
}
