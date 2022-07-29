<script lang="ts">
	import IdeaCard from '$lib/components/IdeaCard.svelte'
	import PageHeading from '$lib/components/PageHeading.svelte'
	import {animate, stagger} from 'motion'
	import {onMount} from 'svelte'

	export let ideas: App.IdeaWithAuthorAndStarred[]

	let listContainer: HTMLUListElement

	onMount(() => {
		if (!listContainer) return
		const listItems = listContainer.querySelectorAll(':scope > li')
		animate(
			listItems,
			{opacity: [0, 1], y: [100, 0]},
			{duration: 1, delay: stagger(0.1)}
		)
	})
</script>

<svelte:head>
	<title>Latest Ideas | Techy Cat</title>
</svelte:head>

<section class="container w-full grow px-2">
	<PageHeading>Latest Ideas</PageHeading>
	<ul class="flex max-w-prose flex-col gap-4" bind:this={listContainer}>
		{#each ideas as { id, emoji, name, description, starred }}
			<li>
				<IdeaCard {id} {emoji} {name} {description} {starred} />
			</li>
		{/each}
	</ul>
</section>
