const { test, expect, beforeEach, describe, within } = require('@playwright/test')
const { loginWith, createBlog} = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'test user',
        password: 'Test_Password'
      }
    })

    await page.goto('')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()

    await page.getByRole('button', { name: 'login' }).click()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'test user', 'Test_Password')
        await expect(page.getByText('Test User logged in')).toBeVisible()
    })
    test('fails with wrong credentials (both username and password)', async ({ page }) => {
        await loginWith(page, 'test user', 'Wrong_password')

        const errorDivUsername = await page.locator('.error')
        await expect(errorDivUsername).toContainText('wrong credentials, check your username and password')
        await expect(errorDivUsername).toHaveCSS('border-style', 'solid')
        await expect(errorDivUsername).toHaveCSS('color', 'rgb(255, 0, 0)')

        await loginWith(page, 'wrong name', 'Test_Password')
        const errorDivPassword = await page.locator('.error')
        await expect(errorDivPassword).toContainText('wrong credentials, check your username and password')
        await expect(errorDivPassword).toHaveCSS('border-style', 'solid')
        await expect(errorDivPassword).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test user', 'Test_Password')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await createBlog(page, 'This is a test title', 'Test Author', 'www.testurl.com' )
    
      const blogOverview = await page.locator('[data-testid="blog-overview"]')
      await expect(blogOverview).toContainText('This is a test title Test Author')
    })

  })
  })
})