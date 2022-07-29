import {test, expect} from '@playwright/test'

test.describe('when you are NOT logged in', () => {
	test('gets redirected to login when you are NOT authenticated', async ({
		page,
	}) => {
		await page.goto('/profile')

		await expect(page).toHaveURL('/login')
		await expect(page.locator('role=heading[level=1]')).toHaveText('Login')
	})
})

test.describe('when you ARE logged in', () => {
	test.use({storageState: 'tests/storageState/fan.json'})

	test('see the Profile Page', async ({page}) => {
		await page.goto('/profile')

		await expect(page.locator('role=heading[level=1]')).toHaveText('Profile')
	})
})
