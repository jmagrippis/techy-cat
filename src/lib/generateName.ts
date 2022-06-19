import {
	uniqueNamesGenerator,
	adjectives,
	colors,
	animals,
} from 'unique-names-generator'

export const generateName = () =>
	uniqueNamesGenerator({
		dictionaries: [adjectives, colors, animals],
		separator: ' ',
		style: 'capital',
	})
