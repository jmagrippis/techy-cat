<script lang="ts">
	import YouTubeIcon from '$lib/icons/youtube.svg'
	import GitHubIcon from '$lib/icons/github.svg'
	import DiscordIcon from '$lib/icons/discord.svg'
	import PulsingHeart from './PulsingHeart.svelte'
</script>

<footer class="flex items-center justify-center gap-2 py-2">
	<div class="flex shrink-0 items-center justify-center gap-2">
		Made with <PulsingHeart /> by <a href="https://magrippis.com">jmagrippis</a>
	</div>

	<a
		href="https://www.youtube.com/channel/UCm1ALyg61uhPoTnZBm7mY2g"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="YouTube"
		class="transition-colors hover:text-primary-400"
	>
		<YouTubeIcon title="Johnny's YouTube channel" class="w-5" />
	</a>
	<a
		href="https://github.com/jmagrippis/techy-cat"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="checkout the source code at the github repo"
		class="transition-colors hover:text-primary-400"
	>
		<GitHubIcon class="w-5" />
	</a>
	<a
		href="https://discord.gg/eR5Q52Sfm3"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="Join our Discord community!"
		class="transition-colors hover:text-primary-400"
	>
		<DiscordIcon class="w-5" />
	</a>

	<a class="border-l pl-2" href="/about">About</a>
</footer>
