import ArticlesListArticlePreview from 'src/components/ArticlesListArticlePreview.vue'
import fixtures from 'src/utils/test/fixtures'

const favoriteButton = 'Favorite article'

describe('# ArticlesListArticlePreview', () => {
  it('should call favorite method when click favorite button', () => {
    cy.intercept('POST', '/api/articles/*/favorite', { status: 200 }).as('favoriteArticle')
    cy.mount(ArticlesListArticlePreview, {
      props: { article: fixtures.article },
    })

    cy.findByRole('button', { name: favoriteButton }).click()

    cy.wait('@favoriteArticle')
  })
})
