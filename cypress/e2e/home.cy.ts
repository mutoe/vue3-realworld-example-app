import { ROUTES } from './constant'

describe('Homepage', () => {
  beforeEach(() => {
    cy.intercept('GET', /articles\?tag=butt/, { fixture: 'articles-of-tag.json' }).as('getArticlesOfTag')
    cy.intercept('GET', /articles\?limit/, { fixture: 'articles.json' }).as('getArticles')
    cy.intercept('GET', /articles\/.+/, { fixture: 'article.json' }).as('getArticle')
    cy.intercept('GET', /tags/, { fixture: 'tags.json' }).as('getTags')
  })

  it('should can access home page', () => {
    cy.visit(ROUTES.HOME)

    cy.get('h1.logo-font')
      .should('contain.text', 'conduit')
  })

  it('should highlight Global Feed when home page loaded', () => {
    cy.get('.articles-toggle > .nav')
      .contains('Global Feed')
      .should('have.class', 'active')
  })

  it('should display article when page loaded', () => {
    cy.get('.article-preview:first')
      .find('h1')
      .should('contain.text', 'abc123')
  })

  it('should read more information of the first articles', () => {
    cy.get('div.article-preview:first span')
      .contains('Read more...')
      .click()

    cy.get('.article-page')
      .contains(' to add comments on this article. ')
  })

  it('should highlight Home nav-item top menu bar when page load', () => {
    cy.visit(ROUTES.HOME)

    cy.get('ul.nav.navbar-nav.pull-xs-right a.nav-link')
      .contains('Home')
      .should('have.class', 'active')
  })

  it('should jump to next page when click page 2 in pagination', () => {
    cy.get('ul.pagination li.page-item:nth-child(2) a.page-link')
      .click()

    cy.wait('@getArticles')
      .its('request.url')
      .should('contain', 'limit=10&offset=10')
  })

  it('should display popular tags in home page', () => {
    cy.visit(ROUTES.HOME)
    cy.wait('@getTags')

    cy.contains('Popular Tags')
      .parent('.sidebar')
      .find('.tag-pill')
      .should('have.length', 8)
  })
})
