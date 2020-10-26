describe('View the homepage by guest', () => {
  beforeEach(() => {
    cy.server()
    cy.route2('GET', /articles/, { fixture: 'articles.json' }).as('getArticles')
    cy.route2('GET', /tags/, { fixture: 'tags.json' })

    cy.visit('/')
    cy.wait('@getArticles')
  })

  it('should can access home page', () => {
    cy.get('h1.logo-font')
      .should('contain.text', 'conduit')
  })

  it('should highlight Global Feed when home page loaded', () => {
    cy.get('.feed-toggle > .nav')
      .contains('Global Feed')
      .should('have.class', 'active')
  })

  it('should display article when page loaded', () => {
    cy.get('.article-preview:first')
      .find('h1')
      .should('contain.text', 'abc123')
  })
})
