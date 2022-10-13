<script lang="ts">
	import {onMount} from 'svelte'
	import lottie, {type AnimationItem} from 'lottie-web'

	import PageHeading from '$lib/components/PageHeading.svelte'
	import BigButton from '$lib/components/buttons/BigButton.svelte'
	import confettiAnimationData from '$lib/animations/confetti.json'
	import type {PageData} from './$types'
	import DemoCard from '../DemoCard.svelte'

	export let data: PageData

	let confettiContainer: HTMLElement
	let confettiAnimation: AnimationItem

	onMount(() => {
		if (!confettiContainer) return

		confettiAnimation = lottie.loadAnimation({
			container: confettiContainer,
			animationData: confettiAnimationData,
			loop: false,
			autoplay: false,
		})

		return () => {
			confettiAnimation.destroy()
		}
	})
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
	<form
		on:submit|preventDefault={() => {
			confettiAnimation.goToAndPlay(0, true)
		}}
	>
		<BigButton>Celebrate!</BigButton>
	</form>
	{#await import('./AnotherCat.svelte') then Module}
		<Module.default />
	{/await}
</section>
<div
	bind:this={confettiContainer}
	class="pointer-events-none fixed inset-0 z-20 w-full"
/>
