<script lang="ts">
	import BigLink from '../buttons/BigLink.svelte'
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
			<BigLink href="/ideas">Check out the latest ideas!</BigLink>
		</p>
	</div>
	<aside class="col-span-12 min-h-full lg:col-span-7">
		<div class="mt-6 p-6 text-center text-8xl">😸</div>
	</aside>
</section>
