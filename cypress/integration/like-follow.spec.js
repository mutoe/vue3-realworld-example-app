describe('test for like-follow mode', () => {
  beforeEach(() => {
    cy.server()
    cy.route2('GET', /articles\?tag=butt/, { fixture: 'article_of_tag' }).as('article_of_tag')
    cy.route2('GET', /articles\?/, { fixture: 'articles.json' }).as('getArticles')
    cy.route2('GET', /articles\//, { fixture: 'article.json' }).as('getArticle')
    cy.route2('GET', /tags/, { fixture: 'tags.json' }).as('getTags')

    cy.visit('/')
  })

  it('no-login:like artiles', () => {
    cy.get('i.ion-heart:first')
      .click()

    cy.url()
      .should('contain', 'login')

    cy.get('h1.text-xs-center')
      .should('contain.text', ' Sign in ')
  })

  it.only('no-login:follow author', () => {
    cy.get('.article-preview:first')
      .click()

    cy.url()
      .should('contain', 'article')

    cy.get('body')
      .should('contain', ' to add comments on this article. ')

    cy.get('.article-meta button.space:first')
      .should('contain.text', ' Follow')

    cy.get('.article-meta button.space:first')
      .click()

    cy.url()
      .should('contain', 'login')
  })
})
