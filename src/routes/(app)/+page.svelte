<script lang="ts">
	import Hero from '$lib/components/Hero/Hero.svelte'
	import BigLink from '$lib/components/buttons/BigLink.svelte'
	import IdeaSnippetCard from '$lib/components/IdeaSnippetCard.svelte'
	import type {PageData} from './$types'

	export let data: PageData
	$: ({latestIdeas} = data)
</script>

<Hero />

<section class="container mb-6 px-2 sm:px-0">
	<h2 class="mb-4 text-2xl">Latest ideas</h2>
	<ul class="mb-6 grid grid-cols-12 gap-4">
		{#each latestIdeas as { emoji, name, description }}
			<li class="col-span-12 lg:col-span-6 xl:col-span-4">
				<IdeaSnippetCard {emoji} {name} {description} />
			</li>
		{/each}
	</ul>
	<p class="text-center">
		<BigLink href="/ideas">See more & star your faves!</BigLink>
	</p>
</section>
