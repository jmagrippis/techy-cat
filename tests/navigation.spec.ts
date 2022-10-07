import {test, expect} from '@playwright/test'

test('navigation smoke test', async ({page}) => {
	// start at the home page
	await page.goto('/')

	await expect(page).toHaveTitle(/Techy Cat/)
	await expect(page.locator('role=heading[level=1]')).toHaveText('Techy Cat')

	// navigate to the Latest Ideas Page
	await page.locator('role=link[name=Ideas]').click()

	await expect(page).toHaveTitle(/Latest Ideas/)
	await expect(page.locator('role=heading[level=1]')).toHaveText('Latest Ideas')

	// navigate to the Games Page
	await page.locator('role=link[name=Games]').click()

	await expect(page).toHaveTitle(/Memory Game/)
	await expect(page.locator('role=heading[level=1]')).toHaveText('Memory Game')

	// navigate to the Demos Page
	await page.locator('role=link[name=Demos]').click()

	await expect(page).toHaveTitle(/Interactive Demos/)
	await expect(page.locator('role=heading[level=1]')).toHaveText(
		'Interactive Demos'
	)

	// navigate to the Login Page
	await page.locator('role=link[name=Login]').click()

	await expect(page).toHaveTitle(/Login/)
	await expect(page.locator('role=heading[level=1]')).toHaveText('Login')

	// navigate to the About Page
	await page.locator('role=link[name=About]').click()

	await expect(page).toHaveTitle(/About/)
	await expect(page.locator('role=heading[level=1]')).toHaveText('About')
})
