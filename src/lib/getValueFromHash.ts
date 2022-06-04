export const getValueFromHash = (urlHash: string, param: string) => {
	const re = new RegExp(`(#|&).?${param}=([^&]+)&?`)
	const match = urlHash.match(re)

	return match ? match[2] : ''
}
