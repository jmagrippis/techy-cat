<script lang="ts">
	import {animate, stagger} from 'motion'
	import {onMount} from 'svelte'
	import IdeaCard from '$lib/components/IdeaCard.svelte'

	export let ideas: App.IdeaWithAuthorAndStarred[]

	let listElements: HTMLLIElement[] = new Array(ideas.length)

	onMount(() => {
		const elements = listElements.filter((li) => !!li)
		animate(
			elements,
			{opacity: [0, 1], y: [100, 0]},
			{duration: 1, delay: stagger(0.1)}
		)
	})
</script>

{#each ideas as { id, emoji, name, description, starred }, index}
	<li bind:this={listElements[index]}>
		<IdeaCard {id} {emoji} {name} {description} {starred} />
	</li>
{/each}
