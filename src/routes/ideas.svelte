<script lang="ts">
	import IdeaCard from '$lib/components/IdeaCard.svelte'

	import PageHeading from '$lib/components/PageHeading.svelte'
	import type {IdeaSnippet} from '$lib/repos/ideas'

	export let ideas: IdeaSnippet[]
</script>

<section class="container w-full grow px-2 sm:px-0">
	<PageHeading>Latest ideas</PageHeading>
	<ul class="flex max-w-prose flex-col gap-4">
		{#each ideas as { emoji, name, description }}
			<li>
				<IdeaCard {emoji} {name} {description} />
			</li>
		{/each}
	</ul>
</section>
