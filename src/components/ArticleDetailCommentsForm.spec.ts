import { createPinia, setActivePinia } from 'pinia'
import ArticleDetailCommentsForm from 'src/components/ArticleDetailCommentsForm.vue'
import { useUserStore } from 'src/store/user'
import fixtures from 'src/utils/test/fixtures'

describe('# ArticleDetailCommentsForm', () => {
  setActivePinia(createPinia())
  const userStore = useUserStore()

  beforeEach(() => {
    cy.intercept('/api/profiles/*', { profile: fixtures.author }).as('getProfile')
    cy.intercept('POST', '/api/articles/*/comments', { comment: { body: 'some texts...' } }).as('postComment')
    userStore.updateUser(fixtures.user)
  })

  it('should display sign in button when user not logged', () => {
    userStore.updateUser(null)
    cy.mount(ArticleDetailCommentsForm, {
      props: { articleSlug: fixtures.article.slug },
    })

    cy.contains('add comments on this article')
  })

  it('should display form when user logged', () => {
    cy.mount(ArticleDetailCommentsForm, {
      props: { articleSlug: fixtures.article.slug },
    })

    cy.findByRole('textbox', { name: 'Write comment' }).type('some texts...')
    cy.findByRole('button', { name: 'Submit' }).click()

    cy.wait('@postComment')
      .its('request.body')
      .should('deep.equal', { comment: { body: 'some texts...' } })
  })
})
