<script lang="ts">
	import {onMount} from 'svelte'
	import {goto} from '$app/navigation'
	import {user} from '$lib/stores/user'
	import {getValueFromHash} from '$lib/getValueFromHash'

	onMount(async () => {
		const accessToken = getValueFromHash(window.location.hash, 'access_token')
		const refreshToken = getValueFromHash(window.location.hash, 'refresh_token')
		const expiresIn = getValueFromHash(window.location.hash, 'expires_in')
		if (!accessToken || !refreshToken) {
			goto('/login')
			return
		}
		const response = await fetch('/auth/session', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			}),
			body: JSON.stringify({
				refreshToken,
				expiresIn,
			}),
		})

		if (response.ok) {
			const json = await response.json()
			$user = json.user
			goto('/profile')
		} else {
			goto('/login')
		}
	})
</script>

<div>logging you in...</div>
