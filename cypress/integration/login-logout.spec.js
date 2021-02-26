describe('test for login', () => {
  beforeEach(() => {
    cy.intercept('GET', /articles\?tag=butt/, { fixture: 'article_of_tag' }).as('article_of_tag')
    cy.intercept('GET', /articles\?/, { fixture: 'articles.json' }).as('getArticles')
    cy.intercept('GET', /articles\//, { fixture: 'article.json' }).as('getArticle')
    cy.intercept('GET', /tags/, { fixture: 'tags.json' }).as('getTags')

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
