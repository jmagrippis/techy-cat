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

	type FormState = 'idle' | 'loading' | 'success' | Error
	let email: string | null = null
	let state: FormState = 'idle'

	const handleSubmit: svelte.JSX.EventHandler<
		SubmitEvent,
		HTMLFormElement
	> = async ({currentTarget}) => {
		const formEmail = new FormData(currentTarget).get('email')
		if (!formEmail || typeof formEmail !== 'string') {
			state = new Error('looks like you forgot to fill in your email?')
			return
		}
		email = formEmail
		const redirectTo = `${window.location.protocol}//${window.location.host}/auth/callback`

		state = 'loading'
		const {error} = await supabaseClient.auth.signIn({email}, {redirectTo})
		if (error) {
			if (error.message.includes('request this once')) {
				state = new Error(
					'we have already sent you an email, please check: ...'
				)
				return
			}
			state = new Error(error.message)

			return
		}

		state = 'success'
	}
</script>

<section class="container w-full max-w-prose grow px-2 text-xl sm:px-0">
	<PageHeading>Login</PageHeading>

	{#if state === 'idle'}
		<p class="mb-6">
			Sign-up / login for the ability to <strong
				class="underline decoration-secondary-400">star</strong
			> Ideas, and more exclusive features! It's free 🙌
		</p>
		<form class="flex flex-col gap-6" on:submit|preventDefault={handleSubmit}>
			<label>
				<p class="mb-4">
					Input your email to sign-up / login via 🪄 <strong>magic link</strong>
					🪄
				</p>
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
	{:else if state === 'loading'}
		<p>sending you a magic email...</p>
	{:else if state === 'success'}
		<p>We sent you a magic link! Go check <strong>{email}</strong> 😄</p>
	{/if}
	{#if state instanceof Error}
		<strong>{state.message}</strong>
	{/if}
</section>
