<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte'
	import Board from './Board.svelte'
	import type {PageData} from './$types'
	import {goto} from '$app/navigation'

	export let data: PageData
	$: ({board, cardSets, selectedCardSet} = data)

	let wrongGuesses = 0

	const handleWrongGuess = () => (wrongGuesses += 1)
	const handleReset = async () => {
		const url = new URL(window.location.href)
		if (!url.searchParams.has('seed') && !url.searchParams.has('mode')) {
			url.searchParams.set('mode', 'practice')
		}

		await goto(url, {noscroll: true})
		wrongGuesses = 0
	}
</script>

<svelte:head>
	<title>Memory Game | Techy Cat</title>
</svelte:head>

<div class="container flex w-full grow flex-col px-2">
	<PageHeading>Memory Game</PageHeading>
	<aside class="mb-6 flex flex-col gap-4 text-xl">
		<label class="flex items-center gap-4">
			Card set:
			<select
				class="grow rounded border-r-8 border-transparent py-2 px-3"
				on:change={async ({currentTarget}) => {
					const url = new URL(window.location.href)
					url.searchParams.set('cardSet', currentTarget.value)

					await goto(url, {noscroll: true})
					wrongGuesses = 0
				}}
			>
				{#each cardSets as cardSet}
					<option value={cardSet} selected={cardSet === selectedCardSet}>
						{cardSet}
					</option>
				{/each}
			</select>
		</label>
		<div>Wrong guesses: <strong>{wrongGuesses}</strong></div>
	</aside>

	<div class="flex grow flex-col justify-center">
		<Board {board} {handleWrongGuess} {handleReset} />
	</div>
</div>
