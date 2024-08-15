import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import type { Page, Response } from '@playwright/test'
import type { User } from 'src/services/api.ts'
import { Route } from '../constant'
import { expect } from '../extends.ts'
import { boxedStep } from '../utils/test-decorators.ts'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const fixtureDir = path.join(__dirname, '../../cypress/fixtures')

export class ConduitPageObject {
  constructor(
    public readonly page: Page,
  ) {}

  async intercept(method: 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT', url: string | RegExp, options: {
    fixture?: string
    postFixture?: (fixture: any) => void | unknown
    statusCode?: number
    body?: unknown
    timeout?: number
  } = {}): Promise<() => Promise<Response>> {
    await this.page.route(url, async route => {
      if (route.request().method() !== method)
        return await route.continue()

      if (options.postFixture && options.fixture) {
        const body = await this.getFixture(options.fixture)
        const returnValue = await options.postFixture(body)
        options.body = returnValue === undefined ? body : returnValue
        options.fixture = undefined
      }

      return await route.fulfill({
        status: options.statusCode || undefined,
        json: options.body ?? undefined,
        path: options.fixture ? path.join(fixtureDir, options.fixture) : undefined,
      })
    })

    return () => this.page.waitForResponse(response => {
      const request = response.request()
      if (request.method() !== method)
        return false

      if (typeof url === 'string')
        return request.url().includes(url)

      return url.test(request.url())
    }, { timeout: options.timeout ?? 4000 })
  }

  async getFixture<T = unknown>(fixture: string): Promise<T> {
    const file = path.join(fixtureDir, fixture)
    return JSON.parse(await fs.readFile(file, 'utf8')) as T
  }

  async goto(route: Route) {
    await this.page.goto(route, { waitUntil: 'domcontentloaded' })
  }

  @boxedStep
  async login(username = 'plumrx') {
    const userFixture = await this.getFixture<{ user: User }>('user.json')
    userFixture.user.username = username

    await this.goto(Route.Login)

    await this.page.getByPlaceholder('Email').fill('foo@example.com')
    await this.page.getByPlaceholder('Password').fill('12345678')

    const waitForLogin = await this.intercept('POST', /users\/login$/, { statusCode: 200, body: userFixture })
    await Promise.all([
      waitForLogin(),
      this.page.getByRole('button', { name: 'Sign in' }).click(),
    ])

    await expect(this.page).toHaveURL(Route.Home)
  }

  async toContainText(text: string) {
    await expect(this.page.locator('body')).toContainText(text)
  }
}
