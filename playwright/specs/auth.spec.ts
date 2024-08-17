import { LoginPageObject } from 'page-objects/login.page-object.ts'
import { RegisterPageObject } from 'page-objects/register.page-object.ts'
import { Route } from '../constant.ts'
import { expect, test } from '../extends'

test.beforeEach(async ({ conduit }) => {
  await conduit.intercept('GET', /users/, { fixture: 'user.json' })
  await conduit.intercept('GET', /tags/, { fixture: 'tags.json' })
  await conduit.intercept('GET', /articles/, { fixture: 'articles.json' })
})

test.describe('login and logout', () => {
  let loginPage!: LoginPageObject

  test.beforeEach(({ page }) => {
    loginPage = new LoginPageObject(page)
  })

  test('should login success when submit a valid login form', async ({ page, conduit }) => {
    await conduit.login()

    await expect(page).toHaveURL(Route.Home)
  })

  test('should logout when click logout button', async ({ page, conduit }) => {
    await conduit.login()
    await conduit.goto(Route.Settings)

    await page.getByRole('button', { name: 'logout' }).click()
    await conduit.toContainText('Sign in')
  })

  test('should display error when submit an invalid form (password not match)', async ({ conduit }) => {
    await conduit.goto(Route.Login)

    await loginPage.intercept('POST', /users\/login/, {
      statusCode: 403,
      body: { errors: { 'email or password': ['is invalid'] } },
    })
    await loginPage.fillForm({ email: 'foo@example.com', password: '12345678' })
    await loginPage.clickSignIn()

    await loginPage.toContainText('email or password is invalid')
  })

  test('should display format error without API call when submit an invalid format', async ({ page, conduit }) => {
    await conduit.goto(Route.Login)

    await loginPage.intercept('POST', /users\/login/)
    await loginPage.fillForm({ email: 'foo', password: '123456' })
    await loginPage.clickSignIn()

    expect(await page.$eval('form', form => form.checkValidity())).toBe(false)
  })

  test('should not allow visiting login page when the user is logged in', async ({ page, conduit }) => {
    await conduit.login()
    await conduit.goto(Route.Login)

    await expect(page).toHaveURL(Route.Home)
  })

  test('should has credential header after login success', async ({ page, conduit }) => {
    await conduit.login()
    await conduit.goto(Route.Settings)

    const waitForUpdateSettingsRequest = await conduit.intercept('PUT', /user/)

    await page.getByRole('textbox', { name: 'Username' }).fill('foo')
    await page.getByRole('button', { name: 'Update Settings' }).dispatchEvent('click')

    const response = await waitForUpdateSettingsRequest()
    expect(response.request().headers()).toHaveProperty('authorization')
  })
})

test.describe('register', () => {
  let registerPage!: RegisterPageObject

  test.beforeEach(({ page }) => {
    registerPage = new RegisterPageObject(page)
  })

  test('should call register API and jump to home page when submit a valid form', async ({ conduit }) => {
    await conduit.goto(Route.Register)

    const waitForRegisterRequest = await registerPage.intercept('POST', /users$/, { fixture: 'user.json' })
    await registerPage.fillForm({
      name: 'foo',
      email: 'foo@example.com',
      password: '12345678',
    })
    await registerPage.clickSignUp()

    await waitForRegisterRequest()
    await expect(conduit.page).toHaveURL(Route.Home)
  })

  test('should display error message when submit the form that username already exist', async ({ conduit }) => {
    await conduit.goto(Route.Register)

    const waitForRegisterRequest = await registerPage.intercept('POST', /users$/, {
      statusCode: 422,
      body: { errors: { email: ['has already been taken'], username: ['has already been taken'] } },
    })
    await registerPage.fillForm({
      name: 'foo',
      email: 'foo@example.com',
      password: '12345678',
    })
    await registerPage.clickSignUp()

    await waitForRegisterRequest()
    await registerPage.toContainText('email has already been taken')
    await registerPage.toContainText('username has already been taken')
  })

  test('should not allow visiting register page when the user is logged in', async ({ page, conduit }) => {
    await conduit.login()
    await conduit.goto(Route.Register)

    await expect(page).toHaveURL(Route.Home)
  })
})
