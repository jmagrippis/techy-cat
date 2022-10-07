<script lang="ts">
	import {onMount} from 'svelte'
	import lottie, {type AnimationItem} from 'lottie-web'

	import {enhance} from '$app/forms'
	import animationData from './heart.json'

	export let id: string
	export let title: string
	export let description: string
	export let link: string
	export let author: string
	export let updatedAt: string
	export let hearted: boolean

	let state: 'idle' | 'hearting' | Error = 'idle'

	let heartButton: HTMLButtonElement
	let heartAnimation: AnimationItem

	const dateFormatter = new Intl.DateTimeFormat()

	onMount(() => {
		heartAnimation = lottie.loadAnimation({
			container: heartButton,
			animationData,
			loop: false,
			autoplay: false,
		})

		const lastFrame = heartAnimation.totalFrames - 1
		heartAnimation.goToAndStop(hearted ? lastFrame : 0, true)
	})
</script>

<div
	class="grid grid-cols-12 items-center gap-4 rounded bg-surface-2 px-6 py-4 shadow"
>
	<div class="col-span-9">
		<h2 class="text-2xl">
			<a href={link}>{title}</a>
		</h2>
		<div class="break-words">
			{description}
		</div>
	</div>
	<form
		class="relative col-span-3 text-center"
		method="POST"
		action={`?/${hearted ? 'unheart' : 'heart'}`}
		use:enhance={() => {
			state = 'hearting'
			hearted = !hearted

			const lastFrame = heartAnimation.totalFrames - 1
			heartAnimation.setDirection(hearted ? 1 : -1)
			heartAnimation.goToAndPlay(hearted ? 0 : lastFrame, true)

			return ({result}) => {
				if (result.type === 'success') {
					state = 'idle'
				} else {
					state = new Error(
						`there was a problem ${hearted ? 'hearting' : 'unhearting'}...`
					)
					hearted = !hearted

					heartAnimation.goToAndStop(hearted ? lastFrame : 0, true)
				}
			}
		}}
	>
		<input type="hidden" name="id" value={id} />
		<button
			bind:this={heartButton}
			class="text-4xl"
			disabled={state === 'hearting'}
			aria-label={hearted ? 'unheart this demo' : 'heart this demo'}
		/>
	</form>
	<div class="col-span-12 flex border-t border-t-secondary-400 pt-6">
		<div class="grow font-thin">
			by <span class="text-secondary-400">{author}</span>, last updated on {dateFormatter.format(
				new Date(updatedAt)
			)}
		</div>
		<a href={link} class="text-2xl">👁 View Demo</a>
	</div>
</div>
