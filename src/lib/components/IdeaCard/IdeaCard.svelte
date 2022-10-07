<script lang="ts">
	import {onMount} from 'svelte'
	import lottie, {type AnimationItem} from 'lottie-web'

	import {enhance} from '$app/forms'
	import EmptyStar from '$lib/icons/empty-star.svg'
	import {user} from '$lib/stores/user'
	import animationData from './star.json'

	export let id: string
	export let emoji: string
	export let name: string
	export let description: string
	export let starred: boolean

	let state: 'idle' | 'starring' | Error = 'idle'

	let starButton: HTMLButtonElement
	let starAnimation: AnimationItem

	onMount(() => {
		starAnimation = lottie.loadAnimation({
			container: starButton,
			animationData,
			loop: false,
			autoplay: false,
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
				action={`/ideas?/${starred ? 'unstar' : 'star'}`}
				use:enhance={() => {
					state = 'starring'
					starred = !starred

					const reverseStartFrame = 21
					starAnimation.setDirection(starred ? 1 : -1)
					starAnimation.goToAndPlay(starred ? 0 : reverseStartFrame, true)

					return ({result, update}) => {
						if (result.type === 'success') {
							state = 'idle'
							update()
						} else {
							state = new Error(
								`there was a problem ${
									starred ? 'starring' : 'unstarring'
								} this idea...`
							)
							starred = !starred

							starAnimation.goToAndStop(starred ? reverseStartFrame : 0, true)
						}
					}
				}}
			>
				<input type="hidden" name="id" value={id} />
				<button
					class="w-full"
					bind:this={starButton}
					disabled={state === 'starring'}
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
