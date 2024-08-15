import type { Page } from '@playwright/test'
import { ConduitPageObject } from './conduit.page-object'

export class ArticleDetailPageObject extends ConduitPageObject {
  constructor(public page: Page) {
    super(page)
  }

  positionMap = {
    'banner': 0,
    'article footer': 1,
  } as const

  private async clickOperationButton(position: keyof typeof this.positionMap = 'banner', buttonName: string) {
    await this.page.getByRole('button', { name: buttonName }).nth(this.positionMap[position]).click()
  }

  async clickEditArticle(position: keyof typeof this.positionMap = 'banner') {
    return this.clickOperationButton(position, 'Edit Article')
  }

  async clickDeleteArticle(position: keyof typeof this.positionMap = 'banner') {
    await this.page.getByRole('button', { name: 'Delete article' }).nth(this.positionMap[position]).dispatchEvent('click')
  }

  async clickFollowUser(position: keyof typeof this.positionMap = 'banner') {
    await this.page.getByRole('button', { name: 'Follow' }).nth(this.positionMap[position]).dispatchEvent('click')
  }

  async clickFavoriteArticle(position: keyof typeof this.positionMap = 'banner') {
    await this.page.getByRole('button', { name: 'Favorite article' }).nth(this.positionMap[position]).dispatchEvent('click')
  }
}
