<script lang="ts">
	export let face: string
	export let revealed: boolean
	export let handleClick: () => void
</script>

<button
	class="relative col-span-6 flex h-56 w-40 select-none sm:h-64 sm:w-48 lg:col-span-3"
	class:revealed
	on:click={handleClick}
	disabled={revealed}
>
	<div
		class="front absolute flex h-full w-full items-center justify-center rounded border bg-surface-2 bg-card-front text-center shadow"
	>
		{face}
	</div>
	<div
		class="back absolute h-full w-full rounded border bg-surface-2 bg-card-back shadow"
	/>
</button>

<style>
	button {
		transition: transform 1s;
		transform-style: preserve-3d;
	}

	button.revealed {
		transform: rotateY(180deg);
		transition: transform 0.5s;
	}

	.front,
	.back {
		backface-visibility: hidden;
	}

	.front {
		transform: rotateY(180deg);
	}
</style>
