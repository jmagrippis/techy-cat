<script lang="ts">
	import {enhanceForm} from '$lib/actions/enhanceForm'
	import FullStar from '$lib/icons/star.svg'
	import EmptyStar from '$lib/icons/empty-star.svg'

	export let id: string
	export let emoji: string
	export let name: string
	export let description: string
	export let starred: boolean

	let state: 'idle' | 'starring' = 'idle'
</script>

<div
	class="grid grid-cols-12 items-center gap-4 rounded bg-surface-2 px-6 py-4 shadow"
>
	<span class="col-span-2 text-center text-5xl">{emoji}</span>
	<div class="col-span-8">
		<h2 class="text-2xl">{name}</h2>
		<div class="break-words">
			{description}
		</div>
	</div>
	<div class="col-span-2 text-center">
		<form
			class="relative"
			method="POST"
			action={starred ? '/ideas?_method=DELETE' : '/ideas'}
			use:enhanceForm={{
				pending() {
					state = 'starring'
				},
				result() {
					state = 'idle'
				},
			}}
		>
			<input type="hidden" name="id" value={id} />
			<button disabled={state === 'starring'}>
				{#if starred}
					<FullStar class="w-8 fill-copy-base" title="unstar this idea" />
					<EmptyStar
						class="absolute top-0 z-0 w-8 animate-ping-once fill-copy-base"
					/>
				{:else}
					<EmptyStar class="w-8 fill-copy-base" title="star this idea" />
				{/if}
			</button>
		</form>
	</div>
</div>
