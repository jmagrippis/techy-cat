<script lang="ts">
	import {enhanceForm} from '$lib/actions/enhanceForm'
	import PageHeading from '$lib/components/PageHeading.svelte'
	import {setUser, user} from '$lib/stores/user'
	import IdeaSnippetCard from '$lib/components/IdeaSnippetCard.svelte'

	export let starredIdeas: App.Idea[]

	const handleLogout = async () => {
		setUser(null)
	}
</script>

<svelte:head>
	<title>Profile | Techy Cat</title>
</svelte:head>

<div class="container w-full grow px-2 sm:px-0">
	<section class="mb-8">
		<PageHeading>Profile</PageHeading>
		<p>You are logged in as <strong>{$user?.displayName}</strong>!</p>

		<form
			method="POST"
			action="auth/session?_method=DELETE"
			use:enhanceForm={{result: handleLogout}}
		>
			<button class="underline decoration-primary-600">logout</button>
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
		<PageHeading>Starred ideas</PageHeading>
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
