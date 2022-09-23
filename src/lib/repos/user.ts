import type {Cookies} from '@sveltejs/kit'
import type {SupabaseClient} from '@supabase/supabase-js'
import jwtDecode from 'jwt-decode'

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
			.match({id})
			.maybeSingle()

		const dbUser = result.data ?? (await this.createProfile(id))

		if (!dbUser) return null

		return {id: dbUser.id, displayName: dbUser.display_name, role: dbUser.role}
	}

	updateDisplayName = async (
		id: string,
		displayName: string
	): Promise<App.User | null> => {
		const result = await this.#client
			.from<DbUser>('profiles')
			.update({display_name: displayName})
			.match({id})
			.maybeSingle()

		const dbUser = result.data

		if (!dbUser) return null

		return {id: dbUser.id, displayName: dbUser.display_name, role: dbUser.role}
	}

	findByAccessToken = async (accessToken: string) => {
		this.#client.auth.setAuth(accessToken)

		const decodedUser = jwtDecode(accessToken) as {sub: string}

		return this.findById(decodedUser.sub)
	}

	refreshSession = async (refreshToken: string, cookies: Cookies) => {
		const {session} = await this.#client.auth.setSession(refreshToken)

		if (session && session.user) {
			const user = await this.findById(session.user.id)

			cookies.set('session', session.access_token, {
				path: '/',
				maxAge: session.expires_in,
			})
			if (session.refresh_token) {
				cookies.set('refreshSession', session.refresh_token, {
					path: '/',
					maxAge: session.expires_in,
				})
			}

			return user
		} else {
			throw new Error('Invalid refresh token')
		}
	}
}
