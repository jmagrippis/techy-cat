import type {RequestEvent} from '@sveltejs/kit'
import {describe, it, expect, vi} from 'vitest'

import {handle} from './hooks.server'

vi.mock('$lib/firebase/admin', () => ({
	getIdTokenFromSessionCookie: vi.fn(() => Promise.resolve('mock-id-token')),
}))

describe('handle', () => {
	it('puts `auto` as the theme value in the locals when there are no cookies in the request', async () => {
		const response = {
			headers: {get: vi.fn()},
		}
		const resolve = vi.fn().mockResolvedValue(response)
		const headers = new Headers({})
		const event = {
			request: {
				headers,
			},
			locals: {},
		} as unknown as RequestEvent

		await handle({event, resolve})

		expect(event.locals.theme).toBe('auto')
	})

	it('returns the value of the theme cookie', async () => {
		const response = {
			headers: {get: vi.fn()},
		}
		const resolve = vi.fn().mockResolvedValue(response)
		const headersA = new Headers({cookie: 'theme=dark'})

		const eventA = {
			request: {
				headers: headersA,
			},
			locals: {},
		} as unknown as RequestEvent

		await handle({event: eventA, resolve})

		expect(eventA.locals.theme).toBe('dark')

		const headersB = new Headers({
			cookie: 'random=value; theme=light; answer=42',
		})

		const eventB = {
			request: {
				headers: headersB,
			},
			locals: {},
		} as unknown as RequestEvent

		await handle({event: eventB, resolve})

		expect(eventB.locals.theme).toBe('light')
	})

	it('returns `auto` as the theme value when there is no theme cookie in the request', async () => {
		const response = {
			headers: {get: vi.fn()},
		}
		const resolve = vi.fn().mockResolvedValue(response)
		const headersA = new Headers({cookie: ''})

		const eventA = {
			request: {
				headers: headersA,
			},
			locals: {},
		} as unknown as RequestEvent

		await handle({event: eventA, resolve})

		expect(eventA.locals.theme).toBe('auto')

		const headersB = new Headers({cookie: 'answer=42'})

		const eventB = {
			request: {
				headers: headersB,
			},
			locals: {},
		} as unknown as RequestEvent

		await handle({event: eventB, resolve})

		expect(eventA.locals.theme).toBe('auto')
	})
})