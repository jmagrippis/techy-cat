import {createMachine, assign} from 'xstate'

import type {Card, CardState} from './types'

export const memoryGameMachine =
	/** @xstate-layout N4IgpgJg5mDOIC5QFszIPYCcCeBxAhqgLL4DGAFgJYB2YAdAA4A2+2NUAxAAoCSAwgGlEoBuliUALpXTVhIAB6IAjAA4AnHQAsAJiWqADAHZtAVn1rDANksAaENkSaT2uvoDMSk5pWbNbtZbalgC+wXaoGDgExGRUtIwsbNSccqLiUjJyigiqGjp6Kkam5la29ohumvp0xnqals6GTiqGoeFoWHiEYCQUNPSYYABuYJhSyRzysBL4EvT4AGZzmAAUZvoAlBwRndE9sf10gyNj7KliktKySAqI2iqWdCpu+iZuJiqfloZKanYOCEsSjcdEC+metSUTj8bRAOyi3V6cXoAHcZBwAEoAUS4ABkAIIATXO6SuWQq1X0+iChnB2kMbm0Hjc-wqgSe90+hlp7jU900oTCIGo6AgcDk8K6MT68WYrDONzSl0yN2y+lZCE0ShckPqjWarSFkr2SMOx1G4ygJOV11Aao1misrg8Xh8fgCQVhxsRB3iaNtICVGQD2W09zoJhMPzMvkKljUKm0GrcnxquihDXpBq9HQR0uR1uD5IQAFptJoNUEVDVGSoPqZaUp9DDBUA */
	createMachine(
		{
			schema: {
				context: {
					wrongGuessesCount: 0,
				} as {
					board: Card[]
					wrongGuessesCount: number
				},
				events: {} as {type: 'PICK'; index: number} | {type: 'REPLAY'},
			},
			predictableActionArguments: true,
			id: 'memoryGameMachine',
			initial: 'playing',
			states: {
				playing: {
					always: [
						{
							actions: 'persistReveals',
							cond: 'isMatching',
							target: 'playing',
							internal: false,
						},
						{
							cond: 'isMismatching',
							target: 'reverting',
						},
						{
							cond: 'isWon',
							target: 'won',
						},
					],
					on: {
						PICK: {
							actions: 'flipCard',
							target: 'playing',
							internal: false,
						},
					},
				},
				reverting: {
					entry: 'incrementWrongGuesses',
					exit: 'revertSelected',
					after: {
						'500': {
							target: 'playing',
						},
					},
				},
				won: {
					on: {
						REPLAY: {
							target: 'playing',
							actions: 'resetWrongGuesses',
						},
					},
				},
			},
		},
		{
			actions: {
				flipCard: assign((context, event) => {
					if (event.type !== 'PICK') return {}

					return {
						board: context.board.map((card, index) =>
							index === event.index
								? {...card, state: 'selected' as CardState}
								: card
						),
					}
				}),
				persistReveals: assign((context) => ({
					board: context.board.map((card) =>
						card.state === 'selected'
							? {...card, state: 'revealed' as CardState}
							: card
					),
				})),
				revertSelected: assign((context) => ({
					board: context.board.map((card) =>
						card.state === 'selected'
							? {...card, state: 'hidden' as CardState}
							: card
					),
				})),
				incrementWrongGuesses: assign((context) => ({
					wrongGuessesCount: context.wrongGuessesCount + 1,
				})),
				resetWrongGuesses: assign((_) => ({
					wrongGuessesCount: 0,
				})),
			},
			guards: {
				isMatching: (context) => {
					const selectedCards = context.board.filter(
						({state}) => state === 'selected'
					)

					return (
						selectedCards.length === 2 &&
						selectedCards[0].face === selectedCards[1].face
					)
				},
				isMismatching: (context) => {
					const selectedCards = context.board.filter(
						({state}) => state === 'selected'
					)

					return (
						selectedCards.length === 2 &&
						selectedCards[0].face !== selectedCards[1].face
					)
				},
				isWon: (context) =>
					context.board.every(({state}) => state === 'revealed'),
			},
		}
	)
