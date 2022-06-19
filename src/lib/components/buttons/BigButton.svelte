<script>
	export let disabled = false
</script>

<button
	{disabled}
	class="relative block w-full rounded bg-gradient-to-br from-primary-400 to-primary-700 px-6 py-4 text-2xl font-thin text-white no-underline shadow shadow-shadow-1/20 transition-shadow hover:bg-gradient-to-tl hover:shadow-lg hover:shadow-shadow-1/20 active:top-[-1px] md:text-3xl"
>
	<slot />
</button>
