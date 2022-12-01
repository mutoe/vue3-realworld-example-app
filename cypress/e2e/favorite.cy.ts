import { ROUTES } from './constant'

describe('Favorite', () => {
  beforeEach(() => {
    cy.intercept('GET', /articles\?/, { fixture: 'articles.json' }).as('getArticles')
    cy.intercept('GET', /tags/, { fixture: 'tags.json' }).as('getTags')
  })

  it('should jump to login page when click favorite article button given user not logged', () => {
    cy.intercept('POST', /articles\/\S+\/favorite$/, { statusCode: 401, body: {} }).as('favoriteArticle')
    cy.visit(ROUTES.HOME)

    Cypress.on('uncaught:exception', (err) => {
      expect(err.message).to.contain('Need to login')
      return false
    })
    cy.get('i.ion-heart:first').click()

    cy.url().should('contain', 'login')
  })

  it('should call favorite api and highlight favorite button when click favorite button', () => {
    cy.intercept('POST', /articles\/\S+\/favorite$/, { fixture: 'article.json' }).as('favoriteArticle')
    cy.login()
    cy.visit(ROUTES.HOME)

    // like articles
    cy.get('i.ion-heart:first').click()

    cy.wait('@favoriteArticle')
    cy.get('.article-meta:first button')
      .should('have.class', 'btn-primary')
  })
})
