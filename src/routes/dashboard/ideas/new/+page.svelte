<script lang="ts">
	import {enhance} from '$app/forms'
	import {goto} from '$app/navigation'

	import BigButton from '$lib/components/buttons/BigButton.svelte'
	import PageHeading from '$lib/components/PageHeading.svelte'

	let state: 'idle' | 'creating' | 'success' | Error = 'idle'
</script>

<PageHeading>New Idea</PageHeading>

<form
	method="POST"
	action="/dashboard/ideas/new"
	class="text-2x mb-6 flex w-full flex-col gap-4"
	use:enhance={() => {
		state = 'creating'

		return ({result}) => {
			switch (result.type) {
				case 'error':
					state = new Error(
						result.error ?? 'Something went wrong creating idea!'
					)
					break
				case 'invalid':
					state = new Error('Something went wrong creating idea!')
					break
				case 'redirect':
					goto(result.location)
					break
				case 'success':
				default:
					state = 'success'
					goto('/dashboard/ideas')
					break
			}
		}
	}}
>
	<label>
		<strong>Emoji</strong>
		<input class="block w-full rounded p-4" name="emoji" maxlength="4" />
	</label>
	<label>
		<strong>Name</strong>
		<input class="block w-full rounded p-4" name="name" />
	</label>
	<label>
		<strong>Slug</strong>
		<input class="block w-full rounded p-4" name="slug" />
	</label>
	<label>
		<strong>Description</strong>
		<textarea class="block w-full rounded p-4" name="description" rows="8" />
	</label>

	<BigButton disabled={state === 'creating'}>Publish!</BigButton>
</form>

{#if state === 'creating'}
	<div class="text-lg">⚙️ creating ⚙️</div>
{:else if state === 'success'}
	<div class="text-lg">✅ idea created ✅</div>
{:else if state instanceof Error}
	<div class="text-lg">🚨 {state} 🚨</div>
{/if}
