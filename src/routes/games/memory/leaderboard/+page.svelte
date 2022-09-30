<script lang="ts">
	import BigLink from '$lib/components/buttons/BigLink.svelte'
	import PageHeading from '$lib/components/PageHeading.svelte'
	import {user} from '$lib/stores/user'
	import type {PageData} from './$types'

	export let data: PageData

	$: seedsToHighScores = data.highScores.reduce((acc, highScore) => {
		if (acc[highScore.seed]) {
			acc[highScore.seed].push(highScore)
		} else {
			acc[highScore.seed] = [highScore]
		}
		return acc
	}, {} as Record<string, PageData['highScores']>)
</script>

<div class="container flex w-full grow flex-col px-2">
	<PageHeading>Leaderboard</PageHeading>
	<h2 class="text-2xl">for MEMORY GAME</h2>

	{#if !$user}
		<p class="my-6 text-xl">
			Remember, you may <a href="/login"
				>log in to submit your own High Scores!</a
			>
		</p>
	{/if}

	{#each Object.entries(seedsToHighScores) as [seed, highScores]}
		<h3 class="text-xl font-semibold uppercase">
			{seed}
		</h3>
		<ul>
			{#each highScores as { player, score }, index}
				<li>{index + 1} | {player.displayName}: <strong>{score}</strong></li>
			{/each}
		</ul>
	{/each}
	<div class="mt-6 text-center">
		<BigLink href="/games/memory">Go back & PLAY!</BigLink>
	</div>
</div>
