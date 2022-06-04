<script lang="ts">
	import UserWithNoAvatarIcon from '$lib/icons/user.svg'
	import NoUserIcon from '$lib/icons/no-user.svg'

	import {user} from '$lib/stores/user'
</script>

{#if $user}
	<a
		href="/profile"
		class="fill-copy-base transition-colors hover:fill-primary-400"
	>
		<UserWithNoAvatarIcon title="User Profile" class="w-6" />
	</a>
{:else}
	<a
		href="/login"
		class="fill-copy-base transition-colors hover:fill-primary-400"
	>
		<NoUserIcon title="Login" class="w-6" />
	</a>
{/if}
