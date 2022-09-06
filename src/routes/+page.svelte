<script lang="ts">
	import Hero from '$lib/components/Hero/Hero.svelte'
	import BigLink from '$lib/components/buttons/BigLink.svelte'
	import IdeaSnippetCard from '$lib/components/IdeaSnippetCard.svelte'
	import type {PageData} from './$types'

	export let data: PageData
	$: ({latestIdeas, rootUrl} = data)

	const description = 'Tech content and ideas for free, to help inspire you!'
</script>

<svelte:head>
	<title>Techy Cat: Get inspired & do more tech!</title>
	<meta name="description" content={description} />

	<meta property="og:title" content="Get inspired & do more tech!" />
	<meta property="og:type" content="article" />

	<meta property="og:image" content={`${rootUrl}/meta/index-preview.png`} />
	<meta name="twitter:card" content="summary_large_image" />

	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="Techy Cat" />
	<meta name="twitter:image:alt" content="Placeholder image for now" />
</svelte:head>

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
		<BigLink href="/ideas" prefetch={true}>See more & star your faves!</BigLink>
	</p>
</section>
