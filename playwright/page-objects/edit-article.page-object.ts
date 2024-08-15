import type { Page } from '@playwright/test'
import { ConduitPageObject } from './conduit.page-object.ts'

export class EditArticlePageObject extends ConduitPageObject {
  constructor(public page: Page) {
    super(page)
  }

  async fillTitle(title: string) {
    await this.page.getByPlaceholder('Article Title').fill(title)
  }

  async fillDescription(description: string) {
    await this.page.getByPlaceholder("What's this article about?").fill(description)
  }

  async fillContent(content: string) {
    await this.page.getByPlaceholder('Write your article (in markdown)').fill(content)
  }

  async fillTags(tags: string | string[]) {
    if (!Array.isArray(tags))
      tags = [tags]
    for (const tag of tags) {
      await this.page.getByPlaceholder('Enter tags').fill(tag)
      await this.page.getByPlaceholder('Enter tags').press('Enter')
    }
  }

  async fillForm({ title, description, content, tags }: { title?: string, description?: string, content?: string, tags?: string | string[] }) {
    if (title !== undefined)
      await this.fillTitle(title)
    if (description !== undefined)
      await this.fillDescription(description)
    if (content !== undefined)
      await this.fillContent(content)
    if (tags !== undefined)
      await this.fillTags(tags)
  }

  async clickPublishArticle() {
    await this.page.getByRole('button', { name: 'Publish Article' }).dispatchEvent('click')
  }
}
