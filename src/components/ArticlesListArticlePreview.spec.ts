import { mount } from '@cypress/vue'
import ArticlesListArticlePreview from 'src/components/ArticlesListArticlePreview.vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { router } from 'src/router'
import fixtures from 'src/utils/test/fixtures'

describe('# ArticlesListArticlePreview', () => {
  const favoriteButton = 'Favorite article'

  it('should call favorite method when click favorite button', async () => {
    cy.intercept('POST', '/api/articles/*/favorite', { body: { article: fixtures.articleAfterFavorite } })
      .as('mockFavorite')

    mount(ArticlesListArticlePreview, {
      global: { plugins: [registerGlobalComponents, router] },
      props: { article: fixtures.article },
    })

    cy.findByRole('button', { name: favoriteButton }).click()

    cy.wait('@mockFavorite')

    // TODO: Cypress.vueWrapper is undefined
    // const events = Cypress.vueWrapper.emitted()
    // cy.wrap(events).should('have.property', 'update', fixtures.articleAfterFavorite)
  })
})
