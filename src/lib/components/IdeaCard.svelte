<script lang="ts">
	export let emoji: string
	export let name: string
	export let description: string
</script>

<div class="flex items-center gap-4 rounded bg-surface-2 px-6 py-4 shadow">
	<span class="text-6xl">{emoji}</span>
	<div>
		<h2 class="text-2xl">{name}</h2>
		{description}
	</div>
</div>
