import jwtDecode from 'jwt-decode'
import type {SupabaseClient} from '@supabase/supabase-js'

import {TWO_WEEKS_IN_SECONDS} from '$lib/constants'
import {generateName} from '$lib/generateName'

export type DbUser = {
	id: string
	display_name: string
	created_at: string
	role: 'fan' | 'contributor'
}

export class UserRepo implements App.UserRepoInterface {
	#client: SupabaseClient

	constructor(client: SupabaseClient) {
		this.#client = client
	}

	createProfile = async (id: string) => {
		const response = await this.#client
			.from<DbUser>('profiles')
			.insert({id, display_name: generateName()})
			.maybeSingle()

		return response.data
	}

	findById = async (id: string): Promise<App.User | null> => {
		const result = await this.#client
			.from<DbUser>('profiles')
			.select('id, display_name, role')
			.eq('id', id)
			.maybeSingle()

		const dbUser = result.data ?? (await this.createProfile(id))

		if (!dbUser) return null

		return {id: dbUser.id, displayName: dbUser.display_name, role: dbUser.role}
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
			const refreshCookie = `refreshSession=${session.refresh_token}; SameSite=Strict; Path=/; HttpOnly; Max-Age=${TWO_WEEKS_IN_SECONDS}`

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
