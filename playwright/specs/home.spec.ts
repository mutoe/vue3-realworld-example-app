import { Route } from '../constant.ts'
import { expect, test } from '../extends.ts'

test.beforeEach(async ({ conduit }) => {
  await conduit.intercept('GET', /articles\?tag=butt/, { fixture: 'articles-of-tag.json' })
  await conduit.intercept('GET', /articles\?limit/, { fixture: 'articles.json' })
  await conduit.intercept('GET', /articles\/.+/, { fixture: 'article.json' })
  await conduit.intercept('GET', /tags/, { fixture: 'tags.json' })
})

test('should can access home page', async ({ page, conduit }) => {
  await conduit.goto(Route.Home)

  await expect(page.getByRole('heading', { name: 'conduit' })).toContainText('conduit')
})

test.describe('navigation bar', () => {
  test('should highlight Home nav-item top menu bar when page load', async ({ page, conduit }) => {
    await conduit.goto(Route.Home)

    await expect(page.getByRole('link', { name: 'Home', exact: true })).toHaveClass(/active/)
  })
})

test.describe('article previews', () => {
  test('should highlight Global Feed when home page loaded', async ({ page, conduit }) => {
    await conduit.goto(Route.Home)
    await expect(page.getByText('Global Feed')).toHaveClass(/active/)
  })

  test('should display article when page loaded', async ({ page, conduit }) => {
    await conduit.goto(Route.Home)
    const articlePreview = page.getByTestId('article-preview').first()

    await test.step('should have article preview', async () => {
      await expect(articlePreview.getByRole('heading')).toContainText('abc123')
      await expect(articlePreview.getByTestId('article-description')).toContainText('aaaaaaaaaaassssssssss')
    })

    await test.step('should redirect to article details page when click read more', async () => {
      await articlePreview.getByText('Read more...').click()

      await expect(page).toHaveURL(/#\/article\/.+/)
    })
  })

  test('should jump to next page when click page 2 in pagination', async ({ page, conduit }) => {
    await conduit.goto(Route.Home)

    const waitForGetArticles = await conduit.intercept('GET', /articles\?limit=10&offset=10/, { fixture: 'articles.json' })

    const [response] = await Promise.all([
      waitForGetArticles(),
      page.getByRole('link', { name: 'Go to page 2', exact: true }).click(),
    ])

    expect(response.request().url()).toContain('limit=10&offset=10')
  })
})
