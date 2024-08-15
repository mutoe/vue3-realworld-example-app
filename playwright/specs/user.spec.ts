import type { Article, Profile } from 'src/services/api.ts'
import { Route } from '../constant'
import { expect, test } from '../extends'
import { ArticleDetailPageObject } from '../page-objects/article-detail.page-object.ts'

test.beforeEach(async ({ conduit }) => {
  await conduit.intercept('GET', /articles\?/, { fixture: 'articles.json' })
  await conduit.intercept('GET', /tags/, { fixture: 'tags.json' })
  await conduit.intercept('GET', /profiles\/\S+/, { fixture: 'profile.json' })
})

test.describe('follow', () => {
  test.beforeEach(async ({ conduit }) => {
    await conduit.intercept('GET', /articles\/\S+/, {
      statusCode: 200,
      fixture: 'article.json',
      postFixture: (article: { article: Article }) => {
        article.article.author.username = 'foo'
      },
    })
  })

  for (const [index, position] of (['banner', 'article footer'] as const).entries()) {
    test(`should call follow user api when click ${position} follow user button`, async ({ page, conduit }) => {
      await conduit.login()
      await conduit.goto(Route.ArticleDetail)
      const articlePage = new ArticleDetailPageObject(page)

      const waitForFollowUser = await conduit.intercept('POST', /profiles\/\S+\/follow/, {
        statusCode: 200,
        fixture: 'profile.json',
        postFixture: (profile: { profile: Profile }) => {
          profile.profile.following = true
        },
      })

      await Promise.all([
        waitForFollowUser(),
        articlePage.clickFollowUser(position),
      ])

      await expect(page.getByRole('button', { name: 'Unfollow' }).nth(index)).toBeVisible()
    })
  }

  test('should not display follow button when user not logged', async ({ page, conduit }) => {
    await conduit.goto(Route.ArticleDetail)

    await expect(page.getByRole('heading', { name: 'Article body' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Follow' })).not.toBeVisible()
  })
})
