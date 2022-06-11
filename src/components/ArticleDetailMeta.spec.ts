import { createPinia, setActivePinia } from 'pinia'
import type { Profile } from 'src/services/api'
import { useUserStore } from 'src/store/user'
import fixtures from 'src/utils/test/fixtures'
import ArticleDetailMeta from './ArticleDetailMeta.vue'

const editButton = 'Edit article'
const deleteButton = 'Delete article'
const followButton = 'Follow'
const unfollowButton = 'Unfollow'
const favoriteButton = 'Favorite article'
const unfavoriteButton = 'Unfavorite article'

describe('# ArticleDetailMeta', () => {
  setActivePinia(createPinia())
  const userStore = useUserStore()

  beforeEach(() => {
    userStore.updateUser(fixtures.user)
  })

  it('should display edit button when user is author', () => {
    cy.mount(ArticleDetailMeta, {
      props: { article: fixtures.article },
    })

    cy.findByRole('link', { name: editButton })
    cy.findByRole('button', { name: followButton }).should('not.exist')
  })

  it('should display follow button when user not author', () => {
    userStore.updateUser({ ...fixtures.user, username: 'user2' })
    cy.mount(ArticleDetailMeta, {
      props: { article: fixtures.article },
    })

    cy.findByRole('link', { name: editButton }).should('not.exist')
    cy.findByRole('button', { name: followButton })
  })

  it('should not display follow button and edit button when user not logged', () => {
    userStore.updateUser(null)
    cy.mount(ArticleDetailMeta, {
      props: { article: fixtures.article },
    })

    cy.findByRole('link', { name: editButton }).should('not.exist')
    cy.findByRole('button', { name: followButton }).should('not.exist')
  })

  it('should call delete article service when click delete button', () => {
    cy.intercept('DELETE', '/api/articles/*', { status: 200 }).as('deleteArticle')
    cy.mount(ArticleDetailMeta, {
      props: { article: fixtures.article },
    })

    cy.findByRole('button', { name: deleteButton }).click()

    cy.wait('@deleteArticle')
      .its('request.url')
      .should('contain', '/api/articles/article-foo')
  })

  it('should call follow service when click follow button', () => {
    const newProfile: Profile = { ...fixtures.user, following: true }
    cy.intercept('POST', '/api/profiles/*/follow', { profile: newProfile }).as('followUser')
    userStore.updateUser({ ...fixtures.user, username: 'user2' })
    const onUpdate = cy.spy().as('onUpdate')
    cy.mount(ArticleDetailMeta, {
      props: { article: fixtures.article, onUpdate },
    })

    cy.findByRole('button', { name: followButton }).click()

    cy.get('@followUser')
      .its('request.url')
      .should('contain', '/api/profiles/Author%20name/follow')

    cy.get('@onUpdate').should('be.calledWith', { ...fixtures.article, author: newProfile })
  })

  it('should call unfollow service when click follow button and not followed author', () => {
    const newProfile: Profile = { ...fixtures.user, following: false }
    cy.intercept('DELETE', '/api/profiles/*/follow', { profile: newProfile }).as('unfollowUser')
    userStore.updateUser({ ...fixtures.user, username: 'user2' })
    const onUpdate = cy.spy().as('onUpdate')
    cy.mount(ArticleDetailMeta, {
      props: {
        article: { ...fixtures.article, author: { ...fixtures.article.author, following: true } },
        onUpdate,
      },
    })

    cy.findByRole('button', { name: unfollowButton }).click()

    cy.wait('@unfollowUser')
      .its('request.url')
      .should('contain', '/api/profiles/Author%20name/follow')

    cy.get('@onUpdate').should('be.calledWith', { ...fixtures.article, author: newProfile })
  })

  it('should call favorite article service when click favorite button', () => {
    cy.intercept('POST', '/api/articles/*/favorite', { status: 200 }).as('favoriteArticle')
    userStore.updateUser({ ...fixtures.user, username: 'user2' })
    cy.mount(ArticleDetailMeta, {
      props: { article: { ...fixtures.article, favorited: false } },
    })

    cy.findByRole('button', { name: favoriteButton }).click()

    cy.wait('@favoriteArticle')
      .its('request.url')
      .should('contain', '/api/articles/article-foo/favorite')
  })

  it('should call favorite article service when click unfavorite button', () => {
    cy.intercept('DELETE', '/api/articles/*/favorite', { status: 200 }).as('unfavoriteArticle')
    userStore.updateUser({ ...fixtures.user, username: 'user2' })
    cy.mount(ArticleDetailMeta, {
      props: { article: { ...fixtures.article, favorited: true } },
    })

    cy.findByRole('button', { name: unfavoriteButton }).click()

    cy.wait('@unfavoriteArticle')
      .its('request.url')
      .should('contain', '/api/articles/article-foo/favorite')
  })
})
