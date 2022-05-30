<script lang="ts">
	import BigLink from '../buttons/BigLink.svelte'
	import HeroImage from '$lib/icons/hero.svg'
</script>

<section
	class="container py-4 px-2 md:grid md:grid-cols-12 md:gap-x-8 md:px-0 lg:gap-x-16"
>
	<div
		class="mb-8 text-center text-xl md:col-span-5 md:mb-0 md:self-center md:text-left md:text-2xl"
	>
		<div class="mb-2 text-5xl lg:text-6xl">
			<div class="mb-2">Get inspired by</div>
			<div class="flex justify-center sm:justify-start">
				😻
				<div class="font-thin text-primary-400">Techy Cat</div>
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
	<aside class="md:col-span-7">
		<HeroImage class="w-full fill-surface-2 text-primary-400" />
	</aside>
</section>
