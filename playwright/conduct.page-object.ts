import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import type { Page, Response } from '@playwright/test'
import type { User } from '../src/services/api.ts'
import { Route } from './constant'
import { expect } from './extends.ts'
import { boxedStep } from './utils/test-decorators.ts'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const fixtureDir = path.join(__dirname, '../cypress/fixtures')

export class ConductPageObject {
  constructor(
    public readonly page: Page,
  ) {}

  async intercept(method: 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT', url: string | RegExp, options: {
    fixture?: string
    statusCode?: number
    body?: unknown
  } = {}): Promise<(timeout?: number) => Promise<Response>> {
    await this.page.route(url, async route => {
      if (route.request().method() !== method)
        return await route.continue()

      return await route.fulfill({
        status: options.statusCode || undefined,
        json: options.body ?? undefined,
        path: options.fixture ? path.join(fixtureDir, options.fixture) : undefined,
      })
    })

    return (timeout: number = 1000) => this.page.waitForResponse(response => {
      const request = response.request()
      if (request.method() !== method)
        return false

      if (typeof url === 'string')
        return request.url().includes(url)

      return url.test(request.url())
    }, { timeout })
  }

  async getFixture<T = unknown>(fixture: string): Promise<T> {
    const file = path.join(fixtureDir, fixture)
    return JSON.parse(await fs.readFile(file, 'utf8')) as T
  }

  async goto(route: Route) {
    await this.page.goto(route)
  }

  @boxedStep
  async login(username = 'plumrx') {
    const userFixture = await this.getFixture<{ user: User }>('user.json')
    userFixture.user.username = username
    await this.intercept('POST', /users\/login$/, { statusCode: 200, body: userFixture })

    await this.goto(Route.Login)

    await this.page.getByPlaceholder('Email').fill('foo@example.com')
    await this.page.getByPlaceholder('Password').fill('12345678')
    await this.page.getByRole('button', { name: 'Sign in' }).click()

    await expect(this.page).toHaveURL(Route.Home)
  }
}
