<script lang="ts">
	import {fly} from 'svelte/transition'
	import PageHeading from '$lib/components/PageHeading.svelte'
	import Board from './Board.svelte'
	import type {PageData} from './$types'
	import {goto} from '$app/navigation'
	import type {ActionResult} from '@sveltejs/kit'

	export let data: PageData
	$: ({board, cardSets, selectedCardSet} = data)

	let wrongGuesses = 0
	let reverting = false
	let updatedHighScore: number | null = null

	$: currentHighScore = updatedHighScore ?? data.highScore

	const handleReset = async () => {
		window.location.reload()
	}

	let persistScoreForm: HTMLFormElement

	const handleBoardSolved = async () => {
		const formData = new FormData(persistScoreForm)

		const response = await fetch(persistScoreForm.action, {
			method: 'POST',
			body: formData,
		})
		const result: ActionResult = await response.json()

		if (
			result.type === 'success' &&
			typeof result.data?.highScore === 'number'
		) {
			updatedHighScore = result.data?.highScore
		}
	}

	const handleSfxToggle: svelte.JSX.EventHandler<
		Event,
		HTMLInputElement
	> = async ({currentTarget}) => {
		if (!currentTarget.form) return

		const data = new FormData(currentTarget.form)
		await fetch('/sfxOn', {
			method: 'POST',
			body: data,
		})
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
		<form class="flex">
			<label class="flex cursor-pointer items-center gap-4">
				<span>SFXs</span>
				<div class="relative h-full w-6">
					{#if data.sfxOn}
						<span
							out:fly|local={{y: -12, duration: 500}}
							in:fly|local={{y: 12, duration: 500}}
							class="absolute">📢</span
						>
					{:else}
						<span
							out:fly|local={{y: -12, duration: 500}}
							in:fly|local={{y: 12, duration: 500}}
							class="absolute">🔇</span
						>
					{/if}
				</div>
				<input
					class="rounded border-r-8 border-transparent py-2 px-3"
					type="checkbox"
					name="sfxOn"
					bind:checked={data.sfxOn}
					on:change|preventDefault={handleSfxToggle}
				/>
			</label>
		</form>
		<form method="POST" action="?/persistScore" bind:this={persistScoreForm}>
			<input type="hidden" name="seed" value={data.seed} />
			<input type="hidden" name="wrongGuesses" value={wrongGuesses} />
		</form>
		<div class="flex gap-2">
			<div>
				{#if data.mode === 'daily'}
					Mode: <strong class="uppercase">Daily</strong>
					{#if data.seed}
						<em
							>{new Date(data.seed).toLocaleString(undefined, {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}</em
						>
					{/if}
				{:else}
					Mode: <strong class="uppercase">Practice</strong>
					{#if data.seed}
						<em>{data.seed}</em>
					{/if}
				{/if}
			</div>
		</div>
		<div class="flex gap-2">
			<div>Wrong guesses:</div>
			<div class="relative grow">
				{#key wrongGuesses}
					<strong
						out:fly|local={{y: -12, duration: 500}}
						in:fly|local={{y: 12, duration: 500}}
						class="absolute">{wrongGuesses}</strong
					>
				{/key}
			</div>
		</div>
		{#if currentHighScore}
			<div class="flex gap-2">
				<div>Your best score today:</div>
				<div class="relative grow">
					{#key currentHighScore}
						<strong
							out:fly|local={{y: -12, duration: 500}}
							in:fly|local={{y: 12, duration: 500}}
							class="absolute">{currentHighScore}</strong
						>
					{/key}
				</div>
			</div>
		{/if}
	</aside>

	<div class="flex grow flex-col justify-center">
		<Board
			bind:board
			bind:wrongGuesses
			bind:reverting
			{handleReset}
			{handleBoardSolved}
			sfxOn={data.sfxOn}
		/>
	</div>
	{#if data.stats}
		<div class="text-xl">
			<p>
				You’ve completed {data.stats.totalDailies === 1
					? 'your first daily'
					: `${data.stats.totalDailies} dailies total`}!
			</p>
			<p>Your current daily streak is {data.stats.streak}!</p>
		</div>
	{/if}
</div>
