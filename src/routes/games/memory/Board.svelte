<script lang="ts">
	import {onMount} from 'svelte'
	import lottie, {type AnimationItem} from 'lottie-web'

	import Card from './Card.svelte'
	import type {Card as CardType} from './types'
	import animationData from './confetti.json'

	export let board: CardType[]
	export let handleWrongGuess: () => void
	export let handleReset: () => void

	let reverting = false

	const deriveBoardSolved = (givenBoard: CardType[]) =>
		givenBoard.every(({state}) => state === 'revealed')
	$: isBoardSolved = deriveBoardSolved(board)

	const handleCardClick = (index: number) => {
		if (reverting) return

		const previouslySelectedCardIndex = board.findIndex(
			(card) => card.state === 'selected'
		)
		board[index].state = 'selected'

		if (previouslySelectedCardIndex !== -1) {
			if (board[previouslySelectedCardIndex].face === board[index].face) {
				board[previouslySelectedCardIndex].state = 'revealed'
				board[index].state = 'revealed'

				if (deriveBoardSolved(board)) {
					confettiAnimation.goToAndPlay(0, true)
				}
			} else {
				reverting = true
				handleWrongGuess()

				setTimeout(() => {
					board[previouslySelectedCardIndex].state = 'hidden'
					board[index].state = 'hidden'
					reverting = false
				}, 500)
			}
		}
	}

	let confettiContainer: HTMLElement
	let confettiAnimation: AnimationItem

	onMount(() => {
		if (!confettiContainer) return

		confettiAnimation = lottie.loadAnimation({
			container: confettiContainer,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			animationData,
		})
	})
</script>

<section
	class="mb-6 grid grid-cols-12 justify-items-center gap-2 text-5xl sm:gap-6 sm:text-8xl md:text-9xl"
>
	{#each board as { face, state }, index}
		<Card
			{face}
			revealed={state !== 'hidden'}
			handleClick={() => handleCardClick(index)}
		/>
	{/each}
</section>
{#if isBoardSolved}
	<div
		class="fixed inset-0 z-10 flex flex-col justify-center bg-surface-2/80 text-center text-4xl"
	>
		A winner is YOU! <button
			class="underline decoration-primary-600"
			on:click={handleReset}>Play again?</button
		>
	</div>
{/if}
<div
	bind:this={confettiContainer}
	class="pointer-events-none fixed inset-0 z-20 w-full"
/>
