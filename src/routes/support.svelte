<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte'
	import SupportTierCard from '$lib/components/SupportTierCard.svelte'
	import type {Product} from '$lib/repos/products'

	export let products: Product[]

	$: tiers = [
		{
			id: 'free',
			name: 'Alluring Alleycat',
			price: null,
			description: 'All we need is your email, and we appreciate the support!',
			features: ['Star ideas', 'Unique username'],
			paymentLink: null,
		},
		...products,
	]
</script>

<svelte:head>
	<title>Support | Techy Cat</title>
</svelte:head>

<section class="container flex-grow px-2">
	<PageHeading>Support</PageHeading>

	<div class="flex flex-col gap-6">
		<p class="text-xl">
			Show your support and contribute to Techy Cat by choosing one of our
			subscription plans!
		</p>

		<div
			class="space-y-12 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:space-y-0 lg:px-8"
		>
			{#each tiers as { name, price, description, features }}
				<SupportTierCard {name} {price} {description} {features} />
			{/each}
		</div>
	</div>
</section>
