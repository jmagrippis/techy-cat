<script lang="ts">
	import {goto} from '$app/navigation'

	import {enhanceForm} from '$lib/actions/enhanceForm'

	import BigButton from '$lib/components/buttons/BigButton.svelte'

	import PageHeading from '$lib/components/PageHeading.svelte'

	let emoji: string
	let name: string
	let slug: string
	let description: string

	let state: 'idle' | 'creating' | 'success' | Error = 'idle'
</script>

<svelte:head>
	<title>Create new idea | Techy Cat</title>
</svelte:head>

<PageHeading>New Idea</PageHeading>

<form
	method="POST"
	action="/dashboard/ideas/new"
	class="text-2x mb-6 flex w-full flex-col gap-4"
	use:enhanceForm={{
		pending() {
			state = 'creating'
		},
		error({error}) {
			state = error ?? new Error('Something went wrong creating idea!')
		},
		async result({response}) {
			if (!response.ok) {
				state = new Error('Something went wrong creating idea!')
				return
			}

			state = 'success'
			goto('/dashboard/ideas')
		},
	}}
>
	<label>
		<strong>Emoji</strong>
		<input
			class="block w-full rounded p-4"
			name="emoji"
			bind:value={emoji}
			maxlength="4"
		/>
	</label>
	<label>
		<strong>Name</strong>
		<input class="block w-full rounded p-4" name="name" bind:value={name} />
	</label>
	<label>
		<strong>Slug</strong>
		<input class="block w-full rounded p-4" name="slug" bind:value={slug} />
	</label>
	<label>
		<strong>Description</strong>
		<textarea
			class="block w-full rounded p-4"
			name="description"
			bind:value={description}
			rows="8"
		/>
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
