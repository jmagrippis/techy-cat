<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte'
	import type {PageData} from './$types'
	import DynamicPreviewImage from '../../../meta/social-thumbnail/DynamicPreviewImage.svelte'
</script>

<section class="container w-full grow px-2">
	<PageHeading>Interactive Demos</PageHeading>
	<p class="mb-4">
		When you want eye-catching Social Preview Snippets for sharing on your
		social networks, that integrate dynamic data! Accomplished using SvelteKit
		for the UI & Puppeteer for the snapshotting!
	</p>
	<p class="mb-4">
		We will be rendering the Svelte component below, with dynamic data for the
		amount of hearts
	</p>

	<div>
		<DynamicPreviewImage
			title="Dynamic Preview Images"
			subtitle="with SvelteKit + Playwright 😍"
			heartCount={4}
		/>
	</div>
</section>
