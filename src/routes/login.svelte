<script lang="ts" context="module">
	import type {Load} from '@sveltejs/kit'

	export const load: Load = ({session}) =>
		!session.user ? {status: 200} : {redirect: '/profile', status: 302}
</script>

<script lang="ts">
	import BigButton from '$lib/components/buttons/BigButton.svelte'

	import PageHeading from '$lib/components/PageHeading.svelte'
	import {createClient} from '@supabase/supabase-js'

	const supabaseClient = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_ANON_KEY
	)

	const handleSubmit: svelte.JSX.EventHandler<
		SubmitEvent,
		HTMLFormElement
	> = async ({currentTarget}) => {
		const email = new FormData(currentTarget).get('email')
		const redirectTo = `${window.location.protocol}//${window.location.host}/auth/callback`
		if (typeof email !== 'string') {
			throw new Error('looks like you forgot to fill in your email?')
		}

		const {user, error} = await supabaseClient.auth.signIn(
			{email},
			{redirectTo}
		)
		if (error) {
			if (error.message.includes('request this once')) {
				console.log('we have already sent you an email, please check: ...')
			}
			return
		}
		console.log({user, error})
	}
</script>

<section class="container w-full max-w-prose grow px-2 text-xl sm:px-0">
	<PageHeading>Login</PageHeading>

	<p class="text-xl">
		Sign up / Log in for the ability to <strong>favourite</strong> Ideas, and more
		exclusive features!
	</p>
	<form class="flex flex-col gap-4" on:submit|preventDefault={handleSubmit}>
		<label>
			<span class="mb-2 block"
				>Use your email to sign-up / login via 🪄 <strong>magic link</strong>
				🪄</span
			>
			<input
				name="email"
				type="email"
				class="w-full rounded p-4"
				placeholder="example@techy.cat"
				required
			/>
		</label>
		<BigButton>Submit</BigButton>
	</form>
</section>
