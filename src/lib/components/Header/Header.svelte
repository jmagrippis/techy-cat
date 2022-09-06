<script lang="ts">
	import type {Theme} from '../../../types'
	import {browser} from '$app/environment'
	import {theme} from '$lib/stores/theme'
	import YouTubeIcon from '$lib/icons/youtube.svg'
	import ThemeToggleIcon from './ThemeToggleIcon.svelte'
	import UserIcon from './UserIcon.svelte'
	import {enhanceForm} from '$lib/actions/enhanceForm'

	let previousY: number
	let currentY: number
	let clientHeight: number

	const deriveDirection = (y: number) => {
		const direction = !previousY || previousY < y ? 'down' : 'up'
		previousY = y

		return direction
	}

	const deriveNextTheme = (currentTheme: Theme): Theme => {
		if (!browser) return currentTheme

		if (currentTheme === 'auto') {
			return window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'light'
				: 'dark'
		}

		return currentTheme === 'dark' ? 'light' : 'dark'
	}

	$: scrollDirection = deriveDirection(currentY)
	$: offscreen = scrollDirection === 'down' && currentY > clientHeight * 4

	$: nextTheme = deriveNextTheme($theme)
</script>

<svelte:window bind:scrollY={currentY} />

<header
	class="container sticky top-0 z-50 flex h-[var(--header-height)] items-center bg-surface-1/50 px-2 text-lg backdrop-blur-sm transition-transform ease-in"
	class:motion-safe:-translate-y-full={offscreen}
	bind:clientHeight
>
	<nav class="flex flex-grow gap-2 md:gap-4">
		<a href="/" class="font-thin sm:text-2xl">Techy Cat</a>
		<ul class="flex flex-grow items-center gap-2 md:gap-4">
			<li>
				<a href="/ideas">Ideas</a>
			</li>
			<li>
				<a href="/games/memory">Games</a>
			</li>
			<li>
				<a href="/about">About</a>
			</li>
		</ul>
	</nav>
	<div class="flex items-center gap-4 md:gap-8">
		<form
			class="flex"
			method="POST"
			action="/theme"
			use:enhanceForm={{
				pending() {
					$theme = nextTheme
				},
			}}
		>
			<input type="hidden" name="theme" value={nextTheme} />
			<button
				class="transition-colors hover:text-primary-400"
				label="toggle theme from {$theme} to {nextTheme}"
				aria-live="polite"
			>
				<ThemeToggleIcon className="w-6" />
			</button>
		</form>
		<UserIcon />
		<a
			href="https://www.youtube.com/channel/UCm1ALyg61uhPoTnZBm7mY2g"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="YouTube"
			class="transition-colors hover:text-primary-400"
		>
			<YouTubeIcon
				title="Johnny's YouTube channel"
				class="w-6 hover:text-primary-400"
			/>
		</a>
	</div>
</header>
