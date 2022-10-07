import puppeteer from 'puppeteer'
import chromium from '@sparticuz/chromium'

import type {RequestHandler} from './$types'

export const GET: RequestHandler = async ({url}) => {
	const browser = await puppeteer.launch({
		args: chromium.args,
		headless: true,
		executablePath: (await chromium.executablePath) ?? undefined,
	})
	const page = await browser.newPage()
	page.setViewport({width: 1200, height: 630})
	const imageUrl = url.href.replace('/png', '')
	await page.goto(imageUrl, {waitUntil: 'networkidle0'})
	const imageBuffer = await page.screenshot()

	return new Response(imageBuffer, {
		status: 200,
		headers: new Headers({'Content-Type': 'image/png'}),
	})
}
