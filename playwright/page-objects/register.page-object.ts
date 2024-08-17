import type { Page } from '@playwright/test'
import { ConduitPageObject } from './conduit.page-object.ts'

export class RegisterPageObject extends ConduitPageObject {
  constructor(public page: Page) {
    super(page)
  }

  async fillName(name: string = 'foo') {
    await this.page.getByPlaceholder('Your Name').fill(name)
  }

  async fillEmail(email: string = 'foo@example.com') {
    await this.page.getByPlaceholder('Email').fill(email)
  }

  async fillPassword(password = '12345678') {
    await this.page.getByPlaceholder('Password').fill(password)
  }

  async fillForm(form: { name?: string, email?: string, password?: string }) {
    if (form.name !== undefined)
      await this.fillName(form.name)
    if (form.email !== undefined)
      await this.fillEmail(form.email)
    if (form.password !== undefined)
      await this.fillPassword(form.password)
  }

  async clickSignUp() {
    await this.page.getByRole('button', { name: 'Sign up' }).dispatchEvent('click')
  }
}
