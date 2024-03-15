const { test, expect, beforeEach, describe, within } = require('@playwright/test')
const { loginWith, createBlog} = require('./helper')
const { log } = require('console')

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

    await request.post('/api/users', {
      data: {
        name: 'Another Test User',
        username: 'another test user',
        password: 'Test_Password2'
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

    test('a new blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await createBlog(page, 'This is a test title', 'Test Author', 'www.testurl.com' )
      await page.getByRole('button', { name: 'view' }).click()

      await page.getByRole('button', { name: 'like'}).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    test('the user created the blog can delete it', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await createBlog(page, 'This is a test title', 'Test Author', 'www.testurl.com' )
      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('Remove blog This is a test title by Test Author?')
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'remove'}).click()
      await page.waitForSelector('text=Removed blog This is a test title by Test Author')

      await expect(page.locator('text=This is a test title Test Author')).not.toBeVisible()
    })

    test.only('Only the user created the blog can see the remove-button', async ({ page }) => {
      // create a blog with test user and logout
      await page.getByRole('button', { name: 'new blog' }).click()
      await createBlog(page, 'This is a test title', 'Test Author', 'www.testurl.com' )
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('remove')).toBeVisible()
      await page.getByRole('button', { name: 'logout' }).click()

      // login with another user and confirm remove-button is not visible
      await loginWith(page, 'another test user', 'Test_Password2')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('remove')).not.toBeVisible()
    })
    })
  })
})
