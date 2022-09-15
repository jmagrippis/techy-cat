<script lang="ts">
	import {enhance} from '$app/forms'
	import PageHeading from '$lib/components/PageHeading.svelte'
	import {isUser, user} from '$lib/stores/user'
	import IdeaSnippetCard from '$lib/components/IdeaSnippetCard.svelte'
	import type {PageData} from './$types'
	import {goto} from '$app/navigation'

	export let data: PageData
	$: ({starredIdeas} = data)

	$: displayName = $user?.displayName || ''

	const handleLogout: svelte.JSX.EventHandler<
		Event,
		HTMLFormElement
	> = async () => {
		const response = await fetch('/auth/session', {
			method: 'DELETE',
		})
		if (response.ok) {
			await goto('/login')
			$user = null
		}
	}
</script>

<div class="container w-full grow px-2 sm:px-0">
	<section class="mb-8 max-w-prose">
		<PageHeading>Profile</PageHeading>
		<p>You are logged in as <strong>{$user?.displayName}</strong>!</p>

		<form
			class="mb-2 grid grid-cols-12 items-center gap-2"
			method="POST"
			action="profile"
			use:enhance={() =>
				({result}) => {
					if (result.type === 'success' && isUser(result.data)) {
						$user = result.data
					}
				}}
		>
			<label class="col-span-12 lg:col-span-5" for="display_name">
				You may update your <strong>display name</strong>:
			</label>
			<input
				class="col-span-7 rounded p-2 shadow sm:col-span-6 lg:col-span-4"
				id="display_name"
				name="display_name"
				value={displayName}
				placeholder="display name"
			/>
			<button
				class="bg-tra col-span-5 underline decoration-primary-600 sm:col-span-6 lg:col-span-3"
				>update</button
			>
		</form>

		<form
			method="POST"
			on:submit|preventDefault={handleLogout}
			use:enhance={() =>
				({result}) => {
					if (result.type === 'success') {
						$user = null
					}
				}}
		>
			<p>
				You may also <button class="underline decoration-primary-600"
					>logout</button
				>
			</p>
		</form>
	</section>

	<section class="mb-8">
		{#if $user?.role === 'contributor'}
			<p>
				As a <strong>contributor</strong> you have the ability to
				<a href="/dashboard/ideas">go to the dashboard</a>, and add new ideas,
				and edit them!
			</p>
		{:else}
			<p>
				As a <strong>fan</strong> you cannot create new ideas... but you can
				still review and update ideas you've created in the past,
				<a href="/dashboard/ideas">over at the dashboard</a>!
			</p>
		{/if}
	</section>

	<section>
		<h2 class="mb-6 text-3xl">Starred ideas</h2>
		<p class="mb-6">These are the ideas you have starred ⭐️!</p>
		<ul class="mb-6 grid grid-cols-12 gap-4">
			{#each starredIdeas as { emoji, name, description }}
				<li class="col-span-12 lg:col-span-6 xl:col-span-4">
					<IdeaSnippetCard {emoji} {name} {description} />
				</li>
			{/each}
		</ul>
	</section>
</div>
