<script lang="ts">
	import {onMount} from 'svelte'
	import {inView} from 'motion'

	import IdeasPage from '$lib/components/IdeasPage.svelte'
	import PageHeading from '$lib/components/PageHeading.svelte'

	export let ideas: App.IdeaWithAuthorAndStarred[]

	let lastPageLoaded = 1
	let fetchedIdeas: App.IdeaWithAuthorAndStarred[][] = []

	$: ideaPages = [ideas, ...fetchedIdeas]

	let ideasContainer: HTMLElement

	const loadMore = async () => {
		const page = lastPageLoaded + 1
		const data = await fetch(`/ideas?page=${page}`, {
			headers: new Headers({
				Accept: 'application/json',
			}),
		}).then((res) => res.json())

		lastPageLoaded = page
		fetchedIdeas = [...fetchedIdeas, data.ideas]

		const lastIdea = ideasContainer.querySelector(
			':scope > ul:last-child > li:last-child'
		)
		if (!lastIdea) return

		inView(lastIdea, () => {
			loadMore()
		})
	}

	onMount(() => {
		if (!ideasContainer) return
		const lastIdea = ideasContainer.querySelector(':scope > li:last-child')
		if (!lastIdea) return

		inView(lastIdea, () => {
			loadMore()
		})
	})
</script>

<svelte:head>
	<title>Latest Ideas | Techy Cat</title>
</svelte:head>

<section class="container w-full grow px-2">
	<PageHeading>Latest Ideas</PageHeading>
	<ul class="flex max-w-prose flex-col gap-4" bind:this={ideasContainer}>
		{#each ideaPages as ideas}
			<IdeasPage {ideas} />
		{/each}
	</ul>
</section>
