import { mount } from '@cypress/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import fixtures from 'src/utils/test/fixtures'
import ArticleDetailComments from './ArticleDetailComments.vue'

describe('# ArticleDetailComments', () => {
  beforeEach(async () => {
    await router.push({
      name: 'article',
      params: { slug: fixtures.article.slug },
    })
  })

  it('should render correctly', async () => {
    cy.intercept('GET', '/api/articles/*/comments', { body: { comments: [fixtures.comment] } }).as('retrieveComments')

    mount(ArticleDetailComments, {
      global: {
        plugins: [registerGlobalComponents, router],
      },
    })

    cy.wait('@retrieveComments').its('request.url').should('contain', 'article-foo')
  })

  // TODO: resolve the Cypress.vue is undefined
  it.skip('should display new comment when post new comment', async () => {
    cy.intercept('GET', '/api/articles/*/comments', { body: { comments: [fixtures.comment] } }).as('retrieveComments')

    // given
    mount(ArticleDetailComments, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    cy.wait('@retrieveComments')
    cy.get('.card').should('have.length', 1)

    // when
    Cypress.vue.$emit('add-comment', fixtures.comment2)

    // then
    cy.get('.card').should('have.length', 2)
  })

  it.skip('should call remove comment service when click delete button', async () => {
    cy.intercept('DELETE', '/api/articles/*/comments', { statusCode: 200 }).as('deleteComment')

    // given
    mount(ArticleDetailComments, {
      global: { plugins: [registerGlobalComponents, router] },
    })

    // when
    Cypress.vue.$emit('remove-comment')

    // then
    cy.wait('@deleteComment')
  })
})
