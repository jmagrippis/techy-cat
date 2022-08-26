export function shuffleArray<ArrayItem = unknown>(
	array: ArrayItem[],
	rng: () => number = Math.random
): ArrayItem[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}

	return array
}
