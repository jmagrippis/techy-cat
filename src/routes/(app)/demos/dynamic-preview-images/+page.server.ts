import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({url}) => {
	const imageUrl = new URL(`${url.origin}/meta/social-thumbnail/png`)
	const title = 'Dynamic Social Preview Images'
	const description =
		'When you want eye-catching Social Preview Snippets for sharing on your social networks, that integrate dynamic data! Accomplished using SvelteKit for the UI & Puppeteer for the snapshotting!'

	imageUrl.searchParams.set('title', title)
	imageUrl.searchParams.set('subtitle', description)
	imageUrl.searchParams.set('heartCount', '12')

	return {
		meta: {
			title,
			description,
			image: {
				url: imageUrl.href,
				alt: 'Dynamic Preview Images with SvelteKit & Puppeteer',
			},
		},
	}
}
