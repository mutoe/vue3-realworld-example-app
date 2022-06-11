import { ROUTES } from './constant'

describe('Article', () => {
  beforeEach(() => {
    cy.intercept('GET', /articles\?limit/, { fixture: 'articles.json' })
    cy.intercept('GET', /articles\/.+/, { fixture: 'article.json' })
    cy.intercept('GET', /tags/, { fixture: 'articles-of-tag.json' })
    cy.intercept('GET', /profiles\/.+/, { fixture: 'profile.json' })
    cy.intercept('DELETE', /articles\/.+/, { statusCode: 200, body: {} }).as('deleteArticle')
  })

  describe('post article', () => {
    it('jump to post detail page when submit create article form', () => {
      cy.login()
      cy.visit('/')

      cy.intercept('POST', /articles$/, { fixture: 'article.json' })

      cy.get('[href="#/article/create"]').click()

      cy.get('[placeholder="Article Title"]').type('Title')
      cy.get('[placeholder="What\'s this article about?"]').type('content')
      cy.get('[placeholder="Write your article (in markdown)"]').type('## test')
      cy.get('[placeholder="Enter tags"]').type('butt')

      cy.get('[type="submit"]').click()

      cy.url()
        .should('contain', 'article/article-title')
      cy.get('.container > h1')
        .should('contain', 'Article title')
    })

    it('should render markdown correctly', () => {
      cy.get('.article-content').within(() => {
        cy.get('h1')
          .should('contain', 'Article body')

        cy.get('strong')
          .should('contain', 'Strong')
      })
    })
  })

  describe('delete article', () => {
    it('delete article', () => {
      cy.login()
      cy.visit(ROUTES.ARTICLE)

      cy.get('.article-actions button.btn-outline-danger')
        .contains('Delete Article')
        .click()

      cy.wait('@deleteArticle')
      cy.get('.home-page p')
        .should('contain', 'A place to share your knowledge.')
    })
  })
})
