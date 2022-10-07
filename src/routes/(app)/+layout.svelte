<script lang="ts">
	import Header from '$lib/components/Header/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import type {LayoutServerData} from './$types'
	import {theme} from '$lib/stores/theme'
	import {user} from '$lib/stores/user'
	import {page} from '$app/stores'

	export let data: LayoutServerData
	$: title = $page.data.meta?.title ?? data.defaultMeta.title
	$: description = $page.data.meta?.description ?? data.defaultMeta.description
	$: image = $page.data.meta?.image ?? data.defaultMeta.image

	$theme = data.theme
	$user = data.user
</script>

<svelte:head>
	<title>{title} | Techy Cat</title>
	<meta name="description" content={description} />

	<meta property="og:title" content={title} />
	<meta property="og:type" content="article" />

	<meta property="og:image" content={image.url} />
	<meta name="twitter:card" content="summary_large_image" />

	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="Techy Cat" />
	<meta name="twitter:image:alt" content={image.alt} />
</svelte:head>

<div id="theme-container" class={$theme}>
	<div id="app-content">
		<Header />

		<main class="flex flex-grow flex-col items-center justify-center">
			<slot />
		</main>

		<Footer />
	</div>
</div>
