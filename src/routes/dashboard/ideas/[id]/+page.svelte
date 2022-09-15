<script lang="ts">
	import {enhance} from '$app/forms'
	import BigButton from '$lib/components/buttons/BigButton.svelte'
	import PageHeading from '$lib/components/PageHeading.svelte'
	import type {PageData} from './$types'

	export let data: PageData
	$: ({idea} = data)

	let state: 'idle' | 'updating' | 'success' | Error = 'idle'
</script>

<PageHeading>Edit Idea</PageHeading>

<form
	method="POST"
	class="text-2x mb-6 flex w-full flex-col gap-4"
	use:enhance={() => {
		state = 'updating'

		return ({result}) => {
			switch (result.type) {
				case 'error':
					state = new Error(
						result.error ?? 'Something went wrong updating idea!'
					)
					break
				case 'invalid':
					state = new Error('Something went wrong updating idea!')
					break
				case 'success':
				default:
					state = 'success'
					break
			}
		}
	}}
>
	<label>
		<strong>Emoji</strong>
		<input
			class="block w-full rounded p-4"
			name="emoji"
			value={idea.emoji}
			maxlength="4"
		/>
	</label>
	<label>
		<strong>Name</strong>
		<input class="block w-full rounded p-4" name="name" value={idea.name} />
	</label>
	<label>
		<strong>Slug</strong>
		<input class="block w-full rounded p-4" name="slug" value={idea.slug} />
	</label>
	<label>
		<strong>Description</strong>
		<textarea
			class="block w-full rounded p-4"
			name="description"
			value={idea.description}
			rows="8"
		/>
	</label>

	<BigButton disabled={state === 'updating'}>Update</BigButton>
</form>
{#if state === 'updating'}
	<div class="text-lg">⚙️ updating ⚙️</div>
{:else if state === 'success'}
	<div class="text-lg">✅ idea updated ✅</div>
{:else if state instanceof Error}
	<div class="text-lg">🚨 {state} 🚨</div>
{/if}
