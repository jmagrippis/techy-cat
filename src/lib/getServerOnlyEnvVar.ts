import {browser, dev} from '$app/env'

let dotenvInitialised = false

export const getServerOnlyEnvVar = (key: string) => {
	if (dev && !dotenvInitialised) {
		import('dotenv-flow').then(({config}) => {
			config()
			dotenvInitialised = true
		})
	}

	if (browser) {
		throw new Error('attempting to access server-only env var on the browser')
	}

	return process.env[key]
}
