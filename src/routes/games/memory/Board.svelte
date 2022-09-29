<script lang="ts">
	import {onMount} from 'svelte'
	import lottie, {type AnimationItem} from 'lottie-web'

	import Card from './Card.svelte'
	import type {Card as CardType} from './types'
	import animationData from './confetti.json'
	import cardPickUrl from './sfx/card-pick.aac'
	import mismatchUrl from './sfx/mismatch.aac'
	import matchUrl from './sfx/match.aac'
	import fanfareUrl from './sfx/fanfare.aac'

	export let board: CardType[]
	export let wrongGuesses: number
	export let handleReset: () => void
	export let handleBoardSolved: () => void
	export let reverting: boolean
	export let sfxOn: boolean

	const deriveBoardSolved = (givenBoard: CardType[]) =>
		givenBoard.every(({state}) => state === 'revealed')
	$: isBoardSolved = deriveBoardSolved(board)

	let cardPickAudio: HTMLAudioElement
	let mismatchAudio: HTMLAudioElement
	let matchAudio: HTMLAudioElement
	let fanfareAudio: HTMLAudioElement

	const playSfxIfEnabled = (audio: HTMLAudioElement) => {
		if (sfxOn) {
			audio.currentTime = 0
			audio.play()
		}
	}

	const handleCardClick = (index: number) => {
		if (reverting) return

		playSfxIfEnabled(cardPickAudio)

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
					playSfxIfEnabled(fanfareAudio)
					handleBoardSolved()
				} else {
					playSfxIfEnabled(matchAudio)
				}
			} else {
				reverting = true
				wrongGuesses += 1
				playSfxIfEnabled(mismatchAudio)

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

		cardPickAudio = new Audio(cardPickUrl)
		cardPickAudio.volume = 0.3
		mismatchAudio = new Audio(mismatchUrl)
		mismatchAudio.volume = 0.4
		matchAudio = new Audio(matchUrl)
		matchAudio.volume = 0.7
		fanfareAudio = new Audio(fanfareUrl)
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
			shaking={reverting && state === 'selected'}
		/>
	{/each}
</section>
{#if isBoardSolved}
	<div
		class="fixed inset-0 z-10 flex flex-col justify-center bg-surface-2/80 text-center text-4xl"
	>
		<div>A winner is YOU!</div>
		{#if wrongGuesses === 0}
			<div>You went PERFECT!!! 🤯</div>
		{:else}
			<div class="text-2xl">
				You needed {wrongGuesses > 1
					? `${wrongGuesses} wrong guesses`
					: 'a single wrong guess'}
				.
			</div>
		{/if}
		<button class="underline decoration-primary-600" on:click={handleReset}
			>Play again?</button
		>
	</div>
{/if}
<div
	bind:this={confettiContainer}
	class="pointer-events-none fixed inset-0 z-20 w-full"
/>
