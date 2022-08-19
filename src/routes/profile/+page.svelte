<script lang="ts">
	import {enhanceForm} from '$lib/actions/enhanceForm'
	import PageHeading from '$lib/components/PageHeading.svelte'
	import {user} from '$lib/stores/user'
	import IdeaSnippetCard from '$lib/components/IdeaSnippetCard.svelte'
	import type {PageData} from './$types'

	export let data: PageData
	$: ({starredIdeas} = data)

	let updatedName: string = $user?.displayName || ''

	const handleUpdateDisplayName = async ({response}: {response: Response}) => {
		if (response.ok) {
			const json = await response.json()

			$user = json.user
		}
	}
	const handleLogout = async () => {
		$user = null
	}
</script>

<svelte:head>
	<title>Profile | Techy Cat</title>
</svelte:head>

<div class="container w-full grow px-2 sm:px-0">
	<section class="mb-8 max-w-prose">
		<PageHeading>Profile</PageHeading>
		<p>You are logged in as <strong>{$user?.displayName}</strong>!</p>

		<form
			class="mb-2 grid grid-cols-12 items-center gap-2"
			method="POST"
			action="profile"
			use:enhanceForm={{result: handleUpdateDisplayName}}
		>
			<label class="col-span-12 lg:col-span-5" for="display_name">
				You may update your <strong>display name</strong>:
			</label>
			<input
				class="col-span-7 rounded p-2 shadow sm:col-span-6 lg:col-span-4"
				id="display_name"
				name="display_name"
				bind:value={updatedName}
				placeholder="display name"
			/>
			<button
				class="bg-tra col-span-5 underline decoration-primary-600 sm:col-span-6 lg:col-span-3"
				>update</button
			>
		</form>

		<form
			method="POST"
			action="auth/session?_method=DELETE"
			use:enhanceForm={{result: handleLogout}}
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
