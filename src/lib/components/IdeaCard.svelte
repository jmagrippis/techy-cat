<script lang="ts">
	export let emoji: string
	export let name: string
	export let description: string
</script>

<div
	class="grid grid-cols-12 items-center gap-4 rounded bg-surface-2 px-6 py-4 shadow"
>
	<span class="col-span-3 text-center text-6xl sm:col-span-2">{emoji}</span>
	<div class="col-span-9 sm:col-span-10">
		<h2 class="text-2xl">{name}</h2>
		<div class="break-words">
			{description}
		</div>
	</div>
</div>
