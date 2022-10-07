import {chromium} from 'playwright'

import type {RequestHandler} from './$types'

export const GET: RequestHandler = async ({url}) => {
	const browser = await chromium.launch()
	const page = await browser.newPage()
	page.setViewportSize({width: 1200, height: 630})
	const imageUrl = url.href.replace('/png', '')
	await page.goto(imageUrl, {waitUntil: 'networkidle'})
	const imageBuffer = await page.screenshot()

	return new Response(imageBuffer, {
		status: 200,
		headers: new Headers({'Content-Type': 'image/png'}),
	})
}
