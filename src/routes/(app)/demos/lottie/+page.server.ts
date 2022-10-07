import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({url}) => {
	const imageUrl = new URL(`${url.origin}/meta/social-thumbnail/png`)
	const title = 'Lottie + SvelteKit Interactive Demo'
	const description =
		'A dedicated showcase of how to use Lottie for idle looping animations, as well as in response to user actions.'

	imageUrl.searchParams.set('title', title)
	imageUrl.searchParams.set('subtitle', description)
	imageUrl.searchParams.set('heartCount', '23')

	return {
		meta: {
			title,
			description,
			image: {
				url: imageUrl.href,
				alt: 'Animations with Lottie & SvelteKit!',
			},
		},
	}
}
