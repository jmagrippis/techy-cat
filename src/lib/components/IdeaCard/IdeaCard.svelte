<script lang="ts">
	import {onMount} from 'svelte'
	import lottie, {type AnimationItem} from 'lottie-web'

	import {enhanceForm} from '$lib/actions/enhanceForm'
	import EmptyStar from '$lib/icons/empty-star.svg'
	import {user} from '$lib/stores/user'
	import animationData from './star.json'

	export let id: string
	export let emoji: string
	export let name: string
	export let description: string
	export let starred: boolean

	let starButton: HTMLButtonElement
	let starAnimation: AnimationItem

	let state: 'idle' | 'starring' | Error = 'idle'

	onMount(() => {
		if (!starButton) return

		starAnimation = lottie.loadAnimation({
			container: starButton,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			animationData,
		})

		const lastFrame = starAnimation.totalFrames - 1
		starAnimation.goToAndStop(starred ? lastFrame : 0, true)
	})
</script>

<div
	class="grid grid-cols-12 items-center gap-4 rounded bg-surface-2 px-6 py-4 shadow"
>
	<span class="col-span-2 text-center text-5xl">{emoji}</span>
	<div class="col-span-8">
		<h2 class="text-2xl">{name}</h2>
		<div class="break-words">
			{description}
		</div>
	</div>
	<div class="col-span-2 text-center">
		{#if $user}
			<form
				class="relative"
				method="POST"
				action={starred ? '/ideas?_method=DELETE' : '/ideas'}
				use:enhanceForm={{
					pending() {
						state = 'starring'
						starred = !starred

						starAnimation.setDirection(starred ? 1 : -1)
						starAnimation.goToAndPlay(starred ? 0 : 20, true)
					},
					result() {
						state = 'idle'
					},
					error() {
						state = new Error(
							`there was a problem ${
								starred ? 'starring' : 'unstarring'
							} this idea...`
						)
						starred = !starred
					},
				}}
			>
				<input type="hidden" name="id" value={id} />
				<button
					disabled={state === 'starring'}
					bind:this={starButton}
					aria-label={starred ? 'unstar this idea' : 'star this idea'}
				/>
			</form>
		{:else}
			<a href="/login">
				<EmptyStar class="w-8 fill-copy-base" title="login to star this idea" />
			</a>
		{/if}
	</div>
</div>
