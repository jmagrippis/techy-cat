<script lang="ts">
	import type {ProductPrice} from '$lib/repos/products'
	import {user} from '$lib/stores/user'
	import BigButton from './buttons/BigButton.svelte'
	import BigLink from './buttons/BigLink.svelte'

	export let name: string
	export let price: ProductPrice | null
	export let description: string
	export let features: string[]

	$: userRole = $user?.role
</script>

<div
	class="shadow-shadow relative flex flex-col rounded-2xl border border-primary-500 bg-surface-2 p-8"
>
	<div class="flex-1">
		<h3 class="mb-4 text-xl font-semibold text-copy-base">{name}</h3>
		<p class="mb-4 flex items-baseline text-copy-base">
			{#if price}
				<span class="font-extrabold text-5xl tracking-tight"
					>£{price.value}</span
				>
				<span class="ml-1 text-xl font-semibold">/month</span>
			{:else}
				<span class="font-extrabold text-5xl tracking-tight">FREE</span><span
					class="ml-1 text-xl font-semibold">🤩 forever 🤩</span
				>
			{/if}
		</p>
		<p class="mb-6 text-copy-muted">
			{description}
		</p>

		<ul class="mb-6 space-y-6">
			{#each features as feature}
				<li class="flex">
					<svg
						class="h-6 w-6 flex-shrink-0 text-primary-500"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					<span class="text-base-muted ml-3">{feature}</span>
				</li>
			{/each}
		</ul>
	</div>

	<div class="text-center">
		{#if price}
			<form method="POST" action="support">
				<input type="hidden" name="price-id" value={price.id} />
				<BigButton>Support!</BigButton>
			</form>
		{:else if !userRole}
			<BigLink href="/login">Login with email!</BigLink>
		{:else}
			<BigLink href="/profile">😎 You already have this 😎</BigLink>
		{/if}
	</div>
</div>
