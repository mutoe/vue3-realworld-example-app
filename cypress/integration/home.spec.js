describe('View the homepage by guest', () => {
  beforeEach(() => {
    cy.server()
    cy.route2('GET', /articles\?tag=butt/, { fixture:'article_of_tag'}).as('article_of_tag')
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

  it('should read more information of the first articles', () => {
    cy.get('div.article-preview:first span')
      .contains('Read more...')
      .click()

    cy.get('.article-page')
      .contains(' to add comments on this article. ')
  })


  it('should highlight Home nav-item when page load',()=>{
    cy.get('ul.nav.navbar-nav.pull-xs-right a.nav-link')
      .contains('Home')
      .should('have.class','active')
  })

  it.only('turn up the page',()=>{
    cy.wait('@getArticles')
    cy.get('ul.pagination li.page-item:nth-child(2) a.page-link')
      .click()
    
    cy.wait('@getArticles')
      .then(console.log)
      .its('request.url')
      .should('contain','limit=10&offset=10')

  })

    // it('',()=>{

  // })
})
