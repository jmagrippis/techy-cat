<script lang="ts">
	export let face: string
	export let revealed: boolean
	export let handleClick: () => void
</script>

<button
	class="relative col-span-6 flex h-64 w-48 select-none items-center justify-center rounded border bg-surface-2 text-center shadow lg:col-span-3"
	class:revealed
	on:click={handleClick}
	disabled={revealed}
>
	<div class="front">
		{face}
	</div>
	<div class="back absolute h-full w-full bg-card-back" />
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
