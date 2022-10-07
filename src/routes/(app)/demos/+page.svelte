<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte'
	import type {PageData} from './$types'
	import DemoCard from './DemoCard.svelte'

	export let data: PageData
</script>

<section class="container w-full grow px-2">
	<PageHeading>Interactive Demos</PageHeading>
	<ul class="flex max-w-prose flex-col gap-4">
		{#each data.demos as { id, title, description, link, author, updatedAt, hearted }}
			<li>
				<DemoCard
					{id}
					{title}
					{description}
					{link}
					{author}
					{updatedAt}
					bind:hearted
				/>
			</li>
		{/each}
	</ul>
</section>
