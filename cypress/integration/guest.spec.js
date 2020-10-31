describe('View the homepage by guest', () => {
  beforeEach(() => {
    cy.server()
    cy.route2('GET', /articles/, { fixture: 'articles.json' }).as('getArticles')
    cy.route2('GET', /tags/, { fixture: 'tags.json' }).as('getTags')

    cy.visit('/')
    
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
    cy.wait('@getArticles')
    
    cy.get('.article-preview:first')
      .find('h1')
      .should('contain.text', 'abc123')
  })

  it('it should display correct tags when page loaded',()=>{
    cy.wait('@getTags')
    
    cy.get('div.tag-list')
      .find('a.tag-pill.tag-default')
      .should('have.length',8)
    
    cy.get('div.tag-list')
      .find('a.tag-pill.tag-default:nth-child(3)')
      .should('contain.text','HITLER')
  })
})
