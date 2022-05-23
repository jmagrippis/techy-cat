<script lang="ts">
	export let href: string
	export let prefetch: true | null = null
</script>

<a
	{href}
	sveltekit:prefetch={prefetch}
	class="relative block rounded bg-gradient-to-br from-primary-400 to-primary-700 px-6 py-4 text-2xl font-thin text-white no-underline shadow transition-shadow hover:bg-gradient-to-tl hover:shadow-lg active:top-[-1px] dark:shadow-primary-400/20 md:text-3xl"
>
	<slot />
</a>
