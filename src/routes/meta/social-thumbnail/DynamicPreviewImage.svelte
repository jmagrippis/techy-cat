<script lang="ts">
	export let title: string
	export let subtitle: string
	export let heartCount: number
</script>

<div
	class="flex h-full w-full flex-col items-start gap-6 bg-gradient-to-br from-primary-600 to-primary-900 p-6 text-white"
>
	<h1 class="inline-block border-b-2 border-b-secondary-400 text-6xl">
		{title}
	</h1>
	<h2 class="grow text-4xl">{subtitle}</h2>
	<div class="self-end text-4xl font-thin">
		🤍 {heartCount}
	</div>
</div>
