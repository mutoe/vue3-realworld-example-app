import { mount } from '@cypress/vue'
import ArticleDetailCommentsForm from 'src/components/ArticleDetailCommentsForm.vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import fixtures from 'src/utils/test/fixtures'

describe('# ArticleDetailCommentsForm', () => {
  beforeEach(async () => {
    await router.push({ name: 'article', params: { slug: fixtures.article.slug } })
  })

  it('should display sign in button when user not logged', () => {
    cy.intercept('POST', '/api/articles/*/comments', fixtures.comment2).as('createComment')

    mount(ArticleDetailCommentsForm, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { articleSlug: fixtures.article.slug },
    })

    cy.contains('add comments on this article')
  })

  it('should display form when user logged', async () => {
    cy.intercept('POST', '/api/articles/*/comments', { statusCode: 200 }).as('createComment')

    // given
    mount(ArticleDetailCommentsForm, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { articleSlug: fixtures.article.slug },
    })

    // when
    cy.findByRole('textbox', { name: 'Write comment' })
      .type('some texts...')
    cy.findByRole('button', { name: 'Submit' })

    // then
    cy.get('@createComment').should('be.calledWith', 'article-foo', 'some texts...')

    const events = Cypress.vueWrapper.emitted()
    cy.wrap(events).should('have.property', 'submit')
  })
})
