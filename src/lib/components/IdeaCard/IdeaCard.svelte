<script lang="ts">
	import {enhance} from '$app/forms'
	import EmptyStar from '$lib/icons/empty-star.svg'
	import {user} from '$lib/stores/user'

	export let id: string
	export let emoji: string
	export let name: string
	export let description: string
	export let starred: boolean

	let state: 'idle' | 'starring' | Error = 'idle'
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
		{#if $user}
			<form
				class="relative"
				method="POST"
				action={`/ideas?/${starred ? 'unstar' : 'star'}`}
				use:enhance={() => {
					state = 'starring'
					starred = !starred

					return ({result}) => {
						if (result.type === 'success') {
							state = 'idle'
						} else {
							state = new Error(
								`there was a problem ${
									starred ? 'starring' : 'unstarring'
								} this idea...`
							)
							starred = !starred
						}
					}
				}}
			>
				<input type="hidden" name="id" value={id} />
				<button
					class="text-4xl"
					disabled={state === 'starring'}
					aria-label={starred ? 'unstar this idea' : 'star this idea'}
				>
					{starred ? '★' : '☆'}
				</button>
			</form>
		{:else}
			<a href="/login">
				<EmptyStar class="w-8 fill-copy-base" title="login to star this idea" />
			</a>
		{/if}
	</div>
</div>
