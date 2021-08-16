import { mount } from '@cypress/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import { updateUser, user } from 'src/store/user'
import fixtures from 'src/utils/test/fixtures'
import ArticleDetailMeta from './ArticleDetailMeta.vue'

describe('# ArticleDetailMeta', () => {
  const editButton = 'Edit article'
  const deleteButton = 'Delete article'
  const followButton = 'Follow'
  const unfollowButton = 'Unfollow'
  const favoriteButton = 'Favorite article'
  const unfavoriteButton = 'Unfavorite article'

  beforeEach(async () => {
    await router.push({ name: 'article', params: { slug: fixtures.article.slug } })
    updateUser(fixtures.user)
  })

  it('should display edit button when user is author', () => {
    mount(ArticleDetailMeta, {
      global: {
        plugins: [registerGlobalComponents, router],
        mocks: { $store: user },
      },
      props: { article: fixtures.article },
    })

    cy.findByRole('link', { name: editButton }).should('exist')
    cy.findByRole('button', { name: followButton }).should('not.exist')
  })

  it('should display follow button when user not author', () => {
    updateUser({ ...fixtures.user, username: 'user2' })
    mount(ArticleDetailMeta, {
      global: {
        plugins: [registerGlobalComponents, router],
        mocks: { $store: user },
      },
      props: { article: fixtures.article },
    })

    cy.findByRole('link', { name: editButton }).should('not.exist')
    cy.findByRole('button', { name: followButton }).should('exist')
  })

  it('should not display follow button and edit button when user not logged', () => {
    updateUser(null)
    mount(ArticleDetailMeta, {
      global: {
        plugins: [registerGlobalComponents, router],
        mocks: { $store: user },
      },
      props: { article: fixtures.article },
    })

    cy.findByRole('button', { name: editButton }).should('not.exist')
    cy.findByRole('button', { name: followButton }).should('not.exist')
  })

  it('should call delete article service when click delete button', async () => {
    cy.intercept('DELETE', '/api/articles/*', { statusCode: 200 }).as('deleteArticle')

    mount(ArticleDetailMeta, {
      global: {
        plugins: [registerGlobalComponents, router],
        mocks: { $store: user },
      },
      props: { article: fixtures.article },
    })

    cy.findByRole('button', { name: deleteButton }).click()

    cy.wait('@deleteArticle').its('request.url').should('contain', 'article-foo')
  })

  it('should call follow service when click follow button', async () => {
    cy.intercept('POST', '/api/profiles/*/follow', { statusCode: 200 }).as('followProfile')

    updateUser({ ...fixtures.user, username: 'user2' })
    mount(ArticleDetailMeta, {
      global: {
        plugins: [registerGlobalComponents, router],
        mocks: { $store: user },
      },
      props: { article: fixtures.article },
    })

    cy.findByRole('button', { name: followButton }).click()

    cy.wait('@followProfile').its('request.url').should('contain', 'Author%20name')
  })

  it('should call unfollow service when click follow button and not followed author', async () => {
    cy.intercept('DELETE', '/api/profiles/*/follow', { statusCode: 200 }).as('unfollowProfile')

    updateUser({ ...fixtures.user, username: 'user2' })
    mount(ArticleDetailMeta, {
      global: {
        plugins: [registerGlobalComponents, router],
        mocks: { $store: user },
      },
      props: { article: { ...fixtures.article, author: { ...fixtures.article.author, following: true } } },
    })

    cy.findByRole('button', { name: unfollowButton }).click()

    cy.wait('@unfollowProfile').its('request.url').should('contain', 'Author')
  })

  it('should call favorite article service when click favorite button', async () => {
    cy.intercept('POST', '/api/articles/*/favorite', { statusCode: 200 }).as('favoriteArticle')

    updateUser({ ...fixtures.user, username: 'user2' })
    mount(ArticleDetailMeta, {
      global: {
        plugins: [registerGlobalComponents, router],
        mocks: { $store: user },
      },
      props: { article: { ...fixtures.article, favorited: false } },
    })

    cy.findByRole('button', { name: favoriteButton }).click()

    cy.wait('@favoriteArticle').its('request.url').should('contain', 'article-foo')
  })

  it('should call favorite article service when click unfavorite button', async () => {
    cy.intercept('DELETE', '/api/articles/*/favorite', { statusCode: 200 }).as('unfavoriteArticle')

    updateUser({ ...fixtures.user, username: 'user2' })
    mount(ArticleDetailMeta, {
      global: {
        plugins: [registerGlobalComponents, router],
        mocks: { $store: user },
      },
      props: { article: { ...fixtures.article, favorited: true } },
    })

    cy.findByRole('button', { name: unfavoriteButton }).click()

    cy.wait('@unfavoriteArticle').its('request.url').should('contain', 'article-foo')
  })
})
