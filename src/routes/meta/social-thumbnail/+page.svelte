<script lang="ts">
	import type {PageData} from './$types'
	import DynamicPreviewImage from './DynamicPreviewImage.svelte'

	export let data: PageData
</script>

<main class="h-[630px] w-[1200px]">
	<DynamicPreviewImage
		title={data.title}
		subtitle={data.subtitle}
		heartCount={data.heartCount}
	/>
</main>
