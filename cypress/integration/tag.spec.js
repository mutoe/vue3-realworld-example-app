describe('View the homepage by guest', () => {
  beforeEach(() => {
    cy.server()
    cy.route2('GET', /articles\?tag=butt/, { fixture: 'article_of_tag' }).as('article_of_tag')
    cy.route2('GET', /articles/, { fixture: 'articles.json' }).as('getArticles')
    cy.route2('GET', /tags/, { fixture: 'tags.json' }).as('getTags')

    cy.visit('/')
  })

  it('it should display correct tags when page loaded', () => {
    cy.wait('@getTags')

    cy.get('div.tag-list')
      .find('a.tag-pill.tag-default')
      .should('have.length', 8)

    cy.get('div.tag-list')
      .find('a.tag-pill.tag-default:nth-child(3)')
      .should('contain.text', 'HITLER')
  })

  it('should show right articles of tag', () => {
    // 点击最后一个tag
    cy.get('a.tag-pill.tag-default:last')
      .click()

    cy.get('a.tag-pill.tag-default:last')
      .should('have.class', 'router-link-active')
      .should('have.class', 'router-link-exact-active')

    cy.get('a.tag-pill.tag-default:last').invoke('text').then(tag => {
      const path = `#/tag/${tag}`

      // check URL
      cy.url()
        .should('include', path)

      // check sheet
      cy.get('a.active.router-link-exact-active.nav-link')
        .should('contain', tag)
    })
  })

  it.only('check articles tag including butt', () => {
    // 点击最后一个tag
    cy.get('a.tag-pill.tag-default:last')
      .click()

    // 文章标签元素
    cy.get('.article-preview ul.tag-list')
      .should('have.length', 9)
  })

  // it('',()=>{

  // })

  // it('',()=>{

  // })
})
