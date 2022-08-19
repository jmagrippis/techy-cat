import type {RequestHandler} from './__types/[id]'

export const GET: RequestHandler = async ({params, locals: {ideasRepo}}) => {
	const {id} = params
	const idea = await ideasRepo.findById(id)

	if (!idea) {
		return {status: 404}
	}

	return {body: {idea}}
}

export const POST: RequestHandler = async ({
	params,
	request,
	locals: {ideasRepo},
}) => {
	const {id} = params
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
	const idea = await ideasRepo.updateIdea(id, ideaPartial)

	if (!idea) {
		return {status: 404}
	}

	return {body: {idea}}
}
