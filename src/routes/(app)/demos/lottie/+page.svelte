<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte'
	import BigButton from '$lib/components/buttons/BigButton.svelte'
	import type {PageData} from './$types'
	import DemoCard from '../DemoCard.svelte'

	export let data: PageData
</script>

<section class="container w-full grow px-2">
	<PageHeading>Animations with Lottie</PageHeading>

	<ul class="mb-6 grid grid-cols-12 gap-6">
		{#each data.cards as { id, title, description, link, author, updatedAt, hearted }}
			<li class="col-span-12 lg:col-span-6">
				<DemoCard
					{id}
					{title}
					{description}
					{link}
					{author}
					{updatedAt}
					actionText="View!"
					bind:hearted
				/>
			</li>
		{/each}
	</ul>
	<BigButton>Celebrate!</BigButton>
</section>
