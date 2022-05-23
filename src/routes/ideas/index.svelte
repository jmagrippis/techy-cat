<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte'
	import type {Idea} from '$lib/repos/ideas'

	export let ideas: Idea[]
</script>

<section class="container w-full grow px-2 sm:px-0">
	<PageHeading>Latest ideas</PageHeading>
	<ul class="flex max-w-prose flex-col gap-4">
		{#each ideas as { emoji, name, description }}
			<li class="flex items-center gap-4 rounded bg-surface-1 px-6 py-4 shadow">
				<span class="text-6xl">{emoji}</span>
				<div>
					<h2 class="text-2xl">
						{name}
					</h2>
					{description}
				</div>
			</li>
		{/each}
	</ul>
</section>
