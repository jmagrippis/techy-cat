<script lang="ts">
	import {onMount} from 'svelte'
	import {goto} from '$app/navigation'

	import {getValueFromHash} from '$lib/getValueFromHash'

	onMount(async () => {
		const accessToken = getValueFromHash(window.location.hash, 'access_token')
		const refreshToken = getValueFromHash(window.location.hash, 'refresh_token')
		if (!accessToken || !refreshToken) {
			console.log(window.location.hash)
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
			}),
		})

		if (response.ok) {
			goto('/profile')
		} else {
			goto('/login')
		}
	})
</script>

<div>logging you in...</div>
