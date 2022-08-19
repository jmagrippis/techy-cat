<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte'
	import {user} from '$lib/stores/user'

	import type {PageData} from './$types'

	export let data: PageData
	$: ({myIdeas} = data)
</script>

<svelte:head>
	<title>My Ideas Dashboard | Techy Cat</title>
</svelte:head>

<PageHeading>My Ideas</PageHeading>

{#if myIdeas.length}
	<p class="mb-6">Select an idea to edit</p>
	<ul class="text-2xl">
		{#each myIdeas as { id, emoji, name }}
			<li>
				<a href="/dashboard/ideas/{id}">{emoji} {name}</a>
			</li>
		{/each}
	</ul>

	<section class="text-center">
		<p>Select an idea</p>
	</section>
{:else}
	<p>You have created no ideas 🙀</p>
{/if}
{#if $user?.role === 'contributor'}
	<p><a href="/dashboard/ideas/new">create a new one!</a></p>
{/if}
