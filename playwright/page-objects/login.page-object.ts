import type { Page } from '@playwright/test'
import { ConduitPageObject } from './conduit.page-object.ts'

export class LoginPageObject extends ConduitPageObject {
  constructor(public page: Page) {
    super(page)
  }

  async fillEmail(email: string = 'foo@example.com') {
    await this.page.getByPlaceholder('Email').fill(email)
  }

  async fillPassword(password = '12345678') {
    await this.page.getByPlaceholder('Password').fill(password)
  }

  async fillForm(form: { email?: string, password?: string }) {
    if (form.email !== undefined)
      await this.fillEmail(form.email)
    if (form.password !== undefined)
      await this.fillPassword(form.password)
  }

  async clickSignIn() {
    await this.page.getByRole('button', { name: 'Sign in' }).dispatchEvent('click')
  }
}
