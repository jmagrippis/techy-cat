<script lang="ts">
	import IdeaCard from '$lib/components/IdeaCard.svelte'
	import PageHeading from '$lib/components/PageHeading.svelte'

	export let ideas: App.IdeaSnippet[]
</script>

<section class="container w-full grow px-2">
	<PageHeading>Latest Ideas</PageHeading>
	<ul class="flex max-w-prose flex-col gap-4">
		{#each ideas as { id, emoji, name, description, starred }}
			<li>
				<IdeaCard {id} {emoji} {name} {description} {starred} />
			</li>
		{/each}
	</ul>
</section>
