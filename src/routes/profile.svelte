<script lang="ts" context="module">
	import type {Load} from '@sveltejs/kit'

	export const load: Load = ({session}) =>
		session.user ? {status: 200} : {redirect: '/login', status: 302}
</script>

<script lang="ts">
	import {enhanceForm} from '$lib/actions/enhanceForm'
	import IdeaCard from '$lib/components/IdeaCard.svelte'
	import PageHeading from '$lib/components/PageHeading.svelte'
	import {setUser, user} from '$lib/stores/user'

	export let ideas: App.IdeaSnippet[] = []

	const handleLogout = async () => {
		setUser(null)
	}
</script>

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

	<section>
		<PageHeading>Favourite ideas</PageHeading>
		<p>These are the ideas you have marked as favourite!</p>
		<ul class="flex max-w-prose flex-col gap-4">
			{#each ideas as { id, emoji, name, description, starred }}
				<li>
					<IdeaCard {id} {emoji} {name} {description} {starred} />
				</li>
			{/each}
		</ul>
	</section>
</div>
