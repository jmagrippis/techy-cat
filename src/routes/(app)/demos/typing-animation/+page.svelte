<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte'
	import TypingAnimation from './TypingAnimation.svelte'
	import type {PageData} from './$types'

	export let data: PageData
</script>

<section class="container w-full grow px-2">
	<PageHeading>Svelte Typing Animation</PageHeading>
	<section class="text-4xl md:text-6xl">
		<div class="text-primary-400">Your go-to place for</div>
		<TypingAnimation sentences={data.sentences} />
	</section>
</section>
