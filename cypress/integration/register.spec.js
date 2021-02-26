describe('test for register', () => {
  beforeEach(() => {
    cy.intercept('POST', /users/, { fixture: 'register.json' }).as('register')
    cy.intercept('GET', /articles\?tag=butt/, { fixture: 'article_of_tag' }).as('article_of_tag')
    cy.intercept('GET', /articles\?/, { fixture: 'articles.json' }).as('getArticles')
    cy.intercept('GET', /articles\//, { fixture: 'article.json' }).as('getArticle')
    cy.intercept('GET', /tags/, { fixture: 'tags.json' }).as('getTags')

    cy.visit('/')
  })

  it('ligin in home page', () => {
    // click logup button in home page
    cy.fixture('users.json').then(users => {
      cy.register(users.registered)
      cy.get('.navbar')
        .should('contain', 'plumrx')
    })
  })
})
