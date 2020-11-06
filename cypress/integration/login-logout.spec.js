describe('test for login', () => {
  beforeEach(() => {
    cy.server()
    cy.route2('GET', /articles\?tag=butt/, { fixture: 'article_of_tag' }).as('article_of_tag')
    cy.route2('GET', /articles\?/, { fixture: 'articles.json' }).as('getArticles')
    cy.route2('GET', /articles\//, { fixture: 'article.json' }).as('getArticle')
    cy.route2('GET', /tags/, { fixture: 'tags.json' }).as('getTags')

    cy.visit('/')
  })

  it('login and logout in home page', () => {
    // login
    cy.fixture('users.json').then(users => {
      cy.login(users.loginPass)
    })

    // logout
    cy.get('[href="#/settings"]')
      .click()
    cy.get('button.btn-outline-danger')
      .contains('logout')
      .click()
    cy.get('ul.navbar-nav')
      .should('contain', ' Sign in')
      .should('contain', ' Sign up')
  })
})
