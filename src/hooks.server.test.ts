import type {RequestEvent} from '@sveltejs/kit'
import {describe, it, expect, vi} from 'vitest'

import {handle} from './hooks.server'

vi.mock('$lib/firebase/admin', () => ({
	getIdTokenFromSessionCookie: vi.fn(() => Promise.resolve('mock-id-token')),
}))

describe('handle', () => {
	it('puts `auto` as the theme value in the locals when there are no cookies in the request', async () => {
		const response = {}
		const resolve = vi.fn().mockResolvedValue(response)
		const cookies = {get: vi.fn(() => null)}
		const event = {
			cookies,
			url: new URL('https://techy.cat'),
			locals: {},
		} as unknown as RequestEvent

		await handle({event, resolve})

		expect(event.locals.theme).toBe('auto')
	})

	it('returns the value of the theme cookie', async () => {
		const response = {}
		const resolve = vi.fn().mockResolvedValue(response)
		const cookiesA = {
			get: vi.fn((property) => (property === 'theme' ? 'dark' : null)),
		}

		const eventA = {
			cookies: cookiesA,
			url: new URL('https://techy.cat'),
			locals: {},
		} as unknown as RequestEvent

		await handle({event: eventA, resolve})

		expect(eventA.locals.theme).toBe('dark')

		const cookiesB = {
			get: vi.fn((property) => (property === 'theme' ? 'light' : null)),
		}

		const eventB = {
			cookies: cookiesB,
			url: new URL('https://techy.cat'),
			locals: {},
		} as unknown as RequestEvent

		await handle({event: eventB, resolve})

		expect(eventB.locals.theme).toBe('light')
	})

	it('returns `auto` as the theme value for invalid theme cookie values', async () => {
		const response = {}
		const resolve = vi.fn().mockResolvedValue(response)
		const cookies = {
			get: vi.fn((property) => (property === 'theme' ? 'peach' : null)),
		}

		const event = {
			cookies,
			url: new URL('https://techy.cat'),
			locals: {},
		} as unknown as RequestEvent

		await handle({event, resolve})

		expect(event.locals.theme).toBe('auto')
	})
})
