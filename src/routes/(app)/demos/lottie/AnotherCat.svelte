<script lang="ts">
	import {onMount} from 'svelte'
	import lottie from 'lottie-web'

	import animationData from './another-cat.json'

	let container: HTMLElement

	onMount(() => {
		const animation = lottie.loadAnimation({
			container,
			animationData,
		})

		return () => {
			animation.destroy()
		}
	})
</script>

<div class="h-[50vh] animate-fade-in-once" bind:this={container} />
