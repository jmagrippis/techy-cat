<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte'
	import Board from './Board.svelte'
</script>

<svelte:head>
	<title>Memory Game | Techy Cat</title>
</svelte:head>

<div class="container w-full grow px-2">
	<PageHeading>Memory Game</PageHeading>
	<Board />
</div>
