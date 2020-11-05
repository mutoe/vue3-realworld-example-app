describe('test for login', () => {
  beforeEach(() => {
    cy.server()
    cy.route2('GET', /articles\?tag=butt/, { fixture: 'article_of_tag' }).as('article_of_tag')
    cy.route2('GET', /articles\?/, { fixture: 'articles.json' }).as('getArticles')
    cy.route2('GET', /articles\//, { fixture: 'article.json' }).as('getArticle')
    cy.route2('GET', /tags/, { fixture: 'tags.json' }).as('getTags')

    cy.visit('/')
  })

  it('login in home page', () => {
    // const usrname = 'plumrx1'
    // const email = 'plumrx1@qq.com'
    // const password = '12345678'

    cy.fixture('users.json').then(users => {
      cy.login(users.loginPass)
    })
  })
})
