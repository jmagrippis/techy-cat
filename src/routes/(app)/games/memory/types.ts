export type CardState = 'hidden' | 'selected' | 'revealed'

export type Card = {
	face: string
	state: CardState
}
