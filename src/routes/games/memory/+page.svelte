<script lang="ts">
	import {fly, type FlyParams} from 'svelte/transition'

	import PageHeading from '$lib/components/PageHeading.svelte'
	import Board from './Board.svelte'
	import type {PageData} from './$types'
	import {goto} from '$app/navigation'
	import {useMachine} from '@xstate/svelte'
	import {memoryGameMachine} from './memoryGameMachine'

	export let data: PageData
	$: ({cardSets, selectedCardSet} = data)

	const {state, send} = useMachine(memoryGameMachine, {
		context: {board: data.board, wrongGuessesCount: 0},
	})

	const handlePick = (index: number) => {
		send({type: 'PICK', index})
	}

	const handleReset = async () => {
		const url = new URL(window.location.href)
		if (!url.searchParams.has('seed') && !url.searchParams.has('mode')) {
			url.searchParams.set('mode', 'practice')
		}

		if (url.href === window.location.href) {
			window.location.reload()
		} else {
			await goto(url, {noscroll: true})
			send('REPLAY')
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
					send('REPLAY')
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
			Wrong guesses: <span class="relative grow">
				{#if $state.value !== 'reverting'}
					<strong
						in:fly={{y: 16, duration: 500}}
						out:fly={{y: -16, duration: 500}}
						class="absolute">{$state.context.wrongGuessesCount}</strong
					>
				{/if}
			</span>
		</div>
	</aside>

	<div class="flex grow flex-col justify-center">
		<Board
			board={$state.context.board}
			wrongGuessesCount={$state.context.wrongGuessesCount}
			boardState={$state.value}
			{handlePick}
			{handleReset}
		/>
	</div>
</div>
