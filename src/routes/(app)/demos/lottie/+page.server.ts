import type {PageServerLoad} from './$types'

const cards = [
	{
		id: '73d48039-07e4-4086-9efc-0e71cea1d598',
		author: 'Johnny',
		link: 'https://www.youtube.com/c/jmagrippis',
		title: 'Like & Subscribe!',
		description:
			'Jokes aside, all I want is for you to get excited about tech 😄 Maybe inspired by something I showed, unstuck thanks to how I explained! So keep watching, and no worries at all 😉',
		tags: ['community'],
		createdAt: '2022-10-07T07:30:12.141Z',
		updatedAt: '2022-10-07T07:30:12.141Z',
		hearted: false,
	},
	{
		id: '743e8878-55ff-4489-87d9-e3a305aa165a',
		author: 'J-Mag',
		link: 'https://discord.gg/eR5Q52Sfm3',
		title: 'There is a Discord too?!',
		description:
			'Yes, I’ve create a Discord server! I still reply to every single YouTube comment, but it’s impossible to search what I’ve been asked, what I said, what was discussed... Discord should be better for that!',
		tags: ['community'],
		createdAt: '2022-10-11T12:30:12.141Z',
		updatedAt: '2022-10-11T12:30:12.141Z',
		hearted: false,
	},
]

export const load: PageServerLoad = async ({cookies}) => {
	const cardsWithHearts = cards.map((card) => ({
		...card,
		hearted: !!cookies.get(`hearted-${card.id}`),
	}))

	const title = 'Lottie + SvelteKit Interactive Demo'
	const description =
		'A dedicated showcase of how to use Lottie for idle looping animations, as well as in response to user actions.'

	return {
		cards: cardsWithHearts,
		meta: {
			title,
			description,
		},
	}
}
