<script lang="ts">
	import {enhanceForm} from '$lib/actions/enhanceForm'

	export let id: string
	export let emoji: string
	export let name: string
	export let description: string
	export let starred: boolean
	export let handleStar: (id: string, starred: boolean) => void

	import FullStar from '$lib/icons/star.svg'
	import EmptyStar from '$lib/icons/empty-star.svg'
</script>

<div
	class="grid grid-cols-12 items-center gap-4 rounded bg-surface-2 px-6 py-4 shadow"
>
	<span class="col-span-3 text-center text-6xl sm:col-span-2">{emoji}</span>
	<div class="col-span-9 sm:col-span-10">
		<h2 class="text-2xl">{name}</h2>
		<div class="break-words">
			{description}
		</div>
	</div>
	{#if starred}
		<form
			method="POST"
			action={`ideas/star/${id}?_method=DELETE`}
			use:enhanceForm={{
				result() {
					handleStar(id, false)
				},
			}}
		>
			<button class="relative"
				><FullStar class="w-8 fill-copy-base" title="unstar this idea" />
				<EmptyStar
					class="absolute top-0 z-0 w-8 animate-ping-once fill-copy-base"
				/>
			</button>
		</form>
	{:else}
		<form
			method="POST"
			action={`ideas/star/${id}`}
			use:enhanceForm={{
				result() {
					handleStar(id, true)
				},
			}}
		>
			<button
				><EmptyStar class="w-8 fill-copy-base" title="star this idea" /></button
			>
		</form>
	{/if}
</div>
