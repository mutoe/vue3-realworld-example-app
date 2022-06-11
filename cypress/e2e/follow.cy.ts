import { ROUTES } from './constant'

describe.only('Follow', () => {
  beforeEach(() => {
    cy.intercept('GET', /articles\?/, { fixture: 'articles.json' }).as('getArticles')
    cy.intercept('GET', /tags/, { fixture: 'tags.json' }).as('getTags')
    cy.intercept('GET', /profiles\/\S+/, { fixture: 'profile.json' }).as('getProfile')
    cy.fixture('article.json').then(article => {
      article.article.author.username = 'foo'
      cy.intercept('GET', /articles\/\S+/, { statusCode: 200, body: article }).as('getArticle')
    })
  })

  it('should not display follow button when user not logged', () => {
    cy.visit(ROUTES.ARTICLE)

    cy.get('body').should('contain', ' to add comments on this article. ')

    cy.get('.article-meta button.space:first')
      .should('not.contain.text', 'Follow')
  })

  it('should call follow user api when click follow user button', () => {
    cy.fixture('profile.json').then(profile => {
      profile.profile.following = true
      cy.intercept('POST', /profiles\/\S+\/follow/, { statusCode: 200, body: profile }).as('followUser')
    })
    cy.login()
    cy.visit(ROUTES.ARTICLE)

    // follow author
    cy.get('.article-meta button.btn-outline-secondary')
      .contains('Follow')
      .click()

    cy.wait('@followUser')
    cy.get('.article-actions button.btn-outline-secondary:last')
      .should('contain', 'Unfollow')
  })
})
