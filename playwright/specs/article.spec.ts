import { ArticleDetailPageObject } from 'page-objects/article-detail.page-object'
import { EditArticlePageObject } from 'page-objects/edit-article.page-object'
import type { Article } from 'src/services/api'
import { Route } from '../constant'
import { expect, test } from '../extends'

test.beforeEach(async ({ conduit }) => {
  await conduit.intercept('GET', /articles\?limit/, { fixture: 'articles.json' })
  await conduit.intercept('GET', /tags/, { fixture: 'tags.json' })
  await conduit.intercept('GET', /profiles\/.+/, { fixture: 'profile.json' })
})

test.describe('post article', () => {
  let editArticlePage!: EditArticlePageObject

  test.beforeEach(async ({ conduit, page }) => {
    await conduit.login()
    editArticlePage = new EditArticlePageObject(page)
  })

  test('jump to post detail page when submit create article form', async ({ page, conduit }) => {
    await conduit.goto(Route.ArticleCreate)

    const articleFixture = await conduit.getFixture<{ article: Article }>('article.json')
    const waitForPostArticle = await editArticlePage.intercept('POST', /articles$/, { body: articleFixture })

    await editArticlePage.fillForm({
      title: articleFixture.article.title,
      description: articleFixture.article.description,
      content: articleFixture.article.body,
      tags: articleFixture.article.tagList,
    })

    await editArticlePage.clickPublishArticle()
    await waitForPostArticle()

    await conduit.intercept('GET', /articles\/.+/, { fixture: 'article.json' })
    await page.waitForURL(/article\/article-title/)
    await conduit.toContainText('Article title')
  })

  test('should render markdown correctly', async ({ browserName, page, conduit }) => {
    test.skip(browserName !== 'chromium')
    const waitForArticleRequest = await conduit.intercept('GET', /articles\/.+/, { fixture: 'article.json' })
    await Promise.all([
      waitForArticleRequest(),
      conduit.goto(Route.ArticleDetail),
    ])
    const articleContent = page.locator('.article-content')
    await expect(articleContent).toMatchAriaSnapshot({ name: 'article-content.yml' })
  })
})

test.describe('delete article', () => {
  for (const position of ['banner', 'article footer'] as const) {
    test(`delete article from ${position}`, async ({ page, conduit }) => {
      await conduit.login()
      const articlePage = new ArticleDetailPageObject(page)
      const waitForArticle = await articlePage.intercept('GET', /articles\/.+/, { fixture: 'article.json' })
      await conduit.goto(Route.ArticleDetail)
      await waitForArticle()

      const waitForDeleteArticle = await conduit.intercept('DELETE', /articles\/.+/)

      const [response] = await Promise.all([
        waitForDeleteArticle(),
        articlePage.clickDeleteArticle(position),
      ])

      expect(response).toBeInstanceOf(Object)
      await expect(page).toHaveURL(Route.Home)
    })
  }
})

test.describe('favorite article', () => {
  test.beforeEach(async ({ conduit }) => {
    await conduit.intercept('GET', /tags/, { fixture: 'tags.json' })
  })

  test('should jump to login page when click favorite article button given user not logged', async ({ page, conduit }) => {
    await conduit.goto(Route.Home)

    const waitForFavoriteArticle = await conduit.intercept('POST', /articles\/\S+\/favorite$/, { statusCode: 401 })
    await Promise.all([
      waitForFavoriteArticle(),
      page.getByRole('button', { name: 'Favorite article' }).first().click(),
    ])

    await expect(page).toHaveURL(Route.Login)
  })

  test('should call favorite api and highlight favorite button when click favorite button', async ({ page, conduit }) => {
    await conduit.login()
    await conduit.goto(Route.Home)

    // like articles
    const waitForFavoriteArticle = await conduit.intercept('POST', /articles\/\S+\/favorite$/, { fixture: 'article.json' })
    await Promise.all([
      waitForFavoriteArticle(),
      page.getByRole('button', { name: 'Favorite article' }).first().click(),
    ])

    await expect(page.getByRole('button', { name: 'Favorite article' }).first()).toContainClass('btn-primary')
  })
})

test.describe('tag', () => {
  test.beforeEach(async ({ conduit }) => {
    await conduit.login()
    await conduit.intercept('GET', /articles\?tag=butt/, { fixture: 'articles-of-tag.json' })
  })

  test('should display popular tags in home page', async ({ page, conduit }) => {
    await conduit.goto(Route.Home)

    const tagItemsWrapper = page.getByText('Popular Tags')
      .locator('..')
      .locator('.tag-pill')
      .locator('..')
    await expect(tagItemsWrapper).toMatchAriaSnapshot({ name: 'popular-tags.yml' })
  })

  test('should show right articles of tag', async ({ page, conduit }) => {
    const tagName = 'butt'
    await conduit.goto(Route.Home)

    await conduit.intercept('GET', /articles\?tag/, { fixture: 'articles-of-tag.json' })
    await page.getByLabel(tagName).click()

    await expect(page).toHaveURL(`/#/tag/${tagName}`)
    await expect(page.locator('a.tag-pill.tag-default').last())
      .toHaveClass(/(router-link-active|router-link-exact-active)/)

    await expect(page.getByLabel('tag')).toContainText('butt')
  })
})
