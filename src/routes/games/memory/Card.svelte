<script lang="ts">
	export let face: string
	export let revealed: boolean
	export let shake: boolean
	export let handleClick: () => void
</script>

<button
	class="relative col-span-3 flex h-24 w-16 select-none rounded ring-offset-transparent transition-transform duration-300 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 sm:h-56 sm:w-36 md:h-60 md:w-40 lg:h-64 lg:w-48"
	class:revealed
	class:shake
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
		transform-style: preserve-3d;
	}

	button.revealed {
		transform: rotateY(180deg);
	}

	.front,
	.back {
		backface-visibility: hidden;
	}

	.front {
		transform: rotateY(180deg);
	}

	.shake {
		animation: shake 0.3s;
	}

	@keyframes shake {
		0% {
			transform: translateX(0) rotateY(180deg);
		}
		25% {
			transform: translateX(-8px) rotateY(180deg);
		}
		50% {
			transform: translateX(8px) rotateY(180deg);
		}
		75% {
			transform: translateX(-8px) rotateY(180deg);
		}
		100% {
			transform: translateX(0) rotateY(180deg);
		}
	}
</style>
