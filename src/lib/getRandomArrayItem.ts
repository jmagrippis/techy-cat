export function getRandomArrayItem<ArrayItem = unknown>(
	array: ArrayItem[],
	rng: () => number = Math.random
): ArrayItem {
	return array[Math.floor(rng() * array.length)]
}
