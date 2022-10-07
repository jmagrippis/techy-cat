import type {ChromiumBrowser} from 'playwright-core'
import playwright from 'playwright-aws-lambda'

import type {RequestHandler} from './$types'

export const GET: RequestHandler = async ({url}) => {
	let browser: ChromiumBrowser | null = null

	try {
		browser = await playwright.launchChromium({headless: true})
		const page = await browser.newPage()
		page.setViewportSize({width: 1200, height: 630})
		const imageUrl = url.href.replace('/png', '')
		await page.goto(imageUrl, {waitUntil: 'networkidle'})
		const imageBuffer = await page.screenshot()

		return new Response(imageBuffer, {
			status: 200,
			headers: new Headers({'Content-Type': 'image/png'}),
		})
	} finally {
		if (browser) {
			await browser.close()
		}
	}
}
