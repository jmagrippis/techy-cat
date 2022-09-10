<script lang="ts">
	import {fly} from 'svelte/transition'
	import PageHeading from '$lib/components/PageHeading.svelte'
	import Board from './Board.svelte'
	import type {PageData} from './$types'
	import {goto} from '$app/navigation'

	export let data: PageData
	$: ({board, cardSets, selectedCardSet} = data)

	let wrongGuesses = 0
	let reverting = false

	const handleReset = async () => {
		const url = new URL(window.location.href)
		if (!url.searchParams.has('seed') && !url.searchParams.has('mode')) {
			url.searchParams.set('mode', 'practice')
		}

		if (url.href === window.location.href) {
			window.location.reload()
		} else {
			await goto(url, {noscroll: true})
			wrongGuesses = 0
		}
	}
</script>

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
		<div class="flex gap-2">
			<div>Wrong guesses:</div>
			<div class="relative grow">
				{#key wrongGuesses}
					<strong
						out:fly={{y: -12, duration: 500}}
						in:fly={{y: 12, duration: 500}}
						class="absolute">{wrongGuesses}</strong
					>
				{/key}
			</div>
		</div>
	</aside>

	<div class="flex grow flex-col justify-center">
		<Board bind:board bind:wrongGuesses bind:reverting {handleReset} />
	</div>
</div>
