import {test, expect} from '@playwright/test'

test('magic login happy path', async ({page}) => {
	await page.goto('/login')

	const email = 'playwright@techy.cat'

	await page.locator('[name="email"]').type(email)

	await page.locator('role=button[name=Submit]').click()

	await expect(page.locator(`text=check ${email}`)).toBeVisible()
})
