import type { Article } from 'src/services/api.ts'
import { Route } from '../constant.ts'
import { expect, test } from '../extends'
import { formatHTML } from '../utils/formatHTML.ts'

test.describe('article', () => {
  test.beforeEach(async ({ conduct }) => {
    await conduct.intercept('GET', /articles\?limit/, { fixture: 'articles.json' })
    await conduct.intercept('GET', /tags/, { fixture: 'articles-of-tag.json' })
    await conduct.intercept('GET', /profiles\/.+/, { fixture: 'profile.json' })

    await conduct.login()
  })

  test.describe('post article', () => {
    test('jump to post detail page when submit create article form', async ({ page, conduct }) => {
      await conduct.goto(Route.ArticleCreate)

      const articleFixture = await conduct.getFixture<{ article: Article }>('article.json')
      const waitForPostArticle = await conduct.intercept('POST', /articles$/, { body: articleFixture })

      await page.getByPlaceholder('Article Title').fill(articleFixture.article.title)
      await page.getByPlaceholder("What's this article about?").fill(articleFixture.article.description)
      await page.getByPlaceholder('Write your article (in markdown)').fill(articleFixture.article.body)
      for (const tag of articleFixture.article.tagList) {
        await page.getByPlaceholder('Enter tags').fill(tag)
        await page.getByPlaceholder('Enter tags').press('Enter')
      }

      await page.getByRole('button', { name: 'Publish Article' }).dispatchEvent('click')
      await waitForPostArticle()

      await conduct.intercept('GET', /articles\/.+/, { fixture: 'article.json' })
      await page.waitForURL(/article\/article-title/)
      await expect (page.getByRole('heading', { name: 'Article title' })).toContainText('Article title')
    })

    test('should render markdown correctly', async ({ browserName, page, conduct }) => {
      test.skip(browserName !== 'chromium')
      await conduct.goto(Route.ArticleDetail)

      const waitForArticle = await conduct.intercept('GET', /articles\/.+/, { fixture: 'article.json' })
      await waitForArticle()
      const innerHTML = await page.locator('.article-content').innerHTML()
      expect(formatHTML(innerHTML)).toMatchSnapshot('markdown-render.html')
    })
  })

  test.describe('delete article', () => {
    for (const [index, position] of ['banner', 'article footer'].entries()) {
      test(`delete article from ${position}`, async ({ page, conduct }) => {
        const waitForArticle = await conduct.intercept('GET', /articles\/.+/, { fixture: 'article.json' })
        await conduct.goto(Route.ArticleDetail)
        await waitForArticle()

        await conduct.intercept('DELETE', /articles\/.+/)
        await page.getByRole('button', { name: 'Delete Article' }).nth(index).click()

        await expect(page).toHaveURL(Route.Home)
      })
    }
  })
})
