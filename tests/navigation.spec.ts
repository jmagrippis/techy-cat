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

	// navigate to the About Page
	await page.locator('role=link[name=About]').click()

	await expect(page).toHaveTitle(/About/)
	await expect(page.locator('role=heading[level=1]')).toHaveText('About')

	// navigate to the Login Page
	await page.locator('role=link[name=Login]').click()

	await expect(page).toHaveTitle(/Login/)
	await expect(page.locator('role=heading[level=1]')).toHaveText('Login')
})
