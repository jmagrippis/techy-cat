<script lang="ts" context="module">
	import type {Load} from '@sveltejs/kit'

	export const load: Load = async ({fetch}) => {
		const response = await fetch('/ideas?limit=3', {
			headers: new Headers({
				Accept: 'application/json',
			}),
		})

		if (!response.ok) {
			return {status: response.status}
		}
		const {ideas} = await response.json()
		const latestIdeas: App.Idea[] = ideas

		return {
			status: 200,
			props: {
				latestIdeas,
			},
		}
	}
</script>

<script lang="ts">
	import Hero from '$lib/components/Hero/Hero.svelte'
	import IdeaCard from '$lib/components/IdeaCard.svelte'
	import BigLink from '$lib/components/buttons/BigLink.svelte'

	export let latestIdeas: App.Idea[]
</script>

<svelte:head>
	<title>Techy Cat: Get inspired & do more tech!</title>
</svelte:head>

<Hero />
<section class="container mb-6 px-2 sm:px-0">
	<h2 class="mb-4 text-2xl">Latest ideas</h2>
	<ul
		class="mb-6 flex max-w-prose flex-col gap-4 sm:grid sm:w-full sm:max-w-full sm:grid-cols-12"
	>
		{#each latestIdeas as { emoji, name, description }}
			<li class="sm:col-span-6 xl:col-span-4">
				<IdeaCard {emoji} {name} {description} />
			</li>
		{/each}
	</ul>
	<p class="text-center">
		<BigLink href="/ideas" prefetch={true}>See more!</BigLink>
	</p>
</section>
