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

	const rankFormatter = new Intl.NumberFormat('en', {
		minimumIntegerDigits: 2,
	})
</script>

<div class="container flex w-full grow flex-col px-2">
	<PageHeading>Leaderboard</PageHeading>
	<h2 class="text-2xl">for MEMORY GAME</h2>

	<p class="mb-6">
		Lower scores are better! Solve with the fewest mistakes possible 🙂
	</p>

	{#if !$user}
		<p class="my-6 text-xl">
			Remember, you may <a href="/login"
				>log in to submit your own High Scores!</a
			>
		</p>
	{/if}

	<div class="max-w-prose">
		<ul class="mb-6 flex flex-col gap-6 font-arcade">
			{#each Object.entries(seedsToHighScores) as [seed, highScores]}
				<li>
					<h3 class="border-b-4 text-xl font-semibold">
						{seed}
					</h3>
					<ul>
						{#each highScores as { player, score }, index}
							<li class="flex gap-4">
								<span class="shrink-0 border-r-4 pr-4"
									>{rankFormatter.format(index + 1)}</span
								>
								<span class="grow">{player.displayName}</span>
								<span class="shrink-0 text-primary-400">{score}</span>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
		<div class="text-center">
			<BigLink href="/games/memory">Go back & PLAY!</BigLink>
		</div>
	</div>
</div>
