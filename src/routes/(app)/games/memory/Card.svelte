<script lang="ts">
	export let face: string
	export let revealed: boolean
	export let shaking: boolean
	export let handleClick: () => void
</script>

<button
	class="relative col-span-3 flex h-24 w-16 select-none rounded ring-offset-transparent transition-transform duration-300 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 sm:h-56 sm:w-36 md:h-60 md:w-40 lg:h-64 lg:w-48"
	class:revealed
	class:shaking
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
		--shake-amount: 10%;
		--shake-duration: 0.3s;
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

	.shaking .back {
		animation: shake var(--shake-duration) ease-in-out infinite;
	}

	.shaking .front {
		animation: shakeRotated var(--shake-duration) ease-in-out infinite;
	}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25%,
		75% {
			transform: translateX(var(--shake-amount));
		}
		50% {
			transform: translateX(calc(var(--shake-amount) * -1));
		}
	}

	@keyframes shakeRotated {
		0%,
		100% {
			transform: translateX(0) rotateY(180deg);
		}
		25%,
		75% {
			transform: translateX(var(--shake-amount)) rotateY(180deg);
		}
		50% {
			transform: translateX(calc(var(--shake-amount) * -1)) rotateY(180deg);
		}
	}
</style>
