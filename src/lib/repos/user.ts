import jwtDecode from 'jwt-decode'
import type {SupabaseClient} from '@supabase/supabase-js'

import {TWO_WEEKS_IN_SECONDS} from '$lib/constants'

export type DbUser = {
	id: string
	display_name: string
	created_at: string
}

export class UserRepo implements App.UserRepoInterface {
	#client: SupabaseClient

	constructor(client: SupabaseClient) {
		this.#client = client
	}

	findById = async (id: string): Promise<App.User | null> => {
		const result = await this.#client
			.from<DbUser>('profiles')
			.select('id, display_name')
			.eq('id', id)
			.maybeSingle()

		if (!result.data) return null

		const dbUser = result.data

		return {id: dbUser.id, displayName: dbUser.display_name}
	}

	findByAccessToken = async (accessToken: string) => {
		this.#client.auth.setAuth(accessToken)

		const decodedUser = jwtDecode(accessToken) as {sub: string}

		return this.findById(decodedUser.sub)
	}

	refreshSession = async (refreshToken: string) => {
		const {session} = await this.#client.auth.setSession(refreshToken)

		if (session && session.user) {
			const user = await this.findById(session.user.id)

			const sessionCookie = `session=${session.access_token}; SameSite=Strict; Path=/; HttpOnly; Max-Age=${session.expires_in}`
			const refreshCookie = `refreshSession=${refreshToken}; SameSite=Strict; Path=/; HttpOnly; Max-Age=${TWO_WEEKS_IN_SECONDS}`

			return {
				user,
				sessionCookie,
				refreshCookie,
			}
		} else {
			throw new Error('Invalid refresh token')
		}
	}
}
