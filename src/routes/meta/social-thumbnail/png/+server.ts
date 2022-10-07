import type {RequestHandler} from './$types'
import puppeteer from 'puppeteer'

export const GET: RequestHandler = async ({url}) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	page.setViewport({width: 1200, height: 630})
	const imageUrl = url.href.replace('/png', '')
	await page.goto(imageUrl)
	const imageBuffer = await page.screenshot()

	return new Response(imageBuffer, {
		status: 200,
		headers: new Headers({'Content-Type': 'image/png'}),
	})
}
