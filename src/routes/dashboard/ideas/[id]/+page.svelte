<script lang="ts">
	import {enhanceForm} from '$lib/actions/enhanceForm'
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
	action={`/dashboard/ideas/${idea.id}`}
	class="text-2x mb-6 flex w-full flex-col gap-4"
	use:enhanceForm={{
		pending() {
			state = 'updating'
		},
		error({error}) {
			state = error ?? new Error('Something went wrong updating idea!')
		},
		result() {
			state = 'success'
		},
	}}
>
	<label>
		<strong>Emoji</strong>
		<input
			class="block w-full rounded p-4"
			name="emoji"
			bind:value={idea.emoji}
			maxlength="4"
		/>
	</label>
	<label>
		<strong>Name</strong>
		<input
			class="block w-full rounded p-4"
			name="name"
			bind:value={idea.name}
		/>
	</label>
	<label>
		<strong>Slug</strong>
		<input
			class="block w-full rounded p-4"
			name="slug"
			bind:value={idea.slug}
		/>
	</label>
	<label>
		<strong>Description</strong>
		<textarea
			class="block w-full rounded p-4"
			name="description"
			bind:value={idea.description}
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
