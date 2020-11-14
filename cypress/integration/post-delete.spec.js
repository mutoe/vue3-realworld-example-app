describe('test for login', () => {
  before(() => {
    cy.visit('/')
    // login
    cy.fixture('users.json').then(users => {
      cy.login(users.loginPass)
    })
  })

  it('post article', () => {
    // post article
    cy.get('[href="#/article/create"]')
      .click()

    cy.get('[placeholder="Article Title"]')
      .type('tilte')

    cy.get('[placeholder="What\'s this article about?"]')
      .type('content')

    cy.get('[placeholder="Write your article (in markdown)"]')
      .type('## test')

    cy.get('[placeholder="Enter tags"]')
      .type('butt')

    cy.get('[type="submit"]')
      .click()
    cy.get('.article-page .banner h1')
      .should('contain', 'tilte')
  })

  it('delete article', () => {
    // delete article

    cy.get('.article-actions button.btn-outline-danger')
      .click()

    cy.get('.home-page p')
      .should('contain', 'A place to share your knowledge.')
  })
})
