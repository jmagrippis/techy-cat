<script context="module" lang="ts">
	import type {Load} from '@sveltejs/kit'

	export const load: Load = async ({fetch}) => {
		const url = '/ideas?limit=3'
		const headers = new Headers({
			Accept: 'application/json',
		})

		const response = await fetch(url, {headers})

		if (response.status !== 200 || !response.ok) {
			return {status: response.status}
		}
		const {ideas} = await response.json()

		return {
			status: 200,
			props: {ideas},
			cache: {
				maxage: 1 * 60,
			},
		}
	}
</script>

<script lang="ts">
	import BigLink from '$lib/components/buttons/BigLink.svelte'

	import Hero from '$lib/components/Hero/Hero.svelte'
	import IdeaCard from '$lib/components/IdeaCard.svelte'
	import type {Idea} from '$lib/repos/ideas'

	export let ideas: Idea[]
</script>

<svelte:head>
	<title>Techy Cat: Get inspired & do more tech!</title>
</svelte:head>

<main>
	<Hero />
	<section>
		<h2 class="text-2xl">Latest ideas</h2>
		<ul
			class="flex max-w-prose flex-col gap-4 sm:grid sm:w-full sm:max-w-full sm:grid-cols-12"
		>
			{#each ideas as { emoji, name, description }}
				<li class="sm:col-span-6 xl:col-span-4">
					<IdeaCard {emoji} {name} {description} />
				</li>
			{/each}
		</ul>
		<p class="text-center">
			<BigLink href="/ideas" prefetch={true}>See more!</BigLink>
		</p>
	</section>
</main>
