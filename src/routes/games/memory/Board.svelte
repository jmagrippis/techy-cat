<script lang="ts">
	import {afterUpdate, onMount} from 'svelte'
	import lottie, {type AnimationItem} from 'lottie-web'

	import Card from './Card.svelte'
	import type {Card as CardType} from './types'
	import animationData from './confetti.json'
	import type {StateValue} from 'xstate'

	export let board: CardType[]
	export let boardState: StateValue
	export let wrongGuessesCount: number
	$: isWon = boardState === 'won'
	$: isReverting = boardState === 'reverting'

	export let handlePick: (index: number) => void
	export let handleReset: () => void

	const handleCardClick = (index: number) => {
		handlePick(index)
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

	afterUpdate(() => {
		if (isWon) {
			confettiAnimation.goToAndPlay(0, true)
		}
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
			shake={state === 'selected' && isReverting}
		/>
	{/each}
</section>
{#if isWon}
	<div
		class="fixed inset-0 z-10 flex flex-col justify-center bg-surface-2/80 text-center text-4xl"
	>
		<div>
			A winner is YOU! <button
				class="underline decoration-primary-600"
				on:click={handleReset}>Play again?</button
			>
		</div>
		<div class="text-2xl">
			{#if wrongGuessesCount === 0}
				🤯 No wrong guesses! 🤯
			{:else}
				You needed {wrongGuessesCount} wrong guess{wrongGuessesCount === 1
					? ''
					: 'es'} 🙌
			{/if}
		</div>
	</div>
{/if}
<div
	bind:this={confettiContainer}
	class="pointer-events-none fixed inset-0 z-20 w-full"
/>
