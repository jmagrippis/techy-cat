<script lang="ts">
	import {onMount} from 'svelte'
	import lottie from 'lottie-web'

	import animationData from './cat-playing-with-yarn.json'

	import BigLink from '../buttons/BigLink.svelte'

	let animationContainer: HTMLElement

	onMount(() => {
		if (!animationContainer) return

		lottie.loadAnimation({
			container: animationContainer,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData,
		})
	})
</script>

<section class="container grid grid-cols-12 items-center">
	<div class="col-span-12 text-center text-xl md:text-2xl lg:col-span-5">
		<div class="mb-2 text-5xl lg:text-6xl">
			<div class="mb-2">Get inspired by</div>
			<div class="flex justify-center">
				😻
				<h1 class="font-thin text-primary-400">Techy Cat</h1>
				😻
			</div>
		</div>
		<p class="mb-4 text-copy-muted">
			A curated list of ideas which <span
				class="underline decoration-secondary-300">sparks creativity</span
			>!
		</p>
		<p class="text-center">
			<BigLink href="/ideas" prefetch={true}
				>Check out the latest ideas!</BigLink
			>
		</p>
	</div>
	<aside class="col-span-12 min-h-full lg:col-span-7">
		<div
			bind:this={animationContainer}
			class="h-[33vh] animate-fade-in-once lg:h-[67vh]"
		/>
	</aside>
</section>
