<script lang="ts">
	import {randomInteger} from '$lib/randomInteger'
	import {onMount} from 'svelte'

	const TYPING_SPEED_MS = 170
	const TYPING_VARIANCE = 30
	const PAUSE_TIME_MS = 1000
	const DELETE_SPEED_MS = 100

	export let sentences: string[]
	let currentlySelectedSentenceIndex = 0

	$: currentSentence = sentences[currentlySelectedSentenceIndex]

	let typedToIndex = 0
	let currentTimeout: null | NodeJS.Timeout = null

	$: typedSentence = currentSentence.slice(0, typedToIndex)

	const handleTypingPhase = () => {
		currentTimeout = setTimeout(() => {
			if (typedToIndex + 1 <= currentSentence.length) {
				typedToIndex++
				handleTypingPhase()
			} else {
				phase = 'pausing'
			}
		}, randomInteger(TYPING_SPEED_MS - TYPING_VARIANCE, TYPING_SPEED_MS + TYPING_VARIANCE))
	}

	const handlePausingPhase = () => {
		currentTimeout = setTimeout(() => {
			phase = 'deleting'
		}, PAUSE_TIME_MS)
	}

	const handleDeletingPhase = () => {
		currentTimeout = setTimeout(() => {
			const nextSelectedSentenceIndex =
				currentlySelectedSentenceIndex + 1 < sentences.length
					? currentlySelectedSentenceIndex + 1
					: 0
			const nextSentence = sentences[nextSelectedSentenceIndex]
			const haveDeletedEnough =
				typedToIndex === 0 || nextSentence.indexOf(typedSentence) === 0
			if (!haveDeletedEnough) {
				typedToIndex--
				handleDeletingPhase()
			} else {
				currentlySelectedSentenceIndex = nextSelectedSentenceIndex
				phase = 'typing'
			}
		}, DELETE_SPEED_MS)
	}

	type Phase = 'typing' | 'pausing' | 'deleting'
	let phase: Phase = 'typing'

	const phaseHandler = (currentPhase: Phase) => {
		switch (currentPhase) {
			case 'typing':
				handleTypingPhase()
				break
			case 'pausing':
				handlePausingPhase()
				break
			case 'deleting':
				handleDeletingPhase()
				break
		}
	}

	$: phaseHandler(phase)

	onMount(() => {
		return () => {
			if (currentTimeout) {
				clearTimeout(currentTimeout)
			}
		}
	})
</script>

<div
	class="text-secondary-400 after:ml-1 after:text-2xl after:text-secondary-200 after:content-['|'] md:after:text-3xl"
	class:after:animate-blinking={phase === 'pausing'}
>
	{typedSentence}
</div>
